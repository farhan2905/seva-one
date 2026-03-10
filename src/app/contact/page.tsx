'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  MessageSquare,
  Send,
  Loader2,
  CheckCircle,
} from 'lucide-react';
import { Header, Footer } from '@/components/seva';
import { toast } from 'sonner';

export default function ContactPage() {
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setLoading(false);
    setSubmitted(true);
    toast.success('Message sent successfully! We\'ll get back to you soon.');
  };

  const contactInfo = [
    {
      icon: Phone,
      title: 'Phone Support',
      details: '+91 98765 43210',
      subtitle: 'Available 24/7 for urgent queries',
      action: 'tel:+919876543210',
    },
    {
      icon: Mail,
      title: 'Email Us',
      details: 'support@seva1.com',
      subtitle: 'Response within 24 hours',
      action: 'mailto:support@seva1.com',
    },
    {
      icon: MapPin,
      title: 'Visit Us',
      details: 'Mumbai, Maharashtra',
      subtitle: 'India',
      action: '#',
    },
    {
      icon: Clock,
      title: 'Working Hours',
      details: 'Mon - Sat: 8AM - 8PM',
      subtitle: 'Sunday: 9AM - 6PM',
      action: '#',
    },
  ];

  const faqs = [
    {
      question: 'How do I book a service?',
      answer: 'Simply browse our services, select the one you need, choose a convenient time slot, and confirm your booking. It takes less than 2 minutes!',
    },
    {
      question: 'Are your professionals verified?',
      answer: 'Yes, all our service professionals undergo thorough background verification, skill assessment, and training before joining our platform.',
    },
    {
      question: 'What if I\'m not satisfied with the service?',
      answer: 'We offer a 30-day service guarantee. If you\'re not satisfied, we\'ll redo the service for free or refund your money, no questions asked.',
    },
    {
      question: 'Can I reschedule or cancel my booking?',
      answer: 'Yes, you can reschedule or cancel your booking up to 24 hours before the scheduled time without any charges.',
    },
  ];

  return (
    <div className="min-h-screen">
      <Header />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary/5 via-cyan-500/5 to-indigo-500/5 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
              Get in <span className="text-gradient">Touch</span>
            </h1>
            <p className="text-lg text-slate-600">
              Have questions or need assistance? We&apos;re here to help. Reach out to us through any of the channels below.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-12 -mt-8">
        <div className="container mx-auto px-4">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {contactInfo.map((info, index) => (
              <motion.a
                key={index}
                href={info.action}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 hover:shadow-lg hover:border-primary/30 transition-all text-center group"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 group-hover:bg-primary flex items-center justify-center mx-auto mb-4 transition-colors">
                  <info.icon className="w-6 h-6 text-primary group-hover:text-white transition-colors" />
                </div>
                <h3 className="font-semibold text-slate-900 mb-1">{info.title}</h3>
                <p className="text-primary font-medium">{info.details}</p>
                <p className="text-sm text-slate-500">{info.subtitle}</p>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form & Map */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 md:p-8"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <MessageSquare className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-semibold text-slate-900">Send us a Message</h2>
              </div>

              {submitted ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="w-8 h-8 text-green-500" />
                  </div>
                  <h3 className="text-xl font-semibold text-slate-900 mb-2">
                    Message Sent Successfully!
                  </h3>
                  <p className="text-slate-600 mb-6">
                    Thank you for reaching out. Our team will get back to you within 24 hours.
                  </p>
                  <Button onClick={() => setSubmitted(false)} variant="outline">
                    Send Another Message
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Your Name *</Label>
                      <Input
                        id="name"
                        placeholder="John Doe"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address *</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="john@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        required
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="+91 98765 43210"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="subject">Subject *</Label>
                      <Input
                        id="subject"
                        placeholder="How can we help?"
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Your Message *</Label>
                    <Textarea
                      id="message"
                      placeholder="Tell us more about your query..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      required
                      rows={5}
                    />
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    className="w-full gradient-primary text-white"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="mr-2 h-4 w-4" />
                        Send Message
                      </>
                    )}
                  </Button>
                </form>
              )}
            </motion.div>

            {/* FAQ Section */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 md:p-8"
            >
              <h2 className="text-2xl font-semibold text-slate-900 mb-6">
                Frequently Asked Questions
              </h2>

              <div className="space-y-4">
                {faqs.map((faq, index) => (
                  <div key={index} className="p-4 rounded-xl bg-slate-50 border border-slate-100">
                    <h3 className="font-medium text-slate-900 mb-2">
                      {faq.question}
                    </h3>
                    <p className="text-sm text-slate-600">
                      {faq.answer}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-8 p-4 rounded-xl bg-primary/5 border border-primary/10">
                <p className="text-sm text-slate-600">
                  <strong>Still have questions?</strong> Our support team is available 24/7 to help you with any queries.
                </p>
                <Button asChild variant="link" className="p-0 h-auto mt-2 text-primary">
                  <Link href="tel:+919876543210">
                    Call us at +91 98765 43210
                  </Link>
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="bg-slate-900 rounded-3xl p-8 md:p-12 text-center text-white">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Need Immediate Assistance?
            </h2>
            <p className="text-slate-300 mb-6 max-w-lg mx-auto">
              Our customer support team is available round the clock to help you with bookings, queries, or any concerns.
            </p>
            <Button asChild size="lg" variant="secondary" className="gap-2">
              <a href="tel:+919876543210">
                <Phone className="w-4 h-4" />
                Call +91 98765 43210
              </a>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
