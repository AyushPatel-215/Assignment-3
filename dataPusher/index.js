const express = require('express')
const axios = require('axios')

const app = express()
const port = process.env.PORT || 3003

app.use(express.json())

app.post('/pusher' , async (req,res) => {

    try {
        
   
    const token = req.headers.authorization
    console.log(token)

    let id = await axios({
        url:`http://localhost:3002/auths?token=${token}`,
        method:"GET",
        validateStatus: () => true,
    })
    const userId = id.data.userId
    console.log(userId)

    const messData = await axios({
        url:`http://localhost:3001/get/userdata`,
        method:"GET",
        data: {userId},
        validateStatus: () => true
    }) 

    console.log(messData.data[0])
    const message = messData.data[0].message
    console.log(message)

    const randomNum = parseInt(Math.random() * (60 - 1) + 1)
    console.log(randomNum)

    

    const abc = await axios({
        url: 'http://localhost:3004/validatorService',
        method:"POST",
        data:{message:messData.data[0],randomNum:randomNum},
        validateStatus: () => true
    })


    res.send(messData.data)
    } catch (error) {
          console.log(error)  
    }

})

app.listen(port, ()=> {
    console.log("app is run on port:",port)
})