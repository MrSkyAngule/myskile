from django.contrib import admin
from .models import Tag, ServiceCart

@admin.register(ServiceCart)
class ServiceCartAdmin(admin.ModelAdmin):
    list_display = ('title', 'price', 'created_at')
    search_fields = ('title', 'description')

@admin.register(Tag)
class TagAdmin(admin.ModelAdmin):
    prepopulated_fields = {'slug': ('name',)}
    list_display = ('name', 'slug')
    list_editable = ('show_in_menu',)
