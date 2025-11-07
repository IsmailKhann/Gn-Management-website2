import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Building2, Users, Calendar, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import LeadCaptureModal from '@/components/LeadCaptureModal';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const Home = () => {
  const [featuredProjects, setFeaturedProjects] = useState([]);
  const [scrollY, setScrollY] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [modalInterest, setModalInterest] = useState('');

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    fetchFeaturedProjects();
  }, []);

  const fetchFeaturedProjects = async () => {
    try {
      const response = await axios.get(`${API}/projects?category=Featured`);
      setFeaturedProjects(response.data.slice(0, 6));
    } catch (error) {
      console.error('Error fetching projects:', error);
    }
  };

  const stats = [
    { label: 'Units Managed', value: '267+', icon: Building2 },
    { label: 'Square Feet', value: '1M+', icon: TrendingUp },
    { label: 'Years in Market', value: '10+', icon: Calendar },
    { label: 'Completed Projects', value: '50+', icon: Users },
  ];

  const investmentReasons = [
    'Dozens of successful mixed-use and multifamily projects',
    'Early entry into emerging development corridors',
    'Full development process oversight',
    'Capital appreciation and recurring rental cash flow',
    'Detailed updates and pro forma analysis',
  ];

  return (
    <div className="home-page">
      {/* Hero Section with Video Background */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Video Background */}
        <div className="absolute inset-0 z-0">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute w-full h-full object-cover"
            style={{ 
              filter: 'brightness(0.7)',
              objectFit: 'cover'
            }}
          >
            <source 
              src="https://videos.pexels.com/video-files/3129957/3129957-uhd_2560_1440_30fps.mp4" 
              type="video/mp4" 
            />
            {/* Fallback image if video doesn't load */}
            <img 
              src="https://images.unsplash.com/photo-1564597625335-20ac06202464?crop=entropy&cs=srgb&fm=jpg&q=85&w=1920" 
              alt="Building"
              className="w-full h-full object-cover"
            />
          </video>
          {/* Dark overlay for better text readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/40 to-black/60" />
        </div>
        <div className="relative z-10 max-w-6xl mx-auto px-6 text-center text-white">
          <h1
            className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 animate-in"
            style={{ animationDelay: '0.1s' }}
          >
            Building Resilient, Design-Forward Communities in Jersey City
          </h1>
          <p
            className="text-lg sm:text-xl lg:text-2xl mb-10 max-w-3xl mx-auto font-light animate-in"
            style={{ animationDelay: '0.3s' }}
          >
            Transformational real estate development rooted in smart planning, community alignment, and strong investment returns.
          </p>
          <div
            className="flex flex-col sm:flex-row gap-4 justify-center animate-in"
            style={{ animationDelay: '0.5s' }}
          >
            <Button
              data-testid="speak-advisor-btn"
              size="lg"
              onClick={() => {
                setModalTitle('Speak with an Investment Advisor');
                setModalInterest('Investor');
                setIsModalOpen(true);
              }}
              className="bg-[#20B2AA] hover:bg-[#189a93] text-white px-8 py-6 text-lg rounded-full shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-200"
            >
              Speak with an Investment Advisor
              <ChevronRight className="ml-2 h-5 w-5" />
            </Button>
            <Link to="/portfolio">
              <Button
                data-testid="view-portfolio-btn"
                size="lg"
                variant="outline"
                className="border-2 border-white text-white hover:bg-white hover:text-black px-8 py-6 text-lg rounded-full transition-all duration-200"
              >
                View Portfolio
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Strip */}
      <section className="py-20 bg-gradient-to-r from-gray-50 to-gray-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div
                  key={index}
                  data-testid={`stat-${index}`}
                  className="text-center scale-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <Icon className="h-10 w-10 mx-auto mb-4 text-[#20B2AA]" />
                  <div className="text-4xl font-bold mb-2 text-black">{stat.value}</div>
                  <div className="text-sm text-gray-600 uppercase tracking-wide">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured Projects Carousel */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 text-black">Featured Projects</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Explore our portfolio of premium residential and mixed-use developments across Jersey City.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProjects.map((project, index) => (
              <Link
                to={`/portfolio/${project.id}`}
                key={project.id}
                data-testid={`featured-project-${index}`}
              >
                <div
                  className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl bg-white scale-in cursor-pointer"
                  style={{ animationDelay: `${index * 0.08}s` }}
                >
                  <div className="aspect-[4/3] overflow-hidden">
                    <img
                      src={project.image_url || 'https://images.unsplash.com/photo-1645510807290-cc82de2749f2?crop=entropy&cs=srgb&fm=jpg&q=85'}
                      alt={project.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    <h3 className="text-2xl font-bold mb-2">{project.name}</h3>
                    <p className="text-sm opacity-90">{project.address}</p>
                    {project.units && (
                      <p className="text-sm mt-2 opacity-90">{project.units} Units</p>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link to="/portfolio">
              <Button
                data-testid="view-all-projects-btn"
                size="lg"
                className="bg-black hover:bg-gray-800 text-white px-8 py-6 text-lg rounded-full hover:-translate-y-1 transition-all duration-200"
              >
                View All Projects
                <ChevronRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Why Invest with GN */}
      <section className="py-24 bg-gradient-to-br from-gray-900 to-black text-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="slide-in-left">
              <h2 className="text-4xl sm:text-5xl font-bold mb-8">Why Invest with GN?</h2>
              <p className="text-lg text-gray-300 mb-8">
                GN Management provides select investors with access to high-yield urban real estate projects in one of the most dynamic markets in the U.S. — Jersey City.
              </p>
              <ul className="space-y-4">
                {investmentReasons.map((reason, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-[#20B2AA] mt-2 flex-shrink-0" />
                    <span className="text-gray-300">{reason}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-10">
                <Button
                  data-testid="learn-investment-btn"
                  size="lg"
                  onClick={() => {
                    setModalTitle('Learn More About Investment');
                    setModalInterest('Investor');
                    setIsModalOpen(true);
                  }}
                  className="bg-[#20B2AA] hover:bg-[#189a93] text-white px-8 py-6 text-lg rounded-full hover:-translate-y-1 transition-all duration-200"
                >
                  Learn More About Investment
                  <ChevronRight className="ml-2 h-5 w-5" />
                </Button>
              </div>
            </div>
            <div className="slide-in-right">
              <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20">
                <h3 className="text-2xl font-bold mb-6">Investment Snapshot: Jersey City</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center pb-4 border-b border-white/20">
                    <span className="text-gray-300">Population Growth</span>
                    <span className="text-xl font-bold text-[#20B2AA]">+17%</span>
                  </div>
                  <div className="flex justify-between items-center pb-4 border-b border-white/20">
                    <span className="text-gray-300">Transit to Manhattan</span>
                    <span className="text-xl font-bold text-[#20B2AA]">20 min</span>
                  </div>
                  <div className="flex justify-between items-center pb-4 border-b border-white/20">
                    <span className="text-gray-300">Average Occupancy</span>
                    <span className="text-xl font-bold text-[#20B2AA]">~96%</span>
                  </div>
                  <div className="flex justify-between items-center pb-4 border-b border-white/20">
                    <span className="text-gray-300">Asset Portfolio</span>
                    <span className="text-xl font-bold text-[#20B2AA]">1M+ sq ft</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Development Pipeline</span>
                    <span className="text-xl font-bold text-[#20B2AA]">Highest in NJ</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl sm:text-5xl font-bold mb-6 text-black">Ready to Build Your Future?</h2>
          <p className="text-lg text-gray-600 mb-10 max-w-2xl mx-auto">
            Whether you're an investor, prospective tenant, or partner, we'd love to hear from you.
          </p>
          <Button
            data-testid="get-in-touch-btn"
            size="lg"
            onClick={() => {
              setModalTitle('Get in Touch');
              setModalInterest('');
              setIsModalOpen(true);
            }}
            className="bg-black hover:bg-gray-800 text-white px-10 py-6 text-lg rounded-full hover:-translate-y-1 transition-all duration-200"
          >
            Get in Touch
            <ChevronRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </section>

      {/* Lead Capture Modal */}
      <LeadCaptureModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={modalTitle}
        defaultInterest={modalInterest}
      />
    </div>
  );
};

export default Home;
