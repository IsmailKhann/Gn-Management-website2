import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { TrendingUp, Home, Building, CheckCircle2, ArrowRight, Users, Award, Target, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const Services = () => {
  const [activeService, setActiveService] = useState(0);
  const [counters, setCounters] = useState({ projects: 0, units: 0, sqft: 0, years: 0 });

  useEffect(() => {
    const targets = { projects: 50, units: 267, sqft: 1000000, years: 10 };
    const duration = 2000;
    const steps = 60;
    const increment = duration / steps;

    let currentStep = 0;
    const timer = setInterval(() => {
      currentStep++;
      const progress = currentStep / steps;
      
      setCounters({
        projects: Math.floor(targets.projects * progress),
        units: Math.floor(targets.units * progress),
        sqft: Math.floor(targets.sqft * progress),
        years: Math.floor(targets.years * progress),
      });

      if (currentStep >= steps) {
        clearInterval(timer);
        setCounters(targets);
      }
    }, increment);

    return () => clearInterval(timer);
  }, []);

  const services = [
    {
      icon: TrendingUp,
      title: 'Investment',
      tagline: 'Strategic partnerships for high-yield returns',
      description: 'Access high-yield urban real estate projects in one of the most dynamic markets in the U.S. — Jersey City.',
      features: [
        { title: 'Strong Track Record', desc: 'Dozens of successful projects', icon: Award },
        { title: 'Market Access', desc: 'Early entry into emerging corridors', icon: Target },
        { title: 'Integrated Execution', desc: 'Full development oversight', icon: Shield },
        { title: 'Recurring Returns', desc: 'Capital appreciation + cash flow', icon: TrendingUp },
        { title: 'Transparency', desc: 'Detailed updates and analysis', icon: CheckCircle2 },
      ],
      image: 'https://images.unsplash.com/photo-1740904259901-2063800012ab?crop=entropy&cs=srgb&fm=jpg&q=85',
      color: 'from-emerald-500 to-teal-600',
    },
    {
      icon: Home,
      title: 'Rental',
      tagline: 'Premium living spaces with exceptional service',
      description: 'Luxury and boutique rental properties with full in-house management — from construction to tenant services.',
      features: [
        { title: '267+ Units', desc: 'Across 18 prime properties', icon: Building },
        { title: 'Prime Locations', desc: 'Core Jersey City neighborhoods', icon: Target },
        { title: 'In-House Expertise', desc: 'End-to-end management', icon: Users },
        { title: 'Tenant-Centric', desc: 'Responsive leasing & service', icon: CheckCircle2 },
        { title: 'Reliable Team', desc: 'Dedicated maintenance staff', icon: Shield },
      ],
      image: 'https://images.unsplash.com/photo-1745429523617-0d837856ca35?crop=entropy&cs=srgb&fm=jpg&q=85',
      color: 'from-blue-500 to-cyan-600',
    },
    {
      icon: Building,
      title: 'Construction',
      tagline: 'Excellence in every detail, from ground to rooftop',
      description: 'Full-spectrum construction management from pre-construction planning through closeout with rigorous quality control.',
      features: [
        { title: 'Project Execution', desc: 'End-to-end delivery', icon: Building },
        { title: 'Value Engineering', desc: 'Pre-construction optimization', icon: Target },
        { title: 'Vetted Network', desc: 'Top-tier subcontractors', icon: Users },
        { title: 'Quality Control', desc: 'On-site supervision', icon: Shield },
        { title: 'Progress Tracking', desc: 'Real-time reporting', icon: CheckCircle2 },
      ],
      image: 'https://images.unsplash.com/photo-1740904257914-45adcd97040a?crop=entropy&cs=srgb&fm=jpg&q=85',
      color: 'from-orange-500 to-amber-600',
    },
  ];

  return (
    <div className="services-page">
      {/* Hero Section with Animated Stats */}
      <section className="relative py-32 bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1542811029-dd22535dfad1?crop=entropy&cs=srgb&fm=jpg&q=85)', backgroundSize: 'cover', backgroundPosition: 'center' }} />
        </div>
        <div className="relative max-w-6xl mx-auto px-6">
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 animate-in">Our Services</h1>
          <p className="text-lg sm:text-xl max-w-3xl text-gray-300 mb-12 animate-in" style={{ animationDelay: '0.2s' }}>
            Comprehensive real estate solutions spanning investment, rental, and construction management.
          </p>
          
          {/* Animated Counter Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mt-16">
            <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 text-center scale-in">
              <div className="text-4xl font-bold text-[#20B2AA] mb-2">{counters.projects}+</div>
              <div className="text-sm text-gray-300">Projects Delivered</div>
            </div>
            <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 text-center scale-in" style={{ animationDelay: '0.1s' }}>
              <div className="text-4xl font-bold text-[#20B2AA] mb-2">{counters.units}+</div>
              <div className="text-sm text-gray-300">Units Managed</div>
            </div>
            <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 text-center scale-in" style={{ animationDelay: '0.2s' }}>
              <div className="text-4xl font-bold text-[#20B2AA] mb-2">{(counters.sqft / 1000000).toFixed(1)}M+</div>
              <div className="text-sm text-gray-300">Sq Ft Portfolio</div>
            </div>
            <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 text-center scale-in" style={{ animationDelay: '0.3s' }}>
              <div className="text-4xl font-bold text-[#20B2AA] mb-2">{counters.years}+</div>
              <div className="text-sm text-gray-300">Years Experience</div>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Service Cards */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold mb-6 text-black">What We Offer</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Three core services that drive value for our partners and communities.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-20">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <div
                  key={index}
                  data-testid={`service-card-${index}`}
                  onClick={() => setActiveService(index)}
                  className={`group relative bg-white rounded-3xl p-8 cursor-pointer transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 ${
                    activeService === index ? 'ring-2 ring-[#20B2AA] shadow-2xl' : 'shadow-lg'
                  }`}
                >
                  <div className={`absolute top-0 left-0 right-0 h-2 rounded-t-3xl bg-gradient-to-r ${service.color} transition-all duration-300 ${
                    activeService === index ? 'h-3' : ''
                  }`} />
                  
                  <div className="flex items-center gap-4 mb-6">
                    <div className={`p-4 rounded-2xl bg-gradient-to-br ${service.color} transition-transform duration-300 group-hover:scale-110`}>
                      <Icon className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-black">{service.title}</h3>
                  </div>
                  
                  <p className="text-sm text-[#20B2AA] font-medium mb-4">{service.tagline}</p>
                  <p className="text-gray-600 mb-6 leading-relaxed">{service.description}</p>
                  
                  <div className="flex items-center gap-2 text-[#20B2AA] font-medium text-sm group-hover:gap-4 transition-all duration-200">
                    Explore Details
                    <ArrowRight className="h-4 w-4" />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Detailed Service View */}
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
            <div className="grid lg:grid-cols-2">
              <div className="relative h-[400px] lg:h-auto">
                <img
                  src={services[activeService].image}
                  alt={services[activeService].title}
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              </div>
              
              <div className="p-8 lg:p-12">
                <div className="flex items-center gap-3 mb-6">
                  {React.createElement(services[activeService].icon, { className: "h-10 w-10 text-[#20B2AA]" })}
                  <h3 className="text-3xl font-bold text-black">{services[activeService].title}</h3>
                </div>
                
                <p className="text-gray-600 mb-8 leading-relaxed text-lg">
                  {services[activeService].description}
                </p>

                <Accordion type="single" collapsible defaultValue="item-0" className="w-full">
                  {services[activeService].features.map((feature, fIndex) => {
                    const FeatureIcon = feature.icon;
                    return (
                      <AccordionItem key={fIndex} value={`item-${fIndex}`} className="border-b border-gray-200">
                        <AccordionTrigger className="hover:no-underline py-4">
                          <div className="flex items-center gap-3 text-left">
                            <div className="w-10 h-10 rounded-xl bg-[#20B2AA]/10 flex items-center justify-center flex-shrink-0">
                              <FeatureIcon className="h-5 w-5 text-[#20B2AA]" />
                            </div>
                            <div>
                              <div className="font-semibold text-black">{feature.title}</div>
                            </div>
                          </div>
                        </AccordionTrigger>
                        <AccordionContent className="pl-13 text-gray-600">
                          {feature.desc}
                        </AccordionContent>
                      </AccordionItem>
                    );
                  })}
                </Accordion>

                <div className="mt-8">
                  <Link to="/contact">
                    <Button
                      size="lg"
                      className="bg-[#20B2AA] hover:bg-[#189a93] text-white rounded-full px-8 py-6 hover:-translate-y-1 transition-all duration-200"
                    >
                      Request Information
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose GN Section */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold mb-6 text-black">Why Choose GN Management</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Proven expertise, integrated solutions, and unwavering commitment to excellence.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                icon: Award,
                title: 'Proven Track Record',
                description: 'Over a decade of successful projects and satisfied partners across Jersey City.',
                stat: '50+ Projects',
              },
              {
                icon: Users,
                title: 'Full-Service Approach',
                description: 'From acquisition to management, we handle every aspect in-house for seamless execution.',
                stat: '30+ Team Members',
              },
              {
                icon: Target,
                title: 'Market Intelligence',
                description: 'Deep local knowledge and data-driven insights give our partners a competitive edge.',
                stat: '10+ Years Local',
              },
              {
                icon: Shield,
                title: 'Transparent Partnership',
                description: 'Regular updates, clear communication, and complete visibility throughout the process.',
                stat: '96% Occupancy',
              },
            ].map((item, index) => {
              const ItemIcon = item.icon;
              return (
                <div
                  key={index}
                  className="group relative bg-gradient-to-br from-gray-50 to-white rounded-3xl p-8 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100"
                >
                  <div className="flex items-start gap-6">
                    <div className="p-4 rounded-2xl bg-gradient-to-br from-[#20B2AA] to-[#189a93] transition-transform duration-300 group-hover:scale-110 flex-shrink-0">
                      <ItemIcon className="h-8 w-8 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="text-xl font-bold text-black">{item.title}</h3>
                        <span className="text-sm font-bold text-[#20B2AA] bg-[#20B2AA]/10 px-3 py-1 rounded-full">
                          {item.stat}
                        </span>
                      </div>
                      <p className="text-gray-600 leading-relaxed">{item.description}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Investment Snapshot - Enhanced */}
      <section className="py-24 bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1542811029-dd22535dfad1?crop=entropy&cs=srgb&fm=jpg&q=85)', backgroundSize: 'cover', backgroundPosition: 'center' }} />
        </div>
        <div className="relative max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold mb-6">Investment Snapshot: Jersey City</h2>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              Why Jersey City is one of the most dynamic real estate markets in the U.S.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {[
              { label: 'Population Growth', value: '+17%', icon: TrendingUp },
              { label: 'Transit to Manhattan', value: '20 min', icon: Target },
              { label: 'Rental Occupancy', value: '~96%', icon: Home },
              { label: 'GN Asset Portfolio', value: '1M+ sq ft', icon: Building },
              { label: 'Development Pipeline', value: 'Highest in NJ', icon: Award },
            ].map((stat, index) => {
              const StatIcon = stat.icon;
              return (
                <div
                  key={index}
                  className="group bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10 text-center hover:bg-white/10 transition-all duration-300 hover:-translate-y-2 scale-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <StatIcon className="h-8 w-8 text-[#20B2AA] mx-auto mb-3 group-hover:scale-110 transition-transform duration-300" />
                  <div className="text-3xl font-bold text-[#20B2AA] mb-2">{stat.value}</div>
                  <div className="text-sm text-gray-300">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section - Enhanced */}
      <section className="py-24 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-5xl mx-auto px-6">
          <div className="bg-gradient-to-br from-[#20B2AA] to-[#189a93] rounded-[3rem] p-12 lg:p-16 text-white text-center shadow-2xl relative overflow-hidden">
            <div className="absolute inset-0 opacity-10">
              <div className="absolute inset-0" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1740904259901-2063800012ab?crop=entropy&cs=srgb&fm=jpg&q=85)', backgroundSize: 'cover', backgroundPosition: 'center' }} />
            </div>
            <div className="relative">
              <h2 className="text-4xl sm:text-5xl font-bold mb-6">Ready to Partner with Us?</h2>
              <p className="text-lg mb-10 max-w-2xl mx-auto opacity-90">
                Whether you're an investor, prospective tenant, or seeking construction services, let's discuss how we can work together.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/contact">
                  <Button
                    data-testid="contact-services-btn"
                    size="lg"
                    className="bg-white hover:bg-gray-100 text-[#20B2AA] px-10 py-6 text-lg rounded-full hover:-translate-y-1 transition-all duration-200 shadow-lg"
                  >
                    Get in Touch
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link to="/portfolio">
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-2 border-white text-white hover:bg-white/10 px-10 py-6 text-lg rounded-full transition-all duration-200"
                  >
                    View Our Work
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

export default Services;
