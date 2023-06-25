from django.urls import path

from . import views

urlpatterns = [
    path('static/photos/<slug:id>.<slug:type>', views.items_view, name='items_view'),
    path('<slug:id>/', views.edit_events, name='edit_events'),
    path('', views.events_view, name='events_view'),
]
