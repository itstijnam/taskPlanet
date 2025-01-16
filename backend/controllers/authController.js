import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { Admin } from "../models/admin.model.js";

export const adminCreate = async (req, res)=>{
    try {
        const {username, email, password} = req.body;
        if(!username || !email || !password){
            return res.status(400).json({
                message: 'Please fill the detail',
                success: false
            })
        }
        const definedUsername = username.trim().toLowerCase().replace(/ /g, '');
        
        const existAdmin = await Admin.findOne({username: definedUsername})
        if(existAdmin){
            return res.status(400).json({
                message: 'This username is not available',
                success: false
            })
        }
        const existAdminByEmail = await Admin.findOne({email})
        if(existAdminByEmail){
            return res.status(400).json({
                message: 'Please try another email',
                success: false
            })
        }
        
        const hashedPassword = await bcrypt.hash(password,10);

        await Admin.create({
            username: definedUsername,
            email,
            password: hashedPassword,
            role: 'Admin'
        })

        return res.status(201).json({
            message: "Admin account has been created successfully",
            success: true
          });

    } catch (error) {
        console.log(`controllers/authController/adminCreate error: `, error)
    }
}

export const adminLogin = async (req,res)=>{
    try {
        const {username, password} = req.body
        if(!username || !password){
            return res.status(400).json({
                message: 'Please enter all details',
                success: false
            })
        }
        
        const admin = await Admin.findOne({ username });
        if(!admin){
            return res.status(400).json({
                message: 'Incorrect username or password',
                success: false
            })
        }

        const isPasswordValid = await bcrypt.compare(password, admin.password);
        if(!isPasswordValid){
            return res.status(400).json({
                message: 'Incorrect username or password',
                success: false
            })
        }

        const token = jwt.sign({userId: admin._id}, process.env.SECRET_KEY, {expiresIn: '1d'});
        return res.cookie('token', token, {httpOnly: true, maxAge: 1*24*60*60*1000}).json({
            admin,
            message: `Welcome ${admin.username}`,
            success:true
        })

    } catch (error) {
        console.log(`controllers/authController/adminLogin error: `, error)   
    }
}

export const logout = async(req,res)=>{
    try {
        return res.cookie('token', '', {maxAge: 0}).json({
            message: 'Logged Out successfully',
            success: true
        })
    } catch (error) {
        console.log(`controllers/controllers/authController error: `, error)
    }
}