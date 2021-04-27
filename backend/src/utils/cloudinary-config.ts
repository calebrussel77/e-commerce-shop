import cloudinary from "cloudinary";

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

export const cloudinaryUpload = async (file: any) => {
  try {
    return await cloudinary.v2.uploader?.upload(file);
  } catch (error) {
    console.log(error);
    throw new Error(" Une erreur c'est produite");
  }
};
