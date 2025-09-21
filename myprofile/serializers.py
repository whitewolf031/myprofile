from rest_framework import serializers
from .models import models, admin_models


class ContactSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.UsersInfo
        fields = ['name', 'email', 'message']



class AdminSerializer(serializers.ModelSerializer):
    class Meta:
        model = admin_models.DevInfo
        fields = "__all__"


class AdminExperienceSerializer(serializers.ModelSerializer):
    class Meta:
        model = admin_models.Experience
        fields = "__all__"


class AdminProjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = admin_models.Project
        fields = "__all__"
