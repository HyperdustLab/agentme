/** @format */

var express = require('express')
var app = express()

var service = require('./service.js')

const bodyParser = require('body-parser')

const ethers = require('ethers')

const logger = require('./logger')

const dayjs = require('dayjs')

const moment = require('moment-timezone')

const { Coinbase, Transfer, Wallet } = require('@coinbase/coinbase-sdk')

app.use(bodyParser.json())

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    next()
})

app.post('/transfer', async (req, res) => {
    const { walletAddress, amount } = req.body

    const coinbase = new Coinbase({
        apiKeyName: process.env.NAME,
        privateKey: process.env.PRIVATE_KEY.replaceAll('\\n', '\n'),
    })

    let userWallet = await Wallet.import({
        seed: process.env.SEED,
        walletId: process.env.WALLETID,
    })

    await userWallet.listAddresses()

    let transfer
    try {
        transfer = await userWallet?.createTransfer({
            amount: amount,
            assetId: 'eth',
            destination: walletAddress,
        })
        res.send({ success: true })
    } catch (e) {
        console.error(e)
        res.sendStatus(500)
    }
})

app.post('/getBalance', async (req, res) => {
    const { seed, walletId } = req.body

    const coinbase = new Coinbase({
        apiKeyName: process.env.NAME,
        privateKey: process.env.PRIVATE_KEY.replaceAll('\\n', '\n'),
    })

    let userWallet = await Wallet.import({
        seed: seed,
        walletId: walletId,
    })

    let balance = await userWallet.getBalance(Coinbase.assets.Eth)

    console.info(balance)
    res.send({ balance })
})

app.listen(3000, () => {
    logger.info('Server is running on port 3000')
})
