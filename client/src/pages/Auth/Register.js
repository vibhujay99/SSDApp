import React, { useState } from "react";
import Layout from "./../../components/Layout/Layout";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import "../../styles/AuthStyles.css";
const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [answer, setAnswer] = useState("");
  const navigate = useNavigate()


  // Input validation function
  const isEmailValid = (email) => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailRegex.test(email);
  };

  const isPasswordValid = (password) => {
    return password.length >= 8;
  };

  const isPhoneValid = (phone) => {
    const phoneRegex = /^\d{10}$/;
    return phoneRegex.test(phone);
  };

  const isNameValid = (name) => {
    // Name should contain only letters and spaces
    const nameRegex = /^[A-Za-z\s]+$/;
    return nameRegex.test(name);
  };

  const isAddressValid = (address) => {
    // Basic address validation - allowing letters, numbers, spaces, and common punctuation
    const addressRegex = /^[A-Za-z0-9\s.,#-]+$/;
    return addressRegex.test(address);
  };

  const isAnswerValid = (answer) => {
    return answer.length >= 3; // Example: Require at least 3 characters
  };


  // form function
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Input sanitization
    const sanitizedEmail = email.trim();
    const sanitizedName = name.trim();
    const sanitizedPassword = password.trim();
    const sanitizedPhone = phone.trim();
    const sanitizedAddress = address.trim();
    const sanitizedAnswer = answer.trim();

    if (!isEmailValid(sanitizedEmail)) {
      toast.error("Invalid email format");
      return;
    }

    if (!isPasswordValid(sanitizedPassword)) {
      toast.error("Invalid password");
      return;
    }

    if (!isPhoneValid(sanitizedPhone)) {
      toast.error("Invalid phone number");
      return;
    }

    if(!isAddressValid(sanitizedAddress)){
      toast.error("Invalid Address")
    }

    if(!isNameValid(sanitizedName)){
      toast.error("Invalid Name ")
    }

    if(!isAnswerValid(sanitizedAnswer)){
      toast.error("Invalid Answer")
    }

    try {
      const res = await axios.post("/api/v1/auth/register", {
        name:sanitizedName,
        email: sanitizedEmail,
        password: sanitizedPassword,
        phone: sanitizedPhone,
        address: sanitizedAddress,
        answer: sanitizedAnswer,
      });

      if (res && res.data.success) {
        toast.success(res.data && res.data.message);
        navigate("/login");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <Layout title="Register - Ecommer App">
      <div className="form-container" style={{ minHeight: "90vh" }}>
        <form onSubmit={handleSubmit}>
          <h4 className="title">REGISTER FORM</h4>
          <div className="mb-3">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="form-control"
              id="exampleInputEmail1"
              placeholder="Enter Your Name"
              required
              autoFocus
            />
          </div>
          <div className="mb-3">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-control"
              id="exampleInputEmail1"
              placeholder="Enter Your Email "
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-control"
              id="exampleInputPassword1"
              placeholder="Enter Your Password"
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="form-control"
              id="exampleInputEmail1"
              placeholder="Enter Your Phone"
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="form-control"
              id="exampleInputEmail1"
              placeholder="Enter Your Address"
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="text"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              className="form-control"
              id="exampleInputEmail1"
              placeholder="What is Your Favorite sports"
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">
            REGISTER
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default Register;