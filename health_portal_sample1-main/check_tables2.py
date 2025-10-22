import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'health_portal.settings')
django.setup()

from django.db import connection

cursor = connection.cursor()
cursor.execute('SELECT name FROM sqlite_master WHERE type="table" AND name LIKE "appointments_%"')
tables = [row[0] for row in cursor.fetchall()]
print('Appointments tables:', tables)
for table in tables:
    cursor.execute(f'PRAGMA table_info({table})')
    columns = cursor.fetchall()
    print(f'{table} columns: {[col[1] for col in columns]}')
