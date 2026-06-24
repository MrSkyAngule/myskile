from django.shortcuts import render, redirect, get_object_or_404
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
    return render(request, 'html/detail_order.html', {'card': card})

