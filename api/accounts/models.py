from django.db import models
from django.contrib.auth.models import AbstractUser
from .manager import Manager


class User(AbstractUser):
    staff = models.BooleanField(default=False)  # staff member
    points = models.IntegerField()
    grade = models.IntegerField()

    # first_name, last_name, email, username, password fields built in

    REQUIRED_FIELDS = []  # Username & Password are required by default.

    objects = Manager()

    def add_points(self, pts):
        self.points += pts
        self.save()
        return

    @property
    def is_staff(self):
        "Is the user a member of staff?"
        return self.staff

    @property
    def is_admin(self):
        "Is the user a admin member?"
        return self.is_superuser

    def __str__(self):
        return self.username
