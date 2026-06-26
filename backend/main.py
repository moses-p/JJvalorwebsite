from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
import os

from routers import projects, donations, contact, blog, jobs, products, volunteers, orders, auth
from database import engine, Base
from seed import seed_admin_user

app = FastAPI(title="J.J Valor Enterprises API", version="1.0.0")

Base.metadata.create_all(bind=engine)
seed_admin_user()

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:3001"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Mount static files for uploads
backend_dir = os.path.dirname(__file__)
project_root = os.path.abspath(os.path.join(backend_dir, ".."))
uploads_dir = os.path.join(project_root, "public", "uploads")
if not os.path.exists(uploads_dir):
    os.makedirs(uploads_dir)

app.mount("/uploads", StaticFiles(directory=uploads_dir), name="uploads")

# Include routers
app.include_router(projects.router)
app.include_router(donations.router)
app.include_router(contact.router)
app.include_router(blog.router)
app.include_router(jobs.router)
app.include_router(products.router)
app.include_router(volunteers.router)
app.include_router(orders.router)
app.include_router(auth.router)

@app.get("/")
async def root():
    return {"message": "J.J Valor Enterprises API", "status": "running"}

@app.get("/health")
async def health_check():
    return {"status": "healthy"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
