from django.db import models

class Message(models.Model):
    chat_id = models.IntegerField()
    type = models.CharField(max_length=10)
    text = models.TextField()
