from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import DevAdminInfoControl, DevAdminExperienceControl, DevAdminProjectControl

router = DefaultRouter()
router.register(r'admin-control/dev', DevAdminInfoControl, basename="admin-dev")
router.register(r'admin-control/experience', DevAdminExperienceControl, basename="admin-experience")
router.register(r'admin-control/projects', DevAdminProjectControl, basename="admin-projects")

urlpatterns = [
    path('', include(router.urls))
]