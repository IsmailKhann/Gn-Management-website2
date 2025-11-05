import { useState, useEffect } from 'react';
import { Linkedin } from 'lucide-react';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const About = () => {
  const [team, setTeam] = useState([]);

  useEffect(() => {
    fetchTeam();
  }, []);

  const fetchTeam = async () => {
    try {
      const response = await axios.get(`${API}/team`);
      setTeam(response.data);
    } catch (error) {
      console.error('Error fetching team:', error);
    }
  };

  const milestones = [
    { year: '2015', title: 'Company Created', description: 'GN Management Formed' },
    { year: '2016', title: 'Jersey City Residential Project', description: 'First Residential Project Complete' },
    { year: '2019', title: '3224 Kennedy Blvd.', description: 'First multi-family rental project, Nanak Niwas, at 3224 Kennedy Blvd. Completed' },
    { year: '2020', title: 'Internal company growth', description: 'Reached organization strength of 30+ employees' },
    { year: '2020', title: 'Continued Project Growth', description: 'Achieved the milestone of 50 projects' },
    { year: '2021', title: '161 Van Wagenen Avenue', description: 'Started construction of our premium high-rise project at 161 Van Wagenen Avenue' },
    { year: '2022', title: 'Started construction of project Singh Tower', description: 'Started construction of our flagship high-rise project, Singh Tower, at 628 Summit Avenue' },
    { year: '2024', title: '161 Van Wagenen Completed', description: 'Our premium high-rise project at 161 Van Wagenen Avenue was completed and inaugurated by Mayor Steven Fulluck' },
    { year: '2025', title: 'Singh Tower Completed', description: 'Completed our flagship high-rise project, Singh Tower, proudly rising and shining at 628 Summit Avenue' },
  ];

  return (
    <div className="about-page">
      {/* Hero Section */}
      <section className="relative py-32 bg-gradient-to-br from-gray-900 to-black text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1565577191414-da98f3c4abac?crop=entropy&cs=srgb&fm=jpg&q=85)', backgroundSize: 'cover', backgroundPosition: 'center' }} />
        </div>
        <div className="relative max-w-6xl mx-auto px-6">
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-8 animate-in">About GN Management</h1>
          <p className="text-lg sm:text-xl max-w-3xl text-gray-300 animate-in" style={{ animationDelay: '0.2s' }}>
            GN Management Inc is a real estate advisor that provides real estate and natural resources portfolio management and consulting services to sophisticated institutional investors.
          </p>
        </div>
      </section>

      {/* Company Story */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl sm:text-5xl font-bold mb-6 text-black">Our Story</h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                GN Management is a residential and commercial real estate development and management firm founded by Mr. Onkar Singh in 2010. Mr. Singh sought to invest in improving his Jersey City community through real estate.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                He envisioned changing the mechanical experience of the real estate industry along with pushing innovation and design. This vision came to fruition while building a company focused on teamwork and personal development. Today, the team continues to grow while its foundation of empathy, trust, and family remain at its core.
              </p>
            </div>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1685458454456-e6e3356dea8b?crop=entropy&cs=srgb&fm=jpg&q=85"
                alt="Jersey City Skyline"
                className="rounded-3xl shadow-2xl w-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Leadership Team */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold mb-6 text-black">Leadership Team</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Meet the visionary leaders driving GN Management's success.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <div
                key={member.id}
                data-testid={`team-member-${index}`}
                className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 scale-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="aspect-square overflow-hidden bg-gray-100">
                  <img
                    src={member.image_url || 'https://images.unsplash.com/photo-1629507208649-70919ca33793?crop=entropy&cs=srgb&fm=jpg&q=85'}
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-bold mb-2 text-black">{member.name}</h3>
                  <p className="text-[#20B2AA] font-medium mb-4 uppercase tracking-wide text-sm">{member.role}</p>
                  <p className="text-gray-600 text-sm line-clamp-4">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Milestones Timeline */}
      <section className="py-24 bg-white">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold mb-6 text-black">Our Journey</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              A decade of growth, innovation, and community impact.
            </p>
          </div>
          <div className="relative">
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-[#20B2AA]" />
            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <div
                  key={index}
                  data-testid={`milestone-${index}`}
                  className="relative pl-20 fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="absolute left-4 w-9 h-9 bg-[#20B2AA] rounded-full flex items-center justify-center text-white font-bold shadow-lg">
                    <div className="w-4 h-4 bg-white rounded-full" />
                  </div>
                  <div className="bg-gray-50 rounded-2xl p-6 hover:shadow-lg transition-shadow duration-300">
                    <div className="text-3xl font-bold text-[#20B2AA] mb-2">{milestone.year}</div>
                    <h3 className="text-xl font-bold mb-2 text-black">{milestone.title}</h3>
                    <p className="text-gray-600">{milestone.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24 bg-gradient-to-br from-gray-900 to-black text-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold mb-6">Why GN Management Stands Apart</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { title: 'Visionary Planning', desc: 'We anticipate what neighborhoods can become and work proactively to bring transformation.' },
              { title: 'Integrated Delivery', desc: 'Seamless coordination from site selection through leasing and operations.' },
              { title: 'Relationship-Driven', desc: 'Culture of trust, respect, and family-first values extends to every stakeholder.' },
              { title: 'Recognized Excellence', desc: "Ranked #31 on Inc.'s 2023 Northeast lists as a fast-growing developer." },
            ].map((value, index) => (
              <div
                key={index}
                className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300 scale-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <h3 className="text-xl font-bold mb-3 text-[#20B2AA]">{value.title}</h3>
                <p className="text-gray-300 text-sm">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
