from rest_framework import permissions
from .models import UserProfile

class IsAdmin(permissions.BasePermission):
    def has_permission(self, request, view):
        if not request.user.is_authenticated:
            return False
        try:
            return request.user.userprofile.is_admin()
        except UserProfile.DoesNotExist:
            return False

class IsController(permissions.BasePermission):
    def has_permission(self, request, view):
        if not request.user.is_authenticated:
            return False
        try:
            profile = request.user.userprofile
            return profile.is_controller() or profile.is_admin()
        except UserProfile.DoesNotExist:
            return False

class IsTrafficOfficer(permissions.BasePermission):
    def has_permission(self, request, view):
        if not request.user.is_authenticated:
            return False
        try:
            profile = request.user.userprofile
            return (profile.is_traffic_officer() or
                   profile.is_controller() or
                   profile.is_admin())
        except UserProfile.DoesNotExist:
            return False