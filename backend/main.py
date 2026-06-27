from fastapi import FastAPI, Request, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.middleware.gzip import GZipMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import JSONResponse
from slowapi import Limiter, _rate_limit_exceeded_handler
from slowapi.util import get_remote_address
from slowapi.errors import RateLimitExceeded
import os

from routers import projects, donations, contact, blog, jobs, products, volunteers, orders, auth, updates, gallery, partners, leadership, media
from database import engine, Base
from migrate import run_migrations
from seed import seed_admin_user, seed_site_updates, seed_content

# Rate limiting (balanced - 100 requests per minute per IP)
limiter = Limiter(key_func=get_remote_address)
app = FastAPI(title="J.J Valor Enterprises API", version="1.0.0")
app.state.limiter = limiter
app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler)

Base.metadata.create_all(bind=engine)
run_migrations()
seed_admin_user()
seed_site_updates()
seed_content()

# Security headers middleware
@app.middleware("http")
async def add_security_headers(request: Request, call_next):
    response = await call_next(request)
    response.headers["X-Content-Type-Options"] = "nosniff"
    response.headers["X-Frame-Options"] = "DENY"
    response.headers["X-XSS-Protection"] = "1; mode=block"
    response.headers["Referrer-Policy"] = "strict-origin-when-cross-origin"
    return response

# CORS middleware (configured for development, update for production)
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://localhost:3001",
        "http://127.0.0.1:3000",
        "http://127.0.0.1:3001",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# GZip compression for better performance
app.add_middleware(GZipMiddleware, minimum_size=1000)

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
app.include_router(updates.router)
app.include_router(gallery.router)
app.include_router(partners.router)
app.include_router(leadership.router)
app.include_router(media.router)

@app.get("/")
@limiter.limit("100/minute")
async def root():
    return {"message": "J.J Valor Enterprises API", "status": "running"}

@app.get("/health")
@limiter.limit("100/minute")
async def health_check():
    route_paths = {getattr(route, "path", "") for route in app.routes}
    cms_ready = "/api/gallery/public" in route_paths and "/api/media/upload" in route_paths
    return {"status": "healthy", "cms_ready": cms_ready, "api_url": "http://localhost:8000"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
