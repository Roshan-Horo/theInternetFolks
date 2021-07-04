import asyncHandler from 'express-async-handler'
import generateToken from '../utils/generateToken.js'
import User from '../models/userModel.js'
import { errorHandler } from '../middleware/errorMiddleware.js'

// SIGN IN
const authUser = asyncHandler(async (req,res) => {
    const {email,password} = req.body

    const user = await User.findOne({email})

    if(user && (await user.matchPassword(password))){
        res.json({
            "status": true,
            "content": {
                "data": {
                    _id: user._id,
                    first_name: user.first_name,
                    last_name: user.last_name,
                    email: user.email,
                    mobile: user.mobile,
                    roleId: user.roleId
                },
                "token": generateToken(user._id)
            }
        })
    }else{
        res.status(401)
        throw new errorHandler('Invalid email or password')
    }
})

// SIGN UP 
const registerUser = asyncHandler(async (req,res) => {
    const {first_name,last_name,email,mobile,password,roleId} = req.body

    const userExists = await User.findOne({email})

    if(userExists){
        res.status(400)
        throw new Error('User already exists')
    }

    const user = await User.create({
        first_name,
        last_name,
        email,
        mobile,
        password,
        roleId

    })

    if(user){
        res.status(201).json({
            _id: user._id,
            first_name: user.first_name,
            last_name: user.last_name,
            email: user.email,
            mobile: user.mobile,
            password: user.password,
            roleId: user.roleId,
            created: user.createdAt,
            updated: user.updatedAt
        })
    }else{
        res.status(400)
        throw new Error('Invalid user data')
    }
})

// GET ALL USERS
const getUsers = asyncHandler(async (req,res) => {
    const users = await User.find({}).select('-password')

    if(users){
        res.json({
            "status": true,
            "content": {"data": users}
        })
    }else{
        res.status(404)
        throw new Error('Users not Found')
    }
})

// GET SINGLE USER
const getUserById = asyncHandler(async (req,res) => {
    // console.log(req.params.id)
    const user = await User.findById(req.params.id).select('-password')
    if(user){
        res.json({
            "status": true,
            "content": {"data": user}
        })
    }else{
        res.status(404)
        throw new Error('User not Found')
    }

})

export {
    authUser,
    registerUser,
    getUsers,
    getUserById
}