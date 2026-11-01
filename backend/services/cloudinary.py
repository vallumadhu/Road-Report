import cloudinary
import cloudinary.uploader
from cloudinary.utils import cloudinary_url
from config import CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET, CLOUDINARY_CLOUD_NAME
    
cloudinary.config( 
    cloud_name = CLOUDINARY_CLOUD_NAME, 
    api_key = CLOUDINARY_API_KEY, 
    api_secret = CLOUDINARY_API_SECRET,
    secure=True
)

def upload_image(image_path: str):
    try:
        secure_url = cloudinary.uploader.upload(image_path)["secure_url"]
        optimize_url, _ = cloudinary_url(secure_url, fetch_format="auto", quality="auto")
        return optimize_url
    
    except Exception as e:
        print(f"Error uploading image: {e}")
        return None