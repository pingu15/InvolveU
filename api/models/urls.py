from django.urls import path

from . import views

urlpatterns = [
    path('<slug:id>/', views.edit_events, name='edit_events'),
    path('', views.events_view, name='events_view'),
]
