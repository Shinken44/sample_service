const path = require('path')
const perco_api = require('./../perco_api') 

const express = require('express')
const app = express()

app.get('/', (request, response) => {
    response.send('PERCo API Service')
})

app.get('/staffs', (request, response) => {
    perco_api.getStaffs(1)
        .then((staffs) => {
            response.send(staffs)
        })
        .catch((err) => {
            console.log('getStaffs failed')
        })    
})

app.get('/divisions', (request, response) => {
    perco_api.getDivisions()
    .then((divisions) => {
        response.send(divisions)
    })
    .catch((err) => {
        console.log('getDivisions failed')
    })
})

app.get('/status', (request, response) => {
    perco_api.getStatus(1)
    .then((status) => {
        response.send(status)
    })
    .catch((err) => {
        console.log('getStatus failed')
    })
})


module.exports = app