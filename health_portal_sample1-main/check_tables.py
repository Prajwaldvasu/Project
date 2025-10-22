import os
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'health_portal.settings')
import django
django.setup()

from django.db import connection

cursor = connection.cursor()
cursor.execute('SELECT name FROM sqlite_master WHERE type="table" AND name LIKE "appointments_%"')
tables = [row[0] for row in cursor.fetchall()]
print('Tables in DB:', tables)
