FROM python:3.11-slim

# System kutubxonalarni o‘rnatish
RUN apt-get update \
    && apt-get install -y --no-install-recommends gcc libpq-dev \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

COPY requirements.txt /app/
RUN pip install --upgrade pip
RUN pip install --no-cache-dir -r requirements.txt

COPY . /app/

# entrypoint.sh faylini nusxalash va ruxsat berish
COPY entrypoint.sh /app/
RUN chmod +x /app/entrypoint.sh

EXPOSE 8000

# entrypoint orqali migrate va createsuperuser bajariladi
ENTRYPOINT ["/app/entrypoint.sh"]

# Django serverni ishga tushirish
ENV PORT=8000
CMD ["sh", "-c", "gunicorn config.wsgi:application --bind 0.0.0.0:$PORT"]
