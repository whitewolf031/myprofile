from django.contrib import admin
from .models.models import *
from .models.admin_models import *

admin.site.register(UsersInfo)
admin.site.register(DevInfo)
admin.site.register(Experience)
admin.site.register(Project)
