from django.urls import path
from . import views

urlpatterns = [
    path('search/', views.search_providers, name='search_providers'),
    path('book/', views.book_appointment, name='book_appointment'),
    path('token/<str:token>/', views.get_appointment_by_token, name='get_appointment_by_token'),
]
