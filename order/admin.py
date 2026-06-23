from django.contrib import admin
from .models import ServiceCart

@admin.register(ServiceCart)
class ServiceCartAdmin(admin.ModelAdmin):
    list_display = ('title', 'price', 'created_at')
    search_fields = ('title', 'description')