# J.J Valor Enterprises - Backend API

FastAPI backend for J.J Valor Enterprises website with PostgreSQL database.

## Setup Instructions

### Prerequisites
- Python 3.9+
- PostgreSQL 14+
- pip

### Installation

1. **Navigate to backend directory**
   ```bash
   cd backend
   ```

2. **Create virtual environment**
   ```bash
   python -m venv venv
   ```

3. **Activate virtual environment**
   
   On Windows:
   ```bash
   venv\Scripts\activate
   ```
   
   On Mac/Linux:
   ```bash
   source venv/bin/activate
   ```

4. **Install dependencies**
   ```bash
   pip install -r requirements.txt
   ```

5. **Configure environment variables**
   
   Copy `.env.example` to `.env`:
   ```bash
   copy .env.example .env
   ```
   
   Edit `.env` and update the database URL:
   ```
   DATABASE_URL=postgresql://username:password@localhost:5432/jj_valor_db
   SECRET_KEY=your-secret-key-here
   ALGORITHM=HS256
   ACCESS_TOKEN_EXPIRE_MINUTES=30
   ```

### Database Setup

1. **Create PostgreSQL database**
   ```sql
   CREATE DATABASE jj_valor_db;
   ```

2. **Run database migrations**
   ```bash
   alembic upgrade head
   ```

### Running the Server

1. **Start the development server**
   ```bash
   python main.py
   ```
   
   Or using uvicorn directly:
   ```bash
   uvicorn main:app --reload --host 0.0.0.0 --port 8000
   ```

2. **Access the API**
   - API: http://localhost:8000
   - API Documentation (Swagger): http://localhost:8000/docs
   - API Documentation (ReDoc): http://localhost:8000/redoc

## API Endpoints

### Projects
- `GET /api/projects/` - List all projects
- `GET /api/projects/{id}` - Get specific project
- `GET /api/projects/slug/{slug}` - Get project by slug
- `POST /api/projects/` - Create new project
- `PUT /api/projects/{id}` - Update project
- `DELETE /api/projects/{id}` - Delete project
- `POST /api/projects/{id}/upload-image` - Upload project image

### Donations
- `GET /api/donations/` - List all donations
- `GET /api/donations/{id}` - Get specific donation
- `POST /api/donations/` - Create new donation
- `PUT /api/donations/{id}/status` - Update donation status

### Contact
- `GET /api/contact/` - List all contact messages
- `GET /api/contact/{id}` - Get specific message
- `POST /api/contact/` - Create new contact message
- `PUT /api/contact/{id}/status` - Update message status

### Blog
- `GET /api/blog/` - List all blog posts
- `GET /api/blog/{id}` - Get specific post
- `GET /api/blog/slug/{slug}` - Get post by slug
- `POST /api/blog/` - Create new blog post
- `PUT /api/blog/{id}` - Update blog post
- `DELETE /api/blog/{id}` - Delete blog post
- `POST /api/blog/{id}/upload-image` - Upload blog image

### Jobs
- `GET /api/jobs/` - List all job listings
- `GET /api/jobs/{id}` - Get specific job
- `GET /api/jobs/slug/{slug}` - Get job by slug
- `POST /api/jobs/` - Create new job listing
- `PUT /api/jobs/{id}` - Update job listing
- `DELETE /api/jobs/{id}` - Delete job listing

### Products
- `GET /api/products/` - List all products
- `GET /api/products/{id}` - Get specific product
- `GET /api/products/slug/{slug}` - Get product by slug
- `POST /api/products/` - Create new product
- `PUT /api/products/{id}` - Update product
- `DELETE /api/products/{id}` - Delete product
- `POST /api/products/{id}/upload-images` - Upload product images

### Volunteers
- `GET /api/volunteers/` - List all volunteers
- `GET /api/volunteers/{id}` - Get specific volunteer
- `POST /api/volunteers/` - Create new volunteer application
- `PUT /api/volunteers/{id}/status` - Update volunteer status

### Orders
- `GET /api/orders/` - List all orders
- `GET /api/orders/{id}` - Get specific order
- `GET /api/orders/number/{order_number}` - Get order by order number
- `POST /api/orders/` - Create new order
- `PUT /api/orders/{id}/status` - Update order status

## Static Files

Uploaded files are served from `/public/uploads/` and accessible at:
- `http://localhost:8000/uploads/...`

## Database Models

- **User** - User accounts and authentication
- **Category** - Project categories
- **Project** - Projects and portfolio items
- **Donation** - Donation records
- **Volunteer** - Volunteer applications
- **BlogPost** - Blog posts
- **ContactMessage** - Contact form messages
- **JobListing** - Job listings
- **Product** - Marketplace products
- **Order** - Customer orders

## Development

### Creating New Migrations
```bash
alembic revision --autogenerate -m "description"
```

### Running Migrations
```bash
alembic upgrade head
```

### Rolling Back Migrations
```bash
alembic downgrade -1
```

## CORS Configuration

The API is configured to accept requests from:
- http://localhost:3000
- http://localhost:3001

Update the CORS origins in `main.py` for production.
