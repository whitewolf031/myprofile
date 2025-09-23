#!/bin/sh

python manage.py migrate --noinput

# Superuser mavjudligini tekshir
echo "from django.contrib.auth import get_user_model; \
User = get_user_model(); \
import os; \
username=os.getenv('DJANGO_SUPERUSER_USERNAME', 'admin'); \
email=os.getenv('DJANGO_SUPERUSER_EMAIL', 'admin@example.com'); \
password=os.getenv('DJANGO_SUPERUSER_PASSWORD', 'admin123'); \
\
if not User.objects.filter(username=username).exists(): \
    User.objects.create_superuser(username=username, email=email, password=password)" \
    | python manage.py shell

# Django serverni ishga tushirish
exec "$@"