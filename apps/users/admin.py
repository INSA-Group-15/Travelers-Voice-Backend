from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from django.contrib.auth.models import User
from .models import UserProfile


# Create an inline admin for UserProfile
class UserProfileInline(admin.StackedInline):
    model = UserProfile
    can_delete = False
    verbose_name_plural = 'Profile'


# Extend the default UserAdmin
class CustomUserAdmin(UserAdmin):
    inlines = (UserProfileInline,)
    list_display = ('username', 'email', 'get_role', 'get_area', 'is_staff')

    def get_role(self, obj):
        return obj.userprofile.role

    get_role.short_description = 'Role'

    def get_area(self, obj):
        return obj.userprofile.area

    get_area.short_description = 'Area'


# Re-register UserAdmin
admin.site.unregister(User)
admin.site.register(User, CustomUserAdmin)


@admin.register(UserProfile)
class UserProfileAdmin(admin.ModelAdmin):
    list_display = ('user', 'role', 'area', 'phone_number')
    list_filter = ('role', 'area')