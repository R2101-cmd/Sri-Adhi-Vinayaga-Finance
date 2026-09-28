import { useEffect } from 'react';
import { business, services } from '../data/siteData.js';

const siteUrl = 'https://sav-finance.vercel.app';

const pageMeta = {
  '/': {
    title: 'Sri Adhi Vinayaga Finance | Vehicle & Gold Finance in Erode',
    description: 'Sri Adhi Vinayaga Auto Consulting & Finance provides vehicle finance, gold finance, documentation support, and loan consultation in Erode, Tamil Nadu.',
  },
  '/about': {
    title: 'About Sri Adhi Vinayaga Finance | Erode',
    description: 'Learn about Sri Adhi Vinayaga Auto Consulting & Finance and our customer-focused approach to vehicle and gold finance guidance in Erode.',
  },
  '/services': {
    title: 'Vehicle & Gold Finance Services in Erode | Sri Adhi Vinayaga',
    description: 'Explore two-wheeler, car, used vehicle, commercial vehicle, and gold finance consultation from Sri Adhi Vinayaga in Erode.',
  },
  '/emi-calculator': {
    title: 'EMI Calculator | Sri Adhi Vinayaga Finance Erode',
    description: 'Estimate monthly EMI, total interest, and total payable amount for a vehicle finance plan with Sri Adhi Vinayaga Finance.',
  },
  '/gallery': {
    title: 'Vehicle Gallery | Sri Adhi Vinayaga Finance Erode',
    description: 'Browse current vehicle listings and finance-ready vehicle information from Sri Adhi Vinayaga Auto Consulting & Finance.',
  },
};

function setMeta(name, content) {
  let element = document.querySelector(`meta[name="${name}"]`);
  if (!element) {
    element = document.createElement('meta');
    element.name = name;
    document.head.appendChild(element);
  }
  element.content = content;
}

function setProperty(property, content) {
  let element = document.querySelector(`meta[property="${property}"]`);
  if (!element) {
    element = document.createElement('meta');
    element.setAttribute('property', property);
    document.head.appendChild(element);
  }
  element.content = content;
}

export default function SEO() {
  const pathname = window.location.pathname;
  const meta = pageMeta[pathname] || pageMeta['/'];
  const canonical = `${siteUrl}${pathname === '/' ? '/' : pathname}`;

  useEffect(() => {
    document.title = meta.title;
    setMeta('description', meta.description);
    setMeta('twitter:card', 'summary');
    setMeta('twitter:title', meta.title);
    setMeta('twitter:description', meta.description);
    setProperty('og:type', 'website');
    setProperty('og:url', canonical);
    setProperty('og:title', meta.title);
    setProperty('og:description', meta.description);

    let link = document.querySelector('link[rel="canonical"]');
    if (!link) {
      link = document.createElement('link');
      link.rel = 'canonical';
      document.head.appendChild(link);
    }
    link.href = canonical;

    let schema = document.querySelector('script[data-site-schema]');
    if (!schema) {
      schema = document.createElement('script');
      schema.type = 'application/ld+json';
      schema.dataset.siteSchema = 'true';
      document.head.appendChild(schema);
    }
    schema.textContent = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'FinancialService',
      name: business.name,
      url: siteUrl,
      telephone: business.phone,
      address: {
        '@type': 'PostalAddress',
        streetAddress: business.address,
        addressLocality: 'Erode',
        addressRegion: 'Tamil Nadu',
        postalCode: '638004',
        addressCountry: 'IN',
      },
      areaServed: 'Erode, Tamil Nadu',
      knowsAbout: services.map((service) => service.title),
    });
  }, [canonical, meta.description, meta.title]);

  return null;
}
