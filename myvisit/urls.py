from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('hokliksnjkkslnknnkn/', admin.site.urls),
    path('', include('main.urls')),
    path('orders', include('order.urls')),
]
