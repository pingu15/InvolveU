from rest_framework import viewsets

from .serializers import UserSerializer, EventSerializer
from accounts.models import User
from models.models import Event


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer


class EventViewSet(viewsets.ModelViewSet):
    queryset = Event.objects.all()
    serializer_class = EventSerializer
