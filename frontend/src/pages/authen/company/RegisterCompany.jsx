import React, { useState } from "react";
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from "react-router-dom";
import Navbar from "../../../components/Navbar";

const RegisterCompany = () => {

  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!agreedToTerms) {
      toast.error('กรุณายอมรับเงื่อนไขการชำระเงินก่อนลงทะเบียน');
      return;
    }

    try {
      const response = await axios.post('http://localhost:8000/authen/register/company/', {
        email: email,
        username: username,
        password: password,
        confirm_password: confirmPassword
      });
      toast.success('ลงทะเบียนสำเร็จ!');

      setTimeout(() => {
        navigate('/login/company/');
      }, 1000);
      console.log(response.data);
    } catch (error) {
      console.log(error.response.data)
      toast.error(error.response.data.message || 'เกิดข้อผิดพลาดในการลงทะเบียน');
    }
  };

  return (
    <>
      <Navbar />
      <Toaster />
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="w-full max-w-lg bg-white p-8 rounded-lg shadow-lg my-12">
          <h2 className="text-2xl font-bold text-center mb-6">
            ลงทะเบียนสำหรับบริษัท
          </h2>

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">ชื่อผู้ใช้</label>
              <input 
                type="text" 
                value={username} 
                onChange={(e) => setUsername(e.target.value)} 
                className="input input-bordered w-full" />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 mb-2">อีเมล</label>
              <input 
                type="email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                className="input input-bordered w-full" />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 mb-2">รหัสผ่าน</label>
              <input 
                type="password"
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                className="input input-bordered w-full" />
            </div>

            <div className="mb-6">
              <label className="block text-gray-700 mb-2">ยืนยันรหัสผ่าน</label>
              <input 
                type="password" 
                value={confirmPassword} 
                onChange={(e) => setConfirmPassword(e.target.value)} 
                className="input input-bordered w-full" />
            </div>

            {/* Payment information */}
            <div className="mb-6 bg-yellow-100 p-4 rounded-lg">
              <p className="text-yellow-800 font-semibold text-lg">
                ค่าสมัครสมาชิก: 500 บาท
              </p>
              <p className="text-yellow-600 text-sm">
                การเป็นสมาชิกจะทำให้คุณสามารถลงประกาศรับสมัครงานในระบบได้ โปรดทราบว่าการสมัครสมาชิกไม่มีการคืนเงิน
              </p>
            </div>

            {/* Checkbox to agree to terms */}
            <div className="mb-6">
              <label className="inline-flex items-center">
                <input 
                  type="checkbox" 
                  checked={agreedToTerms} 
                  onChange={(e) => setAgreedToTerms(e.target.checked)} 
                  className="checkbox checkbox-secondary"
                />
                <span className="ml-2 text-gray-700">ฉันยอมรับเงื่อนไขการชำระเงินและยินยอมชำระเงิน 500 บาท</span>
              </label>
            </div>

            <button className="btn btn-warning w-full" type="submit">
              ลงทะเบียน
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default RegisterCompany;
