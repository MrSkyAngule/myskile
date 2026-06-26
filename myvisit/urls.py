from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('dfoshkjsbgildbfindfaijvn/', admin.site.urls),
    path('', include('main.urls')),
]
