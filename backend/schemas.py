from pydantic import BaseModel, EmailStr
from datetime import datetime
from typing import Optional, List

class UserBase(BaseModel):
    email: EmailStr
    username: str
    full_name: Optional[str] = None

class UserCreate(UserBase):
    password: str

class User(UserBase):
    id: int
    is_active: bool
    is_admin: bool
    can_manage_content: bool
    can_manage_users: bool
    can_view_analytics: bool
    created_at: datetime
    
    class Config:
        from_attributes = True

class CategoryBase(BaseModel):
    name: str
    slug: str
    description: Optional[str] = None
    icon: Optional[str] = None

class Category(CategoryBase):
    id: int
    created_at: datetime
    
    class Config:
        from_attributes = True

class ProjectBase(BaseModel):
    title: str
    slug: str
    description: Optional[str] = None
    content: Optional[str] = None
    image_url: Optional[str] = None
    thumbnail_url: Optional[str] = None
    status: str = "active"
    featured: bool = False
    start_date: Optional[datetime] = None
    end_date: Optional[datetime] = None
    budget: Optional[float] = None
    progress: int = 0

class Project(ProjectBase):
    id: int
    created_at: datetime
    updated_at: Optional[datetime] = None
    categories: List[Category] = []
    
    class Config:
        from_attributes = True

class DonationBase(BaseModel):
    donor_name: Optional[str] = None
    donor_email: Optional[EmailStr] = None
    donor_phone: Optional[str] = None
    amount: float
    currency: str = "UGX"
    payment_method: Optional[str] = None
    message: Optional[str] = None
    is_recurring: bool = False

class Donation(DonationBase):
    id: int
    payment_reference: Optional[str] = None
    status: str
    created_at: datetime
    
    class Config:
        from_attributes = True

class VolunteerBase(BaseModel):
    full_name: str
    email: EmailStr
    phone: Optional[str] = None
    skills: Optional[str] = None
    availability: Optional[str] = None
    message: Optional[str] = None

class Volunteer(VolunteerBase):
    id: int
    status: str
    created_at: datetime
    
    class Config:
        from_attributes = True

class BlogPostBase(BaseModel):
    title: str
    slug: str
    excerpt: Optional[str] = None
    content: str
    featured_image: Optional[str] = None
    category: Optional[str] = None
    tags: Optional[str] = None
    published: bool = False

class BlogPost(BlogPostBase):
    id: int
    author_id: Optional[int] = None
    published_at: Optional[datetime] = None
    created_at: datetime
    updated_at: Optional[datetime] = None
    
    class Config:
        from_attributes = True

class ContactMessageBase(BaseModel):
    name: str
    email: EmailStr
    phone: Optional[str] = None
    subject: Optional[str] = None
    message: str

class ContactMessage(ContactMessageBase):
    id: int
    status: str
    created_at: datetime
    
    class Config:
        from_attributes = True

class JobListingBase(BaseModel):
    title: str
    slug: str
    description: str
    requirements: Optional[str] = None
    responsibilities: Optional[str] = None
    location: Optional[str] = None
    employment_type: Optional[str] = None
    salary_range: Optional[str] = None
    status: str = "open"

class JobListing(JobListingBase):
    id: int
    created_at: datetime
    updated_at: Optional[datetime] = None
    
    class Config:
        from_attributes = True

class ProductBase(BaseModel):
    name: str
    slug: str
    description: Optional[str] = None
    price: float
    currency: str = "UGX"
    stock_quantity: int = 0
    category: Optional[str] = None
    images: Optional[str] = None
    featured: bool = False
    status: str = "active"

class Product(ProductBase):
    id: int
    created_at: datetime
    updated_at: Optional[datetime] = None
    
    class Config:
        from_attributes = True

class OrderBase(BaseModel):
    customer_name: str
    customer_email: EmailStr
    customer_phone: Optional[str] = None
    shipping_address: Optional[str] = None
    total_amount: float
    currency: str = "UGX"
    payment_method: Optional[str] = None

class Order(OrderBase):
    id: int
    order_number: str
    payment_reference: Optional[str] = None
    status: str
    created_at: datetime
    updated_at: Optional[datetime] = None
    
    class Config:
        from_attributes = True

class SiteUpdateBase(BaseModel):
    title: str
    message: str
    category: str = "news"
    link_url: Optional[str] = None
    link_label: Optional[str] = None
    image_url: Optional[str] = None
    show_in_marquee: bool = True
    is_published: bool = True
    priority: int = 0

class SiteUpdate(SiteUpdateBase):
    id: int
    published_at: Optional[datetime] = None
    created_at: datetime
    updated_at: Optional[datetime] = None

    class Config:
        from_attributes = True

class GalleryImageBase(BaseModel):
    title: str
    alt_text: Optional[str] = None
    image_url: str
    category: str = "Gallery"
    is_published: bool = True
    priority: int = 0

class GalleryImage(GalleryImageBase):
    id: int
    created_at: datetime
    updated_at: Optional[datetime] = None

    class Config:
        from_attributes = True

class PartnerBase(BaseModel):
    name: str
    description: Optional[str] = None
    logo_url: Optional[str] = None
    website_url: Optional[str] = None
    partner_type: str = "Corporate"
    is_published: bool = True
    priority: int = 0

class Partner(PartnerBase):
    id: int
    created_at: datetime
    updated_at: Optional[datetime] = None

    class Config:
        from_attributes = True

class LeadershipMemberBase(BaseModel):
    name: str
    role: str
    bio: Optional[str] = None
    photo_url: Optional[str] = None
    email: Optional[str] = None
    sort_order: int = 0
    is_published: bool = True

class LeadershipMember(LeadershipMemberBase):
    id: int
    created_at: datetime
    updated_at: Optional[datetime] = None

    class Config:
        from_attributes = True
