from django.urls import include, path
from rest_framework import routers
from . import views


urlpatterns = [
    path('users/<str:primary_skill>/', views.Users.as_view(),
         name='get users'),
    path('opportunities/offset=<int:offset>&size=<int:size>/', views.Opportunities.as_view(),
         name='get users'),
]
