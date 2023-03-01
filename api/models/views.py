from django.shortcuts import render
from django.http import Http404, FileResponse
from django.core.exceptions import PermissionDenied

from .models import Event
from accounts.models import User

# Create your views here.


def edit_events(request, id):
    if not request.user.is_authenticated or (not request.user.is_staff):
        raise PermissionDenied
    event = Event.objects.filter(code=id).first()
    if not event:
        raise Http404
    context = {
        "title": event.title,
        "location": event.location,
        "date": event.date,
        "points": event.points,
        "attendees": event.attendees,
        "user": request.user,
        "id": id,
        "message": ""
    }
    if request.method == "POST":
        username = request.POST['username']
        user = User.objects.filter(username=username).first()
        added = event.attendees.filter(username=username).first()
        message = "User Not Found"
        if user:
            if not added:
                event.attendees.add(user)
                user.add_points(event.points)
                message = "User Added Successfully"
            else:
                message = "User Already Added"
        context["message"] = message
    return render(request, "index.html", context)


def items_view(request, photo):
    img = open('static/photos/'+photo, 'rb')
    return FileResponse(img)
