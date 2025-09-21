from rest_framework import serializers
from .models.models import *
from .models.admin_models import *

class ContactSerializer(serializers.ModelSerializer):
    class Meta:
        model = UsersInfo
        fields = ['name', 'email', 'message']

class AdminSerializer(serializers.ModelSerializer):
    class Meta:
        model = DevInfo
        fields = "__all__"


class AdminExperienceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Experience
        fields = "__all__"


class AdminProjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Project
        fields = "__all__"
