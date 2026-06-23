from django.urls import path
from . import views


urlpatterns = [
    path('', views.order, name='order'),
    path('order/delete/<int:card_id>/', views.delete_card, name='delete_card'),
]