from rest_framework import generics
from rest_framework.permissions import AllowAny
from myprofile.models import UsersInfo
from myprofile.serializers import ContactSerializer
from admin_control.models import (DevInfo, Experience, Project)
from admin_control.serializers import (DevInfoSerializer, DevExperienceSerializer, DevProjectSerializer)
from drf_spectacular.utils import extend_schema
import os
import telebot
from dotenv import load_dotenv

load_dotenv()

def send_telegram_message(message):
    bot_token = os.getenv("TELEGRAM_BOT_TOKEN")
    chat_id = os.getenv("TELEGRAM_CHAT_ID")
    bot = telebot.TeleBot(bot_token)
    bot.send_message(chat_id, message)

#---------------------------CRUD----------------------------

@extend_schema(tags=['User'])
class UserDevInfoListView(generics.ListAPIView):
    queryset = DevInfo.objects.all()
    serializer_class = DevInfoSerializer
    permission_classes = [AllowAny]

@extend_schema(tags=['User'])
class UserDevExperienceListView(generics.ListAPIView):
    queryset = Experience.objects.all()
    serializer_class = DevExperienceSerializer
    permission_classes = [AllowAny]

@extend_schema(tags=['User'])
class UserDevProjectListView(generics.ListAPIView):
    queryset = Project.objects.all()
    serializer_class = DevProjectSerializer
    permission_classes = [AllowAny]

@extend_schema(tags=['User'])
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