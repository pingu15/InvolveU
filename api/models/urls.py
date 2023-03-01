from django.urls import path

from . import views

urlpatterns = [
    path('static/photos/<slug:photo_name>/', views.items_view),
    path('<slug:id>/', views.edit_events, name='edit_events')
]
