import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, Calendar, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import LeadCaptureModal from '@/components/LeadCaptureModal';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const Portfolio = () => {
  const [projects, setProjects] = useState([]);
  const [activeFilter, setActiveFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [modalInterest, setModalInterest] = useState('');
  const [selectedProject, setSelectedProject] = useState(null);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await axios.get(`${API}/projects`);
      setProjects(response.data);
    } catch (error) {
      console.error('Error fetching projects:', error);
    }
  };

  const categories = ['All', 'Featured', 'Upcoming', 'Under Construction', 'Completed', 'Affordable Housing'];

  // Filter by category
  let filteredProjects =
    activeFilter === 'All'
      ? projects
      : projects.filter((p) => p.category === activeFilter);

  // Filter by search query
  if (searchQuery) {
    filteredProjects = filteredProjects.filter((p) =>
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.address.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }

  const handleBookVisit = (project, e) => {
    e.preventDefault();
    e.stopPropagation();
    setSelectedProject(project);
    setModalTitle(`Book a Site Visit - ${project.name}`);
    setModalInterest('Tenant');
    setIsModalOpen(true);
  };

  const handleEnquire = (project, e) => {
    e.preventDefault();
    e.stopPropagation();
    setSelectedProject(project);
    setModalTitle(`Enquire Now - ${project.name}`);
    setModalInterest('Investor');
    setIsModalOpen(true);
  };

  return (
    <div className="portfolio-page">
      {/* Hero Section */}
      <section className="relative py-32 bg-gradient-to-br from-gray-900 to-black text-white">
        <div className="max-w-6xl mx-auto px-6">
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 animate-in">Our Portfolio</h1>
          <p className="text-lg sm:text-xl max-w-3xl text-gray-300 animate-in" style={{ animationDelay: '0.2s' }}>
            Explore our diverse portfolio of residential and mixed-use developments across Jersey City.
          </p>
        </div>
      </section>

      {/* Search & Filter Section */}
      <section className="py-12 bg-white sticky top-0 z-40 shadow-md">
        <div className="max-w-7xl mx-auto px-6 space-y-6">
          {/* Search Bar */}
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input
                type="text"
                placeholder="Search by property name or location..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 h-14 text-base rounded-full border-2 focus:border-[#20B2AA] shadow-sm"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              )}
            </div>
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map((category) => (
              <Button
                key={category}
                data-testid={`filter-${category.toLowerCase().replace(/ /g, '-')}`}
                onClick={() => setActiveFilter(category)}
                variant={activeFilter === category ? 'default' : 'outline'}
                className={`rounded-full px-6 py-2 transition-all duration-200 ${
                  activeFilter === category
                    ? 'bg-[#20B2AA] hover:bg-[#189a93] text-white'
                    : 'border-gray-300 text-gray-700 hover:border-[#20B2AA] hover:text-[#20B2AA]'
                }`}
              >
                {category}
              </Button>
            ))}
          </div>

          {/* Results Count */}
          {searchQuery && (
            <div className="text-center text-sm text-gray-600">
              Found {filteredProjects.length} {filteredProjects.length === 1 ? 'property' : 'properties'}
            </div>
          )}
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          {filteredProjects.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-gray-500 text-lg">No projects found in this category.</p>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProjects.map((project, index) => (
                <div
                  key={project.id}
                  data-testid={`project-card-${index}`}
                  className="group bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 cursor-pointer scale-in relative"
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  <Link to={`/portfolio/${project.id}`}>
                    <div className="aspect-[4/3] overflow-hidden bg-gray-100 relative">
                      <img
                        src={project.image_url || 'https://images.unsplash.com/photo-1645510807290-cc82de2749f2?crop=entropy&cs=srgb&fm=jpg&q=85'}
                        alt={project.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      
                      {/* Hover Overlay with Buttons */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-6 px-4 gap-3">
                        <Button
                          onClick={(e) => handleBookVisit(project, e)}
                          className="bg-white text-[#20B2AA] hover:bg-[#20B2AA] hover:text-white px-6 py-2 rounded-full font-semibold transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 delay-100"
                        >
                          <Calendar className="h-4 w-4 mr-2" />
                          Book a Site Visit
                        </Button>
                        <Button
                          onClick={(e) => handleEnquire(project, e)}
                          className="bg-[#20B2AA] text-white hover:bg-[#189a93] px-6 py-2 rounded-full font-semibold transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 delay-150"
                        >
                          <Mail className="h-4 w-4 mr-2" />
                          Enquire Now
                        </Button>
                      </div>
                    </div>
                    <div className="p-6">
                      <div className="inline-block px-3 py-1 bg-[#20B2AA]/10 text-[#20B2AA] text-xs font-medium rounded-full mb-3">
                        {project.category}
                      </div>
                      <h3 className="text-2xl font-bold mb-2 text-black group-hover:text-[#20B2AA] transition-colors duration-200">
                        {project.name}
                      </h3>
                      <p className="text-gray-600 text-sm mb-3">{project.address}</p>
                      <div className="flex gap-4 text-sm text-gray-500">
                        {project.units && <span>{project.units} Units</span>}
                        {project.year && <span>• {project.year}</span>}
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Lead Capture Modal */}
      <LeadCaptureModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedProject(null);
        }}
        title={modalTitle}
        defaultInterest={modalInterest}
      />
    </div>
  );
};

export default Portfolio;
