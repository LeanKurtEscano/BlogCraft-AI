from django.urls import path,include
from . import views
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView


urlpatterns = [
    path("token/", TokenObtainPairView.as_view(),name = "get_token"),
    path("refresh/", TokenRefreshView.as_view(),name = "refresh_token"),
    path('signup/', views.signup, name = 'signup'),
    path('login/', views.login, name = 'login'),
    path('send/',views.generate_blog, name = 'send'),
    path('blogdetails/',views.blog_details, name ='blog-details'),
    path('logout/', views.log_out, name='logout'),
    path('deleteblog/',views.delete_blog, name="delete"),

]
