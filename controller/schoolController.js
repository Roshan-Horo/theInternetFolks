import asyncHandler from 'express-async-handler'
import School from '../models/schoolModel.js'
import Student from '../models/studentModel.js'

const getSchools = asyncHandler(async (req,res) => {
   const schools = await School.find()
   if(schools){
    res.json({"status": true,"content": {"data": schools}})
   }else{
       res.status(404)
       throw new Error('Schools not Found')
   }
   
})

const createSchool = asyncHandler(async (req,res) => {

    const {name,city,state,country} = req.body
    const school = new School({
        name,
        city,
        state,
        country
    })
    const createdSchool = await school.save()
    res.status(201).json({"status": true,"content": {"data": createdSchool}})

})

const getSchoolStudents = asyncHandler(async (req,res) => {
    //  const schools = await School.find({})
    //  const students = await Student.find({})

     const schoolStudents = await School.aggregate([{
         $lookup: {
             from: "Student",
             localField: "schoolId",
             foreignField: "schoolId",
             as: "students"
         }
     }])

     if(schoolStudents){
         res.json({"status": true,"content": {"data": schoolStudents}})
     }else{
         res.status(401)
         throw new Error('query fail')
     }
})

export {
    getSchools,
    createSchool,
    getSchoolStudents
}