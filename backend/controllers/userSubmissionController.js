import path from 'path';
import fs from 'fs';
import sharp from 'sharp';
import { UserSubmission } from '../models/userSubmission.model.js';
import getDataUri from '../utils/datauri.js';
import cloudinary from '../utils/cloudinary.js';

export const createNewUserPost = async (req, res) => {
    try {
        const { name, social_media_handle } = req.body;
        const images = req.files;

        if (!images || images.length === 0) {
            return res.status(400).json({
                message: 'At least one image is required',
                success: false,
            });
        }

        if (!name || !social_media_handle) {
            return res.status(400).json({
                message: 'Name and Social Media handle are required',
                success: false,
            });
        }

        const existUserPost = await UserSubmission.findOne({ social_media_handle });
        if (existUserPost) {
            return res.status(400).json({
                message: 'This "Social Media" Handle is already in use. Please try something different',
                success: false,
            });
        }

        const uploadedImages = await Promise.all(
            images.map(async (image) => {
                const fileUri = getDataUri(image);
                const uploadResult = await cloudinary.uploader.upload(fileUri);
                return uploadResult.secure_url;
            })
        );
        
        const newUserPost = new UserSubmission({
            name,
            social_media_handle,
            images: uploadedImages,
        });

        await newUserPost.save();

        return res.status(201).json({
            message: 'Post created successfully',
            success: true,
            userSubmit: newUserPost,
        });
    } catch (error) {
        console.error('Error in createNewUserPost:', error);
        return res.status(500).json({
            message: 'An error occurred while processing your request',
            success: false,
            error: error.message,
        });
    }
};


export const getAllUserPost = async (req, res) => {
    try {

        const userPosts = await UserSubmission.find().select('-__v');
        return res.status(200).json({
            message: 'User posts retrieved successfully',
            success: true,
            userPosts,
        });
    } catch (error) {
        console.log(error)
    }
}