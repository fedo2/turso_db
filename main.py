import libsql
import os
from dotenv import load_dotenv

load_dotenv(".env")
url = os.getenv("TURSO_DATABASE_URL")
auth_token = os.getenv("TURSO_AUTH_TOKEN")

conn = libsql.connect(url, auth_token=auth_token)
cur = conn.cursor()


conn.execute("DROP TABLE IF EXISTS users;")
conn.execute("CREATE TABLE IF NOT EXISTS users (name TEXT, email TEXT, age INTEGER);")
conn.execute("INSERT INTO users VALUES ('Alice', 'alice@example.com', 30);")
conn.execute("INSERT INTO users VALUES ('Bob', 'bob@example.com', 35);")
conn.execute("INSERT INTO users VALUES ('Charlie', 'charlie@example.com', 25);")

conn.commit()

print(conn.execute("SELECT * FROM users ORDER BY age").fetchall())