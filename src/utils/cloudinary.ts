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
export async function getPredominantColor(publicId: string): Promise<string> {
  try {
    // Pass the public ID directly without URL encoding
    const result = await cloudinary.api.resource(publicId, {
      colors: true,
    })

    // Extract the predominant color
    const predominantColor = result.colors[0][0] // Color in HEX format
    return predominantColor
  } catch (error) {
    console.error('Error fetching image color:', error)
    throw error
  }
}
