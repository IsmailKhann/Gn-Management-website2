import { Link } from 'react-router-dom';
import { Instagram, Facebook, Linkedin, Twitter } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Company Info */}
          <div>
            <img
              src="https://customer-assets.emergentagent.com/job_0977a39e-1009-4b00-93ba-3f6b870f8c08/artifacts/3990jzf7_GN-Logo.png"
              alt="GN Management"
              className="h-12 mb-4 brightness-0 invert"
            />
            <p className="text-gray-400 text-sm leading-relaxed">
              Building resilient, design-forward communities in Jersey City since 2010.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-[#20B2AA]">Quick Links</h3>
            <ul className="space-y-2">
              {[
                { name: 'About Us', path: '/about' },
                { name: 'Portfolio', path: '/portfolio' },
                { name: 'Services', path: '/services' },
                { name: 'News', path: '/news' },
              ].map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-gray-400 hover:text-[#20B2AA] transition-colors duration-200 text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-[#20B2AA]">Services</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>Real Estate Investment</li>
              <li>Property Management</li>
              <li>Construction Services</li>
              <li>Development Consulting</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-[#20B2AA]">Get in Touch</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>Jersey City, New Jersey</li>
              <li>info@gnmgt.com</li>
            </ul>
            <div className="flex gap-3 mt-6">
              <a
                href="https://www.instagram.com/gnmanagement_developers/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-800 hover:bg-[#20B2AA] rounded-full flex items-center justify-center transition-all duration-200 hover:-translate-y-1"
              >
                <Instagram className="h-4 w-4" />
              </a>
              <a
                href="https://www.facebook.com/GNmanagementINC"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-800 hover:bg-[#20B2AA] rounded-full flex items-center justify-center transition-all duration-200 hover:-translate-y-1"
              >
                <Facebook className="h-4 w-4" />
              </a>
              <a
                href="https://www.linkedin.com/company/gnmanagementinc/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-800 hover:bg-[#20B2AA] rounded-full flex items-center justify-center transition-all duration-200 hover:-translate-y-1"
              >
                <Linkedin className="h-4 w-4" />
              </a>
              <a
                href="https://x.com/GnManagement"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-800 hover:bg-[#20B2AA] rounded-full flex items-center justify-center transition-all duration-200 hover:-translate-y-1"
              >
                <Twitter className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-gray-800 text-center">
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} GN Management Inc. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
