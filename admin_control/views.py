from .models import *
from .serializers import *
from rest_framework.permissions import IsAdminUser
from rest_framework import viewsets
from drf_spectacular.utils import extend_schema

@extend_schema(tags=['Admin Info Control'])
class DevAdminInfoControl(viewsets.ModelViewSet):
    queryset = DevInfo.objects.all()
    serializer_class = DevInfoSerializer
    permission_classes = [IsAdminUser]

@extend_schema(tags=['Admin Experience Control'])
class DevAdminExperienceControl(viewsets.ModelViewSet):
    queryset = Experience.objects.all()
    serializer_class = DevExperienceSerializer
    permission_classes = [IsAdminUser]

@extend_schema(tags=['Admin Project Control'])
class DevAdminProjectControl(viewsets.ModelViewSet):
    queryset = Project.objects.all()
    serializer_class = DevProjectSerializer
    permission_classes = [IsAdminUser]