import asyncHandler from 'express-async-handler'
import Role from '../models/roleModel.js'

const getRoles = asyncHandler(async (req,res) => {
   const roles = await Role.find({})
   if(roles){
    res.json({"status": true,"content": {"data": roles}})
   }else{
       res.status(404)
       throw new Error('Roles not Found')
   }

})

const createRole = asyncHandler(async (req,res) => {

    const {name,scopes} = req.body
    const role = new Role({
        name,
        scopes
    })
    const createdRole = await role.save()
    res.status(201).json({"status": true,"content": {"data": createdRole}})

})


export {
    getRoles,
    createRole
}