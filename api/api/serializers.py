from rest_framework import serializers
from accounts.models import User
from models.models import Event, Item, LastWinner


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'staff', 'points', 'grade', 'email')


class EventSerializer(serializers.ModelSerializer):
    class Meta:
        model = Event
        fields = "__all__"


class ItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = Item
        fields = "__all__"


class LastWinnerSerializer(serializers.ModelSerializer):
    class Meta:
        model = LastWinner
        fields = "__all__"
