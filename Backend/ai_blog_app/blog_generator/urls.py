from django.urls import path
from . import views

urlpatterns = [
    path('signup/', views.signup, name = 'signup'),
    path('login/', views.login, name = 'login'),
    path('send/',views.generate_blog, name = 'send'),
    path('blogdetails/',views.blog_details, name ='blog-details'),
    path('logout/', views.log_out, name='logout'),

]
