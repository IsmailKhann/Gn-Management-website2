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
      {/* Hero Section */}
      <section className="relative py-32 bg-gradient-to-br from-gray-900 to-black text-white">
        <div className="max-w-6xl mx-auto px-6">
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 animate-in">Our Services</h1>
          <p className="text-lg sm:text-xl max-w-3xl text-gray-300 animate-in" style={{ animationDelay: '0.2s' }}>
            Comprehensive real estate solutions spanning investment, rental, and construction management.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="space-y-24">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <div
                  key={index}
                  data-testid={`service-${index}`}
                  className={`grid lg:grid-cols-2 gap-16 items-center ${
                    index % 2 === 1 ? 'lg:flex-row-reverse' : ''
                  }`}
                >
                  <div className={index % 2 === 1 ? 'lg:order-2' : ''}>
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-[#20B2AA]/10 rounded-2xl mb-6">
                      <Icon className="h-8 w-8 text-[#20B2AA]" />
                    </div>
                    <h2 className="text-4xl font-bold mb-6 text-black">{service.title}</h2>
                    <p className="text-lg text-gray-600 mb-8 leading-relaxed">{service.description}</p>
                    <ul className="space-y-3">
                      {service.features.map((feature, fIndex) => (
                        <li key={fIndex} className="flex items-start gap-3">
                          <div className="w-2 h-2 rounded-full bg-[#20B2AA] mt-2 flex-shrink-0" />
                          <span className="text-gray-700">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className={index % 2 === 1 ? 'lg:order-1' : ''}>
                    <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                      <img
                        src={[
                          'https://images.unsplash.com/photo-1740904259901-2063800012ab?crop=entropy&cs=srgb&fm=jpg&q=85',
                          'https://images.unsplash.com/photo-1745429523617-0d837856ca35?crop=entropy&cs=srgb&fm=jpg&q=85',
                          'https://images.unsplash.com/photo-1740904257914-45adcd97040a?crop=entropy&cs=srgb&fm=jpg&q=85',
                        ][index]}
                        alt={service.title}
                        className="w-full h-[400px] object-cover"
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Investment Snapshot */}
      <section className="py-24 bg-gradient-to-br from-gray-900 to-black text-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold mb-6">Investment Snapshot: Jersey City</h2>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              Why Jersey City is one of the most dynamic real estate markets in the U.S.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {[
              { label: 'Population Growth', value: '+17%' },
              { label: 'Transit to Manhattan', value: '20 min' },
              { label: 'Rental Occupancy', value: '~96%' },
              { label: 'GN Asset Portfolio', value: '1M+ sq ft' },
              { label: 'Development Pipeline', value: 'Highest in NJ' },
            ].map((stat, index) => (
              <div
                key={index}
                className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 text-center scale-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="text-3xl font-bold text-[#20B2AA] mb-2">{stat.value}</div>
                <div className="text-sm text-gray-300">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl sm:text-5xl font-bold mb-6 text-black">Ready to Partner with Us?</h2>
          <p className="text-lg text-gray-600 mb-10 max-w-2xl mx-auto">
            Whether you're an investor, prospective tenant, or seeking construction services, let's discuss how we can work together.
          </p>
          <Link to="/contact">
            <Button
              data-testid="contact-services-btn"
              size="lg"
              className="bg-[#20B2AA] hover:bg-[#189a93] text-white px-10 py-6 text-lg rounded-full hover:-translate-y-1 transition-all duration-200"
            >
              Get in Touch
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Services;
