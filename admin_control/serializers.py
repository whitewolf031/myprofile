from rest_framework import serializers
from .models import *

class DevInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = DevInfo
        fields = "__all__"


class DevExperienceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Experience
        fields = "__all__"


class DevProjectSerializer(serializers.ModelSerializer):
    technologies = serializers.ListField(
        child=serializers.ChoiceField(choices=Project.TECHNOLOGY_CHOICES)
    )

    class Meta:
        model = Project
        fields = "__all__"