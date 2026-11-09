import Image from "next/image";
import styles from "./Services.module.css";
import ScrollReveal from "./ScrollReveal";

const services = [
  { title: "Commercial & Residential Fit-Out Works", description: "Complete turnkey fit-out for offices, retail shops, showrooms, villas and apartments, from shell and core to fully furnished spaces.", image: "/images/service-fitout.webp" },
  { title: "Construction & Maintenance", description: "Civil construction, structural modifications and preventive maintenance for lasting performance.", image: "/images/service-construction.webp" },
  { title: "Renovation Work", description: "Full-scale renovation and refurbishment to modernize spaces with minimal disruption.", image: "/images/service-renovation.webp" },
  { title: "Acoustic Panel Work", description: "Acoustic treatments for offices, auditoriums, studios and restaurants.", image: "/images/service-acoustic.webp" },
  { title: "Kitchen Renovation", description: "Modular kitchens, custom cabinetry, countertops and appliance integration for homes and food-service spaces.", image: "/images/service-kitchen.webp" },
  { title: "Steam & Sauna Bath Work", description: "Luxury steam rooms, saunas and spa installations with waterproofing, heating and woodwork.", image: "/images/spa-sauna.png" },
  { title: "Design & Detailed Drawing Work", description: "2D and 3D designs, CAD drawings, MEP coordination, shop drawings and authority approvals.", image: "/images/service-drawings.webp" },
  { title: "MEP & Electrical Work", description: "Mechanical, electrical and plumbing systems, lighting, HVAC, fire safety and power distribution to UAE codes.", image: "/images/service-mep.webp" },
  { title: "Yearly Maintenance Contracting (AMC)", description: "Annual maintenance contracts for villas, offices and buildings, with 24/7 support.", image: "/images/service-maintenance.webp" },
  { title: "Joinery & Custom Furniture Works", description: "In-house joinery for wardrobes, TV units, reception counters and custom furniture.", image: "/images/service-joinery.webp" },
  { title: "False Ceiling & Partition Works", description: "Gypsum and acoustic ceilings, glass partitions and demountable partitions.", image: "/images/service-partitions.webp" },
  { title: "Flooring & Painting Solutions", description: "Marble, parquet, vinyl, epoxy, micro-cement and premium paint finishes.", image: "/images/service-flooring.webp" },
  { title: "Smart Home & Automation", description: "Home automation, smart lighting and curtain control for connected living.", image: "/images/service-smart-home.webp" },
  { title: "Landscape & Outdoor Works", description: "Outdoor spaces with pergolas, decking, BBQ counters and garden lighting.", image: "/images/service-landscape.webp" },
  { title: "Authority Approvals & Project Management", description: "AD Municipality, Civil Defense and ADDC approvals, coordinated with project delivery.", image: "/images/service-project-management.webp" },
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
              <article className={styles.card} tabIndex={0}>
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
