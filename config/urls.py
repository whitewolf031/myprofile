from django.contrib import admin
from django.urls import path, re_path, include
from rest_framework import permissions
from drf_yasg.views import get_schema_view
from drf_yasg import openapi
from django.conf import settings
from ..myprofile.views.views import *

schema_view = get_schema_view(
    openapi.Info(
        title="MyProfile API",
        default_version='v1',
    ),
    public=True,
    permission_classes=(permissions.AllowAny,),
    url="https://myprofile-production-5001.up.railway.app/uz/",  # 👈 locale qo‘shildi
)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('myprofile/', include('myprofile.urls')),
    path('contact/create/', ContactCreateView.as_view(), name='contact-create'),

    re_path(r'^swagger(?P<format>\.json|\.yaml)$', schema_view.without_ui(cache_timeout=0), name='schema-json'),
    path('swagger/', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
    path('redoc/', schema_view.with_ui('redoc', cache_timeout=0), name='schema-redoc'),
]
