import { v2 as cloudinary, type ImageTransformationOptions } from 'cloudinary'

cloudinary.config({
  cloud_name: 'bushblade',
  api_key: import.meta.env.CLOUDINARY_API_KEY,
  api_secret: import.meta.env.CLOUDINARY_SECRET,
  secure: true,
})

// Wrapper function for Cloudinary URL
export function getCloudinaryUrl(
  publicId: string,
  options?: ImageTransformationOptions
): string {
  return cloudinary.url(publicId, options)
}
