from django.contrib import admin
from django.urls import path, re_path, include
from rest_framework import permissions
from drf_yasg.views import get_schema_view
from drf_yasg import openapi
from django.conf import settings

schema_view = get_schema_view(
    openapi.Info(
        title="MyProfile API",
        default_version='v1',
    ),
    public=True,
    permission_classes=(permissions.AllowAny,),
    url=getattr(settings, "SWAGGER_API_URL", "http://127.0.0.1:8000/uz/"),  # 👈 env orqali boshqariladi
)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('myprofile/', include('myprofile.urls')),

    re_path(r'^swagger(?P<format>\.json|\.yaml)$', schema_view.without_ui(cache_timeout=0), name='schema-json'),
    path('swagger/', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
    path('redoc/', schema_view.with_ui('redoc', cache_timeout=0), name='schema-redoc'),
]
