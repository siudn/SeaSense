from django.urls import path
from . import views


urlpatterns = [
    path('uploader/', views.uploader, name='uploader')
]
