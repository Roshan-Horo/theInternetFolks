import jwt from 'jsonwebtoken'
import asyncHandler from 'express-async-handler'
import User from '../models/userModel.js'
import { response } from 'express'

const protect = asyncHandler(async (req,res,next) => {
    let token

    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        try {
            token = req.headers.authorization.split(' ')[1]
            const decoded = jwt.verify(token, process.env.JWT_SECRET)
            
            req.user = await User.findById(decoded.id).populate("roleId").select('-password')

        } catch (err) {
            console.error(err)
            res.status(401)
            throw new Error('Not authorized, token failed')
        }
    }

    if(!token){
        res.status(401)
        throw new Error('Not authorized, no token')
    }

    next()
})

const checkScopes = asyncHandler(async (req,res,next) => {
    let isAssigned = false
    console.log(req.user)
    if(req.user && req.user.roleId.scopes){
    let scopes = req.user.roleId.scopes
    console.log(scopes)

    let path = req.originalUrl
    console.log(path)

    console.log(path.split('/').length)



    function check(passScope){
    for(let scope of scopes){
    if(passScope === scope){
        isAssigned = true
      }
     }
    }

    if(path.split('/').length === 3){

        // switch(path){
        // case "/school/students":check("school-students");
        // break;
        
        // }
        if(path === "/school/students"){
            check("school-students")
        }else if(path.includes('/user/')){
            if(req.method === 'GET'){
            check("user-get")
            } 
        }else{

        }
    }   
    


    if(path.split('/').length === 2){
    
        switch(path){
        
            case "/user": check("user-get")
            break;
            
            case "/role": check("role-get")
            break;
            
            case "/student": 
            if(req.method === 'GET'){
                check("student-get")
            }else if(req.method === 'POST'){
                check("student-create")
            }else{
            
            }
            break;

            case "/school": 
            if(req.method === 'GET'){
                check("school-get")
            }else if(req.method === 'POST'){
                check("school-create")
            }else{
            
            }
            break;


        } // end switch 
    
    }

} // End if
 
  if(!isAssigned){
      response.status(401)
      throw new Error('No Access')
  }

  next()

})




export {
    protect,
    checkScopes
}