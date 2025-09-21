from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views.admin_views import *

router = DefaultRouter()
router.register(r'admin-control/dev', DevAdminControl, basename="admin-dev")
router.register(r'admin-control/experience', DevAdminExperienceControl, basename="admin-experience")
router.register(r'admin-control/projects', DevAdminProjectControl, basename="admin-projects")

urlpatterns = [
    path('', include(router.urls))
]