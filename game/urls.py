from django.urls import path
from . import views

urlpatterns = [
    path("hanoi/", views.hanoi, name="hanoi"),
]
