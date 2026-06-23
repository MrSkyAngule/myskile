from django.shortcuts import render, redirect, get_object_or_404
from .models import ServiceCart


def order(request):
    cards = ServiceCart.objects.all()
    return render(request, 'html/order.html', {'cards': cards})

def delete_card(request, card_id):
    if request.method == 'POST':
        card = get_object_or_404(ServiceCart, id=card_id)
        card.delete()
    return redirect('order')