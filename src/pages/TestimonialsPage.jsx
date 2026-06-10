import AnimatedPage from '../components/AnimatedPage.jsx';
import SectionHeading from '../components/SectionHeading.jsx';
import Testimonials from '../components/Testimonials.jsx';
import { testimonials } from '../data/siteData.js';

export default function TestimonialsPage() {
  return (
    <AnimatedPage>
      <section className="section-pad bg-mist">
        <div className="container-max">
          <SectionHeading
            eyebrow="Testimonials"
            title="Customer confidence, in their own words"
            text="Customers choose Sri Adhi Vinayaga Auto Consulting & Finance for transparent loan support, quick guidance, and professional service."
          />
          <Testimonials items={testimonials} />
        </div>
      </section>
    </AnimatedPage>
  );
}
