from django.urls import path
from . import views

urlpatterns = [
    path("hanoi/", views.game_view, name="hanoi"),
    path("no-uses-left/", views.no_uses_left, name="no_uses_left"),
    path("set_uses/<int:value>/", views.set_uses, name="set_uses"),
    path("view_uses/", views.view_uses, name="view_uses"),
    path("set_special/", views.set_special, name="set_special"),
    path("view_special/", views.view_special, name="view_special"),
    path("rizz_master/", views.rizz_master, name="rizz_master"),
]
