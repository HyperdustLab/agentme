/** @format */

const axios = require('axios')
const logger = require('./logger')
require('dotenv').config()

const instance = axios.create({
    baseURL: process.env.BASE_URL || 'http://127.0.0.1:9999',
    timeout: 10000,
})

// 请求拦截器
instance.interceptors.request.use(request => {
    logger.info(`Starting Request: ${request.method.toUpperCase()} ${request.url}`)
    logger.info(`Request Data: ${JSON.stringify(request.data)}`)
    return request
})

// 响应拦截器
instance.interceptors.response.use(
    response => {
        logger.info(`Response: ${response.status} ${response.statusText}`)
        logger.info(`Response Data: ${JSON.stringify(response.data)}`)
        return response.data.result
    },
    error => {
        logger.error(`Error: ${error.message}`)
        if (error.response) {
            logger.error(`Response Error Data: ${JSON.stringify(error.response.data)}`)
        }
        return Promise.reject(error)
    }
)

module.exports = instance
