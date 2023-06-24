import os
from django.contrib.auth import get_user_model
User = get_user_model()
from dotenv import load_dotenv

def initialLoad():
    load_dotenv()
    if not User.objects.filter(username=os.environ.get("DJANGO_SUPERUSER_USERNAME")).exists():
        User.objects.create_superuser(
            username=os.environ.get("DJANGO_SUPERUSER_USERNAME"),
            password=os.environ.get("DJANGO_SUPERUSER_PASSWORD"),
        )