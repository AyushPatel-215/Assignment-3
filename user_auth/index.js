const express = require('express')
const axios = require("axios");
const {validateUsername,validatePassword} = require('./src/validate')
const {genrateToken,getUserId} = require('./src/auth')

const app = express()
const port = process.env.PORT || 3002

app.use(express.json())

app.post('/auth/create' , async (req,res)=> {

    try {
    const {username,password} = req.body
    console.log(username+" "+password)
    validateUsername(username)
    validatePassword(password)

    const response = await axios({
        url: "http://localhost:3005/setRedis",
        method: "POST",
        data: { username, password },
        validateStatus: () => true,
      });
    res.status(response.status).send(response.data);

    } catch (e) {
        res.status(400).send({ error: e.message })
    }
})

app.get('/auth/login', async(req,res) => {
    try {
        const {username,password} = req.body
        const response = await axios({
            url:"http://localhost:3005/getRedis",
            method: "GET",
            data: {username,password},
            validateStatus : ()=> true,
        })

        const data = genrateToken(response.data)
        res.status(response.status).send({token:data})
    } catch (e) {
        res.status(response.status).send(response.data)
    }
})


app.get('/auths', async (req,res) => {
   
    if(!req.query.token)
        return res.status(404).send({error:"please Authenticate!"})

    const token = req.query.token.replace("Bearer ","")
    console.log(token)

    const userId = getUserId(token)
    console.log(userId)

    
    res.status(200).send({userId})
})


app.listen(port , ()=>{
    console.log("App is runnning on port:",port)
})

