import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import LoadingSpinner from '../components/LoadingSpinner';
import Alert from '../components/Alert';

const SubmitForm = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    fullName: user?.name || '',
    email: user?.email || '',
    affiliation: '',
    paperTitle: '',
    keywords: '',
    manuscript: null,
    copyrightForm: null,
    comments: ''
  });
  
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [alert, setAlert] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData(prev => ({ ...prev, [name]: files[0] }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const newErrors = {};
    
    if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    if (!formData.affiliation.trim()) newErrors.affiliation = 'Affiliation is required';
    if (!formData.paperTitle.trim()) newErrors.paperTitle = 'Paper title is required';
    if (!formData.manuscript) newErrors.manuscript = 'Manuscript file is required';
    if (!formData.copyrightForm) newErrors.copyrightForm = 'Copyright form is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validate()) return;
    
    setIsSubmitting(true);
    setAlert(null);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setAlert({ 
        type: 'success', 
        message: 'Paper submitted successfully! You will receive a confirmation email shortly.' 
      });
      
      // Redirect to dashboard after 2 seconds
      setTimeout(() => {
        navigate('/dashboard');
      }, 2000);
      
    } catch (error) {
      setAlert({ 
        type: 'error', 
        message: 'Submission failed. Please try again.' 
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const getFilePreview = (file) => {
    if (!file) return null;
    return (
      <div className="flex items-center mt-2 p-3 bg-green-50 rounded-lg border border-green-200">
        <svg className="w-5 h-5 text-green-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <span className="text-green-800 font-medium truncate">{file.name}</span>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <button
            onClick={() => navigate('/dashboard')}
            className="mb-6 flex items-center text-slate-600 hover:text-slate-900 transition-colors self-start"
          >
            <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Dashboard
          </button>
          
          <h1 className="text-3xl font-bold text-slate-900 mb-4">Submit Your Research Paper</h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Please fill in all required fields and upload the necessary documents to submit your manuscript for review.
          </p>
        </div>

        {/* Alert */}
        {alert && (
          <div className="mb-8 max-w-2xl mx-auto">
            <Alert 
              type={alert.type} 
              message={alert.message} 
              onClose={() => setAlert(null)} 
            />
          </div>
        )}

        {/* Form */}
        <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
          <div className="p-6 sm:p-8">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Section: Author Information */}
              <div className="border-b border-slate-200 pb-8">
                <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center">
                  <span className="w-8 h-8 bg-indigo-100 text-indigo-700 rounded-lg flex items-center justify-center mr-3">1</span>
                  Author Information
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="fullName" className="block text-sm font-medium text-slate-700 mb-2">
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="fullName"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors ${
                        errors.fullName ? 'border-red-500 bg-red-50' : 'border-slate-300'
                      }`}
                      placeholder="Enter your full name"
                    />
                    {errors.fullName && <p className="mt-1 text-sm text-red-600">{errors.fullName}</p>}
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-2">
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors ${
                        errors.email ? 'border-red-500 bg-red-50' : 'border-slate-300'
                      }`}
                      placeholder="your.email@institution.edu"
                    />
                    {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
                  </div>
                  
                  <div className="md:col-span-2">
                    <label htmlFor="affiliation" className="block text-sm font-medium text-slate-700 mb-2">
                      Affiliation / Institution <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="affiliation"
                      name="affiliation"
                      value={formData.affiliation}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors ${
                        errors.affiliation ? 'border-red-500 bg-red-50' : 'border-slate-300'
                      }`}
                      placeholder="University, Company, or Organization"
                    />
                    {errors.affiliation && <p className="mt-1 text-sm text-red-600">{errors.affiliation}</p>}
                  </div>
                </div>
              </div>

              {/* Section: Paper Details */}
              <div className="border-b border-slate-200 pb-8">
                <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center">
                  <span className="w-8 h-8 bg-indigo-100 text-indigo-700 rounded-lg flex items-center justify-center mr-3">2</span>
                  Paper Details
                </h2>
                
                <div className="space-y-6">
                  <div>
                    <label htmlFor="paperTitle" className="block text-sm font-medium text-slate-700 mb-2">
                      Paper Title <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="paperTitle"
                      name="paperTitle"
                      value={formData.paperTitle}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors ${
                        errors.paperTitle ? 'border-red-500 bg-red-50' : 'border-slate-300'
                      }`}
                      placeholder="Enter the title of your research paper"
                    />
                    {errors.paperTitle && <p className="mt-1 text-sm text-red-600">{errors.paperTitle}</p>}
                  </div>
                  
                  <div>
                    <label htmlFor="keywords" className="block text-sm font-medium text-slate-700 mb-2">
                      Keywords (Optional)
                    </label>
                    <input
                      type="text"
                      id="keywords"
                      name="keywords"
                      value={formData.keywords}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                      placeholder="e.g., AI, Civil Engineering, Renewable Energy"
                    />
                    <p className="mt-1 text-xs text-slate-500">Separate keywords with commas</p>
                  </div>
                </div>
              </div>

              {/* Section: Document Uploads */}
              <div className="border-b border-slate-200 pb-8">
                <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center">
                  <span className="w-8 h-8 bg-indigo-100 text-indigo-700 rounded-lg flex items-center justify-center mr-3">3</span>
                  Document Uploads
                </h2>
                
                <div className="space-y-8">
                  {/* Manuscript Upload */}
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Upload Manuscript <span className="text-red-500">*</span>
                    </label>
                    <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-dashed rounded-xl hover:border-indigo-400 transition-colors
                      ${errors.manuscript ? 'border-red-500 bg-red-50' : 'border-slate-300'}">
                      <div className="space-y-1 text-center">
                        <svg className="mx-auto h-12 w-12 text-slate-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                          <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <div className="flex text-sm text-slate-600 justify-center">
                          <label className="relative cursor-pointer rounded-md font-medium text-indigo-600 hover:text-indigo-500">
                            <span>Upload a file</span>
                            <input
                              type="file"
                              name="manuscript"
                              accept=".doc,.docx"
                              onChange={handleFileChange}
                              className="sr-only"
                            />
                          </label>
                          <p className="pl-1">or drag and drop</p>
                        </div>
                        <p className="text-xs text-slate-500">DOC or DOCX format only (Max 20MB)</p>
                        {getFilePreview(formData.manuscript)}
                      </div>
                    </div>
                    {errors.manuscript && <p className="mt-2 text-sm text-red-600">{errors.manuscript}</p>}
                  </div>

                  {/* Copyright Form Upload */}
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Upload Signed Copyright Form <span className="text-red-500">*</span>
                    </label>
                    <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-dashed rounded-xl hover:border-indigo-400 transition-colors
                      ${errors.copyrightForm ? 'border-red-500 bg-red-50' : 'border-slate-300'}">
                      <div className="space-y-1 text-center">
                        <svg className="mx-auto h-12 w-12 text-slate-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                          <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <div className="flex text-sm text-slate-600 justify-center">
                          <label className="relative cursor-pointer rounded-md font-medium text-indigo-600 hover:text-indigo-500">
                            <span>Upload a file</span>
                            <input
                              type="file"
                              name="copyrightForm"
                              accept=".pdf,.doc,.docx"
                              onChange={handleFileChange}
                              className="sr-only"
                            />
                          </label>
                          <p className="pl-1">or drag and drop</p>
                        </div>
                        <p className="text-xs text-slate-500">PDF, DOC, or DOCX format (Max 10MB)</p>
                        {getFilePreview(formData.copyrightForm)}
                      </div>
                    </div>
                    {errors.copyrightForm && <p className="mt-2 text-sm text-red-600">{errors.copyrightForm}</p>}
                  </div>
                </div>
              </div>

              {/* Section: Additional Information */}
              <div>
                <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center">
                  <span className="w-8 h-8 bg-indigo-100 text-indigo-700 rounded-lg flex items-center justify-center mr-3">4</span>
                  Additional Information
                </h2>
                
                <div>
                  <label htmlFor="comments" className="block text-sm font-medium text-slate-700 mb-2">
                    Additional Comments / Cover Letter (Optional)
                  </label>
                  <textarea
                    id="comments"
                    name="comments"
                    value={formData.comments}
                    onChange={handleInputChange}
                    rows="4"
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                    placeholder="Share any additional context, special requests, or cover letter details..."
                  />
                  <p className="mt-1 text-xs text-slate-500">Max 500 characters</p>
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-6">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 px-6 bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center"
                >
                  {isSubmitting ? (
                    <>
                      <LoadingSpinner size="sm" text="" />
                      <span className="ml-3">Submitting Paper...</span>
                    </>
                  ) : (
                    'Submit Paper for Review'
                  )}
                </button>
                <p className="mt-4 text-center text-sm text-slate-500">
                  By submitting, you agree to our <a href="/author-guidelines" className="text-indigo-600 hover:underline">Author Guidelines</a> and <a href="#" className="text-indigo-600 hover:underline">Publication Ethics</a>.
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubmitForm;