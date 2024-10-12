import React, { useState } from "react";
import { Editor } from '@tinymce/tinymce-react';
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

const About = ({ profileData, setProfileData }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleDescriptionChange = (content) => {
    setProfileData({ ...profileData, description: content });
  };

  const handleWorkExperienceChange = (content) => {
    setProfileData({ ...profileData, work_experience: content });
  };

  return (
    <div className="mb-8 bg-white p-6 rounded-lg shadow">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">เกี่ยวกับฉัน</h2>
        <button onClick={() => setIsOpen(!isOpen)} className="btn btn-ghost btn-circle">
          {isOpen ? <IoIosArrowUp className="h-6 w-6" /> : <IoIosArrowDown className="h-6 w-6" />}
        </button>
      </div>

      {isOpen && (
        <div>
          {/* About Me */}
          <label className="block text-lg font-medium text-gray-700 mb-1">รายละเอียด</label>
          <Editor
            apiKey="boo8d9alfaew4evkz831yoxwo57du15uk5j9v0vre1gi1hx1"
            value={profileData.description}
            onEditorChange={handleDescriptionChange}
          />

          {/* Work Experience */}
          <div className="mt-6">
            <label className="block text-lg font-medium text-gray-700 mt-12 mb-1">ประวัติการทำงาน</label>
            <Editor
            apiKey="boo8d9alfaew4evkz831yoxwo57du15uk5j9v0vre1gi1hx1"
            value={profileData.work_experience}
            onEditorChange={handleWorkExperienceChange}
          />
          </div>
        </div>
      )}
    </div>
  );
};

export default About;
