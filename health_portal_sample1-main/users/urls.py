from django.urls import path
from . import views

urlpatterns = [
    path('location/', views.user_location, name='user_location'),
]
