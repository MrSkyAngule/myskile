from django.shortcuts import render

def order(request):
    return render(request, 'html/order.html')