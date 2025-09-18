# Dockerfile
FROM python:3.11-slim

# Ishchi katalogni yaratish va belgilash
RUN mkdir /app
WORKDIR /app

# Python sozlamalari: bytecode yozilishini o‘chirish, stdout’ni bufferdan to‘xtatish
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

# pip va bog‘liqlarni o‘rnatish
RUN pip install --upgrade pip
COPY requirements.txt /app/
RUN pip install --no-cache-dir -r requirements.txt

# Django loyihasini konteynerga nusxalash
COPY . /app/

# Django server portini ochish
EXPOSE 8000

# Django serverini ishga tushirish
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]
