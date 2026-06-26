import os
from datetime import datetime, timezone

from database import SessionLocal
from models import (
    User as UserModel,
    SiteUpdate as SiteUpdateModel,
    GalleryImage as GalleryImageModel,
    Partner as PartnerModel,
    LeadershipMember as LeadershipMemberModel,
    Project as ProjectModel,
    BlogPost as BlogPostModel,
    Product as ProductModel,
)
from auth import get_password_hash


DEFAULT_UPDATES = [
    {
        "title": "Orphanage Project Launch",
        "message": "Partner with us to build hope for children across Uganda.",
        "category": "program",
        "link_url": "/orphanage",
        "link_label": "Learn more",
        "image_url": "/images/IMG-20260609-WA0007.jpg",
        "show_in_marquee": True,
        "priority": 100,
    },
    {
        "title": "Youth Training Program",
        "message": "50+ youth trained in entrepreneurship and vocational skills.",
        "category": "milestone",
        "link_url": "/services/education",
        "link_label": "View program",
        "image_url": "/images/IMG-20260609-WA0011.jpg",
        "show_in_marquee": True,
        "priority": 90,
    },
    {
        "title": "New School Partnerships",
        "message": "Expanding education and community outreach with local schools.",
        "category": "news",
        "link_url": "/partners",
        "link_label": "Our partners",
        "image_url": "/images/IMG-20260611-WA0006.jpg",
        "show_in_marquee": True,
        "priority": 80,
    },
    {
        "title": "Company Incorporated",
        "message": "J.J Valor Enterprises Ltd — building businesses that build lives.",
        "category": "announcement",
        "link_url": "/about",
        "link_label": "About us",
        "image_url": "/images/hero.jpg",
        "show_in_marquee": True,
        "priority": 70,
    },
]

GALLERY_SEED = [
    {"title": "Hero Project", "alt_text": "J.J Valor flagship work", "image_url": "/images/hero.jpg", "category": "Featured", "priority": 100},
    {"title": "Community Outreach", "alt_text": "Community engagement", "image_url": "/images/IMG-20260609-WA0007.jpg", "category": "Community", "priority": 90},
    {"title": "Youth Program", "alt_text": "Youth empowerment", "image_url": "/images/IMG-20260609-WA0011.jpg", "category": "Youth", "priority": 85},
    {"title": "Field Work", "alt_text": "On-site project work", "image_url": "/images/IMG-20260611-WA0006.jpg", "category": "Projects", "priority": 80},
    {"title": "Team Activity", "alt_text": "J.J Valor team", "image_url": "/images/IMG-20260609-WA0009.jpg", "category": "Team", "priority": 75},
    {"title": "Partnership Event", "alt_text": "Partnership activity", "image_url": "/images/IMG-20260609-WA0014.jpg", "category": "Partnerships", "priority": 70},
]

PARTNERS_SEED = [
    {"name": "Local Schools Network", "description": "Education partners across Uganda", "partner_type": "Education", "priority": 90},
    {"name": "Community NGOs", "description": "Non-profits driving social impact", "partner_type": "NGO", "priority": 80},
    {"name": "Government Agencies", "description": "Public sector collaboration", "partner_type": "Government", "priority": 70},
    {"name": "Corporate Sponsors", "description": "Businesses investing in community growth", "partner_type": "Corporate", "priority": 60},
]

LEADERSHIP_SEED = [
    {
        "name": "Juliet Nantege Nababi",
        "role": "Founder & Chief Executive Officer",
        "bio": "Visionary leader behind J.J Valor Enterprises, committed to building businesses that build lives.",
        "photo_url": "/images/hero.jpg",
        "sort_order": 1,
    },
    {
        "name": "Operations Leadership",
        "role": "Director of Operations",
        "bio": "Leads multi-sector project delivery across construction, agriculture, and community programs.",
        "photo_url": "/images/IMG-20260609-WA0009.jpg",
        "sort_order": 2,
    },
]


