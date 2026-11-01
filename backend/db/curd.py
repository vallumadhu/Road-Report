from pymongo import MongoClient
from datetime import datetime, timezone
from config import MONGODB_URL

client = MongoClient(MONGODB_URL)

db = client["road_report"]
reports = db["reports"]


def insert_report(image_url, latitude, longitude, description):
    doc = {
        "image_url": image_url,
        "latitude": latitude,
        "longitude": longitude,
        "description": description,
        "created_at": datetime.now(timezone.utc)
    }
    result = reports.insert_one(doc)
    return result.inserted_id



def fetch_all_reports():
    reports_list = list(reports.find())
    for r in reports_list:
        r["_id"] = str(r["_id"])
    return reports_list



def fetch_reports_in_range(min_lat, max_lat, min_lon, max_lon):
    query = {
        "latitude": {"$gte": min_lat, "$lte": max_lat},
        "longitude": {"$gte": min_lon, "$lte": max_lon},
    }
    reports_list = list(reports.find(query))
    for r in reports_list:
        r["_id"] = str(r["_id"])
    return reports_list