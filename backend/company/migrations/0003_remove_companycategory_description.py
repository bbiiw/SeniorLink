# Generated by Django 5.1.1 on 2024-10-06 17:08

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('company', '0002_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='companycategory',
            name='description',
        ),
    ]
