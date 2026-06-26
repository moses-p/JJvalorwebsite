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
