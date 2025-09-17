from rest_framework import serializers
from .models import *

class ContactSerializer(serializers.ModelSerializer):
    class Meta:
        model = UsersInfo
        fields = ['full_name', 'email', 'phone', 'subject', 'message']