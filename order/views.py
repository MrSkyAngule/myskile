from django.shortcuts import render, redirect, get_object_or_404
from django.core.mail import send_mail
from django.contrib import messages
from .models import ServiceCart, Tag


def order(request):
    tags = Tag.objects.filter(show_in_menu=True)
    tag_slug = request.GET.get('tag')

    if tag_slug:
        try:
            active_tag = Tag.objects.get(slug=tag_slug)
            cards = ServiceCart.objects.filter(tags=active_tag)
        except Tag.DoesNotExist:
            cards = ServiceCart.objects.none()
    else:
        first_tag = tags.first()
        if first_tag:
            cards = ServiceCart.objects.filter(tags=first_tag)
            tag_slug = first_tag.slug
        else:
            cards = ServiceCart.objects.all()

    return render(request, 'html/order.html', {
        'cards': cards,
        'tags': tags,
        'selected_tag': tag_slug
    })

def delete_card(request, card_id):
    if request.method == 'POST':
        card = get_object_or_404(ServiceCart, id=card_id)
        card.delete()
    return redirect('order')

def service_detail(request, card_id):
    card = get_object_or_404(ServiceCart, id=card_id)

    # Обработка отправки формы
    if request.method == 'POST':
        # Проверяем, авторизован ли пользователь (дополнительная защита)
        if not request.user.is_authenticated:
            return redirect('login')  # перенаправляем на вход, если обошел форму

        # Формируем текст письма
        subject = f"Заявка на услугу: {card.title}"
        message = (
            f"Пользователь {request.user.username} (Email: {request.user.email}) "
            f"оставил заявку на услугу '{card.title}' (Цена: {card.price} руб.)."
        )
        recipient_list = ['your-private-email@yandex.ru']  # Куда ВАМ должно прийти уведомление

        try:
            # Отправляем письмо
            send_mail(subject, message, None, recipient_list)
            messages.success(request, "Заявка успешно отправлена! Мы свяжемся с вами по email.")
        except Exception:
            messages.error(request, "Ошибка отправки заявки. Попробуйте позже.")

        return redirect('service_detail', card_id=card.id)

    return render(request, 'html/detail_order.html', {'card': card})


