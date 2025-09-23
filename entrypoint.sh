#!/bin/sh

# Kod ichida error bo'lsa script to'xtasin
set -e

echo "📌 Applying makemigrations..."
python manage.py makemigrations --noinput

echo "📌 Applying migrate..."
python manage.py migrate --noinput

echo "📌 Creating superuser if not exists..."
python manage.py shell << EOF
from django.contrib.auth import get_user_model
import os

User = get_user_model()

username = os.getenv("DJANGO_SUPERUSER_USERNAME", "admin")
email = os.getenv("DJANGO_SUPERUSER_EMAIL", "admin@example.com")
password = os.getenv("DJANGO_SUPERUSER_PASSWORD", "admin123")

if not User.objects.filter(username=username).exists():
    User.objects.create_superuser(username=username, email=email, password=password)
    print(f"✅ Superuser {username} created.")
else:
    print(f"ℹ️ Superuser {username} already exists.")
EOF

# Oxirida serverni ishga tushirish (CMD'dan kelgan komandani oladi)
exec "$@"
