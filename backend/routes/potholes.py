import os
import tempfile

from fastapi import APIRouter, UploadFile, File, Form, HTTPException
from services.cloudinary import upload_image
from db.curd import insert_report,fetch_all_reports, fetch_reports_in_range


router = APIRouter(tags=["Potholes"])


@router.post("/upload_pothole")
def upload_pothole(
    image: UploadFile = File(...),
    latitude: float = Form(...),
    longitude: float = Form(...),
    description: str = Form("")):
    temp_file_path = None

    try:
        with tempfile.NamedTemporaryFile(delete=False, suffix=".jpg") as temp_file:
            temp_file_path = temp_file.name

            while chunk := image.file.read(1024 * 1024):
                temp_file.write(chunk)

        image_url = upload_image(temp_file_path)

        if image_url is None:
            raise HTTPException(
                status_code=502,
                detail="Failed to upload image to Cloudinary",
            )

        insert_report(image_url, latitude, longitude, description)

        return {
            "image_url": image_url,
            "latitude": latitude,
            "longitude": longitude,
            "description": description,
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail="An error occurred while processing the pothole report")

    finally:
        if temp_file_path and os.path.exists(temp_file_path):
            os.remove(temp_file_path)

        image.file.close()


@router.get("/get_potholes")
def get_potholes(min_lat: float = None, max_lat: float = None, min_lon: float = None, max_lon: float = None):

    if None in (min_lat, max_lat, min_lon, max_lon):
        reports = fetch_all_reports()
    else:
        reports = fetch_reports_in_range(min_lat, max_lat, min_lon, max_lon)
        
    return {"reports": reports}