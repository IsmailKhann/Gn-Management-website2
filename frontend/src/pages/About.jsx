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
  const [visibleMilestones, setVisibleMilestones] = useState(new Set());

  useEffect(() => {
    fetchTeam();
    animateCounters();
    setupScrollAnimations();
  }, []);

  const setupScrollAnimations = () => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = entry.target.getAttribute('data-milestone-index');
            setVisibleMilestones((prev) => new Set([...prev, index]));
          }
        });
      },
      { threshold: 0.2, rootMargin: '0px 0px -100px 0px' }
    );

    setTimeout(() => {
      document.querySelectorAll('[data-milestone-index]').forEach((el) => {
        observer.observe(el);
      });
    }, 100);

    return () => observer.disconnect();
  };

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
    { 
      year: '2015', 
      title: 'Company Created', 
      description: 'GN Management Formed',
      image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?crop=entropy&cs=srgb&fm=jpg&q=85&w=1200'
    },
    { 
      year: '2016', 
      title: 'Jersey City Residential Project', 
      description: 'First Residential Project Complete',
      image: 'https://customer-assets.emergentagent.com/job_jersey-estates/artifacts/sv09982v_2016.jpg'
    },
    { 
      year: '2019', 
      title: '3224 Kennedy Blvd.', 
      description: 'First multi-family rental project, Nanak Niwas, at 3224 Kennedy Blvd. Completed',
      image: 'https://customer-assets.emergentagent.com/job_jersey-estates/artifacts/39wnpvus_2019.jpg'
    },
    { 
      year: '2020', 
      title: 'Internal company growth', 
      description: 'Reached organization strength of 30+ employees',
      image: 'https://images.unsplash.com/photo-1576267423048-15c0040fec78?crop=entropy&cs=srgb&fm=jpg&q=85&w=1200'
    },
    { 
      year: '2020', 
      title: 'Continued Project Growth', 
      description: 'Achieved the milestone of 50 projects',
      image: 'https://images.unsplash.com/photo-1623054339243-0228ef032ae6?crop=entropy&cs=srgb&fm=jpg&q=85&w=1200'
    },
    { 
      year: '2021', 
      title: '161 Van Wagenen Avenue', 
      description: 'Started construction of our premium high-rise project at 161 Van Wagenen Avenue',
      image: 'https://customer-assets.emergentagent.com/job_jersey-estates/artifacts/yabekh0k_2021.jpg'
    },
    { 
      year: '2022', 
      title: 'Started construction of project Singh Tower', 
      description: 'Started construction of our flagship high-rise project, Singh Tower, at 628 Summit Avenue',
      image: 'https://customer-assets.emergentagent.com/job_jersey-estates/artifacts/d69iteex_2022.jpg'
    },
    { 
      year: '2024', 
      title: '161 Van Wagenen Completed', 
      description: 'Our premium high-rise project at 161 Van Wagenen Avenue was completed and inaugurated by Mayor Steven Fulluck',
      image: 'https://customer-assets.emergentagent.com/job_jersey-estates/artifacts/rjc88je1_2024.png'
    },
    { 
      year: '2025', 
      title: 'Singh Tower Completed', 
      description: 'Completed our flagship high-rise project, Singh Tower, proudly rising and shining at 628 Summit Avenue',
      image: 'https://customer-assets.emergentagent.com/job_jersey-estates/artifacts/6na3d9t3_2025.jpeg'
    },
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
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
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
                <div className="relative aspect-[3/4] overflow-hidden bg-gray-100">
                  <img
                    src={member.image_url || 'https://images.unsplash.com/photo-1629507208649-70919ca33793?crop=entropy&cs=srgb&fm=jpg&q=85'}
                    alt={member.name}
                    loading="eager"
                    fetchpriority="high"
                    className="w-full h-full object-cover object-top transform group-hover:scale-110 transition-transform duration-700"
                    style={{ imageRendering: '-webkit-optimize-contrast' }}
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

      {/* Redesigned Timeline with Scroll Animations */}
      <section className="py-24 bg-gradient-to-b from-gray-50 to-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
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
            <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-[#20B2AA] via-[#189a93] to-[#20B2AA] -translate-x-1/2" />
            
            <div className="space-y-20">
              {milestones.map((milestone, index) => {
                const isEven = index % 2 === 0;
                const isVisible = visibleMilestones.has(String(index));
                return (
                  <div
                    key={index}
                    data-testid={`milestone-${index}`}
                    data-milestone-index={index}
                    className={`relative grid lg:grid-cols-2 gap-8 items-center transition-all duration-700 ${
                      isEven ? '' : 'lg:direction-rtl'
                    } ${
                      isVisible 
                        ? 'opacity-100 translate-y-0' 
                        : 'opacity-0 translate-y-10'
                    }`}
                  >
                    {/* Timeline Dot - Center */}
                    <div className="hidden lg:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-gradient-to-br from-[#20B2AA] to-[#189a93] items-center justify-center shadow-2xl z-10 border-4 border-white">
                      <div className="text-white font-bold text-sm">{milestone.year}</div>
                    </div>
                    
                    {/* Content Side */}
                    <div 
                      className={`${isEven ? 'lg:text-right lg:pr-16' : 'lg:pl-16 lg:col-start-2'} transition-all duration-700 delay-200 ${
                        isVisible 
                          ? 'opacity-100 translate-x-0' 
                          : `opacity-0 ${isEven ? 'translate-x-10' : '-translate-x-10'}`
                      }`}
                    >
                      <div className="inline-block lg:block">
                        <div className="bg-white rounded-3xl p-6 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 group">
                          <div className="lg:hidden mb-4 inline-block bg-[#20B2AA] text-white px-4 py-2 rounded-full font-bold text-lg">
                            {milestone.year}
                          </div>
                          <h3 className="text-2xl font-bold mb-3 text-black group-hover:text-[#20B2AA] transition-colors duration-300">
                            {milestone.title}
                          </h3>
                          <p className="text-gray-600 leading-relaxed">
                            {milestone.description}
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    {/* Image Side */}
                    <div 
                      className={`${isEven ? 'lg:pl-16' : 'lg:pr-16 lg:col-start-1 lg:row-start-1'} transition-all duration-700 delay-100 ${
                        isVisible 
                          ? 'opacity-100 translate-x-0' 
                          : `opacity-0 ${isEven ? '-translate-x-10' : 'translate-x-10'}`
                      }`}
                    >
                      <div className="relative rounded-3xl overflow-hidden shadow-2xl group bg-gray-100 max-h-[500px] flex items-center justify-center">
                        <img
                          src={milestone.image}
                          alt={milestone.title}
                          loading="lazy"
                          className="w-full h-auto max-h-[500px] object-contain transform group-hover:scale-105 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#20B2AA]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                        
                        {/* Floating Year Badge on Image */}
                        <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm text-[#20B2AA] px-6 py-3 rounded-2xl font-bold text-2xl shadow-xl z-10">
                          {milestone.year}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Core Values - Interactive Grid */}
      <section className="py-24 bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1564597625335-20ac06202464?crop=entropy&cs=srgb&fm=jpg&q=85)', backgroundSize: 'cover', backgroundPosition: 'center' }} />
        </div>
        
        <div className="relative max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="inline-block mb-4 px-4 py-2 bg-[#20B2AA]/20 backdrop-blur-md border border-[#20B2AA]/30 rounded-full">
              <span className="text-[#20B2AA] font-semibold text-sm">Our Values</span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-bold mb-6">What Sets Us Apart</h2>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              Core principles that guide every decision and drive our success.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { 
                title: 'Visionary Planning', 
                desc: 'We anticipate what neighborhoods can become and work proactively to bring transformation.',
                icon: TrendingUp,
                color: 'from-emerald-500 to-teal-600'
              },
              { 
                title: 'Integrated Delivery', 
                desc: 'Seamless coordination from site selection through leasing and operations.',
                icon: Award,
                color: 'from-blue-500 to-cyan-600'
              },
              { 
                title: 'Relationship-Driven', 
                desc: 'Culture of trust, respect, and family-first values extends to every stakeholder.',
                icon: Heart,
                color: 'from-pink-500 to-rose-600'
              },
              { 
                title: 'Recognized Excellence', 
                desc: "Ranked #31 on Inc.'s 2023 Northeast lists as a fast-growing developer.",
                icon: Users,
                color: 'from-orange-500 to-amber-600'
              },
            ].map((value, index) => {
              const Icon = value.icon;
              return (
                <div
                  key={index}
                  className="group relative bg-white/5 backdrop-blur-md rounded-3xl p-8 border border-white/10 hover:bg-white/10 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl scale-in overflow-hidden"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {/* Gradient Accent */}
                  <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${value.color} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500`} />
                  
                  {/* Icon */}
                  <div className={`mb-6 inline-flex p-4 rounded-2xl bg-gradient-to-br ${value.color} transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-300`}>
                    <Icon className="h-8 w-8 text-white" />
                  </div>
                  
                  <h3 className="text-xl font-bold mb-3 text-white group-hover:text-[#20B2AA] transition-colors duration-200">
                    {value.title}
                  </h3>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    {value.desc}
                  </p>

                  {/* Hover Effect Background */}
                  <div className="absolute inset-0 bg-[#20B2AA]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
