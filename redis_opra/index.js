const express = require('express')
const {setData,getData} = require('./redisFile')

const app = express()
const port = process.env.PORT || 3005
app.use(express.json());

app.post("/setRedis",async (req,res)=> {

    try {
    const {username,password} = req.body
    
    await setData(username,password)
    res.status(201).send();
    } catch (e) {
        res.status(201).send({error:e.message}); 
    }
})

app.get("/getRedis",async (req,res) => {
    const {username,password} = req.body
    const userId = await getData(username,password)
    res.status(200).send(userId)
})


app.listen(port, ()=>{
    console.log("app is run on port:",port)
})

