from django.db import models

# Create your models here.
from django.db import models

class GameSession(models.Model):
    player = models.CharField(max_length=100)
    discs = models.IntegerField(default=3)
    moves = models.IntegerField(default=0)
    optimal_moves = models.IntegerField(default=0)
    status = models.CharField(max_length=20, default="ongoing")  
    created_at = models.DateTimeField(auto_now_add=True)
