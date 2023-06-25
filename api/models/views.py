from django.shortcuts import render
from django.http import Http404
from django.shortcuts import redirect

from .models import Event
from accounts.models import User

from datetime import datetime

from django.http import FileResponse

# Create your views here.


def edit_events(request, id):
    if not request.user.is_authenticated or (not request.user.is_staff):
        return redirect('%s?next=%s' % ('/admin/', request.path))
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
    if not request.user.is_authenticated:
        context['loginMessage'] = "Not Logged In"
    else:
        context['loginMessage'] = "Logged in as " + request.user.username
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
    return render(request, "event.html", context)

def events_view(request):
    context = {}
    if not request.user.is_authenticated:
        context['loginMessage'] = "Not Logged In"
    else:
        context['loginMessage'] = "Logged in as " + request.user.username
    events = Event.objects.all().filter(date__date=datetime.now().date())
    context['eventList'] = events
    return render(request, "events.html", context)

def items_view(request, id, type):
    img = open('static/photos/'+id+"."+type, 'rb')
    return FileResponse(img)