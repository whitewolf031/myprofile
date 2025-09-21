from django.shortcuts import render
from rest_framework import generics
from rest_framework.permissions import AllowAny, IsAdminUser
from ..models.models import UsersInfo
from ..serializers import ContactSerializer
import os
import telebot
from dotenv import load_dotenv
from rest_framework import viewsets

load_dotenv()

def send_telegram_message(message):
    bot_token = os.getenv("TELEGRAM_BOT_TOKEN")
    chat_id = os.getenv("TELEGRAM_CHAT_ID")
    bot = telebot.TeleBot(bot_token)
    bot.send_message(chat_id, message)

#---------------------------CRUD----------------------------

class ContactCreateView(generics.CreateAPIView):
    queryset = UsersInfo.objects.all()
    serializer_class = ContactSerializer
    permission_classes = [AllowAny]

    def perform_create(self, serializer):
        instance = serializer.save()
        data = instance.created_at
        date = str(data)[0:10]
        time = str(data)[11:19]
        message = f"Contact ({date}/{time}): \nName: {instance.name}\nEmail: {instance.email}\nmessage: {instance.message}"
        return send_telegram_message(message)