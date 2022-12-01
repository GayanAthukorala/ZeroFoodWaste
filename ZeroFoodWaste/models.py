from django.db import models

class Recipe(models.Model):
    name = models.CharField(max_length= 1000)
    instructions = models.JSONField(default = dict)
    calories = models.IntegerField(default = 0)
    ingredients = models.JSONField(default = dict)
    desiredCalories = models.IntegerField(default = 0)
    mealTime = models.CharField(max_length=1000)

    def __str__(self):
        return self.name

