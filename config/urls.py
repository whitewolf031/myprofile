from django.contrib import admin
from django.urls import path, re_path, include
from rest_framework import permissions
from drf_yasg.views import get_schema_view
from drf_yasg import openapi
from myprofile.views.views import *

schema_view = get_schema_view(
   openapi.Info(
      title="My profile api",
      default_version='v1',
      description="API documentation for my profile",
      terms_of_service="https://www.google.com/policies/terms/",
      contact=openapi.Contact(email="youremail@example.com"),
      license=openapi.License(name="BSD License"),
   ),
   public=True,
   permission_classes=[permissions.AllowAny],
)

urlpatterns = [
   # admin url
   path('admin/', admin.site.urls),
   # profile url
   path('myprofile/', include('myprofile.urls')),
   
   # swagger
   re_path(r'^swagger(?P<format>\.json|\.yaml)$', schema_view.without_ui(cache_timeout=0), name='schema-json'),
   path('swagger/', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
   path('redoc/', schema_view.with_ui('redoc', cache_timeout=0), name='schema-redoc')
]
