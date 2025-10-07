from django.contrib.auth.models import User
from django.db import models


class UserProfile(models.Model):
    ROLE_CHOICES = (
        ('admin', 'Admin'),
        ('controller', 'Traffic Controller'),
        ('traffic', 'Traffic Officer'),
    )

    user = models.OneToOneField(User, on_delete=models.CASCADE)
    role = models.CharField(max_length=20, choices=ROLE_CHOICES, default='traffic')
    area = models.CharField(max_length=100, blank=True, null=True)
    phone_number = models.CharField(max_length=20, blank=True, null=True)

    def is_admin(self):
        return self.role == 'admin'

    def is_controller(self):
        return self.role == 'controller'

    def is_traffic_officer(self):
        return self.role == 'traffic'

    def __str__(self):
        return f"{self.user.username} - {self.role}"