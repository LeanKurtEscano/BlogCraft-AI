from django.db import models

class User(models.Model):
    username = models.CharField(max_length=100, unique=True)
    email = models.EmailField(unique=True)
    password = models.CharField(max_length=128)  # Ensure the length is sufficient for hashed passwords

    def __str__(self):
        return self.username


class BlogArticle(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)  # This is the foreign key relationship
    topic = models.CharField(max_length=400)
    tone = models.CharField(max_length=30)
    style = models.CharField(max_length=30)
    complexity = models.CharField(max_length=30)
    content = models.TextField(null=True, blank=True)

    def __str__(self):
        return self.topic
