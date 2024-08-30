from django.contrib import admin
from .models import BlogArticle
# Register your models here.

@admin.register(BlogArticle)
class BlogArticleAdmin(admin.ModelAdmin):
    list_display = ('topic', 'user', 'tone', 'style', 'complexity', 'content')

