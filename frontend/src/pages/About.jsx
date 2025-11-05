import React, { useState, useEffect } from 'react';
import { Linkedin, Award, Users, TrendingUp, Heart, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const About = () => {
  const [team, setTeam] = useState([]);
  const [selectedMember, setSelectedMember] = useState(null);
  const [activeYear, setActiveYear] = useState(null);
  const [counters, setCounters] = useState({ projects: 0, team: 0, units: 0, years: 0 });

  useEffect(() => {
    fetchTeam();
    animateCounters();
  }, []);

  const fetchTeam = async () => {
    try {
      const response = await axios.get(`${API}/team`);
      setTeam(response.data);
    } catch (error) {
      console.error('Error fetching team:', error);
    }
  };

  const animateCounters = () => {
    const targets = { projects: 50, team: 30, units: 267, years: 10 };
    const duration = 2000;
    const steps = 60;
    const increment = duration / steps;

    let currentStep = 0;
    const timer = setInterval(() => {
      currentStep++;
      const progress = currentStep / steps;
      
      setCounters({
        projects: Math.floor(targets.projects * progress),
        team: Math.floor(targets.team * progress),
        units: Math.floor(targets.units * progress),
        years: Math.floor(targets.years * progress),
      });

      if (currentStep >= steps) {
        clearInterval(timer);
        setCounters(targets);
      }
    }, increment);

    return () => clearInterval(timer);
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
      {/* Hero Section - Enhanced */}
      <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1565577191414-da98f3c4abac?crop=entropy&cs=srgb&fm=jpg&q=85)', backgroundSize: 'cover', backgroundPosition: 'center' }} />
        </div>
        
        <div className="relative max-w-6xl mx-auto px-6 text-center">
          <div className="inline-block mb-6 px-6 py-2 bg-[#20B2AA]/20 backdrop-blur-md border border-[#20B2AA]/30 rounded-full animate-in">
            <span className="text-[#20B2AA] font-medium">Since 2010</span>
          </div>
          
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-8 animate-in" style={{ animationDelay: '0.1s' }}>
            Building Communities,<br />Creating Legacies
          </h1>
          
          <p className="text-lg sm:text-xl max-w-3xl mx-auto text-gray-300 mb-12 animate-in" style={{ animationDelay: '0.2s' }}>
            GN Management Inc is a real estate advisor that provides real estate and natural resources portfolio management and consulting services to sophisticated institutional investors.
          </p>

          {/* Animated Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-12 animate-in" style={{ animationDelay: '0.3s' }}>
            {[
              { value: counters.projects, label: 'Projects', suffix: '+', icon: Award },
              { value: counters.team, label: 'Team Members', suffix: '+', icon: Users },
              { value: counters.units, label: 'Units', suffix: '+', icon: TrendingUp },
              { value: counters.years, label: 'Years', suffix: '+', icon: Heart },
            ].map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6">
                  <Icon className="h-8 w-8 text-[#20B2AA] mx-auto mb-3" />
                  <div className="text-4xl font-bold text-white mb-1">
                    {stat.value}{stat.suffix}
                  </div>
                  <div className="text-sm text-gray-400">{stat.label}</div>
                </div>
              );
            })}
          </div>

          {/* Scroll Indicator */}
          <div className="animate-bounce">
            <ChevronDown className="h-8 w-8 text-[#20B2AA] mx-auto" />
          </div>
        </div>
      </section>

      {/* Company Story - Enhanced with Animation */}
      <section className="py-24 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="slide-in-left">
              <div className="inline-block mb-4 px-4 py-2 bg-[#20B2AA]/10 rounded-full">
                <span className="text-[#20B2AA] font-semibold text-sm">Our Foundation</span>
              </div>
              <h2 className="text-4xl sm:text-5xl font-bold mb-6 text-black">A Vision Rooted in Community</h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                GN Management is a residential and commercial real estate development and management firm founded by <span className="text-[#20B2AA] font-semibold">Mr. Onkar Singh in 2010</span>. Mr. Singh sought to invest in improving his Jersey City community through real estate.
              </p>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                He envisioned changing the mechanical experience of the real estate industry along with pushing innovation and design. This vision came to fruition while building a company focused on <span className="text-[#20B2AA] font-semibold">teamwork and personal development</span>. Today, the team continues to grow while its foundation of empathy, trust, and family remain at its core.
              </p>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <div className="text-3xl font-bold text-[#20B2AA] mb-2">2010</div>
                  <div className="text-sm text-gray-600">Founded</div>
                </div>
                <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <div className="text-3xl font-bold text-[#20B2AA] mb-2">#31</div>
                  <div className="text-sm text-gray-600">Inc. 2023 Northeast</div>
                </div>
              </div>
            </div>
            
            <div className="relative slide-in-right">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl group">
                <img
                  src="https://images.unsplash.com/photo-1546965860-f981527a0422?crop=entropy&cs=srgb&fm=jpg&q=85"
                  alt="Jersey City Waterfront"
                  className="w-full transform group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#20B2AA]/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              
              {/* Floating Stats */}
              <div className="absolute -bottom-8 -left-8 bg-white rounded-2xl p-6 shadow-2xl">
                <div className="text-2xl font-bold text-black mb-1">1M+ sq ft</div>
                <div className="text-sm text-gray-600">Portfolio Size</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Leadership Team - Enhanced Interactive */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="inline-block mb-4 px-4 py-2 bg-[#20B2AA]/10 rounded-full">
              <span className="text-[#20B2AA] font-semibold text-sm">Our Leaders</span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-bold mb-6 text-black">Meet the Visionaries</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              The experienced team driving innovation and excellence in Jersey City real estate.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <div
                key={member.id}
                data-testid={`team-member-${index}`}
                onClick={() => setSelectedMember(selectedMember === member.id ? null : member.id)}
                className={`group relative bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl cursor-pointer transition-all duration-500 scale-in ${
                  selectedMember === member.id ? 'ring-2 ring-[#20B2AA] scale-105' : ''
                }`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="relative aspect-square overflow-hidden bg-gray-100">
                  <img
                    src={member.image_url || 'https://images.unsplash.com/photo-1629507208649-70919ca33793?crop=entropy&cs=srgb&fm=jpg&q=85'}
                    alt={member.name}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  {/* Hover Overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    <Button 
                      size="sm" 
                      className="w-full bg-[#20B2AA] hover:bg-[#189a93] text-white rounded-full"
                    >
                      View Bio
                    </Button>
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-2xl font-bold mb-2 text-black group-hover:text-[#20B2AA] transition-colors duration-200">
                    {member.name}
                  </h3>
                  <p className="text-[#20B2AA] font-medium mb-4 uppercase tracking-wide text-sm">
                    {member.role}
                  </p>
                  
                  <p className={`text-gray-600 text-sm leading-relaxed transition-all duration-300 ${
                    selectedMember === member.id ? 'line-clamp-none' : 'line-clamp-3'
                  }`}>
                    {member.bio}
                  </p>
                  
                  {member.bio.length > 150 && (
                    <button 
                      className="text-[#20B2AA] text-sm font-medium mt-2 hover:underline"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedMember(selectedMember === member.id ? null : member.id);
                      }}
                    >
                      {selectedMember === member.id ? 'Show Less' : 'Read More'}
                    </button>
                  )}
                </div>

                {/* Border Accent */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#20B2AA] to-[#189a93] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Timeline */}
      <section className="py-24 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="inline-block mb-4 px-4 py-2 bg-[#20B2AA]/10 rounded-full">
              <span className="text-[#20B2AA] font-semibold text-sm">Our Journey</span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-bold mb-6 text-black">A Decade of Impact</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              From our founding to becoming a recognized leader in Jersey City development.
            </p>
          </div>
          
          <div className="relative">
            {/* Vertical Line */}
            <div className="absolute left-8 top-0 bottom-0 w-1 bg-gradient-to-b from-[#20B2AA] via-[#189a93] to-[#20B2AA]" />
            
            <div className="space-y-8">
              {milestones.map((milestone, index) => (
                <div
                  key={index}
                  data-testid={`milestone-${index}`}
                  onClick={() => setActiveYear(activeYear === milestone.year ? null : milestone.year)}
                  className="relative pl-24 fade-in cursor-pointer group"
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  {/* Timeline Dot */}
                  <div className={`absolute left-2.5 w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${
                    activeYear === milestone.year 
                      ? 'bg-[#20B2AA] shadow-xl scale-110' 
                      : 'bg-white border-4 border-[#20B2AA] group-hover:bg-[#20B2AA]/10'
                  }`}>
                    <div className={`w-3 h-3 rounded-full transition-colors duration-300 ${
                      activeYear === milestone.year ? 'bg-white' : 'bg-[#20B2AA]'
                    }`} />
                  </div>
                  
                  {/* Content Card */}
                  <div className={`bg-white rounded-2xl p-6 shadow-lg transition-all duration-300 ${
                    activeYear === milestone.year 
                      ? 'ring-2 ring-[#20B2AA] shadow-2xl scale-105' 
                      : 'hover:shadow-xl hover:-translate-y-1'
                  }`}>
                    <div className="flex items-center gap-4 mb-3">
                      <div className="text-3xl font-bold text-[#20B2AA]">{milestone.year}</div>
                      <div className="h-px flex-1 bg-gradient-to-r from-[#20B2AA]/50 to-transparent" />
                    </div>
                    <h3 className="text-xl font-bold mb-2 text-black group-hover:text-[#20B2AA] transition-colors duration-200">
                      {milestone.title}
                    </h3>
                    <p className={`text-gray-600 leading-relaxed transition-all duration-300 ${
                      activeYear === milestone.year ? 'text-base' : 'text-sm'
                    }`}>
                      {milestone.description}
                    </p>
                    
                    {/* Expand Indicator */}
                    {activeYear !== milestone.year && (
                      <div className="mt-3 text-[#20B2AA] text-sm font-medium flex items-center gap-2">
                        Click to expand
                        <ChevronDown className="h-4 w-4" />
                      </div>
                    )}
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
