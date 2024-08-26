from django.db import models

class User(models.Model):
    username = models.CharField(max_length=100, unique=True)  # Make username unique
    email = models.EmailField(unique=True)  # Make email unique
    password = models.CharField(max_length=128)  # Increase length for hashed passwords

    def __str__(self):
        return self.username



    