from sqlalchemy import inspect, text

from database import engine


def run_migrations() -> None:
    inspector = inspect(engine)
    tables = inspector.get_table_names()

    if "site_updates" in tables:
        columns = {column["name"] for column in inspector.get_columns("site_updates")}
        if "image_url" not in columns:
            with engine.begin() as conn:
                conn.execute(text("ALTER TABLE site_updates ADD COLUMN image_url VARCHAR"))

    if "users" in tables:
        columns = {column["name"] for column in inspector.get_columns("users")}
        with engine.begin() as conn:
            if "can_manage_content" not in columns:
                conn.execute(text("ALTER TABLE users ADD COLUMN can_manage_content BOOLEAN DEFAULT FALSE"))
            if "can_manage_users" not in columns:
                conn.execute(text("ALTER TABLE users ADD COLUMN can_manage_users BOOLEAN DEFAULT FALSE"))
            if "can_view_analytics" not in columns:
                conn.execute(text("ALTER TABLE users ADD COLUMN can_view_analytics BOOLEAN DEFAULT FALSE"))
            
            # Update admin email to jonvalors@gmail.com
            conn.execute(text("UPDATE users SET email = 'jonvalors@gmail.com' WHERE username = 'admin'"))
            # Ensure admin has full privileges
            conn.execute(text("UPDATE users SET can_manage_content = TRUE, can_manage_users = TRUE, can_view_analytics = TRUE WHERE username = 'admin'"))
