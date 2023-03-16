const express = require('express')
const axios = require('axios')

const app = express()
const port = process.env.PORT || 3004

app.use(express.json())


app.post("/validatorService", async (req,res) => {

 
    const data = req.body.message
    const randomNum = req.body.randomNum
    let category = {}
    console.log(randomNum)

    
    // const randomNum = data.randomNum
    if(randomNum%10 ==0){ 
        try {
            const sec = secondTime()
            category = "Retired"
        } catch (error) {
            category = "Failed"
        }
    }
    else {
        category = "Direct"
    }
    // data.category = category
    // console.log(data)

    let gos = await axios({
        url:`http://localhost:3001/StoreData`,
        method:"post",
        data : data,
        validateStatus: () => true,
    })
 
    const secondTime = () => {
        return new Promise((solve,reject) => {  
            setTimeout ( () => {
                const secondRandom  = parseInt(Math.random() * (60 - 1) + 1)
                if(secondRandom%10 == 0)
                    reject(secondRandom)
                solve(secondRandom)    
            })
        })   
    }

})


app.listen(port, ()=>{
    console.log("app is run on port:",port)
})
