require('../database/connection')

const express = require('express')
const cors = require('cors')
const jwt = require('jsonwebtoken')
const path = require('path')
const firewall = require('../database/firewall')
const User = require('../database/schemas/user')

const app = express()
app.use(express.static(path.join(__dirname, '../build')))
app.use(express.json())
app.use(cors())

app.post('/api/verify', async (req, res) => {
    try {
        if (!req.header('Authorization')) throw 401

        const token = req.header('Authorization').replace('Bearer ', '')
        const decode = jwt.verify(token, process.env.JWT_SECRET)
        const user = await User.findOne({ _id: decode._id, 'devices.token': token })

        if (!user) throw 404

        res.status(202).send(user._id.toString())
    } catch (error) {
        console.log(error)
        res.status(isNaN(error) ? 401 : error).send()
    }
})

app.post('/api/login', async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password)
        const token = await user.generateAuthToken()

        res.status(202).send({ uid: user._id, token })
    } catch (error) {
        console.log(error)
        res.status(500).send()
    }
})

app.post('/api/signup', async (req, res) => {
    try {
        const user = new User(req.body)
        await user.save()
        const token = await user.generateAuthToken()

        res.status(201).send({ uid: user._id, token })
    } catch (error) {
        console.log(error)
        res.status(500).send()
    }
})

app.post('/api/registerdevice', firewall, async (req, res) => {
    try {
        req.user.devices = req.user.devices.map(device => {
            if (device.token !== req.token) return device

            return {
                token: device.token,
                _id: device._id,
                deviceName: req.body.deviceName,
                deviceModel: req.body.deviceModel
            }
        })

        await req.user.save()
        res.status(201).send({ uid: req.user._id })
    } catch (error) {
        console.log(error)
    }
})

app.get('/api/fetchdevices', firewall, async (req, res) => {
    try {
        const data = []
        for (const device of req.user.devices) {
            data.push({
                id: device._id,
                deviceName: device.deviceName,
                deviceModel: device.deviceModel
            })
        }

        res.send(data)
    } catch (error) {
        console.log(error)
        res.status(500).send()
    }
})

app.post('/api/logout', firewall, async (req, res) => {
    try {
        req.user.devices = req.user.devices.filter(device => device.token !== req.token)

        await req.user.save()
        res.send()
    } catch (error) {
        console.log(error)
        res.status(500).send()
    }
})

app.listen(process.env.PORT, () => {
    console.log('Server is Up on Port', process.env.PORT)
})