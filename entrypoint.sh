#!/bin/sh

# Migrate qilish
python manage.py migrate --noinput

# Superuser yaratish (env dan olish)
python manage.py shell << EOF
from django.contrib.auth import get_user_model
import os

User = get_user_model()

username = os.getenv("DJANGO_SUPERUSER_USERNAME", "admin")
email = os.getenv("DJANGO_SUPERUSER_EMAIL", "admin@example.com")
password = os.getenv("DJANGO_SUPERUSER_PASSWORD", "admin123")

if not User.objects.filter(username=username).exists():
    User.objects.create_superuser(username=username, email=email, password=password)
    print(f"Superuser {username} created.")
else:
    print(f"Superuser {username} already exists.")
EOF

# Django serverni ishga tushirish (gunicorn yoki runserver)
exec "$@"
