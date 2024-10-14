from django.db import models
from user.models import User
from job.models import Skill

class Applicant(models.Model):
    GENDER_CHOICES = [
        ('M', 'Male'),
        ('F', 'Female')
    ]

    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    gender = models.CharField(choices=GENDER_CHOICES)
    birth_date = models.DateField()
    email = models.EmailField()
    phone_number = models.CharField(max_length=15)
    address = models.TextField()
    description = models.TextField()
    work_experience = models.TextField(null=True, blank=True)
    health_info = models.TextField(null=True, blank=True)
    work_restrictions = models.TextField(null=True, blank=True)
    profile_picture = models.ImageField(upload_to='profile/', null=True)
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    skills = models.ManyToManyField(Skill, blank=True)
