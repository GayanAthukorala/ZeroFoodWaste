# Generated by Django 4.1.3 on 2022-11-30 00:36

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('ZeroFoodWaste', '0006_recipe_calories_recipe_ingredients'),
    ]

    operations = [
        migrations.AddField(
            model_name='recipe',
            name='desiredCalories',
            field=models.IntegerField(default=0),
        ),
    ]
