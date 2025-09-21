from django.shortcuts import render
from rest_framework import generics
from ..models.admin_models import *
from ..serializers import *
from rest_framework import viewsets
from ..permissons import IsAdminUserOrReadOnly

class DevAdminControl(viewsets.ModelViewSet):
    queryset = DevInfo.objects.all()
    serializer_class = AdminSerializer
    permission_classes = [IsAdminUserOrReadOnly]

class DevAdminExperienceControl(viewsets.ModelViewSet):
    queryset = Experience.objects.all()
    serializer_class = AdminExperienceSerializer
    permission_classes = [IsAdminUserOrReadOnly]

class DevAdminProjectControl(viewsets.ModelViewSet):
    queryset = Project.objects.all()
    serializer_class = AdminProjectSerializer
    permission_classes = [IsAdminUserOrReadOnly]