import dotenv from 'dotenv';
import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';

// Load environment variables
dotenv.config();   

// Configure Cloudinary with environment variables
cloudinary.config({
  cloud_name: process.env.CLOUD_API_NAME,  // Cloudinary cloud name
  api_key: process.env.CLOUDINARY_API_KEY,  // Cloudinary API key
  api_secret: process.env.CLOUDINARY_API_SECRET,  // Cloudinary API secret
});

// Create a Cloudinary storage instance for multer
export const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'CloudinaryDemo',  // Folder in Cloudinary to store images
    allowedFormats: ['jpeg', 'png', 'jpg'],  // Allowed image formats
    transformation: [
      { width: 1200, height: 1200, crop: 'limit', quality: 'auto', fetch_format: 'auto' }  // Image transformation settings
    ],
  },
});
