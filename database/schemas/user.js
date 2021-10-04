const { Schema, model } = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const userSchema = new Schema({
    firstName: {
        type: String,
        trim: true
    },
    lastName: {
        type: String,
        trim: true
    },
    userName: {
        type: String,
        trim: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) throw new Error('Invalid Email!')
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 7,
        trim: true
    },
    devices: [{
        token: {
            type: String
        },
        deviceName: {
            type: String,
            trim: true
        },
        deviceModel: {
            type: String,
            trim: true
        }
    }],
}, {
    timestamps: true,
    versionKey: false
})

userSchema.methods.generateAuthToken = async function () {
    const token = jwt.sign({ _id: this._id.toString() }, process.env.JWT_SECRET)
    this.devices = this.devices.concat({ token })

    await this.save()
    return token
}

userSchema.methods.registerDevice = async function () {

}

userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({ email })
    if (!user) throw 404
    if (!bcrypt.compare(password, user.password)) throw 401
    return user
}

userSchema.pre('save', async function (next) {
    if (this.isModified('password'))
        this.password = await bcrypt.hash(this.password, 8)

    next()
})

const User = new model('User', userSchema)

module.exports = User
