from django.db import models
from django.contrib.auth.models import User 


class BlogArticle(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)  # This is the foreign key relationship
    topic = models.CharField(max_length=400)
    tone = models.CharField(max_length=30)
    style = models.CharField(max_length=30)
    complexity = models.CharField(max_length=30)
    content = models.TextField(null=True, blank=True)

    def __str__(self):
        return self.topic
