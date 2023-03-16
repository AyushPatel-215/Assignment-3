const jwt = require('jsonwebtoken')

const genrateToken = (userId) => {
    const token = jwt.sign({userId}, "myPassword")
    return token
}

const getUserId = (token) => {
    if(token && jwt.verify(token,"myPassword")){
        const {userId} = jwt.decode(token, {jwtPayload:true})
        return userId
    }
    return undefined
}

module.exports = {
    genrateToken,
    getUserId
}