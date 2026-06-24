from django.urls import path
from . import views


urlpatterns = [
    path('', views.order, name='order'),
    path('/detail/<int:card_id>', views.service_detail, name='service_detail'),

]