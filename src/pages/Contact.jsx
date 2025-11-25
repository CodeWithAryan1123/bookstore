import React, { useState } from 'react';
import { validateEmail, sanitizeInput } from '../utils/validation';
import { showToast } from '../utils/toast';
import './Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };
  
  const validateForm = () => {
    const newErrors = {};
    
    // Validate name
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }
    
    // Validate email
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    // Validate subject
    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required';
    } else if (formData.subject.trim().length < 5) {
      newErrors.subject = 'Subject must be at least 5 characters';
    }
    
    // Validate message
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      showToast('Please fix the errors in the form', 'error');
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Sanitize inputs
      const sanitizedData = {
        name: sanitizeInput(formData.name),
        email: sanitizeInput(formData.email),
        subject: sanitizeInput(formData.subject),
        message: sanitizeInput(formData.message),
        timestamp: new Date().toISOString()
      };
      
      // Store in localStorage (in real app, would send to server)
      const existingMessages = JSON.parse(localStorage.getItem('contactMessages') || '[]');
      existingMessages.push(sanitizedData);
      localStorage.setItem('contactMessages', JSON.stringify(existingMessages));
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setSubmitted(true);
      showToast('Message sent successfully! We\'ll get back to you soon.', 'success');
      
      // Reset form after 3 seconds
      setTimeout(() => {
        setSubmitted(false);
        setFormData({ name: '', email: '', subject: '', message: '' });
      }, 3000);
      
    } catch (error) {
      showToast('Failed to send message. Please try again.', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="contact-page">
      <div className="contact-hero">
        <div className="container">
          <h1>Contact Us</h1>
          <p>We'd love to hear from you. Send us a message and we'll respond as soon as possible.</p>
        </div>
      </div>

      <div className="contact-content">
        <div className="container">
          <div className="contact-grid">
            <div className="contact-info">
              <div className="info-card">
                <div className="info-icon">
                  <i className="fa-solid fa-location-dot"></i>
                </div>
                <h3>Visit Us</h3>
                <p>Chitkara University<br />Chandigarh-Patiala National Highway<br />Punjab - 140401, India</p>
              </div>

              <div className="info-card">
                <div className="info-icon">
                  <i className="fa-solid fa-phone"></i>
                </div>
                <h3>Call Us</h3>
                <p>+91 9876543210<br />Mon-Fri: 9AM - 6PM IST</p>
              </div>

              <div className="info-card">
                <div className="info-icon">
                  <i className="fa-solid fa-envelope"></i>
                </div>
                <h3>Email Us</h3>
                <p>support@onceuponabookshelf.com<br />sales@onceuponabookshelf.com</p>
              </div>

              <div className="info-card">
                <div className="info-icon">
                  <i className="fa-solid fa-clock"></i>
                </div>
                <h3>Business Hours</h3>
                <p>Monday - Friday: 9:00 AM - 6:00 PM<br />Saturday: 10:00 AM - 4:00 PM<br />Sunday: Closed</p>
              </div>
            </div>

            <div className="contact-form-wrapper">
              <h2>Send us a Message</h2>
              {submitted && (
                <div className="success-message">
                  <i className="fa-solid fa-check-circle"></i>
                  Thank you! Your message has been sent successfully.
                </div>
              )}
              <form onSubmit={handleSubmit} className="contact-form">
                <div className="form-group">
                  <label htmlFor="name">Full Name *</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="John Doe"
                    disabled={isSubmitting}
                  />
                  {errors.name && <span className="error-text">{errors.name}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="email">Email Address *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="john@example.com"
                    disabled={isSubmitting}
                  />
                  {errors.email && <span className="error-text">{errors.email}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="subject">Subject *</label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="How can we help you?"
                    disabled={isSubmitting}
                  />
                  {errors.subject && <span className="error-text">{errors.subject}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="message">Message *</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows="6"
                    placeholder="Tell us more about your inquiry..."
                    disabled={isSubmitting}
                  ></textarea>
                  {errors.message && <span className="error-text">{errors.message}</span>}
                </div>

                <button type="submit" className="btn btn-primary" disabled={isSubmitting || submitted}>
                  <i className="fa-solid fa-paper-plane"></i> {isSubmitting ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
