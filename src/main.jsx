import { StrictMode, useEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import '../style.css';

const services = [
  ['WELDING', 'pressure_welding.jpeg', 'Stick, MIG, and TIG welding for structural work, repairs, custom fabrication, and on-site projects.'],
  ['CONSULTING', 'consulting.jpg', 'Practical guidance on materials, fabrication methods, project planning, and welding solutions for your specific job.'],
  ['EQUIPMENT REPAIR', 'equip-repair.jpg', 'Reliable repairs for machinery, frames, brackets, and metal components, helping restore equipment and reduce downtime.'],
  ['MASONRY', 'masonry.jpg', 'Metalwork for masonry projects, including railings, supports, gates, anchors, and custom steel components.'],
];
const copy = 'From one-off repairs to custom fabrication, Xtra Weld brings practical experience and careful workmanship to every project. We work with homeowners, contractors, and local businesses throughout the GTA.';
const projects = [
  ['work1.jpeg', 'Custom fabrication'],
  ['work2.jpeg', 'Structural welding'],
  ['work3.jpeg', 'On-site repairs'],
  ['work4.jpeg', 'Metalwork details'],
  ['work5.jpeg', 'Commercial projects'],
  ['work6.jpeg', 'Built for the GTA'],
];

function Reveal({ children }) {
  const ref = useRef(null);
  useEffect(() => {
    const element = ref.current;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { element.classList.add('show'); observer.disconnect(); }
    });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);
  return <div ref={ref} className="hidden">{children}</div>;
}

function Header() {
  const [open, setOpen] = useState(false);
  const links = [['Home', '#'], ['About', '#about-us-anchor'], ['Services', '#services-anchor'], ['Our Work', '#welding-work'], ['Contact', '#contact-anchor']];
  return <><section id="contact-header"><div><a href="tel:6475550123"><img src="media/phone-icon.png" alt="Phone" /><span>647-555-0123</span></a></div><div><a href="mailto:xtraweld@gmail.com"><img src="media/mail-icon.png" alt="Email" /><span>xtraweld@gmail.com</span></a></div></section>
    <header className="navigation-bar"><div><a href="#"><img className="logo" src="media/full_logo.png" alt="Xtra Weld" /></a></div><button className="nav-toggle" aria-expanded={open} aria-label="Toggle navigation" onClick={() => setOpen(!open)}><span className="hamburger-bar" /><span className="hamburger-bar" /><span className="hamburger-bar" /></button><nav><ul className="navigation-links" data-visible={open}>{links.map(([label, href]) => <li key={label}><a href={href} onClick={() => setOpen(false)}>{label}</a></li>)}</ul></nav></header></>;
}

function Hero() {
  return <section className="header-background"><div className="primary-header-title"><h1>WELDING SERVICES<br />IN THE GTA</h1><h5>Reliable fabrication, repairs, and custom welding for homes, businesses, and job sites across the Greater Toronto Area.</h5><div className="header-button-group"><a id="services-btn" className="btn" href="#services-anchor"><span>OUR SERVICES</span></a><a id="contact-btn" className="btn" href="#contact-anchor"><span>CONTACT US</span></a></div></div><div className="mobile-hero-title">WELDING SERVICES<br />IN THE GTA<div className="header-button-group"><a id="services-btn" className="btn" href="#services-anchor">OUR SERVICES</a><a id="contact-btn" className="btn" href="#contact-anchor">CONTACT US</a></div></div></section>;
}

function About() {
  return <><a id="about-us-anchor" /><section id="about-us-section"><div className="col filler-image"><img src="media/contact_us4.jpg" alt="Welding work" /></div><div className="col p-0 m-0"><div className="subheader"><span /> <div>About Us</div></div><div className="about-us-content"><span><b>Welcome to </b>Xtra Weld</span><br /><br /><p>{copy}</p></div><div className="why-choose-us-section subheader"><div className="pb-1"><b>Why Choose Us?</b></div><span className="subheader-bar" />{['30+ years of welding experience', 'Licensed welding services', 'Custom Projects', 'Competitively priced services'].map(item => <div className="py-2" key={item}><img className="checkmark" src="media/checkmark.png" alt="" /><span>{item}</span></div>)}</div></div><aside className="certifications"><div className="subheader"><span /> <div>Certifications</div></div><p className="certifications-intro">Qualified workmanship, backed by recognized industry standards.</p><div className="certification-list"><div className="certification-card"><img src="media/cwb-logo.png" alt="Canadian Welding Bureau" /><div><strong>CWB</strong><span>Welding standards</span></div></div><div className="certification-card"><img src="media/TSSA-logo.png" alt="Technical Standards and Safety Authority" /><div><strong>TSSA</strong><span>Safety compliance</span></div></div><div className="certification-card certification-card--text"><span className="certification-mark">✓</span><div><strong>Licensed service</strong><span>Professional workmanship</span></div></div></div></aside></section></>;
}

