const express = require('express')
const Mess = require('../model/modeltext')
const router = new express.Router()
const axios = require('axios')

router.post('/messageCreate', async(req,res)=> {
   
    const token = req.headers.authorization
    try {
        
        const id = await axios({
            url:`http://localhost:3002/auths?token=${token}`,
            method: "GET",
            validateStatus : ()=> true,
        })
        const Userid = id.data.userId
        req.body.userId = Userid
        
        const data = new Mess(req.body)
        await data.save()
        console.log("data save suceesfullly")
        res.status(200).send(data)
    } catch (error) {
        res.status(401).send(error)
    }
})

router.post('/StoreData', async (req,res) => {
    try {
        const data = req.body
        console.log("this is me in use..")
        console.log(data)
        const StoreData =new Mess(data)
        await StoreData.save()
        res.status(200).send(data)
    } catch (e) {
        res.status(401).send({error:e.message})
    }
    
})

router.get('/messageFetch', async(req,res) => {
    try {
    const messData = req.body.message
    console.log(messData)
    let data ={}
    if(messData){
        const findText = await Mess.find({})
        data = findText.filter( (msg) => msg.message.includes(messData))
    }else{
        data = await Mess.find({})
    }

    if(!data)
        return res.status(301).send("no data find")
    res.status(200).send(data)

    } catch (error) {
        console.log(error.message)
    }
})

router.get('/fetchByCategory',async(req,res)=>{
    const messData = req.body
    console.log(messData)
    let data = {}

    if(messData.category){
        data = await Mess.find({category:messData.category})
    }
    else if(messData.createdTime){
        data = await Mess.find({createdTime:messData.createdTime})
    }
        
    if(!data)
        return res.status(301).send("no data availble!")
    res.status(201).send(data)
})

router.get('/get/userdata', async (req,res) => {
    const userId = req.body.userId
    console.log(userId)

    const data = await Mess.find({userId:userId})
    res.status(200).send(data)

})

console.log("router is working..")
module.exports = router