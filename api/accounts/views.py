import json
from django.http import JsonResponse

# Create your views here.

from .models import User


def signup(request):
    message = {"message": "", "success": False}
    if request.method == "POST":
        data = json.loads(request.body)
        email = data['email']
        username = data['username']
        password = data['password']
        password2 = data['password2']
        grade = data['grade']
        if password == password2:
            User.objects.create_user(email, username, password, grade)
            message['message'] = "Sign Up successful, return to app to login."
            message['success'] = True
        else:
            message['message'] = "passwords do not match"
    return JsonResponse(message)
