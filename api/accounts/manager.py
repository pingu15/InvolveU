from django.contrib.auth.models import UserManager


class Manager(UserManager):
    def create_user(self, email, username, password, grade):
        if not email:
            raise ValueError('Users must have an email address')

        user = self.model(username=username, email=self.normalize_email(email))
        user.grade = grade
        user.points = 0
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_staffuser(self, email, username, password):
        """
        Creates and saves a staff user with the given email and password.
        """
        user = self.model(username=username, email=self.normalize_email(email))
        user.points = 0
        user.grade = 0
        user.staff = True
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, username, password):
        """
        Creates and saves a superuser with the given email and password.
        """
        user = self.model(username=username)
        user.points = 0
        user.grade = 0
        user.staff = True
        user.is_superuser = True
        user.set_password(password)
        user.save(using=self._db)
        return user
