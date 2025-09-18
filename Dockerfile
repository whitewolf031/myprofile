# Dockerfile
FROM python:3.11-slim

# System kutubxonalarni o‘rnatish (psycopg2 uchun kerak)
RUN apt-get update \
    && apt-get install -y --no-install-recommends gcc libpq-dev \
    && rm -rf /var/lib/apt/lists/*

# Ishchi katalog
WORKDIR /app

# Python sozlamalari
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

# pip yangilash va requirements o‘rnatish
COPY requirements.txt /app/
RUN pip install --upgrade pip
RUN pip install --no-cache-dir -r requirements.txt

# Loyihani konteynerga ko‘chirish
COPY . /app/

# Port ochish
EXPOSE 8000

# Django serverni ishga tushirish
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]
