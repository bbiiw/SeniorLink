from rest_framework import serializers
from .models import Applicant
from job.models import Skill
from datetime import date

class SkillSerializer(serializers.ModelSerializer):
    class Meta:
        model = Skill
        fields = ['id', 'name']

class ApplicantSerializer(serializers.ModelSerializer):
    skills = serializers.PrimaryKeyRelatedField(queryset=Skill.objects.all(), many=True)
    myskills = SkillSerializer(source='skills', many=True, read_only=True)
    
    birth_date = serializers.DateField(format="%d/%m/%Y")
    age = serializers.SerializerMethodField()

    class Meta:
        model = Applicant
        fields = [
            'id', 'first_name', 'last_name', 'gender', 'birth_date', 'age', 'email', 
            'phone_number', 'address', 'description', 'work_experience', 'health_info', 
            'work_restrictions', 'profile_picture', 'skills', 'myskills'
        ]

    def get_age(self, obj):
        today = date.today()
        birth_date = obj.birth_date
        age = today.year - birth_date.year - ((today.month, today.day) < (birth_date.month, birth_date.day))
        return age

    def create(self, validated_data):
        # ดึงข้อมูลออกมา
        skills_data = validated_data.pop('skills')

        applicant = Applicant.objects.create(**validated_data)
        applicant.skills.set(skills_data)
        
        return applicant

    def update(self, instance, validated_data):
        # ดึงข้อมูลออกมา
        skills_data = validated_data.pop('skills', None)
        
        # อัปเดต Applicant
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()
        
        # อัปเดต Skills
        if skills_data is not None:
            instance.skills.set(skills_data)
        
        return instance
