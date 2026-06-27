from sqlalchemy import Column, Integer, String, Text, Boolean, DateTime, Float, ForeignKey, Table
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from database import Base

# Many-to-many relationship for projects and categories
project_categories = Table(
    'project_categories',
    Base.metadata,
    Column('project_id', Integer, ForeignKey('projects.id'), primary_key=True),
    Column('category_id', Integer, ForeignKey('categories.id'), primary_key=True)
)

class User(Base):
    __tablename__ = "users"
    
    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True, nullable=False)
    username = Column(String, unique=True, index=True, nullable=False)
    hashed_password = Column(String, nullable=False)
    full_name = Column(String)
    is_active = Column(Boolean, default=True)
    is_admin = Column(Boolean, default=False)
    can_manage_content = Column(Boolean, default=False)
    can_manage_users = Column(Boolean, default=False)
    can_view_analytics = Column(Boolean, default=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())

class Category(Base):
    __tablename__ = "categories"
    
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, unique=True, index=True, nullable=False)
    slug = Column(String, unique=True, index=True, nullable=False)
    description = Column(Text)
    icon = Column(String)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    projects = relationship("Project", secondary=project_categories, back_populates="categories")

class Project(Base):
    __tablename__ = "projects"
    
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, index=True, nullable=False)
    slug = Column(String, unique=True, index=True, nullable=False)
    description = Column(Text)
    content = Column(Text)
    image_url = Column(String)
    thumbnail_url = Column(String)
    status = Column(String, default="active")  # active, completed, upcoming
    featured = Column(Boolean, default=False)
    start_date = Column(DateTime)
    end_date = Column(DateTime)
    budget = Column(Float)
    progress = Column(Integer, default=0)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    
    categories = relationship("Category", secondary=project_categories, back_populates="projects")

class Donation(Base):
    __tablename__ = "donations"
    
    id = Column(Integer, primary_key=True, index=True)
    donor_name = Column(String)
    donor_email = Column(String)
    donor_phone = Column(String)
    amount = Column(Float, nullable=False)
    currency = Column(String, default="UGX")
    payment_method = Column(String)
    payment_reference = Column(String, unique=True)
    status = Column(String, default="pending")  # pending, completed, failed
    message = Column(Text)
    is_recurring = Column(Boolean, default=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

class Volunteer(Base):
    __tablename__ = "volunteers"
    
    id = Column(Integer, primary_key=True, index=True)
    full_name = Column(String, nullable=False)
    email = Column(String, nullable=False)
    phone = Column(String)
    skills = Column(Text)
    availability = Column(String)
    message = Column(Text)
    status = Column(String, default="pending")  # pending, approved, rejected
    created_at = Column(DateTime(timezone=True), server_default=func.now())

class BlogPost(Base):
    __tablename__ = "blog_posts"
    
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, index=True, nullable=False)
    slug = Column(String, unique=True, index=True, nullable=False)
    excerpt = Column(Text)
    content = Column(Text, nullable=False)
    featured_image = Column(String)
    author_id = Column(Integer, ForeignKey("users.id"))
    category = Column(String)
    tags = Column(String)
    published = Column(Boolean, default=False)
    published_at = Column(DateTime)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())

class ContactMessage(Base):
    __tablename__ = "contact_messages"
    
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    email = Column(String, nullable=False)
    phone = Column(String)
    subject = Column(String)
    message = Column(Text, nullable=False)
    status = Column(String, default="new")  # new, read, responded
    created_at = Column(DateTime(timezone=True), server_default=func.now())

class JobListing(Base):
    __tablename__ = "job_listings"
    
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, index=True, nullable=False)
    slug = Column(String, unique=True, index=True, nullable=False)
    description = Column(Text, nullable=False)
    requirements = Column(Text)
    responsibilities = Column(Text)
    location = Column(String)
    employment_type = Column(String)  # full-time, part-time, contract, internship
    salary_range = Column(String)
    status = Column(String, default="open")  # open, closed, filled
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())

class Product(Base):
    __tablename__ = "products"
    
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True, nullable=False)
    slug = Column(String, unique=True, index=True, nullable=False)
    description = Column(Text)
    price = Column(Float, nullable=False)
    currency = Column(String, default="UGX")
    stock_quantity = Column(Integer, default=0)
    category = Column(String)
    images = Column(String)  # JSON array of image URLs
    featured = Column(Boolean, default=False)
    status = Column(String, default="active")  # active, inactive
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())

class Order(Base):
    __tablename__ = "orders"
    
    id = Column(Integer, primary_key=True, index=True)
    order_number = Column(String, unique=True, index=True)
    customer_name = Column(String, nullable=False)
    customer_email = Column(String, nullable=False)
    customer_phone = Column(String)
    shipping_address = Column(Text)
    total_amount = Column(Float, nullable=False)
    currency = Column(String, default="UGX")
    payment_method = Column(String)
    payment_reference = Column(String, unique=True)
    status = Column(String, default="pending")  # pending, processing, shipped, delivered, cancelled
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())

class SiteUpdate(Base):
    __tablename__ = "site_updates"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, nullable=False)
    message = Column(Text, nullable=False)
    category = Column(String, default="news")  # program, news, event, announcement, milestone
    link_url = Column(String)
    link_label = Column(String)
    image_url = Column(String)
    show_in_marquee = Column(Boolean, default=True)
    is_published = Column(Boolean, default=True)
    priority = Column(Integer, default=0)
    published_at = Column(DateTime(timezone=True), server_default=func.now())
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())

class GalleryImage(Base):
    __tablename__ = "gallery_images"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, nullable=False)
    alt_text = Column(String)
    image_url = Column(String, nullable=False)
    category = Column(String, default="Gallery")
    is_published = Column(Boolean, default=True)
    priority = Column(Integer, default=0)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())

class Partner(Base):
    __tablename__ = "partners"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    description = Column(Text)
    logo_url = Column(String)
    website_url = Column(String)
    partner_type = Column(String, default="Corporate")
    is_published = Column(Boolean, default=True)
    priority = Column(Integer, default=0)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())

class LeadershipMember(Base):
    __tablename__ = "leadership_members"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    role = Column(String, nullable=False)
    bio = Column(Text)
    photo_url = Column(String)
    email = Column(String)
    sort_order = Column(Integer, default=0)
    is_published = Column(Boolean, default=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
