from django.shortcuts import render

# Create your views here.

from .models import User


def signup(request):
    message = {"message": "", "redirect": False}
    if request.method == "POST":
        email = request.POST['email']
        username = request.POST['username']
        password = request.POST['password']
        password2 = request.POST['password2']
        grade = request.POST['grade']
        if password == password2:
            User.objects.create_user(email, username, password, grade)
            message['message'] = "Sign Up successful, return to app to login."
            message['redirect'] = True
        else:
            message['message'] = "passwords do not match"
    return render(request, "signup.html", message)
