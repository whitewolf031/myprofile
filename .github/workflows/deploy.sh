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
          ssh-keyscan -p ${{ secrets.SSH_PORT }} -H ${{ secrets.SSH_HOST }} >> ~/.ssh/known_hosts

      - name: Deploy to server
        run: |
          ssh -p ${{ secrets.SSH_PORT }} \
            ${{ secrets.SSH_USER }}@${{ secrets.SSH_HOST }} << 'EOF'

          cd /var/www/myprofile

          echo "Pull latest code..."
          git pull origin main

          echo "Stopping containers..."
          docker-compose down

          echo "Building and starting..."
          docker-compose up -d --build

          echo "Migration running..."
          docker-compose exec -T backend python manage.py migrate

          echo "Collect static..."
          docker-compose exec -T backend python manage.py collectstatic --noinput

          echo "Done 🚀"

          EOF