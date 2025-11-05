import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, MapPin, Calendar, Building2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const ProjectDetail = () => {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProject();
  }, [id]);

  const fetchProject = async () => {
    try {
      const response = await axios.get(`${API}/projects/${id}`);
      setProject(response.data);
    } catch (error) {
      console.error('Error fetching project:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl text-gray-600">Loading...</div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <div className="text-xl text-gray-600 mb-6">Project not found</div>
        <Link to="/portfolio">
          <Button>Back to Portfolio</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="project-detail-page">
      {/* Back Button */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <Link to="/portfolio">
            <Button variant="ghost" className="hover:bg-gray-100">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Portfolio
            </Button>
          </Link>
        </div>
      </div>

      {/* Hero Image */}
      <section className="relative h-[60vh] overflow-hidden">
        <img
          src={project.image_url || 'https://images.unsplash.com/photo-1740904259901-2063800012ab?crop=entropy&cs=srgb&fm=jpg&q=85'}
          alt={project.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 max-w-7xl mx-auto px-6 pb-12">
          <div className="inline-block px-4 py-2 bg-[#20B2AA] text-white text-sm font-medium rounded-full mb-4">
            {project.category}
          </div>
          <h1 className="text-5xl sm:text-6xl font-bold text-white mb-4">{project.name}</h1>
          <div className="flex items-center gap-6 text-white text-lg">
            <div className="flex items-center gap-2">
              <MapPin className="h-5 w-5" />
              <span>{project.address}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Project Details */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <h2 className="text-3xl font-bold mb-6 text-black">Project Overview</h2>
              <p className="text-lg text-gray-600 leading-relaxed mb-8">
                {project.description ||
                  'This premier development represents GN Management\'s commitment to creating high-quality, sustainable urban living spaces in Jersey City. Featuring modern design, premium amenities, and strategic location, this project exemplifies our vision for community-centric real estate development.'}
              </p>

              <div className="grid sm:grid-cols-3 gap-6 mt-10">
                {project.units && (
                  <div className="bg-gray-50 rounded-2xl p-6">
                    <Building2 className="h-8 w-8 text-[#20B2AA] mb-3" />
                    <div className="text-3xl font-bold text-black mb-1">{project.units}</div>
                    <div className="text-sm text-gray-600">Units</div>
                  </div>
                )}
                {project.square_feet && (
                  <div className="bg-gray-50 rounded-2xl p-6">
                    <Building2 className="h-8 w-8 text-[#20B2AA] mb-3" />
                    <div className="text-3xl font-bold text-black mb-1">{project.square_feet}</div>
                    <div className="text-sm text-gray-600">Square Feet</div>
                  </div>
                )}
                {project.year && (
                  <div className="bg-gray-50 rounded-2xl p-6">
                    <Calendar className="h-8 w-8 text-[#20B2AA] mb-3" />
                    <div className="text-3xl font-bold text-black mb-1">{project.year}</div>
                    <div className="text-sm text-gray-600">Year</div>
                  </div>
                )}
              </div>
            </div>

            {/* Sidebar */}
            <div>
              <div className="bg-gray-900 rounded-3xl p-8 text-white sticky top-24">
                <h3 className="text-2xl font-bold mb-6">Interested in This Project?</h3>
                <p className="text-gray-300 mb-6">
                  Contact us to learn more about investment opportunities or leasing information.
                </p>
                <Link to="/contact">
                  <Button
                    data-testid="contact-about-project-btn"
                    size="lg"
                    className="w-full bg-[#20B2AA] hover:bg-[#189a93] text-white rounded-full py-6"
                  >
                    Get in Touch
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProjectDetail;
