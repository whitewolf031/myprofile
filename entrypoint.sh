#!/bin/sh

python manage.py migrate --noinput

# Superuser yaratish (agar kerak bo‘lsa)
python manage.py createsuperuser \
  --noinput \
  --username admin \
  --email admin@example.com || true

# Django static fayllarini yig‘ish
python manage.py collectstatic --noinput

# Gunicorn orqali loyihani ishga tushirish
exec gunicorn config.wsgi:application --bind 0.0.0.0:$PORT
