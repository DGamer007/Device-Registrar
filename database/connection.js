const mongoose = require('mongoose')

const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL, {
            dbName: process.env.MONGODB_DATABASE,
            useNewUrlParser: true,
            useUnifiedTopology: true
        })

        console.log('Database Connected Successfully!')
    } catch (error) {
        console.log(error)
    }
}

connect()