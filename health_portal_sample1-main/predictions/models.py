from django.db import models

# Create your models here.
from django.db import models
from users.models import User  # Import User from users app

class Symptom(models.Model):
    name = models.CharField(max_length=100)

class Prediction(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    symptoms = models.ManyToManyField(Symptom)
    predicted_disease = models.CharField(max_length=255)
    timestamp = models.DateTimeField(auto_now_add=True)