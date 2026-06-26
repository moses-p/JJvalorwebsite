import os
import shutil
import uuid

from fastapi import APIRouter, Depends, File, UploadFile

from auth import get_current_admin
from models import User as UserModel

router = APIRouter(prefix="/api/media", tags=["media"])

BACKEND_DIR = os.path.dirname(os.path.dirname(__file__))
UPLOAD_ROOT = os.path.abspath(os.path.join(BACKEND_DIR, "..", "public", "uploads"))


@router.post("/upload")
async def upload_media(
    file: UploadFile = File(...),
    folder: str = "content",
    _admin: UserModel = Depends(get_current_admin),
):
    safe_folder = folder.replace("..", "").strip("/\\") or "content"
    upload_dir = os.path.join(UPLOAD_ROOT, safe_folder)
    os.makedirs(upload_dir, exist_ok=True)

    extension = file.filename.split(".")[-1] if file.filename and "." in file.filename else "jpg"
    filename = f"{uuid.uuid4()}.{extension}"
    file_path = os.path.join(upload_dir, filename)

    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    return {"url": f"/uploads/{safe_folder}/{filename}"}
