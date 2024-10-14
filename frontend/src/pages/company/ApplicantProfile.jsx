import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import { FaPhone, FaEnvelope, FaArrowLeft } from 'react-icons/fa';
import Navbar from '../../components/Navbar';

const ApplicantProfile = () => {
  const { applicantId } = useParams();  // Get applicantId from URL
  const [applicantProfile, setApplicantProfile] = useState({});

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(`http://34.87.118.33:8000/company/applications/profile/${applicantId}/`);
        console.log(response.data)
        setApplicantProfile(response.data);
      } catch (error) {
        console.error('Error fetching applicant profile:', error);
      }
    };

    fetchProfile();
  }, [applicantId]);

  return (
    <div className="min-h-screen bg-base-200">
      <Navbar />
      <div className="container mx-auto py-10 p-32">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-4xl font-bold text-primary">ประวัติผู้สมัคร</h1>
          <Link to="/company/applications" className="btn btn-primary">
            <FaArrowLeft className="mr-2" /> ย้อนกลับ
          </Link>
        </div>

        <div className="grid grid-cols-3 gap-6">
          {/* Left Sidebar */}
          <div className="col-span-1 space-y-6">
            {/* Profile Section */}
            <div className="bg-white p-6 rounded-lg shadow">
              <div className="flex flex-col items-center">
                <img
                  src={applicantProfile.profile_picture ? `http://34.87.118.33:8000${applicantProfile.profile_picture}` : "https://via.placeholder.com/150"}
                  alt="Profile"
                  className="w-32 h-32 rounded-full mb-4 object-cover"
                />
                <h2 className="text-2xl font-semibold">{applicantProfile.first_name} {applicantProfile.last_name}</h2>
              </div>
            </div>

            {/* BirthDate Address Section */}
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-lg font-semibold">วันเกิด</h3>
              <p>{applicantProfile.birth_date} <br/><b>อายุ</b> {applicantProfile.age} ปี</p>
              <h3 className="text-lg font-semibold mt-4">ที่อยู่</h3>
              <p>{applicantProfile.address}</p>
            </div>

            {/* Contact Section */}
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-lg font-semibold mb-4">ช่องทางติดต่อ</h3>
              <p className="flex items-center mb-2">
                <FaPhone className="mr-2" /> {applicantProfile.phone_number}
              </p>
              <p className="flex items-center">
                <FaEnvelope className="mr-2" /> {applicantProfile.email}
              </p>
            </div>
          </div>

          {/* Right Content */}
          <div className="col-span-2 space-y-6">
            {/* About Section */}
            <div className="bg-white p-6 rounded-lg shadow">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">เกี่ยวกับฉัน</h3>
              </div>
              <div 
                className="text-md mt-2" 
                dangerouslySetInnerHTML={{ __html: applicantProfile.description } || 'ยังไม่มีข้อมูล'} 
              />
            </div>

            {/* Work Experience Section */}
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-lg font-semibold mb-4">ประวัติการทำงาน</h3>
              <div 
                className="text-md mt-2" 
                dangerouslySetInnerHTML={{ __html: applicantProfile.work_experience } || 'ยังไม่มีข้อมูลประวัติการทำงาน'} 
              />
            </div>


            {/* Health Information Section */}
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-lg font-semibold mb-4">ข้อมูลสุขภาพ</h3>
              <p>{applicantProfile.health_info || 'ยังไม่มีข้อมูลสุขภาพ'}</p>
              <h3 className="text-lg font-semibold mt-4">ข้อจำกัดในการทำงาน</h3>
              <p>{applicantProfile.work_restrictions || 'ยังไม่มีข้อมูลข้อจำกัดในการทำงาน'}</p>
            </div>
            
            {/* Skills Section */}
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-lg font-semibold mb-4">ทักษะ</h3>
              <ul className="list-disc list-inside">
                {applicantProfile.myskills && applicantProfile.myskills.map(skill => (
                  <li key={skill.id}>{skill.name}</li>
                ))}
              </ul>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplicantProfile;
