import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const Portfolio = () => {
  const [projects, setProjects] = useState([]);
  const [activeFilter, setActiveFilter] = useState('All');

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

  const filteredProjects =
    activeFilter === 'All'
      ? projects
      : projects.filter((p) => p.category === activeFilter);

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

      {/* Filter Section */}
      <section className="py-12 bg-white sticky top-0 z-40 shadow-md">
        <div className="max-w-7xl mx-auto px-6">
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
                <Link
                  to={`/portfolio/${project.id}`}
                  key={project.id}
                  data-testid={`project-card-${index}`}
                >
                  <div
                    className="group bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 cursor-pointer scale-in"
                    style={{ animationDelay: `${index * 0.05}s` }}
                  >
                    <div className="aspect-[4/3] overflow-hidden bg-gray-100">
                      <img
                        src={project.image_url || 'https://images.unsplash.com/photo-1692651762918-5c96f87c5448?crop=entropy&cs=srgb&fm=jpg&q=85'}
                        alt={project.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
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
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Portfolio;
