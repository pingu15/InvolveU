from rest_framework import viewsets

from .serializers import UserSerializer, EventSerializer, ItemSerializer, LastWinnerSerializer
from accounts.models import User
from models.models import Event, Item, LastWinner

from django.core.exceptions import PermissionDenied
from django.shortcuts import render

from rest_framework.response import Response
from rest_framework.decorators import api_view

from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView

import random

from django.core import mail
from django.template.loader import render_to_string
from django.utils.html import strip_tags
from django.conf import settings

from datetime import datetime


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer


class EventViewSet(viewsets.ModelViewSet):
    queryset = Event.objects.all()
    serializer_class = EventSerializer


class ItemViewSet(viewsets.ModelViewSet):
    queryset = Item.objects.all()
    serializer_class = ItemSerializer


class LastWinnerViewSet(viewsets.ModelViewSet):
    queryset = LastWinner.objects.all()
    serializer_class = LastWinnerSerializer


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Add custom claims
        token['username'] = user.username
        # ...

        return token


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


@api_view(['GET'])
def getRoutes(request):
    routes = [
        'token/',
        'token/refresh'
    ]
    return Response(routes)


def days_between(d1, d2):
    d1 = datetime.strptime(d1, "%Y-%m-%d")
    d2 = datetime.strptime(d2, "%Y-%m-%d")
    return abs((d2 - d1).days)


def winners_view(request):
    if not request.user.is_authenticated or (not request.user.is_staff):
        raise PermissionDenied
    context = {}
    if len(LastWinner.objects.all()) > 0:
        context['date'] = days_between(LastWinner.objects.all()[
                                       0].date, datetime.now())
    else:
        context['date'] = 0
    if request.method == "POST":
        winners = []
        gr12 = User.objects.all().filter(grade=12)
        gr11 = User.objects.all().filter(grade=11)
        gr10 = User.objects.all().filter(grade=10)
        gr9 = User.objects.all().filter(grade=9)
        all = User.objects.all()
        if len(gr12) > 0:
            winners.append(random.choice(gr12))
        if len(gr11) > 0:
            winners.append(random.choice(gr11))
        if len(gr10) > 0:
            winners.append(random.choice(gr10))
        if len(gr9) > 0:
            winners.append(random.choice(gr9))
        if len(all) > 0:
            winners.append(random.choice(all))
        for winner in winners:
            subject = 'InvolveU Quarterly Champion!'
            html_message = render_to_string(
                'mail_template.html', {'user': winner})
            plain_message = strip_tags(html_message)
            from_email = settings.EMAIL_HOST_USER
            to = winner.email
            mail.send_mail(subject, plain_message, from_email,
                           [to], html_message=html_message)
            context["message"] = "winners have been notified!"
            LastWinner.objects.all().delete()
            lw = LastWinner(date=datetime.now())
            lw.save()
        for user in all:
            if datetime.now().month == 6:
                user.grade = user.grade + 1
            user.points = 0
            user.save()
    return render(request, "winners.html", context)
