from django.db import models

class Tag(models.Model):
    name = models.CharField(max_length=50, unique=True, verbose_name='Название')
    slug = models.SlugField(max_length=50, unique=True, verbose_name='Слуг (для ссылки)')
    show_in_menu = models.BooleanField(default=True, verbose_name="Показывать как вкладку в меню")

    def __str__(self):
        return self.name

class ServiceCart(models.Model):
    title = models.CharField(max_length=100, verbose_name='Название услуги')
    description = models.TextField(verbose_name='Мини описание', default='')
    full_description = models.TextField(verbose_name='Полное описание', default='')
    use_case = models.TextField(verbose_name='для чего используется сайт', default='')
    price = models.CharField(max_length=50, verbose_name='Цена')
    created_at = models.DateTimeField(auto_now_add=True, verbose_name='Дата создания')

    tags = models.ManyToManyField(Tag, blank=True, related_name='tags', verbose_name='Теги')

    def Meta(self):
        verbose_name = 'Услуга'
        verbose_name_plural = 'Услуги'
        ordering = ['-created_at']

    def __str__(self):
        return self.title