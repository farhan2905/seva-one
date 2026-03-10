import { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  Award,
  Users,
  Shield,
  Clock,
  Target,
  Heart,
  CheckCircle,
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { Header, Footer } from '@/components/seva';

export const metadata: Metadata = {
  title: 'About Us - SEVA1',
  description: 'Learn about SEVA1, India\'s trusted home services platform connecting customers with verified professionals.',
};

const values = [
  {
    icon: Target,
    title: 'Our Mission',
    description: 'To make home services accessible, reliable, and affordable for every Indian household while empowering service professionals with fair opportunities.',
  },
  {
    icon: Heart,
    title: 'Customer First',
    description: 'We put our customers at the center of everything we do. Your satisfaction is our top priority, and we go the extra mile to ensure it.',
  },
  {
    icon: Shield,
    title: 'Trust & Safety',
    description: 'Every service professional on our platform is background verified, trained, and continuously rated to ensure your safety and peace of mind.',
  },
  {
    icon: Sparkles,
    title: 'Quality Service',
    description: 'We partner with only the best professionals who share our commitment to excellence. Quality is non-negotiable.',
  },
];

const stats = [
  { icon: Users, value: '50,000+', label: 'Happy Customers' },
  { icon: Award, value: '500+', label: 'Verified Professionals' },
  { icon: Clock, value: '30 min', label: 'Average Response' },
  { icon: CheckCircle, value: '99%', label: 'Satisfaction Rate' },
];

const milestones = [
  { year: '2024', title: 'The Beginning', description: 'SEVA1 was founded with a vision to revolutionize home services in India.' },
  { year: '2024', title: 'First 1000 Customers', description: 'Reached our first milestone of serving 1000 happy customers within months of launch.' },
  { year: '2025', title: 'Pan-India Expansion', description: 'Expanded services to over 20 cities across India with a network of 500+ professionals.' },
  { year: '2026', title: 'Technology Leader', description: 'Launched our mobile app and AI-powered service matching for faster, better service.' },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      <Header />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary/5 via-cyan-500/5 to-indigo-500/5 py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
              Making Home Services{' '}
              <span className="text-gradient">Simple & Reliable</span>
            </h1>
            <p className="text-lg text-slate-600 mb-8">
              SEVA1 is on a mission to transform how Indians access home services. We connect you with skilled, verified professionals for all your household needs.
            </p>
            <Button asChild size="lg" className="gradient-primary text-white gap-2">
              <Link href="/categories">
                Explore Our Services
                <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-slate-900 py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <stat.icon className="w-8 h-8 text-primary mx-auto mb-2" />
                <p className="text-3xl md:text-4xl font-bold text-white mb-1">{stat.value}</p>
                <p className="text-slate-400">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="section-title">What We Stand For</h2>
            <p className="section-subtitle">
              Our values guide every decision we make and every service we deliver
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 hover:shadow-lg transition-shadow"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                  <value.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2">
                  {value.title}
                </h3>
                <p className="text-slate-600 text-sm">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16 md:py-24 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="section-title text-left">Our Story</h2>
              <p className="text-slate-600 mb-4">
                SEVA1 was born from a simple observation: finding reliable home service professionals in India was unnecessarily difficult. Customers struggled with unverified workers, opaque pricing, and inconsistent service quality.
              </p>
              <p className="text-slate-600 mb-4">
                We set out to change that. Today, SEVA1 is India&apos;s fastest-growing home services platform, connecting thousands of customers with verified professionals across AC repair, cleaning, plumbing, electrical work, and more.
              </p>
              <p className="text-slate-600">
                Our technology-driven approach ensures that you get the right professional at the right time, with transparent pricing and a service guarantee that gives you peace of mind.
              </p>
            </div>
            <div className="relative">
              <div className="bg-white rounded-2xl shadow-lg p-8 border border-slate-100">
                <div className="space-y-6">
                  {milestones.map((milestone, index) => (
                    <div key={index} className="flex gap-4">
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 rounded-full gradient-primary text-white flex items-center justify-center font-semibold text-sm">
                          {milestone.year}
                        </div>
                      </div>
                      <div>
                        <h3 className="font-semibold text-slate-900">{milestone.title}</h3>
                        <p className="text-sm text-slate-600">{milestone.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="section-title">Leadership Team</h2>
            <p className="section-subtitle">
              Meet the people driving SEVA1&apos;s mission forward
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              { name: 'Amit Sharma', role: 'Founder & CEO', bio: 'Former tech executive with 15+ years in consumer technology.' },
              { name: 'Priya Patel', role: 'Chief Operations Officer', bio: 'Operations expert who has scaled multiple startups.' },
              { name: 'Rahul Kumar', role: 'Chief Technology Officer', bio: 'Engineering leader passionate about building great products.' },
            ].map((member, index) => (
              <div key={index} className="text-center">
                <div className="w-24 h-24 rounded-full gradient-primary mx-auto mb-4 flex items-center justify-center">
                  <span className="text-3xl font-bold text-white">{member.name.charAt(0)}</span>
                </div>
                <h3 className="text-lg font-semibold text-slate-900">{member.name}</h3>
                <p className="text-primary font-medium text-sm mb-2">{member.role}</p>
                <p className="text-slate-600 text-sm">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-br from-primary via-cyan-600 to-indigo-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Experience Better Home Services?
          </h2>
          <p className="text-white/80 mb-8 max-w-lg mx-auto">
            Join thousands of satisfied customers who trust SEVA1 for their home service needs.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button asChild size="lg" variant="secondary" className="gap-2">
              <Link href="/categories">
                Book a Service
                <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="bg-transparent border-white text-white hover:bg-white hover:text-slate-900">
              <Link href="/contact">
                Contact Us
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
