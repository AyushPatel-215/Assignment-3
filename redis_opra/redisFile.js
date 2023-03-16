const redis = require('redis')
const uuid = require('uuid')

const config = async () =>{
    const client = redis.createClient()
    await client.connect()

    client.on("error", (e)=>{
        console.log(e)
    })
    return client;
}

const setData = async(username,password) => {
    
    try {
    const client = await config()
    const userId = uuid.v4()

    // if (await (await client).get(JSON.stringify({ username, password }))) {
    //     throw new Error("Username is already taken!");
    // }

    await (await client).hSet(
        "message-app",
        userId,
        JSON.stringify({username,password})
    )
    console.log(await (await client).hGet("message-app", userId))
    } catch (error) {
        console.log(error)    
    }
}

const getData = async (username,password) => {
    const client = config()
    const userId= await (await client).get(JSON.stringify({username,password}))
    return userId
}

module.exports = {
    setData,
    getData
}