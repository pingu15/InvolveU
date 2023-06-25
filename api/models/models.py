import random
import colorsys

from django.db import models
from django.conf import settings

from accounts.models import User

# Create your models here.


class Event(models.Model):
    date = models.DateTimeField()
    title = models.TextField()
    location = models.TextField()
    points = models.IntegerField()
    code = models.CharField(max_length=20, unique=True)
    attendees = models.ManyToManyField(
        User, verbose_name='attendees', blank=True)

    def __str__(self):
        return self.title


class Item(models.Model):
    name = models.TextField()
    cost = models.IntegerField()
    photo = models.ImageField(upload_to='static/upload/')

    def __str__(self):
        return self.name


class LastWinner(models.Model):
    date = models.DateTimeField()

    def __str__(self):
        return self.date.strftime("%m/%d/%Y, %H:%M:%S")
