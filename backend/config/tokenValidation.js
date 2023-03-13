const req = require('express/lib/request')
const {verify} = require('jsonwebtoken')
const jwt = require("jsonwebtoken")
const secret = '#$*&%^&@#($(@'

module.exports={
    checkToken:(req,res,next)=>{
        let token = req.get("authorization")

        if(token){
            let wow = token.slice(7)
            verify(wow, secret, (err, decoded)=>{
                if(err){
                    res.json({
                        succes:0,
                        message:"Login First",
                        err
                    })
                }else{
                    let user = decoded.result
                    next()
                }
            })
        }else{
            res.json({
                succes:0,
                message:"Acces Denied : unathorization user"
            })
        }
    },

    isHR : (req, res, next) => {
        let token = req.headers.authorization.split(" ")[1]
        let decoded = jwt.verify(token, secret)
        if (decoded.result[0].role_id === 1) {
            next()
        } else {
            res.json({
                message: "You are not authorized to access this resource"
            })
        }
    },
}