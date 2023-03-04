from django.contrib import admin

from .models import Event, Item, LastWinner

# Register your models here.
admin.site.register(Event)
admin.site.register(Item)
admin.site.register(LastWinner)
