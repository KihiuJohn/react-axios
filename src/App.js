import React, { useState } from "react";
import axios from "axios";

const ContactUsForm = () => {
  // Define your form state
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    workEmail: "",
    position: "",
    mobileNumber: "",
    companyName: "",
    companySize: "",
    industry: "",
    enquiryAbout: "",
    countryCode: "",
    message: "",
  });

  // Map the selected country code to a proper CountryID (using ISO codes).
  const countryMapping = {
    "+1": "US",    // United States
    "+44": "GB",   // United Kingdom
    "+91": "IN",   // India
    "+61": "AU",   // Australia
    "+27": "ZA",   // South Africa
  };

  // Handle changes in form fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Function to authenticate and get the token (if needed)
  const getAuthToken = async () => {
    // Use relative URL so that the proxy directs the request to http://localhost/MyStoreInstance
    const loginUrl = "/entity/auth/login";
    const credentials = {
      name: "admin",
      password: "123",
      tenant: "MyStoreInstance",
      branch: "MYSTORE",
      locale: "EN-US",
    };

    try {
      const response = await axios.post(loginUrl, credentials, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        withCredentials: true,
      });
      // Adjust this if your Acumatica instance returns the token differently.
      const token = response.data;
      localStorage.setItem("acumaticaAuthToken", token);
      return token;
    } catch (error) {
      console.error(
        "Login failed:",
        error.response ? error.response.data : error.message
      );
      throw new Error("Authentication failed");
    }
  };

  // Handle form submission using PUT
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Use a relative URL so that the proxy forwards the request correctly.
    const apiUrl = "/entity/Default/24.200.001/Lead";

    // Retrieve or obtain the auth token
    let authToken = localStorage.getItem("acumaticaAuthToken");
    if (!authToken) {
      try {
        authToken = await getAuthToken();
      } catch (error) {
        alert("Login failed. Unable to submit data.");
        return;
      }
    }

    // Build the payload.
    // Standard fields are mapped directly.
    // Custom attributes are sent under Answers.Answer.
    // The Address object is included with CountryID (from our mapping) and a placeholder AddressLine1.
    const payload = {
      FirstName: { value: formData.firstName },
      LastName: { value: formData.lastName },
      EMail: { value: formData.workEmail },
      Salutation: { value: formData.position },
      Phone1: { value: `${formData.countryCode} ${formData.mobileNumber}` },
      FullName: { value: formData.companyName },
      Description: { value: formData.message },
      DisplayName: { value: `${formData.firstName} ${formData.lastName}` },
      Answers: {
        Answer: [
          {
            AttributeID: { value: "USRCompanySize" },
            Value: { value: formData.companySize },
          },
          {
            AttributeID: { value: "USRIndustry" },
            Value: { value: formData.industry },
          },
          {
            AttributeID: { value: "USREnquiryAbout" },
            Value: { value: formData.enquiryAbout },
          },
        ],
      },
      Address: {
        CountryID: { value: countryMapping[formData.countryCode] || "" },
        AddressLine1: { value: "Not Provided" }
      },
    };

    try {
      // Use PUT to create/update the Lead record.
      const response = await axios.put(apiUrl, payload, {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });

      console.log("Data submitted successfully:", response.data);
      alert("Your enquiry has been submitted!");

      // Clear the form after a successful submission
      setFormData({
        firstName: "",
        lastName: "",
        workEmail: "",
        position: "",
        mobileNumber: "",
        companyName: "",
        companySize: "",
        industry: "",
        enquiryAbout: "",
        countryCode: "",
        message: "",
      });
    } catch (error) {
      console.error(
        "Error submitting data:",
        error.response ? error.response.data : error.message
      );
      alert("Failed to submit data. Please review the errors and try again.");
    }
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
        <label htmlFor="position">Position (Job Title):</label>
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
        <label htmlFor="companySize">Number of Employees:</label>
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
          <option value="Lead">Lead</option>
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
