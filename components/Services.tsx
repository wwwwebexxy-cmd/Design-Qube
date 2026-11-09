import Image from "next/image";
import styles from "./Services.module.css";
import ScrollReveal from "./ScrollReveal";

const services = [
  { title: "Commercial & Residential Fit-Out Works", description: "Turnkey offices, retail, showrooms, villas and apartments, from shell and core to furnished spaces.", image: "/images/office-fitout.png" },
  { title: "Construction & Maintenance", description: "Civil construction, structural modifications and preventive maintenance for lasting performance.", image: "/images/hero-villa.png" },
  { title: "Renovation Work", description: "Full-scale renovation and refurbishment to modernize spaces with minimal disruption.", image: "/images/bespoke-kitchen.png" },
  { title: "Acoustic Panel Work", description: "Acoustic treatments for offices, auditoriums, studios and restaurants.", image: "/images/office-fitout.png" },
  { title: "Kitchen Renovation", description: "Modular kitchens, custom cabinetry, countertops and appliance integration.", image: "/images/bespoke-kitchen.png" },
  { title: "Steam & Sauna Bath Work", description: "Luxury steam rooms, saunas and spa installations with considered waterproofing and woodwork.", image: "/images/spa-sauna.png" },
  { title: "Design & Detailed Drawing Work", description: "2D and 3D concepts, CAD, MEP and shop drawings, plus authority approvals.", image: "/images/hero-villa.png" },
  { title: "MEP & Electrical Work", description: "Mechanical, electrical, plumbing, lighting, HVAC, fire safety and power distribution.", image: "/images/office-fitout.png" },
  { title: "Yearly Maintenance Contracting (AMC)", description: "Annual maintenance contracts for villas, offices and buildings, with support when you need it.", image: "/images/hero-villa.png" },
  { title: "Joinery & Custom Furniture Works", description: "Custom wardrobes, TV units, reception counters and furniture, crafted with care.", image: "/images/bespoke-kitchen.png" },
  { title: "False Ceiling & Partition Works", description: "Gypsum and acoustic ceilings, glass partitions and demountable partitions.", image: "/images/office-fitout.png" },
  { title: "Flooring & Painting Solutions", description: "Marble, parquet, vinyl, epoxy, micro-cement and premium paint finishes.", image: "/images/spa-sauna.png" },
  { title: "Smart Home & Automation", description: "Home automation, smart lighting and curtain control for connected living.", image: "/images/hero-villa.png" },
  { title: "Landscape & Outdoor Works", description: "Outdoor spaces with pergolas, decking, BBQ counters and garden lighting.", image: "/images/hero-villa.png" },
  { title: "Authority Approvals & Project Management", description: "Coordinated approvals and project management for a smoother delivery.", image: "/images/office-fitout.png" },
];

export default function Services() {
  return (
    <section id="services" className={styles.servicesSection}>
      <div className="container">
        <ScrollReveal direction="up" delay={0.1}>
          <h2 className="section-title text-gradient">Our Services</h2>
        </ScrollReveal>
        <ScrollReveal direction="up" delay={0.2}>
          <p className="section-subtitle">
            Comprehensive solutions under one QUBE, from concept and detailed drawings through fit-out, approvals and ongoing maintenance.
          </p>
        </ScrollReveal>
        <div className={styles.grid}>
          {services.map((service, index) => (
            <ScrollReveal key={service.title} direction="up" delay={0.1 + (index % 3) * 0.08}>
              <article className={styles.card}>
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  sizes="(max-width: 576px) 100vw, (max-width: 992px) 50vw, 33vw"
                  className={styles.cardImage}
                />
                <div className={styles.overlay}>
                  <h3 className={styles.cardTitle}>{service.title}</h3>
                  <p className={styles.cardDescription}>{service.description}</p>
                </div>
              </article>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
