const User = require("../../../models/User")
const jwt = require('jsonwebtoken')
/*
    POST /api/auth
    {
        user_id,
        usre_pw
    }
*/


exports.register = (req,res)=>{
    const {user_id,user_pw} = req.body
    let newUser = null

    const create = (user)=>{
        if(user){
            throw new Error('username exists')
        }else{
            return User.create(user_id,user_pw)
        }
    }

    const respond = ()=>{
        res.json({
            message: 'register success'
        })
    }
    const onError = (error)=>{
        res.status(409).json({
            message: error.message
        })
    }

    User.findOneByUser_id(user_id)
    .then(create)
    .then(respond)
    .catch(onError)
}

/*
    POST /api/auth/login
    {
        user_id,
        usre_pw
    }
*/

exports.login = (req,res)=>{
    const {user_id,user_pw} = req.body
    const secret = req.app.get('jwt-key')

    const check = (user) =>{
        if(!user){
            throw new Error('login failed')
        }else{
            if(user.verify(user_pw)){
                const p = new Promise((resolve, reject)=>{
                    jwt.sign(
                        {
                            _id:user._id,
                            user_id: user.user_id
                        },
                        secret,{
                            expiresIn:'7d',
                            issuer:'spectrum.com',
                            subject:'userInfo'
                        },(err,token)=>{
                            if(err)reject(err)
                            resolve(token)
                        }
                    )
                })
                return p
            }else{
                throw new Error('login failed')
            }
        }
    }

    const respond = (token)=>{
        res.json({
            message: 'login success',
            token
        })
    }

    const onError = (error)=>{
        res.status(403).json({
            message:error.message
        })
    }

    User.findOneByUser_id(user_id)
    .then(check)
    .then(respond)
    .catch(onError)
}

/*
    GET /api/auth/check
*/

exports.check = (req,res)=>{
    res.json({
        success:true,
        info: req.decoded
    })
}