PROJECTS_SEED = [
    {
        "title": "Construction & Real Estate",
        "slug": "construction-real-estate",
        "description": "Residential and commercial building projects",
        "image_url": "/images/IMG-20260609-WA0007.jpg",
        "status": "active",
        "featured": True,
        "progress": 75,
    },
    {
        "title": "Youth Training Program",
        "slug": "youth-training-program",
        "description": "Skills development for young people",
        "image_url": "/images/IMG-20260609-WA0011.jpg",
        "status": "active",
        "featured": True,
        "progress": 85,
    },
    {
        "title": "Orphanage Project",
        "slug": "orphanage-project",
        "description": "Children's home construction and support",
        "image_url": "/images/IMG-20260611-WA0006.jpg",
        "status": "planning",
        "featured": True,
        "progress": 30,
    },
]

BLOG_SEED = [
    {
        "title": "Building Dreams: The J.J Valor Story",
        "slug": "building-dreams-jj-valor-story",
        "excerpt": "How a vision became a reality and continues to transform communities",
        "content": "J.J Valor Enterprises began with a bold vision to build businesses that build lives...",
        "featured_image": "/images/hero.jpg",
        "category": "Founder's Corner",
        "published": True,
    },
    {
        "title": "The Power of Youth Empowerment",
        "slug": "power-of-youth-empowerment",
        "excerpt": "How our training programs are changing lives in Uganda",
        "content": "Our youth training programs equip young people with practical skills and entrepreneurship knowledge...",
        "featured_image": "/images/IMG-20260609-WA0011.jpg",
        "category": "Impact",
        "published": True,
    },
]

PRODUCTS_SEED = [
    {
        "name": "Branded T-Shirt",
        "slug": "branded-t-shirt",
        "description": "Official J.J Valor branded apparel",
        "price": 35000,
        "currency": "UGX",
        "stock_quantity": 50,
        "category": "Apparel",
        "images": "/images/IMG-20260609-WA0014.jpg",
        "featured": True,
        "status": "active",
    },
    {
        "name": "Community Farm Produce Box",
        "slug": "farm-produce-box",
        "description": "Fresh produce from our agriculture initiative",
        "price": 25000,
        "currency": "UGX",
        "stock_quantity": 30,
        "category": "Agriculture",
        "images": "/images/IMG-20260611-WA0006.jpg",
        "featured": True,
        "status": "active",
    },
]


def seed_admin_user() -> None:
    db = SessionLocal()
    try:
        username = os.getenv("ADMIN_USERNAME", "admin")
        existing = db.query(UserModel).filter(UserModel.username == username).first()
        if existing:
            return

        admin = UserModel(
            email=os.getenv("ADMIN_EMAIL", "admin@jjvalor.com"),
            username=username,
            hashed_password=get_password_hash(os.getenv("ADMIN_PASSWORD", "admin123")),
            full_name="J.J Valor Administrator",
            is_active=True,
            is_admin=True,
        )
        db.add(admin)
        db.commit()
    finally:
        db.close()


def seed_site_updates() -> None:
    db = SessionLocal()
    try:
        if db.query(SiteUpdateModel).count() > 0:
            for update in db.query(SiteUpdateModel).filter(SiteUpdateModel.image_url.is_(None)).all():
                update.image_url = "/images/hero.jpg"
            db.commit()
            return

        now = datetime.now(timezone.utc)
        for item in DEFAULT_UPDATES:
            db.add(SiteUpdateModel(**item, is_published=True, published_at=now))
        db.commit()
    finally:
        db.close()


def seed_content() -> None:
    db = SessionLocal()
    try:
        if db.query(GalleryImageModel).count() == 0:
            for item in GALLERY_SEED:
                db.add(GalleryImageModel(**item, is_published=True))

        if db.query(PartnerModel).count() == 0:
            for item in PARTNERS_SEED:
                db.add(PartnerModel(**item, is_published=True))

        if db.query(LeadershipMemberModel).count() == 0:
            for item in LEADERSHIP_SEED:
                db.add(LeadershipMemberModel(**item, is_published=True))

        now = datetime.now(timezone.utc)
        if db.query(ProjectModel).count() == 0:
            for item in PROJECTS_SEED:
                db.add(ProjectModel(**item))

        if db.query(BlogPostModel).count() == 0:
            for item in BLOG_SEED:
                db.add(BlogPostModel(**item, published_at=now))

        if db.query(ProductModel).count() == 0:
            for item in PRODUCTS_SEED:
                db.add(ProductModel(**item))

        db.commit()
    finally:
        db.close()
