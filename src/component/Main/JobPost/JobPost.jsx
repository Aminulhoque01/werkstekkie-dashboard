


import React, { useState } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { usePostJobMutation } from '../../../redux/features/allJobs/allJobApi';
import { toast } from 'sonner';
 
import { useNavigate } from 'react-router-dom';

const JobPostingForm = () => {
  const [postJob, { isLoading, isError }] = usePostJobMutation();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    company: '',
    location: '',
    employmentType: '',
    category: '',
    salary: '',
    experinceLavel: '',
    workPlace: '',
    expirationDate: '',
    description: '',
    image: null, // Initialize image as null
  });

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;

    // Debugging: Log field changes
    console.log(`Changing ${name} to ${value}`);

    setFormData({
      ...formData,
      [name]: value
    });
  };


  // Handle image file selection
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({ ...prev, image: file }));
    }
  };

  // Handle form submission
  const handleSubmit = async () => {
    try {
      const formDataToSend = new FormData();

      // Append each field to FormData
      Object.keys(formData).forEach((key) => {
        if (key === 'image' && formData.image) {
          formDataToSend.append(key, formData.image);
        } else {
          formDataToSend.append(key, formData[key]);
        }
      });

      const response = await postJob(formDataToSend).unwrap();

      // Check if the imageUrl exists and is valid
      if (response.imageUrl) {
        let fixedUrl = response.imageUrl.replace(/\\/g, "/"); // Fix backslashes
        if (!fixedUrl.startsWith("http")) {
          fixedUrl = `https://${fixedUrl}`; // Ensure correct URL format
        }
        console.log("Fixed Image URL:", fixedUrl);
      } else {
        console.warn("No image URL returned from the backend.");
      }

      console.log("Job Posted Successfully:", response);

      toast.success("Job posted successfully!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: true
      });
      navigate("/alljob");

    } catch (error) {
      console.error("Error posting job:", error);
      toast.error("Error posting job. Please try again.", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: true
      });
    }
  };

  return (
    <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold mb-6">New Job Post</h2>

      <div className="grid grid-cols-2 gap-6 mb-6">
        {/* Job Title */}
        <div>
          <label className="block text-gray-700 font-semibold mb-2">Job Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md shadow-sm"
          />
        </div>

        {/* Company Name */}
        <div>
          <label className="block text-gray-700 font-semibold mb-2">Company Name</label>
          <input
            type="text"
            name="company"
            value={formData.company}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md shadow-sm"
          />
        </div>

        {/* Location */}
        <div>
          <label className="block text-gray-700 font-semibold mb-2">Location</label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md shadow-sm"
          />
        </div>

        {/* Salary */}
        <div>
          <label className="block text-gray-700 font-semibold mb-2">Salary</label>
          <input
            type="text"
            name="salary"
            value={formData.salary}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md shadow-sm"
          />
        </div>

        {/* Job Type */}
        {/* Job Type (Employment Type) */}
        <div>
          <label className="block text-gray-700 font-semibold mb-2">Job Type</label>
          <select
            name="employmentType" // ✅ Ensure this matches backend
            value={formData.employmentType}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md shadow-sm"
          >
            <option value="">Select Job Type</option> {/* Ensure there is a default option */}
            <option value="Full Time">Full Time</option>
            <option value="Part Time">Part Time</option>
          </select>
        </div>

        {/* Category */}
        <div>
          <label className="block text-gray-700 font-semibold mb-2">Category</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md shadow-sm"
          >
            <option value="Design">Design</option>
            <option value="Finance">Finance</option>
            <option value="Legal">Legal</option>
            <option value="Government">Government</option>
            <option value="Social">Social</option>
            <option value="ICT">ICT</option>
          </select>
        </div>




        {/* Work Place */}
        <div>
          <label className="block text-gray-700 font-semibold mb-2">Work Place</label>
          <select
            name="workPlace" // ✅ Ensure this matches backend
            value={formData.workPlace}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md shadow-sm"
          >
            <option value="experinceLavel">Work Place</option>
            <option value="On Site">On Site</option>
            <option value="Remote">Remote</option>
          </select>
        </div>


        {/* Experience Level */}
        <div>
          <label className="block text-gray-700 font-semibold mb-2">Experience Level</label>
          <select
            name="experinceLavel"
            value={formData.experinceLavel}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md shadow-sm"
          >
            <option value="experinceLavel">Experience Level</option>
            <option value="Senior">Senior</option>
            <option value="Junior">Junior</option>
            <option value="Internship">Internship</option>
            <option value="Expert">Expert</option>
          </select>
        </div>

        {/* Expiry Date */}
        <div>
          <label className="block text-gray-700 font-semibold mb-2">Expiration Date</label>
          <input
            type="date"
            name="expirationDate"
            value={formData.expirationDate}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md shadow-sm"
          />
        </div>

        {/* Job Description */}
        <div className="col-span-2">
          <label className="block text-gray-700 font-semibold mb-2">Job Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="6"
            className="w-full px-4 py-2 border rounded-md shadow-sm"
          />
        </div>

        {/* Image Upload Field */}
        <div>
          <label className="block text-gray-700 font-semibold mb-2">Job Image</label>
          <input
            type="file"
            name="image"
            onChange={handleImageChange}
            className="w-full px-4 py-2 border rounded-md shadow-sm"
          />
        </div>
      </div>

      {/* Submit Button */}
      <button
        type="button"
        onClick={handleSubmit}
        className="bg-blue-500 text-white px-6 py-3 rounded-md shadow-lg hover:bg-blue-600"
        disabled={isLoading}
      >
        {isLoading ? 'Posting Job...' : 'Post Job'}
      </button>

      {/* Error Message */}
      {isError && <div className="text-red-500 mt-4">Error posting job. Please try again.</div>}
    </div>
  );
};

export default JobPostingForm;

