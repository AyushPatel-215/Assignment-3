const validateUsername = (username) => {

    const regex = /^[a-zA-Z0-9]*$/

    if(username.length>5 && username.length<15)
    {
        if(regex.test(username)){
            return true
        }else{
            throw new Error("username is must be alphanumeric!")
        }

    }else{
        throw new Error("username is must be 6 to 15 charter!")
    }
}

const validatePassword = (password) =>{
    if(password.length>6 && password.length<12){
        return true
    }else{
        throw new Error("password is must be 6 to 15 charter!")
    }
}
 
module.exports = {
    validateUsername,
    validatePassword
}