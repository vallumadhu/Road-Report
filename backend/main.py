from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from routes import health, potholes

app = FastAPI(title="Road Report API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173","https://getroadreport.netlify.app/"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(health.router, prefix="/api")
app.include_router(potholes.router, prefix="/api")