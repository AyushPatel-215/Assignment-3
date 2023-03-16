const express = require('express')
require('./db/mongoose')

const app = express()
const port = process.env.PORT || 3001

const routerText = require('./router/routertext')
app.use(express.json())
app.use(routerText)

app.listen(port,()=>{
    console.log("app is run on port:",port)
})
