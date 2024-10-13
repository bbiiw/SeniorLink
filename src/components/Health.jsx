import React, { useState } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

const Health = ({ profileData, setProfileData }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleHealthInfoChange = (e) => {
    setProfileData({ ...profileData, health_info: e.target.value });
  };

  const handleWorkRestrictionsChange = (e) => {
    setProfileData({ ...profileData, work_restrictions: e.target.value });
  };

  return (
    <div className="mb-8 bg-white p-6 rounded-lg shadow">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">ข้อมูลสุขภาพ</h2>
        <button onClick={() => setIsOpen(!isOpen)} className="btn btn-ghost btn-circle">
          {isOpen ? <IoIosArrowUp className="h-6 w-6" /> : <IoIosArrowDown className="h-6 w-6" />}
        </button>
      </div>

      {isOpen && (
        <div>
          {/* Health Information */}
          <label className="block text-sm font-medium text-gray-700 mb-1">ข้อมูลสุขภาพ</label>
          <textarea
            value={profileData.health_info}
            onChange={handleHealthInfoChange}
            className="textarea textarea-bordered w-full"
            placeholder="กรอกข้อมูลสุขภาพ"
          />

          {/* Work Restrictions */}
          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-700 mb-1">ข้อจำกัดในการทำงาน</label>
            <textarea
              value={profileData.work_restrictions}
              onChange={handleWorkRestrictionsChange}
              className="textarea textarea-bordered w-full"
              placeholder="กรอกข้อจำกัดในการทำงาน เช่น ไม่สามารถยกของหนักได้"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Health;
