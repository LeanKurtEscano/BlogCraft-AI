from django.contrib import admin
from .models import User,BlogArticle
# Register your models here.
admin.site.register(User)


@admin.register(BlogArticle)
class BlogArticleAdmin(admin.ModelAdmin):
    list_display = ('topic', 'user', 'tone', 'style', 'complexity', 'content')

