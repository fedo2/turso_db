import libsql
import os
from dotenv import load_dotenv

load_dotenv(".env")
url = os.getenv("TURSO_DATABASE_URL")
auth_token = os.getenv("TURSO_AUTH_TOKEN")

conn = libsql.connect(url, auth_token=auth_token)
cur = conn.cursor()


conn.execute("DROP TABLE IF EXISTS users;")
conn.execute("CREATE TABLE IF NOT EXISTS users (name TEXT);")
conn.execute("INSERT INTO users VALUES ('Alice');")
conn.execute("INSERT INTO users VALUES ('Bob');")
conn.execute("INSERT INTO users VALUES ('Charlie');")

conn.commit()

result = conn.execute("select * from users").fetchall()
conn.close()

print(result)
