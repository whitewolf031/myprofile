#!/bin/sh

# Migrate qilish
python manage.py migrate --noinput

# Agar superuser mavjud bo‘lmasa — yaratib qo‘yish
python manage.py createsuperuser \
  --noinput \
  --username admin \
  --email admin@example.com || true \
  --password admin1234

# Django serverni ishga tushirish
exec "$@"