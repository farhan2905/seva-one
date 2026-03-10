'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  ChevronRight,
  Clock,
  Shield,
  CheckCircle,
  ArrowLeft,
  Calendar as CalendarIcon,
  Loader2,
} from 'lucide-react';
import { Header, Footer } from '@/components/seva';
import { format } from 'date-fns';
import { toast } from 'sonner';

interface ServiceData {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  price: number;
  discountedPrice: number | null;
  duration: number;
  serviceType: string;
  warranty: string | null;
  product: {
    id: string;
    name: string;
    slug: string;
    category: {
      id: string;
      name: string;
      slug: string;
    };
  };
}

interface FormData {
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  address: string;
  city: string;
  pincode: string;
  scheduledAt: Date | undefined;
  notes: string;
}

export default function BookingPage() {
  const params = useParams();
  const router = useRouter();
  const serviceId = params.serviceId as string;
  
  const [service, setService] = useState<ServiceData | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [timeSlot, setTimeSlot] = useState<string>('');
  
  const [formData, setFormData] = useState<FormData>({
    customerName: '',
    customerEmail: '',
    customerPhone: '',
    address: '',
    city: '',
    pincode: '',
    scheduledAt: undefined,
    notes: '',
  });

  const timeSlots = [
    '09:00 AM - 11:00 AM',
    '11:00 AM - 01:00 PM',
    '02:00 PM - 04:00 PM',
    '04:00 PM - 06:00 PM',
    '06:00 PM - 08:00 PM',
  ];

  useEffect(() => {
    const fetchService = async () => {
      try {
        const response = await fetch(`/api/services/${serviceId}`);
        if (!response.ok) throw new Error('Service not found');
        const data = await response.json();
        setService(data);
      } catch (error) {
        console.error('Error fetching service:', error);
        toast.error('Failed to load service details');
      } finally {
        setLoading(false);
      }
    };

    fetchService();
  }, [serviceId]);

  const formatPrice = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatDuration = (minutes: number) => {
    if (minutes < 60) return `${minutes} mins`;
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return mins > 0 ? `${hours}h ${mins}m` : `${hours}h`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!date || !timeSlot) {
      toast.error('Please select a date and time slot');
      return;
    }

    setSubmitting(true);

    try {
      // Combine date and time slot
      const scheduledAt = new Date(date);
      const [startTime] = timeSlot.split(' - ');
      const [hours, minutes] = startTime.split(':');
      const period = startTime.includes('PM') ? 12 : 0;
      scheduledAt.setHours(parseInt(hours) + period, parseInt(minutes), 0, 0);

      const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          serviceId,
          scheduledAt: scheduledAt.toISOString(),
        }),
      });

      if (!response.ok) throw new Error('Failed to create booking');

      toast.success('Booking confirmed successfully!');
      router.push('/');
    } catch (error) {
      console.error('Error creating booking:', error);
      toast.error('Failed to create booking. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!service) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold text-slate-900 mb-4">Service Not Found</h1>
        <Button asChild>
          <Link href="/categories">Browse Services</Link>
        </Button>
      </div>
    );
  }

  const discount = service.discountedPrice
    ? Math.round(((service.price - service.discountedPrice) / service.price) * 100)
    : 0;

  const finalPrice = service.discountedPrice || service.price;

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />

      {/* Breadcrumb */}
      <div className="bg-white py-4 border-b">
        <div className="container mx-auto px-4">
          <nav className="flex items-center gap-2 text-sm flex-wrap">
            <Link href="/" className="text-slate-500 hover:text-primary transition-colors">
              Home
            </Link>
            <ChevronRight className="w-4 h-4 text-slate-400" />
            <Link 
              href={`/categories/${service.product.category.slug}`} 
              className="text-slate-500 hover:text-primary transition-colors"
            >
              {service.product.category.name}
            </Link>
            <ChevronRight className="w-4 h-4 text-slate-400" />
            <Link 
              href={`/products/${service.product.slug}`} 
              className="text-slate-500 hover:text-primary transition-colors"
            >
              {service.product.name}
            </Link>
            <ChevronRight className="w-4 h-4 text-slate-400" />
            <Link 
              href={`/services/${service.slug}`} 
              className="text-slate-500 hover:text-primary transition-colors"
            >
              {service.name}
            </Link>
            <ChevronRight className="w-4 h-4 text-slate-400" />
            <span className="text-slate-900 font-medium">Book</span>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <section className="py-8 md:py-12">
        <div className="container mx-auto px-4">
          <div className="mb-6">
            <Button variant="ghost" asChild className="mb-4">
              <Link href={`/services/${service.slug}`}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Service
              </Link>
            </Button>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Booking Form */}
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 md:p-8"
              >
                <h1 className="text-2xl font-bold text-slate-900 mb-6">
                  Book {service.name}
                </h1>

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Contact Details */}
                  <div>
                    <h2 className="text-lg font-semibold text-slate-900 mb-4">
                      Contact Details
                    </h2>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name *</Label>
                        <Input
                          id="name"
                          placeholder="Enter your name"
                          value={formData.customerName}
                          onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number *</Label>
                        <Input
                          id="phone"
                          type="tel"
                          placeholder="+91 98765 43210"
                          value={formData.customerPhone}
                          onChange={(e) => setFormData({ ...formData, customerPhone: e.target.value })}
                          required
                        />
                      </div>
                      <div className="space-y-2 sm:col-span-2">
                        <Label htmlFor="email">Email Address *</Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="your@email.com"
                          value={formData.customerEmail}
                          onChange={(e) => setFormData({ ...formData, customerEmail: e.target.value })}
                          required
                        />
                      </div>
                    </div>
                  </div>

                  {/* Service Address */}
                  <div>
                    <h2 className="text-lg font-semibold text-slate-900 mb-4">
                      Service Address
                    </h2>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="address">Complete Address *</Label>
                        <Textarea
                          id="address"
                          placeholder="House/Flat No., Building, Street, Landmark"
                          value={formData.address}
                          onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                          required
                          rows={3}
                        />
                      </div>
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="city">City *</Label>
                          <Input
                            id="city"
                            placeholder="Mumbai"
                            value={formData.city}
                            onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="pincode">Pincode *</Label>
                          <Input
                            id="pincode"
                            placeholder="400001"
                            value={formData.pincode}
                            onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
                            required
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Schedule */}
                  <div>
                    <h2 className="text-lg font-semibold text-slate-900 mb-4">
                      Schedule Service
                    </h2>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Select Date *</Label>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              className="w-full justify-start text-left font-normal"
                            >
                              <CalendarIcon className="mr-2 h-4 w-4" />
                              {date ? format(date, 'PPP') : 'Pick a date'}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={date}
                              onSelect={(newDate) => {
                                setDate(newDate);
                                setFormData({ ...formData, scheduledAt: newDate });
                              }}
                              disabled={(date) => date < new Date()}
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                      </div>
                      <div className="space-y-2">
                        <Label>Select Time Slot *</Label>
                        <Select value={timeSlot} onValueChange={setTimeSlot}>
                          <SelectTrigger>
                            <SelectValue placeholder="Choose time slot" />
                          </SelectTrigger>
                          <SelectContent>
                            {timeSlots.map((slot) => (
                              <SelectItem key={slot} value={slot}>
                                {slot}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>

                  {/* Additional Notes */}
                  <div>
                    <Label htmlFor="notes">Additional Notes (Optional)</Label>
                    <Textarea
                      id="notes"
                      placeholder="Any specific instructions or requirements..."
                      value={formData.notes}
                      onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                      rows={2}
                    />
                  </div>

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    size="lg"
                    className="w-full gradient-primary text-white"
                    disabled={submitting}
                  >
                    {submitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Confirming Booking...
                      </>
                    ) : (
                      'Confirm Booking'
                    )}
                  </Button>
                </form>
              </motion.div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 sticky top-24">
                <h2 className="text-lg font-semibold text-slate-900 mb-4">
                  Order Summary
                </h2>

                {/* Service Info */}
                <div className="pb-4 mb-4 border-b border-slate-100">
                  <h3 className="font-medium text-slate-900">{service.name}</h3>
                  <p className="text-sm text-slate-500 mb-2">{service.product.name}</p>
                  <div className="flex items-center gap-4 text-sm text-slate-500">
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {formatDuration(service.duration)}
                    </span>
                    {service.warranty && service.warranty !== 'N/A' && (
                      <span className="flex items-center gap-1">
                        <Shield className="w-4 h-4" />
                        {service.warranty}
                      </span>
                    )}
                  </div>
                </div>

                {/* Pricing */}
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-slate-600">
                    <span>Service Charge</span>
                    <span>{formatPrice(service.price)}</span>
                  </div>
                  {service.discountedPrice && (
                    <div className="flex justify-between text-green-600">
                      <span>Discount</span>
                      <span>-{formatPrice(service.price - service.discountedPrice)}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-slate-600">
                    <span>Convenience Fee</span>
                    <span>Free</span>
                  </div>
                  <div className="pt-3 border-t border-slate-100 flex justify-between font-semibold text-lg">
                    <span>Total</span>
                    <span className="text-primary">{formatPrice(finalPrice)}</span>
                  </div>
                </div>

                {/* Benefits */}
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2 text-slate-600">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span>Verified professionals</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-600">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span>Transparent pricing</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-600">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span>Service warranty included</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
