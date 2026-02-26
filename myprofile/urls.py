from django.urls import path, include
from .views import UserDevInfoListView, UserDevExperienceListView, UserDevProjectListView

urlpatterns = [
    path("dev/info/", UserDevInfoListView.as_view(), name="dev-info"),
    path("dev/experience/", UserDevExperienceListView.as_view(), name="dev-experience"),
    path("dev/projects/", UserDevProjectListView.as_view(), name="dev-projects"),
]