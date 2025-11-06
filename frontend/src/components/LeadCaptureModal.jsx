import React, { useState } from 'react';
import { X, User, Mail, Phone, Building2, MessageSquare, Sparkles, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { toast } from 'sonner';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const LeadCaptureModal = ({ isOpen, onClose, title, defaultInterest }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    interest: defaultInterest || '',
    message: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [focusedField, setFocusedField] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSelectChange = (value) => {
    setFormData({ ...formData, interest: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      await axios.post(`${API}/contact`, formData);
      toast.success('🎉 Thank you! We will be in touch shortly.');
      setFormData({
        name: '',
        email: '',
        phone: '',
        company: '',
        interest: defaultInterest || '',
        message: '',
      });
      setTimeout(() => {
        onClose();
      }, 1000);
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error('Something went wrong. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[550px] max-h-[90vh] overflow-y-auto p-0 gap-0">
        {/* Header with Gradient */}
        <div className="relative bg-gradient-to-br from-[#20B2AA] to-[#189a93] text-white p-8 pb-10 rounded-t-lg">
          <div className="absolute top-4 right-4 opacity-20">
            <Sparkles className="h-20 w-20" />
          </div>
          <DialogHeader className="relative z-10">
            <DialogTitle className="text-3xl font-bold mb-3">
              {title || 'Get in Touch'}
            </DialogTitle>
            <DialogDescription className="text-white/90 text-base">
              Fill out the form below and we'll get back to you within 24 hours.
            </DialogDescription>
          </DialogHeader>
        </div>

        {/* Form Content */}
        <form onSubmit={handleSubmit} className="p-8 space-y-5">
          {/* Name Field */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Full Name <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <User className={`absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 transition-colors duration-200 ${
                focusedField === 'name' ? 'text-[#20B2AA]' : 'text-gray-400'
              }`} />
              <Input
                data-testid="lead-name-input"
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                onFocus={() => setFocusedField('name')}
                onBlur={() => setFocusedField('')}
                required
                placeholder="John Smith"
                className="pl-11 h-12 border-2 focus:border-[#20B2AA] rounded-xl transition-all duration-200"
              />
            </div>
          </div>

          {/* Email Field */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Email Address <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <Mail className={`absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 transition-colors duration-200 ${
                focusedField === 'email' ? 'text-[#20B2AA]' : 'text-gray-400'
              }`} />
              <Input
                data-testid="lead-email-input"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                onFocus={() => setFocusedField('email')}
                onBlur={() => setFocusedField('')}
                required
                placeholder="john.smith@company.com"
                className="pl-11 h-12 border-2 focus:border-[#20B2AA] rounded-xl transition-all duration-200"
              />
            </div>
          </div>

          {/* Phone & Company - Two Columns */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Phone
              </label>
              <div className="relative">
                <Phone className={`absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 transition-colors duration-200 ${
                  focusedField === 'phone' ? 'text-[#20B2AA]' : 'text-gray-400'
                }`} />
                <Input
                  data-testid="lead-phone-input"
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  onFocus={() => setFocusedField('phone')}
                  onBlur={() => setFocusedField('')}
                  placeholder="+1 (555) 000-0000"
                  className="pl-10 h-12 border-2 focus:border-[#20B2AA] rounded-xl transition-all duration-200"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Company
              </label>
              <div className="relative">
                <Building2 className={`absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 transition-colors duration-200 ${
                  focusedField === 'company' ? 'text-[#20B2AA]' : 'text-gray-400'
                }`} />
                <Input
                  data-testid="lead-company-input"
                  type="text"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  onFocus={() => setFocusedField('company')}
                  onBlur={() => setFocusedField('')}
                  placeholder="Company Inc."
                  className="pl-10 h-12 border-2 focus:border-[#20B2AA] rounded-xl transition-all duration-200"
                />
              </div>
            </div>
          </div>

          {/* Interest Field */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              I'm interested in <span className="text-red-500">*</span>
            </label>
            <Select onValueChange={handleSelectChange} value={formData.interest} required>
              <SelectTrigger data-testid="lead-interest-select" className="h-12 border-2 focus:border-[#20B2AA] rounded-xl">
                <SelectValue placeholder="Select your interest" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Investor">💼 Investor Opportunities</SelectItem>
                <SelectItem value="Tenant">🏠 Tenant Leasing</SelectItem>
                <SelectItem value="PR">📰 Press / Media</SelectItem>
                <SelectItem value="Careers">💡 Careers</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Message Field */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Your Message <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <MessageSquare className={`absolute left-3 top-3 h-5 w-5 transition-colors duration-200 ${
                focusedField === 'message' ? 'text-[#20B2AA]' : 'text-gray-400'
              }`} />
              <Textarea
                data-testid="lead-message-textarea"
                name="message"
                value={formData.message}
                onChange={handleChange}
                onFocus={() => setFocusedField('message')}
                onBlur={() => setFocusedField('')}
                required
                rows={4}
                placeholder="Tell us about your inquiry and how we can help you..."
                className="pl-11 pt-3 border-2 focus:border-[#20B2AA] rounded-xl resize-none transition-all duration-200"
              />
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1 h-12 rounded-xl border-2 hover:bg-gray-50"
              disabled={submitting}
            >
              Cancel
            </Button>
            <Button
              data-testid="lead-submit-btn"
              type="submit"
              disabled={submitting}
              className="flex-1 h-12 bg-gradient-to-r from-[#20B2AA] to-[#189a93] hover:from-[#189a93] hover:to-[#20B2AA] text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
            >
              {submitting ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent mr-2" />
                  Sending...
                </>
              ) : (
                <>
                  Send Message
                  <ArrowRight className="ml-2 h-5 w-5" />
                </>
              )}
            </Button>
          </div>

          {/* Trust Badge */}
          <div className="text-center pt-2">
            <p className="text-xs text-gray-500">
              🔒 Your information is secure and will never be shared
            </p>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default LeadCaptureModal;
