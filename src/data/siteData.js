import {
  FaCarSide,
  FaClipboardCheck,
  FaFileSignature,
  FaHandshake,
  FaHeadset,
  FaMotorcycle,
  FaShieldAlt,
  FaStar,
  FaUniversity,
  FaWallet,
} from 'react-icons/fa';

export const business = {
  name: 'Sri Adhi Vinayaga Auto Consulting & Finance',
  shortName: 'Sri Adhi Vinayaga',
  address: '183, Pappathikadu II Street, Municipal Colony Main Road, Erode, Tamil Nadu - 638004',
  copyright: '© 2026 Sri Adhi Vinayaga Auto Consulting & Finance. All Rights Reserved.',
};

export const navLinks = [
  { label: 'Home', path: '/' },
  { label: 'About', path: '/about' },
  { label: 'Services', path: '/services' },
  { label: 'EMI Calculator', path: '/emi-calculator' },
  { label: 'Gallery', path: '/gallery' },
  { label: 'Testimonials', path: '/testimonials' },
  { label: 'Contact', path: '/contact' },
];

export const services = [
  {
    title: 'Auto Finance',
    icon: FaUniversity,
    text: 'Flexible financing solutions for two-wheelers and four-wheelers with clear repayment guidance.',
  },
  {
    title: 'Vehicle Consulting',
    icon: FaHandshake,
    text: 'Professional advice before purchase, helping you choose vehicles with confidence.',
  },
  {
    title: 'Used Vehicle Finance',
    icon: FaCarSide,
    text: 'Easy financing support for pre-owned cars, bikes, and verified vehicle purchases.',
  },
  {
    title: 'Documentation Support',
    icon: FaFileSignature,
    text: 'RC transfer, insurance, ownership transfer, and paperwork assistance handled with care.',
  },
  {
    title: 'Insurance Guidance',
    icon: FaShieldAlt,
    text: 'Helping customers compare and choose suitable insurance plans for their needs.',
  },
  {
    title: 'Customer Support',
    icon: FaHeadset,
    text: 'Dedicated assistance throughout consultation, approval, documentation, and delivery.',
  },
];

export const stats = [
  { label: 'Happy Customers', value: 5000, suffix: '+' },
  { label: 'Vehicles Financed', value: 3500, suffix: '+' },
  { label: 'Years Experience', value: 10, suffix: '+' },
  { label: 'Approval Success Rate', value: 95, suffix: '%' },
];

export const whyChoose = [
  'Quick Loan Approval',
  'Minimal Documentation',
  'Transparent Process',
  'Competitive Interest Rates',
  'Customer-Centric Service',
  'Trusted Financial Guidance',
];

export const financeServices = [
  {
    title: 'Vehicle Loan Services',
    icon: FaWallet,
    text: 'Structured loan consultation for customers planning to purchase new or used vehicles.',
  },
  {
    title: 'Two Wheeler Finance',
    icon: FaMotorcycle,
    text: 'Practical EMI support for scooters, commuter bikes, premium bikes, and family mobility.',
  },
  {
    title: 'Four Wheeler Finance',
    icon: FaCarSide,
    text: 'Car loan assistance with repayment planning and clear document preparation.',
  },
  {
    title: 'Used Car Finance',
    icon: FaClipboardCheck,
    text: 'Support for pre-owned vehicle finance with transparent eligibility and valuation guidance.',
  },
  {
    title: 'Commercial Vehicle Assistance',
    icon: FaUniversity,
    text: 'Consultation for business-focused vehicle needs, ownership planning, and finance readiness.',
  },
];

export const financeFeatures = [
  'Easy Loan Approval',
  'Partial Prepayment Options',
  'Transparent Charges',
  'Customer-Friendly Repayment Support',
  'Flexible Loan Structures',
  'Personalized Consultation',
];

export const testimonials = [
  {
    name: 'R. Prakash',
    role: 'Car Finance Customer',
    quote: 'The loan process was smooth and transparent. Highly recommended.',
  },
  {
    name: 'M. Kavitha',
    role: 'Two Wheeler Finance Customer',
    quote: 'Excellent support throughout vehicle financing.',
  },
  {
    name: 'S. Aravind',
    role: 'Used Vehicle Customer',
    quote: 'Quick approval and professional guidance from the first call.',
  },
  {
    name: 'N. Suresh',
    role: 'Documentation Support Customer',
    quote: 'They explained every step clearly and helped complete the paperwork without stress.',
  },
  {
    name: 'P. Meena',
    role: 'Insurance Guidance Customer',
    quote: 'A trustworthy team with patient guidance and very clear finance advice.',
  },
  {
    name: 'K. Dinesh',
    role: 'Four Wheeler Finance Customer',
    quote: 'The EMI plan was explained properly, and approval happened faster than expected.',
  },
];

export const gallery = [
  {
    category: 'Cars',
    title: 'Premium Car Finance',
    image: 'https://images.unsplash.com/photo-1542362567-b07e54358753?auto=format&fit=crop&w=1200&q=80',
  },
  {
    category: 'Bikes',
    title: 'Two Wheeler Ownership',
    image: 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=1200&q=80',
  },
  {
    category: 'Customer Success Stories',
    title: 'Vehicle Delivery Moment',
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=1200&q=80',
  },
  {
    category: 'Finance Consultation',
    title: 'Clear Loan Guidance',
    image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=1200&q=80',
  },
  {
    category: 'Office Environment',
    title: 'Professional Advisory Space',
    image: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1200&q=80',
  },
  {
    category: 'Finance Consultation',
    title: 'Documentation Review',
    image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=1200&q=80',
  },
];

export const starArray = Array.from({ length: 5 }, (_, index) => ({ id: index, icon: FaStar }));
