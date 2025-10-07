from django.contrib import admin
from django.urls import path, include
from django.views.generic import TemplateView
from rest_framework import permissions
from drf_yasg.views import get_schema_view
from drf_yasg import openapi


# Web interface views
def login_view(request):
    return TemplateView.as_view(template_name='auth/login.html')(request)


def officer_dashboard(request):
    return TemplateView.as_view(template_name='officer/dashboard.html')(request)


def controller_dashboard(request):
    return TemplateView.as_view(template_name='controller/dashboard.html')(request)


schema_view = get_schema_view(
    openapi.Info(
        title="Traveler Voice API",
        default_version='v1',
        description="API for reporting transportation issues",
    ),
    public=True,
    permission_classes=(permissions.AllowAny,),
)

urlpatterns = [
    path('', TemplateView.as_view(template_name='auth/login.html'), name='home'),
    path('admin/', admin.site.urls),

    # Web interface URLs
    path('auth/login/', login_view, name='web-login'),
    path('officer/dashboard/', officer_dashboard, name='officer-dashboard'),
    path('controller/dashboard/', controller_dashboard, name='controller-dashboard'),

    # API URLs
    path('api/auth/', include('apps.users.urls')),
    path('api/reports/', include('apps.reports.urls')),
    path('api/docs/', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
]