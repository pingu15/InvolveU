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

from datetime import datetime, timezone
from django.shortcuts import redirect
from django.contrib import admin

import reportlab
from django.http import FileResponse
from reportlab.platypus import SimpleDocTemplate, Table, TableStyle
from reportlab.lib.pagesizes import letter
import io
from django.shortcuts import HttpResponse
from reportlab.lib.units import inch
from reportlab.lib import colors

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


def winners_view(request):
    if not request.user.is_authenticated or (not request.user.is_staff):
        return redirect('%s?next=%s' % ('/admin/', request.path))
    context = {}
    if not request.user.is_authenticated:
        context['loginMessage'] = "Not Logged In"
    else:
        context['loginMessage'] = "Logged in as " + request.user.username
    if len(LastWinner.objects.all()) > 0:
        delta = datetime.now(timezone.utc)-LastWinner.objects.all()[0].date
        context['date'] = delta.days
    else:
        context['date'] = 0
    if request.method == "POST":
        winners = []
        gr12 = User.objects.all().filter(grade=12)
        gr11 = User.objects.all().filter(grade=11)
        gr10 = User.objects.all().filter(grade=10)
        gr9 = User.objects.all().filter(grade=9)
        all = User.objects.all().filter(is_staff=False)
        w12 = f(gr12)
        for w in w12:
            winners.append(w)
        w11 = f(gr11)
        for w in w11:
            winners.append(w)
        w10 = f(gr10)
        for w in w10:
            winners.append(w)
        w9 = f(gr9)
        for w in w9:
            winners.append(w)
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
            lw = LastWinner(date=datetime.now(timezone.utc))
            lw.save()
        for user in all:
            if datetime.now().month == 6:
                user.grade = user.grade + 1
            user.points = 0
            user.save()
    return render(request, "winners.html", context)


def f(users):
    if len(users) > 0:
        max = users[0].points
        res = []
        for user in users:
            if user.points > max:
                max = user.points
        for user in users:
            if user.points == max:
                res.append(user)
        return res
    else:
        return []

def home_view(request):
    context = {}
    if not request.user.is_authenticated:
        context['loginMessage'] = "Not Logged In"
    else:
        context['loginMessage'] = "Logged in as " + request.user.username
    return render(request, "index.html", context)

def report_view(request):
    buff = io.BytesIO()
    doc = SimpleDocTemplate(buff, rightMargin=72, leftMargin=72, topMargin=72, bottomMargin=72, pagesize=letter)
    elements = []
    for grade in range (9, 13):
        data = [[]]
        if grade == 9:
            data[0] = ["Username", "Grade", "Points"]
        sorted = []
        for user in User.objects.all().filter(grade=grade):
            sorted.append(user)
        print(sorted)
        sorted.sort(key=lambda x: x.points, reverse=True)
        for user in sorted:
            data.append([user.username, user.grade, user.points])
        table = Table(data, 1.5*inch, 0.3*inch)
        table.setStyle(TableStyle([('FONT', (0, 0), (2, 0), 'Helvetica-Bold'), 
                                   ('BOX', (0,0), (-1,-1), 0.25, colors.black),
                                   ('INNERGRID', (0,0), (-1,-1), 0.25, colors.black),
                                   ('ALIGN', (0, 0), (2, 0), 'CENTER'),
                                   ]))
        elements.append(table)
    doc.build(elements)
    response = HttpResponse(content_type='application/pdf')
    response['Content-Disposition'] = 'attachment; filename=report.pdf'
    response.write(buff.getvalue())
    buff.close()

    return response