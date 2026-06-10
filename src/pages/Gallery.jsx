import AnimatedPage from '../components/AnimatedPage.jsx';
import Reveal from '../components/Reveal.jsx';
import SectionHeading from '../components/SectionHeading.jsx';
import { gallery } from '../data/siteData.js';

export default function Gallery() {
  return (
    <AnimatedPage>
      <section className="section-pad">
        <div className="container-max">
          <SectionHeading
            eyebrow="Gallery"
            title="Vehicles, consultations, and ownership moments"
            text="A curated visual look at the customer journeys and professional finance environments that shape confident vehicle ownership."
          />
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {gallery.map((item, index) => (
              <Reveal key={item.title} delay={index * 0.05}>
                <article className="group overflow-hidden rounded-lg bg-white shadow-sm">
                  <div className="aspect-[4/3] overflow-hidden">
                    <img className="h-full w-full object-cover transition duration-500 group-hover:scale-105" src={item.image} alt={item.title} />
                  </div>
                  <div className="p-5">
                    <p className="text-sm font-bold uppercase tracking-[0.16em] text-gold">{item.category}</p>
                    <h3 className="mt-2 text-xl font-extrabold text-emeraldDeep">{item.title}</h3>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </AnimatedPage>
  );
}
