import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import GeneralInformation from '../../components/GeneralInformation';
import About from '../../components/About';
import Skills from '../../components/Skills';
import Navbar from "../../components/Navbar";
import Health from '../../components/Health';

const EditProfile = () => {
  const navigate = useNavigate();
  const [isEditMode, setIsEditMode] = useState(false); // สถานะสำหรับการแก้ไขหรือสร้างโปรไฟล์
  const [profileData, setProfileData] = useState({
    first_name: '',
    last_name: '',
    gender: '',
    birth_date: '',
    email: '',
    phone_number: '',
    address: '',
    description: '',
    work_experience: '',
    health_info: '',
    work_restrictions: '',
    profile_picture: null,
    skills: []
  });

  // ดึงข้อมูลโปรไฟล์เมื่อหน้าโหลดขึ้น
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get('http://localhost:8000/applicant/profile/');
        const mapSkills = response.data.myskills.map(skill => ({ value: skill.id, label: skill.name }));
        
        setProfileData({
          ...response.data,
          skills: mapSkills
        });
        setIsEditMode(true);
      } catch (error) {
        setIsEditMode(false);
      }
    };

    fetchProfile();
  }, []);

  const saveProfile = async () => {
    try {
      const formData = new FormData();
      formData.append('first_name', profileData.first_name);
      formData.append('last_name', profileData.last_name);
      formData.append('gender', profileData.gender);
      formData.append('birth_date', profileData.birth_date);
      formData.append('email', profileData.email);
      formData.append('phone_number', profileData.phone_number);
      formData.append('address', profileData.address);
      formData.append('description', profileData.description);
      formData.append('work_experience', profileData.work_experience);
      formData.append('health_info', profileData.health_info);
      formData.append('work_restrictions', profileData.work_restrictions);

      if (profileData.profile_picture instanceof File) {
          formData.append('profile_picture', profileData.profile_picture);
      }

      const skillsData = profileData.skills.map(skill => skill.value);
      skillsData.forEach(skillId => {
          formData.append('skills', skillId);
      });
      
      let response;
      if (isEditMode) {
        // แก้ไขโปรไฟล์ (PUT request)
        response = await axios.put('http://localhost:8000/applicant/profile/', formData, { 
          headers: {'Content-Type': 'multipart/form-data' }});
        } else {
        // สร้างโปรไฟล์ใหม่ (POST request)
        response = await axios.post('http://localhost:8000/applicant/profile/', formData, { 
          headers: {'Content-Type': 'multipart/form-data' }});
      }

      if (response.status === 200 || response.status === 201) {
        toast.success(isEditMode ? 'บันทึกโปรไฟล์สำเร็จ!' : 'สร้างโปรไฟล์สำเร็จ!', { duration: 1000 });
        setTimeout(() => {
          navigate('/applicant/profile');
        }, 1000);
      }
    } catch (error) {
      console.log(error.response.data);
      toast.error('เกิดข้อผิดพลาดในการบันทึกโปรไฟล์');
    }
  };

  const cancelEdit = () => {
    navigate('/applicant/profile');
  };

  return (
    <div className="mx-auto bg-base-200 min-h-screen">
      <Navbar />
      <div className="container mx-auto py-10 p-32">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">{isEditMode ? 'แก้ไขโปรไฟล์' : 'สร้างโปรไฟล์'}</h1>
          <div>
            <button className="btn btn-error mr-2" onClick={() => navigate('/applicant/profile')}>ยกเลิก</button>
            <button className="btn btn-primary" onClick={saveProfile}>บันทึก</button>
          </div>
        </div>

        <div className="flex space-x-6">
          {/* Sidebar */}
          <div className="w-1/4 bg-white p-4 rounded-lg shadow">
            <ul className="menu">
              <li className="my-2 hover:bg-secondary rounded"><a href="#general-info">ข้อมูลส่วนตัว</a></li>
              <li className="my-2 hover:bg-secondary rounded"><a href="#about">เกี่ยวกับฉัน</a></li>
              <li className="my-2 hover:bg-secondary rounded"><a href="#health-info">ข้อมูลสุขภาพ</a></li>
              <li className="my-2 hover:bg-secondary rounded"><a href="#skills">ทักษะ</a></li>
            </ul>
          </div>

          {/* Main Content */}
          <div className="w-3/4">
            <div id="general-info">
              <GeneralInformation profileData={profileData} setProfileData={setProfileData} />
            </div>

            <div id="about">
              <About profileData={profileData} setProfileData={setProfileData} />
            </div>

            <div id="health-info">
              <Health profileData={profileData} setProfileData={setProfileData} />
            </div>
            
            <div id="skills">
              <Skills profileData={profileData} setProfileData={setProfileData} />
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;