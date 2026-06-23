from django.db import models

class ServiceCart(models.Model):
    title = models.CharField(max_length=100, verbose_name='Название услуги')
    description = models.TextField(verbose_name='Мини описание')
    price = models.CharField(max_length=50, verbose_name='Цена')
    created_at = models.DateTimeField(auto_now_add=True, verbose_name='Дата создания')

    def Meta(self):
        verbose_name = 'Услуга'
        verbose_name_plural = 'Услуги'
        ordering = ['-created_at']

    def __str__(self):
        return self.title