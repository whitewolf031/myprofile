name: Deploy Django + React

on:
  push:
    branches:
      - main

jobs:
  deploy:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Setup SSH
        uses: webfactory/ssh-agent@v0.9.0
        with:
          ssh-private-key: ${{ secrets.SSH_PRIVATE_KEY }}

      - name: Add server to known hosts
        run: |
          ssh-keyscan -H ${{ secrets.SSH_HOST }} >> ~/.ssh/known_hosts

      - name: Deploy to server
        run: |
          ssh ${{ secrets.SSH_USER }}@${{ secrets.SSH_HOST }} << 'EOF'

          cd /projects/myprofile

          echo "Pull latest code..."
          git pull origin main

          echo "Stopping containers..."
          docker compose down

          echo "Building containers..."
          docker compose up -d --build

          echo "Running migrations..."
          docker compose exec -T backend python manage.py migrate

          echo "Collecting static files..."
          docker compose exec -T backend python manage.py collectstatic --noinput

          echo "Deployment completed successfully 🚀"

          EOF