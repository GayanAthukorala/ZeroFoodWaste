# Generated by Django 4.1.3 on 2022-11-23 14:44

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('ZeroFoodWaste', '0004_remove_recipe_instructions'),
    ]

    operations = [
        migrations.AddField(
            model_name='recipe',
            name='instructions',
            field=models.JSONField(default=dict),
        ),
    ]
