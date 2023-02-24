from django.shortcuts import render

# Create your views here.

from .models import User


def signup(request):
    message = {"message": ""}
    if request.method == "POST":
        email = request.POST['email']
        username = request.POST['username']
        password = request.POST['password']
        password2 = request.POST['password2']
        grade = request.POST['grade']
        print(grade)
        if password == password2:
            User.objects.create_user(email, username, password, grade)
        else:
            message['message'] = "passwords do not match"
    return render(request, "signup.html", message)