function WorkGallery() {
  return <section className="work-section" id="welding-work"><div className="work-section-inner"><div className="work-section-heading"><div><span>OUR WORK</span><h2>Crafted for the job.</h2></div></div><div className="work-grid">{projects.map(([image, caption]) => <figure className="work-item" key={image}><img src={`media/${image}`} alt={caption} /><figcaption>{caption}</figcaption></figure>)}</div></div></section>;
}

function Services() {
  const [selected, setSelected] = useState(0);
  return <section id="services-section"><a id="services-anchor" /><div className="subheader"><div>Offered Services</div><div><span /></div></div><div className="services-content"><div className="services-layout"><div id="service-tabs">{services.map(([title, , description], index) => <div className="accordion" key={title}><button type="button" className={`accordion__button ${selected === index ? 'accordion__button--active' : ''}`} onClick={() => setSelected(selected === index ? -1 : index)}>{title}</button><div className="accordion__content" style={{ maxHeight: selected === index ? '500px' : 0 }}><p>{description}</p></div></div>)}</div><div className="service-display">{services.map(([title, image, description], index) => <div key={title} className={`service-card ${selected === index ? 'service-card--active' : ''}`} aria-hidden={selected !== index}><div className="service-img"><img src={`media/${image}`} alt="" decoding="async" /></div><div><h5>{title}</h5><p>{description}</p></div></div>)}</div></div></div></section>;
}

function Contact() {
  const [sent, setSent] = useState(false);
  const submit = event => { event.preventDefault(); setSent(true); event.currentTarget.reset(); };
  const cards = [['contact-us-phone.png', 'Phone:', '647-555-0123'], ['contact-us-email.png', 'Email:', 'xtraweld@gmail.com'], ['contact-us-address.png', 'Address:', 'Brampton, Ontario']];
  return <><section id="contact-anchor" className="contact-form-section"><div className="filler-image col-xl-5 col-lg-5"><img src="media/contact_us2.jpg" alt="Welding work" /></div><div className="contact-form col-xl-8 col-lg-8 col-12"><div className="contact-form-title"><span className="subheader-bar" /><div>Contact Us</div></div><div className="contact-details">{cards.map(([image, label, value]) => <div className="contact-detail" key={label}><img src={`media/${image}`} alt="" /><span><b>{label}</b>{label === 'Email:' ? <a href="mailto:xtraweld@gmail.com">{value}</a> : label === 'Phone:' ? <a href="tel:6475550123">{value}</a> : <span>{value}</span>}</span></div>)}</div><div className="contact-form-thanks">Thank you for your interest in Xtra Weld services. You can contact us via email or by completing the form below.</div><div className="input-group"><form onSubmit={submit}>{[['name-input', 'Name', 'text'], ['company-input', 'Company', 'text'], ['email-input', 'Email', 'email'], ['phone-input', 'Phone Number', 'text']].map(([id, label, type]) => <div className="form-group" key={id}><label className={label === 'Name' || label === 'Email' ? 'required' : ''} htmlFor={id}>{label}</label><input type={type} className="form-control" id={id} name={id} placeholder={label} required={label === 'Name' || label === 'Email'} /></div>)}<div className="form-group"><label className="required" htmlFor="message-input">Message</label><textarea className="form-control" id="message-input" name="message" rows="5" placeholder="How can we help you?" required /></div><button id="submit-btn" type="submit" className="btn"><span>Send Message</span></button>{sent && <p role="status">Your message was sent successfully.</p>}</form></div></div></section></>;
}

function App() { return <><Header /><Hero /><Reveal><About /></Reveal><Reveal><Services /></Reveal><Reveal><WorkGallery /></Reveal><Reveal><Contact /></Reveal><section className="footer"><div>Copyright © {new Date().getFullYear()} Xtra Weld. All Rights Reserved.</div></section></>; }
createRoot(document.getElementById('root')).render(<StrictMode><App /></StrictMode>);
