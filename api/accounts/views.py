import json
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt

# Create your views here.

from .models import User


@csrf_exempt
def signup(request):
    message = {"message": "", "success": False}
    if request.method == "POST":
        data = json.loads(request.body)
        email = data['email']
        username = data['username']
        password = data['password']
        password2 = data['password2']
        grade = data['grade']
        if User.objects.filter(username=username).first():
            message['message'] = "User with username already exists."
        elif password and (password == password2):
            User.objects.create_user(email, username, password, grade)
            message['message'] = "Success!"
            message['success'] = True
        else:
            message['message'] = "passwords do not match"
    return JsonResponse(message)
