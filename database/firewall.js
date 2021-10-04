const jwt = require('jsonwebtoken')
const User = require('./schemas/user')

const firewall = async (req, res, next) => {
    try {
        if (!req.header('Authorization')) throw 401

        const token = req.header('Authorization')?.replace('Bearer ', '')
        const decode = jwt.verify(token, process.env.JWT_SECRET)
        const user = await User.findOne({ _id: decode._id, 'devices.token': token })

        if (!user) throw 404

        req.token = token
        req.user = user

        next()
    } catch (error) {
        console.log(error)
        res.status(isNaN(error) ? 401 : error).send()
    }
}

module.exports = firewall