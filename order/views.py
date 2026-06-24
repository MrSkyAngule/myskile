from django.shortcuts import render, redirect, get_object_or_404
from .models import ServiceCart, Tag


def order(request):
    tag_slug = request.GET.get('tag')
    if tag_slug:
        tag = get_object_or_404(Tag, slug=tag_slug)
        card = ServiceCart.objects.filter(tags=tag)
    else:
        cards = ServiceCart.objects.all() # Иначе берем все
    tags = Tag.objects.all()

    return render(request, 'html/order.html', {'cards': cards, 'tags': tags, 'selected_tag': tag_slug})

def delete_card(request, card_id):
    if request.method == 'POST':
        card = get_object_or_404(ServiceCart, id=card_id)
        card.delete()
    return redirect('order')

def service_detail(request, card_id):
    card = get_object_or_404(ServiceCart, id=card_id)
    return render(request, 'html/detail_order.html', {'card': card})

