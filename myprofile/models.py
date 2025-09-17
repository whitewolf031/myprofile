from django.db import models

class DevInfo(models.Model):
    full_name = models.CharField(max_length=255)
    stack = models.CharField(max_length=255)
    experience = models.IntegerField()
    about = models.TextField()
    email = models.EmailField(max_length=255)
    phone = models.CharField(max_length=50)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.full_name
    
class UsersInfo(models.Model):
    full_name = models.CharField(max_length=255)
    email = models.EmailField(max_length=255)
    phone = models.CharField(max_length=50)
    subject = models.CharField(max_length=255)
    message = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.full_name} subject {self.subject}"