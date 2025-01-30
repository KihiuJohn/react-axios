import React, { useState } from 'react';
import './App.css';

const ContactUsForm = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    workEmail: '',
    position: '',
    mobileNumber: '',
    companyName: '',
    companySize: '',
    industry: '',
    enquiryAbout: '',
    countryCode: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Data Submitted:', formData);
    // Add your form submission logic here
  };

  return (
    <form onSubmit={handleSubmit} className="contact-form">
      <div>
        <label htmlFor="firstName">First Name:</label>
        <input
          type="text"
          id="firstName"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label htmlFor="lastName">Last Name:</label>
        <input
          type="text"
          id="lastName"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label htmlFor="workEmail">Work Email:</label>
        <input
          type="email"
          id="workEmail"
          name="workEmail"
          value={formData.workEmail}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label htmlFor="position">Position:</label>
        <input
          type="text"
          id="position"
          name="position"
          value={formData.position}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label htmlFor="mobileNumber">Mobile Number:</label>
        <input
          type="tel"
          id="mobileNumber"
          name="mobileNumber"
          value={formData.mobileNumber}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label htmlFor="companyName">Company Name:</label>
        <input
          type="text"
          id="companyName"
          name="companyName"
          value={formData.companyName}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label htmlFor="companySize">Company Size:</label>
        <select
          id="companySize"
          name="companySize"
          value={formData.companySize}
          onChange={handleChange}
          required
        >
          <option value="">Select</option>
          <option value="0-15">0-15</option>
          <option value="15-30">15-30</option>
          <option value="30-60">30-60</option>
          <option value="60-100">60-100</option>
          <option value="100-150">100-150</option>
          <option value="150-200">150-200</option>
          <option value="200+">200+</option>
        </select>
      </div>

      <div>
        <label htmlFor="industry">Industry:</label>
        <select
          id="industry"
          name="industry"
          value={formData.industry}
          onChange={handleChange}
          required
        >
          <option value="">Select</option>
          <option value="construction">Construction</option>
          <option value="distribution">Distribution</option>
          <option value="manufacturing">Manufacturing</option>
          <option value="non profit">Non Profit</option>
          <option value="retail">Retail</option>
          <option value="other">Other</option>
        </select>
      </div>

      <div>
        <label htmlFor="enquiryAbout">I am enquiring about:</label>
        <select
          id="enquiryAbout"
          name="enquiryAbout"
          value={formData.enquiryAbout}
          onChange={handleChange}
          required
        >
          <option value="">Select</option>
          <option value="Acumatica">Acumatica</option>
          <option value="Payspace">Payspace</option>
          <option value="Sage Evolution">Sage Evolution</option>
          <option value="Our recommendation">Our recommendation</option>
          <option value="Consulting">Consulting</option>
          <option value="Training">Training</option>
          <option value="Support">Support</option>
        </select>
      </div>

      <div>
        <label htmlFor="countryCode">Country Code:</label>
        <select
          id="countryCode"
          name="countryCode"
          value={formData.countryCode}
          onChange={handleChange}
          required
        >
          <option value="">Select</option>
          <option value="+1">+1 (USA)</option>
          <option value="+44">+44 (UK)</option>
          <option value="+91">+91 (India)</option>
          <option value="+61">+61 (Australia)</option>
          <option value="+27">+27 (South Africa)</option>
          {/* Add more country codes as needed */}
        </select>
      </div>

      <div>
        <label htmlFor="message">Message:</label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          placeholder="Enter your message here..."
          required
        />
      </div>

      <button type="submit">Submit</button>
    </form>
  );
};

export default ContactUsForm;