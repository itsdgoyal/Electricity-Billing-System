const express = require('express')
const app = express()
const pagerouter = require('./routers/pages')
const mongoose = require('mongoose')
app.use(express.urlencoded({extended:false}))
app.use(express.json())
const session = require('express-session')
const mongodbsession = require('connect-mongodb-session')(session)

dburl = 'mongodb://127.0.0.1:27017/ebill'
mongoose.connect(dburl,()=>{
    console.log('connected to database')
})
let store = new mongodbsession({
    uri:dburl,
    collection: 'mysessions'
})
app.use(session({
    secret: 'abcd',
    resave: false,
    saveUninitialized: false,
    store: store
}))

app.use(express.static('public'))
app.set('view engine','ejs')


app.use(pagerouter)

app.listen(5000)