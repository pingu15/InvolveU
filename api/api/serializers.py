from rest_framework import serializers
from accounts.models import User
from models.models import Event


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'staff', 'points', 'grade')


class EventSerializer(serializers.ModelSerializer):
    class Meta:
        model = Event
        fields = "__all__"
