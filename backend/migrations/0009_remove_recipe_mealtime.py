# Generated by Django 4.1.3 on 2022-11-30 05:35

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('ZeroFoodWaste', '0008_recipe_mealtime'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='recipe',
            name='mealTime',
        ),
    ]
