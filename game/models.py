from django.db import models

class GameSettings(models.Model):
    available_uses = models.IntegerField(default=1)
    fresh = models.BooleanField(default=True)  # first-time message flag
    special_message = models.CharField(
        max_length=255, 
        default="🎉 Congrats! This is your first win! 🎉"
    )

    def save(self, *args, **kwargs):
        self.pk = 1   # force primary key to always be 1
        super().save(*args, **kwargs)

    def __str__(self):
        return f"Available Uses: {self.available_uses}, Fresh: {self.fresh}"
