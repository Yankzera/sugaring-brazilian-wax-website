import React, { useEffect, useMemo, useState } from 'react';
import logoImage from './assets/logo.png';
import heroImage from './assets/banner-1.jpg';
import aboutImage from './assets/about-img.jpg';
import missionImage from './assets/mission-img.png';
import missionAboutImage from './assets/mission-img-aboutus.png';
import companyImage from './assets/our-company-img.png';

const BOOKING_URL = 'https://sbwax.zenoti.com/webstoreNew/services';
const INSTAGRAM_URL = 'https://www.instagram.com/sugaringbrazilianwax/';
const EMAIL = 'info@sugaringbrazilianwax.com';

const locations = [
  {
    name: 'Tampa, FL',
    address: 'University Collections III, 11844 Bruce B Downs Blvd Unit 11844, Tampa FL 33612',
    phone: '(813) 443-9078',
    hours: ['Tuesday-Friday 9 am-7 pm', 'Saturday 9 am-5 pm', 'Sundays and Mondays closed'],
  },
  {
    name: 'St. Petersburg, FL',
    address: '5115 34th St S, St. Petersburg, FL 33711',
    phone: '(727) 954-0077',
    hours: ['Monday-Friday 9 am-7 pm', 'Saturday 9 am-5 pm', 'Sundays closed'],
  },
];

const serviceCards = [
  ['Sugaring', 'Natural sugar paste removes hair in the direction of growth for a gentler, smoother result.'],
  ['High Frequency', 'A targeted skincare add-on that supports clearer-looking skin and helps calm post-wax irritation.'],
  ['Vajacial', 'A soothing intimate skincare treatment that exfoliates, hydrates and helps prevent ingrown hairs.'],
  ['Cocoa Wax', 'A rich hard wax option designed for smooth results and a more comfortable waxing experience.'],
  ['Hydrojelly Mask', 'A cooling mask treatment that hydrates, calms and refreshes the skin after hair removal.'],
  ['Ear Waxing', 'Removes unwanted hair from the exterior ear and just inside the opening of the ear canal.'],
  ['Full Legs Wax', 'Smooth hair removal from the top of the thighs to the base of the ankles.'],
  ['Chest Waxing', 'Removes unwanted chest hair for a clean, sleek appearance.'],
];

const detailedServices = [
  ['Vajacial', 'Intimate treatment that exfoliates and smooths skin, treats ingrown hairs, smooths bumps around the bikini line, prevents acne and keeps delicate skin hydrated.'],
  ['Ear Waxing', 'Removes hair from the entire exterior of the ear to just inside the opening of the ear canal.'],
  ['Full Legs Wax', 'Removes hair from the top of the thighs to the base of the ankles, front and back. Bikini line, feet and toes are not included.'],
  ['Chest Waxing', 'Smooths the chest by removing unwanted hair for a sleek appearance.'],
  ['Upper Lip Waxing', 'Fast facial hair removal that leaves smooth, hairless skin for three to five weeks.'],
  ['Chin Waxing', 'Ideal for removing excess hair on the chin with a clean finish.'],
  ['Full-Arms Waxing', 'Hot waxing that removes hair on the arms, excluding underarms, hands and fingers.'],
  ['Half-Arms Waxing', 'Quick waxing treatment focused on the forearms.'],
  ['Underarm Waxing', 'Leaves underarms smooth and silky.'],
  ['Sideburn Waxing', 'Removes hair from the sideburn area for a classic look.'],
  ['Stomach Waxing', 'Removes hair from the abdomen to promote a smooth, hair-free stomach.'],
  ['Bikini Line Waxing', 'Removes hair outside the areas seen in a bathing suit or underwear, leaving a rectangle or pear shape.'],
  ['Half-Leg Wax', 'Removes hair from half of the leg with the same care used for bikini waxing.'],
  ['Lower Back Wax', 'Removes unwanted hair from the lower back.'],
  ['Nose Waxing', 'Quickly removes nose hair using wax strips.'],
  ['Shoulder Waxing', 'Provides year-round silky-smooth shoulders.'],
  ['Neck Line', 'Achieves a smooth, hair-free neckline.'],
  ['Hands or Feet Wax', 'Provides smooth hands or feet with a soothing wax treatment.'],
];

const products = [
  ['Brown Sugar Coffee Exfoliating Sugar Scrub', '$18', 'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&w=800&q=80'],
  ['Caribbean Coconut Exfoliating Sugar Scrub', '$18', 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=800&q=80'],
  ['Lavender Exfoliating Sugar Scrub', '$18', 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=800&q=80'],
  ['Mango Grapefruit Exfoliating Sugar Scrub', '$18', 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=800&q=80'],
  ['PFB Vanish', '$28', 'https://images.unsplash.com/photo-1620916297397-a4a5402a3c6c?auto=format&fit=crop&w=800&q=80'],
  ['PFB Vanish + Chromabright', '$32', 'https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?auto=format&fit=crop&w=800&q=80'],
  ['Rosemary Mint Exfoliating Sugar Scrub', '$18', 'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=800&q=80'],
  ['Sensitive Skin Exfoliating Sugar Scrub', '$18', 'https://images.unsplash.com/photo-1619451427882-6aaaded0cc61?auto=format&fit=crop&w=800&q=80'],
];

const routes = {
  home: { label: 'Home', title: 'Home' },
  about: { label: 'About Us', title: 'About Us' },
  services: { label: 'Services', title: 'Services' },
  'body-sculpting': { label: 'Body Sculpting Massage', title: 'Body Sculpting Massage' },
  'lymphatic-drainage': { label: 'Lymphatic Drainage Massage', title: 'Lymphatic Drainage Massage' },
  'eyebrow-lamination': { label: 'Eyebrow Lamination', title: 'Eyebrow Lamination' },
  vajacial: { label: 'Vajacial Treatment', title: 'Vajacial Treatment' },
  products: { label: 'Products', title: 'Products' },
  locations: { label: 'Locations', title: 'Locations' },
  careers: { label: 'Careers', title: 'Careers' },
  privacy: { label: 'Privacy Policy', title: 'Privacy Policy' },
  terms: { label: 'Terms of Service', title: 'Terms of Service' },
};

function getRoute() {
  const route = window.location.hash.replace('#/', '') || 'home';
  return routes[route] ? route : 'home';
}

function go(route) {
  window.location.hash = `/${route}`;
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function Hummingbird({ small = false }) {
  return (
    <svg className={small ? 'bird bird-small' : 'bird'} viewBox="0 0 96 72" aria-hidden="true">
      <path d="M42 36 C24 21 17 10 5 5 C14 25 27 37 42 42 C30 43 19 49 8 61 C25 58 39 52 49 43 C57 48 67 49 78 45 C67 42 61 38 57 33 C68 20 80 12 93 9 C75 4 59 14 49 30 C47 32 45 34 42 36Z" />
      <circle cx="77" cy="24" r="2.4" />
      <path d="M79 25 L94 20" />
    </svg>
  );
}

function SpaIcon({ type = 'sparkle' }) {
  const icons = {
    sparkle: (
      <>
        <path d="M12 2l1.8 6.2L20 10l-6.2 1.8L12 18l-1.8-6.2L4 10l6.2-1.8L12 2Z" />
        <path d="M19 16l.8 2.7L22.5 19l-2.7.8L19 22.5l-.8-2.7-2.7-.8 2.7-.8L19 16Z" />
      </>
    ),
    leaf: (
      <>
        <path d="M20.5 3.5C12 4 5 9.8 4 18.5c8.8-1 14.5-8 16.5-15Z" />
        <path d="M4 18.5c4.8-5.7 9.2-8.9 16.5-15" />
      </>
    ),
    drop: (
      <path d="M12 2.5S5.5 10 5.5 15.2a6.5 6.5 0 0 0 13 0C18.5 10 12 2.5 12 2.5Z" />
    ),
    mask: (
      <>
        <path d="M5 8.5c4.2-2.7 9.8-2.7 14 0v4.2c0 4.1-3.1 7.3-7 7.3s-7-3.2-7-7.3V8.5Z" />
        <path d="M8.8 12.2h.1M15.1 12.2h.1M9.5 16c1.5 1.1 3.5 1.1 5 0" />
      </>
    ),
    wax: (
      <>
        <path d="M8 3h8l1 5H7l1-5Z" />
        <path d="M7 8h10v10a3 3 0 0 1-3 3h-4a3 3 0 0 1-3-3V8Z" />
        <path d="M10 12h4" />
      </>
    ),
    massage: (
      <>
        <path d="M4 15c3-4.5 7.3-5.8 13-4" />
        <path d="M7 19c2.8-3.2 6.5-4.2 11-3" />
        <path d="M9 8a3 3 0 1 1 6 0" />
      </>
    ),
  };

  return (
    <svg className="spa-icon" viewBox="0 0 24 24" aria-hidden="true">
      {icons[type] || icons.sparkle}
    </svg>
  );
}

function App() {
  const [route, setRoute] = useState(getRoute());
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handler = () => {
      setRoute(getRoute());
      setMenuOpen(false);
    };
    window.addEventListener('hashchange', handler);
    return () => window.removeEventListener('hashchange', handler);
  }, []);

  const Page = useMemo(() => ({
    home: HomePage,
    about: AboutPage,
    services: ServicesPage,
    'body-sculpting': BodySculptingPage,
    'lymphatic-drainage': LymphaticPage,
    'eyebrow-lamination': EyebrowPage,
    vajacial: VajacialPage,
    products: ProductsPage,
    locations: LocationsPage,
    careers: CareersPage,
    privacy: PrivacyPage,
    terms: TermsPage,
  }[route] || HomePage), [route]);

  return (
    <>
      <header className="site-header">
        <a className="brand brand-image-only" href="#/home" onClick={() => setMenuOpen(false)} aria-label="Sugaring Brazilian Wax home">
          <img className="brand-logo" src={logoImage} alt="Sugaring Brazilian Wax" />
        </a>
        <button className="menu-button" onClick={() => setMenuOpen(!menuOpen)}>Menu</button>
        <nav className={menuOpen ? 'nav nav-open' : 'nav'}>
          <NavLink route="home" label="Home" currentRoute={route} />
          <NavLink route="about" label="About Us" currentRoute={route} />
          <div className="nav-group">
            <button className={isServicesRoute(route) ? 'active' : ''} onClick={() => go('services')}>Services</button>
            <div className="nav-dropdown">
              <NavLink route="services" label="All Services" currentRoute={route} />
              <NavLink route="body-sculpting" label="Body Sculpting" currentRoute={route} />
              <NavLink route="lymphatic-drainage" label="Lymphatic Massage" currentRoute={route} />
              <NavLink route="eyebrow-lamination" label="Eyebrow Lamination" currentRoute={route} />
              <NavLink route="vajacial" label="Vajacial Treatment" currentRoute={route} />
            </div>
          </div>
          <NavLink route="products" label="Products" currentRoute={route} />
          <NavLink route="locations" label="Locations" currentRoute={route} />
          <a href={BOOKING_URL} target="_blank" rel="noreferrer">Book Now</a>
        </nav>
      </header>
      <main>
        <Page />
      </main>
      <Footer />
      <BackToTop />
    </>
  );
}

function NavLink({ route, label, currentRoute }) {
  return <a className={currentRoute === route ? 'active' : ''} href={`#/${route}`}>{label}</a>;
}

function isServicesRoute(route) {
  return ['services', 'body-sculpting', 'lymphatic-drainage', 'eyebrow-lamination', 'vajacial'].includes(route);
}

function Hero({ eyebrow, title, text, image, children, className = '' }) {
  return (
    <section className={`hero ${className}`}>
      <img src={image} alt="" className="hero-image" />
      <div className="hero-overlay" />
      <div className="hero-content">
        <div className="eyebrow">{eyebrow}</div>
        <h1>{title}</h1>
        <p>{text}</p>
        <div className="hero-badges">
          <span><SpaIcon type="leaf" /> Natural sugaring</span>
          <span><SpaIcon type="sparkle" /> Licensed estheticians</span>
          <span><SpaIcon type="drop" /> Comfort-first care</span>
        </div>
        <div className="button-row">
          <BookButton />
          {children}
        </div>
      </div>
    </section>
  );
}

function BookButton({ children = 'Book Now' }) {
  return <a className="btn btn-primary" href={BOOKING_URL} target="_blank" rel="noreferrer">{children}</a>;
}

function HashButton({ route, children, variant = 'secondary' }) {
  return <a className={`btn btn-${variant}`} href={`#/${route}`}>{children}</a>;
}

function Section({ eyebrow, title, children, className = '' }) {
  return (
    <section className={`section ${className}`}>
      <div className="section-heading">
        {eyebrow && <span className="eyebrow">{eyebrow}</span>}
        <h2>{title}</h2>
      </div>
      {children}
    </section>
  );
}

function HomePage() {
  return (
    <>
      <Hero
        eyebrow="Natural beauty and client comfort"
        title="Book Sugaring Brazilian Wax services"
        text="Always be prepared for the special moments in life!"
        image={heroImage}
      >
        <HashButton route="services">View Our Services</HashButton>
      </Hero>
      <Section eyebrow="Mission" title="Mission - Our Mission Statement">
        <div className="media-split">
          <div className="mission-copy">
            <p>
              Our spa provides first-class services, top-quality products and excellent customer care.
              Our goal is to offer the most comfortable and effective natural sugaring wax services in
              a friendly, professional setting focused on wellness and confidence.
            </p>
            <HashButton route="about" variant="outline">Read more</HashButton>
          </div>
          <img src={missionImage} alt="Before and after sugaring result" />
        </div>
      </Section>
      <Section eyebrow="About Us" title="About Sugaring Brazilian Wax" className="about-home-section">
        <div className="about-split">
          <img src={aboutImage} alt="Sugaring paste applied to skin" />
          <div className="about-copy">
            <p>If having smooth, soft, and healthy skin in an inexpensive way has been what you're looking for, look no further.</p>
            <p>Tired of stubble and razor bumps? You have come to the perfect place.</p>

            <h3>What's the difference between sugaring and waxing?</h3>
            <p>Sugaring is an all-natural, ancient technique for removing unwanted body hair. It was first developed in Egypt and has been used in various forms throughout the world for centuries.</p>
            <p>Sugar paste is made from a mixture of lemon juice, water, and sugar, which is boiled at high temperatures to create a thick but pliable substance. This paste is then applied in the opposite direction of hair growth, then quickly removed in the direction of hair growth. The result? A smoother, more gentle waxing experience that leaves skin soft and moisturized.</p>

            <h3>Why choose sugaring over traditional waxing?</h3>
            <p>While both are effective methods of hair removal, sugar paste is gentler on the skin than traditional hard and soft waxes because it doesn't adhere to live skin cells like traditional wax. It only sticks to dead skin cells and unwanted hair, resulting in less discomfort during removal. Plus, since there are no resins or chemicals added to sugar paste, it's all-natural and more sanitary than other waxes.</p>

            <h3>Benefits of sugaring versus traditional waxing</h3>
            <p>Sugaring is a natural hair removal treatment that has been around for centuries. It is a mixture of lemon, water, and sugar heated to the perfect temperature, applied to the skin, and removed in the opposite direction of hair growth.</p>
            <p>Waxing uses harsh chemicals that can irritate the skin. Sugaring is all-natural and improves the quality of the skin over time. The sugaring paste used with this method only sticks to the hair and dead skin cells, not live skin cells. Therefore it only removes unwanted hair, not healthy skin. Sugaring is much more gentle on the skin. Waxing can tear at the hair follicle when removing hair causing breakage mid-shaft and ingrown hairs to form underneath your skin.</p>
          </div>
        </div>
      </Section>
      <ServicesPreview />
      <Testimonials />
      <InstagramSection />
      <ContactCTA />
    </>
  );
}

function ServicesPreview() {
  return (
    <Section eyebrow="Services" title="Services We Provide" className="soft">
      <p className="lead">We offer the most complete services on the market, including natural sugaring wax and hard wax options.</p>
      <div className="card-grid">
        {serviceCards.map(([title, text]) => <ServiceMini key={title} title={title} text={text} />)}
      </div>
      <div className="button-row centered">
        <HashButton route="services">View All Our Services</HashButton>
        <HashButton route="locations" variant="outline">Request a free estimation</HashButton>
      </div>
    </Section>
  );
}

function ServiceMini({ title, text }) {
  const iconMap = {
    Sugaring: 'leaf',
    'High Frequency': 'sparkle',
    Vajacial: 'mask',
    'Cocoa Wax': 'wax',
    'Hydrojelly Mask': 'drop',
    'Ear Waxing': 'wax',
    'Full Legs Wax': 'sparkle',
    'Chest Waxing': 'massage',
  };

  return (
    <article className="card service-mini">
      <SpaIcon type={iconMap[title] || 'sparkle'} />
      <h3>{title}</h3>
      <p>{text}</p>
    </article>
  );
}

function Testimonials() {
  const items = [
    ['Tianna M.', 'St. Petersburg, FL', 'The sugaring experience was amazing. The space was clean, calming and the service made me feel completely comfortable.'],
    ['Kayla B.', 'Tampa, FL', 'My hair regrowth is softer and sparser. I wish I had switched from shaving sooner.'],
    ['Breanna H.', 'St. Petersburg, FL', 'My esthetician was professional, kind and gave great advice on preventing ingrown hairs.'],
  ];
  return (
    <Section eyebrow="Testimonials" title="What Our Clients Are Saying" className="testimonials-section">
      <div className="testimonial-grid">
        {items.map(([name, city, quote]) => (
          <blockquote className="testimonial" key={name}>
            <p>"{quote}"</p>
            <footer>{name}<span>{city}</span></footer>
          </blockquote>
        ))}
      </div>
    </Section>
  );
}

function InstagramSection() {
  return (
    <section className="instagram-band">
      <div>
        <span className="eyebrow">Social</span>
        <h2>Follow Us On Instagram</h2>
        <p>See spa updates, product highlights and client care education.</p>
      </div>
      <a className="btn btn-primary" href={INSTAGRAM_URL} target="_blank" rel="noreferrer">Follow on Instagram</a>
    </section>
  );
}

function AboutPage() {
  return (
    <>
      <Hero
        eyebrow="About Us"
        title="About Us - Welcome To Our Premier Sugaring Brazilian Wax Spa"
        text="A full-service sugaring spa with first-class services, top-quality products and excellent customer care."
        image="https://images.unsplash.com/photo-1519823551278-64ac92734fb1?auto=format&fit=crop&w=1800&q=80"
        className="about-page-hero"
      />
      <Section eyebrow="Mission" title="Our Mission Statement" className="about-mission-section">
        <div className="about-mission-layout">
          <div className="about-mission-copy">
            <p>The premier full-service Sugaring Brazilian Wax spa offers first-class services, top-quality products, and excellent customer care. To provide the most comfortable and the most effective natural waxing services to all our clients.</p>
          </div>
          <img src={missionAboutImage} alt="Sugaring Brazilian Wax spa mission" />
        </div>
      </Section>
      <Section eyebrow="Our Safety Standards" title="Waxing Safety" className="about-safety-section soft">
        <div className="about-text-stack about-panel">
          <p className="lead">Remember that a little prevention will go a long way to save you from some really annoying side effects which could ruin your perfect wax.</p>
          <p>Even though our professional and licensed waxing technicians always follow the proper protocols and use high-quality products to prevent or minimize side effects, the client should always take proper care of his or her skin at home 24 to 48 hours before and after the treatment.</p>
          <p>For example - going to the pool or using tight clothes right after a wax - could lead to uncomfortable and unwanted side effects.</p>

          <h3>Do not wax</h3>
          <ul>
            <li>Irritated, inflamed, or open wounds.</li>
            <li>Your legs, if you have varicose veins.</li>
            <li>Any area that has a rash, recent scar tissue, skin graft, cold sore, mole, wart, or pimple.</li>
            <li>Any part of your face or body where you have received Botox or collagen injections.</li>
            <li>Anywhere that has been waxed within the last 24 hours.</li>
            <li>Over or around body piercings.</li>
            <li>Areas where you have recently used skin care products that contain salicylic acid, glycolic acid, and/or alpha hydroxyl acids of any kind.</li>
            <li>If you have recently received aggressive exfoliation of the skin, such as microdermabrasion, dermabrasion, and/or chemical peels.</li>
            <li>If you have taken or are using prescription medications, such as antibiotics, Accutane, topical ointments or creams (e.g., RetinA or Renova), and/or acne medication.</li>
            <li>If you have lupus or AIDS or you are in cancer therapy getting chemotherapy or radiation.</li>
            <li>If you have been in direct sunlight for a long period of time or in a tanning bed within the last 24 hours or your skin is sunburned.</li>
          </ul>

          <h3>Are you eligible for waxing? How do I know if wax is for me?</h3>
          <p>How do I know if wax is for me? If you have any of the conditions below, notify your beautician immediately and be aware of the risks you take when waxing.</p>
          <p>Here are some of the main contraindications:</p>
          <p><strong>High blood sugar:</strong> when the hair is ripped out, a superficial layer of skin is removed, too, making the skin more vulnerable to environmental agents that could cause infection. Since high blood sugar can delay healing, the skin will be unprotected for longer.</p>
          <p><strong>Skin medication:</strong> if it's been less than a year since you last took Accutane, you are not eligible for waxing. Other medication for acne must be discontinued at least three months prior to the waxing appointment. This medication can cause skin to over-exfoliate, increasing the risk of skin ripping or lifting.</p>
          <p><strong>Antibiotics:</strong> taking antibiotics can sensitize the skin, making waxing not a good choice for you. Better you wait for the end of your treatment.</p>
          <p><strong>Skin problems:</strong> if you suffer from acne, eczema, psoriasis or other skin issues, you should wait until they are in remission or avoid waxing altogether. Likewise, avoid waxing on scarred, irritated, injured or bruised skin.</p>

          <h3>After Waxing</h3>
          <ul>
            <li>Do Not Touch Freshly Waxed Skin, always wash your hands before touching the waxing area for at least 24 hours.</li>
            <li>Do Not Use thick body butters, heavily scented or colored body washes, sprays, lotions, or deodorants. Vaseline can clog your open pores and cause bumps, while fragrances or colorants can increase the risk for irritations on sensitive, freshly waxed skin.</li>
            <li>Do Not Pick on Ingrown Hairs, leave them alone for at least 48 hours, then exfoliate the waxed area gently, focusing on the ingrowns. If exfoliation does not remove the ingrown, try a special ingrown hair serum.</li>
            <li>Do Not have Hot Showers for at least 48 hours, only warm or cold showers.</li>
            <li>Do not go tanning. Make sure to wait at least 48 hours before sun exposure if you don't want to run the risk of burns and scarring. If you want to tan after the first three days after treatment, wear at least SPF 15 protection.</li>
            <li>Do Not Go Swimming. Wait at least 48 hours to swim in the beach or the pool after waxing. The chlorine in pool water can be harsh on sensitive skin as well, apart from the fact that swimming pools can carry bacteria that might unleash an infection.</li>
            <li>Do Not Work out for at least 12 hours, may sound extreme, but it is just a preventive measure. Sweat (and the bacteria that can thrive in sweaty skin), as well as friction, might cause more damage than good on your sensitized skin, so why take the chance? If you do work out, keep it light.</li>
          </ul>

          <h3>Hygiene & Safety Standards</h3>
          <p><strong>Your safety is always our first priority.</strong></p>
          <ul>
            <li>Our salon is always clean and tidy with pleasant ambient music.</li>
            <li>Our esthetician is always wearing new gloves during any waxing procedure.</li>
            <li>Our esthetician is always wearing a face mask inside the room.</li>
            <li>Our wax pot is clean and the roller is cleaned and sanitized between clients.</li>
            <li>Our staff disinfect and sanitize the tools after procedures.</li>
            <li>All wax sticks are immediately thrown away after use. We never double-dipped in the wax pot!</li>
            <li>Our wax table is sanitized with disinfectant wipes after each guest and covered with a fresh and new sheet of table paper.</li>
            <li>Hand sanitizer is available for you to use before we begin your appointment. We have a contactless checkout.</li>
            <li>All surfaces are sanitized and cleaned in between each appointment for your safety.</li>
          </ul>
        </div>
      </Section>
      <Section eyebrow="Company" title="Our Company" className="about-company-section">
        <div className="about-company-layout">
          <img src={companyImage} alt="Sugaring Brazilian Wax company" />
          <div className="about-text-stack about-panel about-company-copy">
            <p>At Sugaring Brazilian Wax, we encourage you to come into our spa and let us give you the best Brazilian Wax experience ever. Our Brazilian Waxing includes just about everything that needs to be removed. We have been providing exceptional service to our clientele since 2022.</p>
            <p>All our estheticians are licensed, and skilled professionals, who have been working in the business for years. Don't think or worry about any pain, because we are here to please serve you. So come see us, let us give you a little pampering at Sugaring Brazilian Wax.</p>
            <p>Reasons to choose Sugaring Brazilian Wax - we do not recycle wax, no double-dipping, and offer a quality service in a clean and fresh environment using entirely disposable products. After you have had sugaring done by Sugaring Brazilian Wax, we promise and guarantee you'll be leaving with flawless skin and a smile.</p>
            <p>Sugar waxing is free of chemical additives, artificial ingredients, and raw sugar cane. It is a natural product that will not burn or irritate your skin. The sugar paste is applied in the opposite direction of the hair growth to pull out the hair follicle from its root. The sugar paste only adheres to dead skin cells, and therefore, it does not break or tear the skin upon removal.</p>
            <p>The Sugaring Brazilian Wax is very safe for all skin types, including sensitive areas such as your bikini zone, face, underarms, etc. As a bonus, it doesn't leave behind any sticky residue as other products do, and there's no need to use strips to remove it!</p>
            <p>Are you ready for an ouch-free Sugaring Brazilian wax? Our certified estheticians are ready to help!</p>

            <h3>Our Scheduling Policy</h3>
            <h3>Scheduling Policy</h3>
            <p>Online booking via the web or on the app is the quickest and easiest way to make an appointment. You are free to call and text anytime. Messages will be answered as soon as possible.</p>
            <p>When scheduling your first appointment, a valid credit card number on file is required. This is for the purpose of our cancellation/ no show policies. You may also use this card on file to pay for deposits and at checkout.</p>
            <p>If you are having trouble finding enough time available for the services you would like, that probably means we are booked. Multiple services may be condensed and they vary for each client so please reach out so we can get you set up for the right amount of time and find a spot for you.</p>
            <p>We understand that life gets busy and unexpected things can come up. We value each and every one of our clients and want to be as accommodating as possible. Because of our high demand for appointment requests and to allow us to accommodate everyone, we have a few simple requests that we have to put into place to respect the business, and the service providers time as well as your time.</p>

            <h3>Cancellation Policy</h3>
            <p>Kindly give us a 24-48 hour notice for rescheduling/cancellations. Your time slot is reserved just for you and may not be able to be filled when you cancel.</p>
            <p>No shows or missed appointments will be a fee of 50% of the services missed. Your credit card will be charged the fee at time of cancellation.</p>

            <h3>No Show Policy:</h3>
            <p>No-shows: Missed appointments will be a fee 50% of scheduled services and charged accordingly.</p>

            <h3>Confirmations:</h3>
            <p>Please confirm your appointment when you receive the confirmation text. Each client receives a confirmation via text 48 hours prior that you will be able to click on to confirm your services. Any services that you no longer would like should be canceled at that time to free up the time for someone else.</p>

            <h3>Late Appointments:</h3>
            <p>We make every consideration to accommodate our clients if they are late. Please keep in mind that we book appointments in 30 minute increments. Depending on the service, we cannot accommodate our clients that are over 10 minutes late for a 30 minutes time slot. If you have multiple services, we may not be able to complete all of them and your appointment may have to be rescheduled. We understand things happen in life like traffic, kids, jobs etc., but please allow ample time to make your appointment time.</p>

            <h3>Scheduling Etiquette:</h3>
            <p>Please understand that when you forget or cancel your appointment without giving enough notice, we miss the opportunity to receive services.</p>
            <p>We strive to get you the time slot for the services you desire, so we always appreciate our clients booking ahead. That way we can guarantee you get waxed when you need to be.</p>
            <p>Despite our reminders, it is ultimately your responsibility to remember appointment dates and times to avoid tardy/missed appointments, and being charged according to our policy.</p>

            <h3>Pricing:</h3>
            <p><em>*Pricing subject to change at any time without notice*</em></p>
          </div>
        </div>
      </Section>
      <ContactCTA />
    </>
  );
}

function ServicesPage() {
  return (
    <>
      <Hero
        eyebrow="Services"
        title="Natural, gentle and effective hair removal"
        text="Sugaring paste is applied at room temperature, adheres to hair rather than live skin and can remove very short hairs."
        image="https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=1800&q=80"
      />
      <Section eyebrow="Sugaring" title="Introduction to Sugaring" className="services-intro-section">
        <div className="about-panel services-intro-panel">
          <SpaIcon type="leaf" />
          <p className="lead">Each sugaring appointment includes thoughtful details such as a hot towel, aromatherapy and massage after treatment. All equipment is sterilized and the experience is designed around comfort and visible results.</p>
        </div>
      </Section>
      <Section eyebrow="Service Menu" title="Choose your treatment" className="services-menu-section soft">
        <div className="service-list">
          {detailedServices.map(([name, summary]) => (
            <article className="service-row" key={name}>
              <div className="service-row-content">
                <SpaIcon type={serviceIcon(name)} />
                <div>
                  <h3>{name}</h3>
                  <p>{summary}</p>
                </div>
              </div>
              <BookButton />
            </article>
          ))}
        </div>
      </Section>
      <Section eyebrow="Waxing Options" title="Hard Waxing" className="services-hard-section">
        <div className="about-panel services-hard-panel">
          <SpaIcon type="wax" />
          <p className="lead">Hard wax removes hair at the root, leaving skin smooth. It is applied warm and removed without strips. Different formulas are selected for Brazilian waxing versus delicate facial areas, so each service is tailored to the skin and body area.</p>
        </div>
      </Section>
      <ClosingCTA text="Schedule your sugaring appointment today. We have locations in St. Petersburg, FL, and Tampa, FL." />
    </>
  );
}

function BodySculptingPage() {
  return <ServiceArticle
    title="Rejuvenating Body Sculpting Massage in St. Petersburg, FL"
    image="https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&w=1800&q=80"
    intro="A deeply therapeutic experience designed to tone, contour and rejuvenate the body, combining expert technique, top-quality products and a client-focused approach."
    sections={[
      ['How it works', 'Body sculpting massage blends targeted massage movements with advanced techniques to smooth skin, increase circulation and support lymphatic flow. It enhances contour, reduces puffiness and offers a gentle, non-invasive method.'],
      ['Why choose this spa', 'Our reputation is built on excellence. Every service is performed with precision and professionalism, and the same high standards used for sugaring are applied to body sculpting and lymphatic massage.'],
      ['What to expect', 'Your appointment begins with a consultation followed by rhythmic movements that target specific areas. Results are supported by consistent skincare and wellness habits.'],
    ]}
    benefits={['Improves circulation and oxygen flow.', 'Reduces water retention.', 'Encourages lymphatic drainage.', 'Temporarily smooths the appearance of cellulite.', 'Enhances body definition.', 'Supports relaxation and detoxification.']}
    faqs={[
      ['What is a body sculpting massage?', 'It is a massage designed to improve circulation, support lymphatic drainage and enhance body contours.'],
      ['How soon will I see results?', 'Clients often notice improvements after one session.'],
      ['Is it safe for first-time clients?', 'Yes. It is gentle and non-invasive.'],
      ['Can I combine this with other services?', 'Yes. Many clients pair sessions with skincare or hair removal.'],
    ]}
  />;
}

function LymphaticPage() {
  return <ServiceArticle
    title="Rejuvenating Lymphatic Massage in St. Petersburg, FL"
    image="https://images.unsplash.com/photo-1591343395082-e120087004b4?auto=format&fit=crop&w=1800&q=80"
    intro="Designed to enhance the body's natural detoxification process by stimulating the lymphatic system, reducing fluid retention and improving circulation."
    sections={[
      ['Skin health benefits', 'Lymphatic massage helps remove toxins, reduce puffiness and inflammation, and smooth minor cellulite. Combining the massage with Hydrojelly Masks or Vajacials can support smoother, healthier skin.'],
      ['Why choose this spa', 'We use top-quality products, provide a first-class experience and tailor care to individual wellness goals.'],
      ['What to expect', 'Your appointment includes a consultation, gentle rhythmic techniques to stimulate lymph flow and tips for post-treatment care.'],
    ]}
    faqs={[
      ['How is lymphatic massage different from regular massage?', 'It uses lighter, rhythmic movements focused on lymph flow instead of deep muscle pressure.'],
      ['Is it suitable for first-time spa clients?', 'Yes. It is gentle, calm and highly client-focused.'],
      ['How often should I book?', 'Frequency depends on your goals, but many clients book weekly or monthly sessions.'],
      ['Does it help with swelling or fluid retention?', 'It may help reduce puffiness and support natural fluid movement.'],
    ]}
    closing="Book Your Lymphatic Drainage Massage Today"
  />;
}

function EyebrowPage() {
  return <ServiceArticle
    title="Professional Eyebrow Lamination in Tampa, FL"
    image="https://images.unsplash.com/photo-1596755389378-c31d21fd1273?auto=format&fit=crop&w=1800&q=80"
    intro="We align brow hairs in place to create fuller, smoother brows while maintaining skin health."
    sections={[
      ['Enhancing facial symmetry', 'Brow lamination transforms facial appearance by creating balanced, symmetrical brows and can be paired with facial sugaring, hydrojelly masks or lymphatic massage.'],
      ['Comfort and personalization', 'Sessions are customized based on brow shape, hair type and desired style. Estheticians guide clients through consultation and aftercare in a welcoming environment.'],
      ['Support skin health', 'Our all-natural sugaring paste is made from lemon, water and sugar and adheres only to dead skin cells and hair for minimal irritation.'],
      ['Comprehensive spa services', 'Pair brow lamination with facial treatments, body waxing or lymphatic drainage massage for a full spa experience.'],
      ['Aftercare and longevity', 'Avoid moisture, heat and friction for 24-48 hours and schedule regular touch-ups.'],
    ]}
    faqs={[
      ['How long does a session take?', 'Most sessions take 30-45 minutes.'],
      ['How are sessions customized?', 'We consider brow shape, hair type and your preferred finish.'],
      ['Is it suitable for sensitive skin?', 'Yes. The service is designed to be safe and gentle.'],
    ]}
    closing="Schedule Your Brow Lamination Appointment Today - We also serve St. Petersburg, FL"
  />;
}

function VajacialPage() {
  return <ServiceArticle
    title="Professional Vajacial Treatment in Tampa, FL - Also serving St. Petersburg"
    image="https://images.unsplash.com/photo-1600334129128-685c5582fd35?auto=format&fit=crop&w=1800&q=80"
    intro="An intimate skincare treatment designed to soothe, restore and protect delicate skin. Pairing a Brazilian service with a vajacial helps prevent ingrown hairs, calm inflammation and maintain long-term skin health."
    sections={[
      ['Skin wellness', 'The vajacial cleanses pores, extracts trapped ingrown hairs and rejuvenates skin with targeted serums and calming modalities. Hydrojelly masks, high frequency therapy or lymphatic massage can enhance results.'],
      ['Comfort and personalized care', 'Estheticians provide expert technique, gentle touch and thorough aftercare guidance. Sugaring adheres only to dead skin and hair, reducing irritation and ensuring smoother regrowth.'],
      ['Complementary services', 'Pair your vajacial with hydrojelly masks, high frequency treatments or full-body sugaring and hard wax options.'],
      ['Confidence and personalization', 'Every service is tailored to your unique skin needs and grooming goals.'],
    ]}
    faqs={[
      ['When should I schedule it?', 'Immediately after a Brazilian or within a few days.'],
      ['How often should I book?', 'Every four to six weeks or one to two months.'],
      ['Is it safe for all skin types?', 'Yes. Products are chosen for delicate areas and can be tailored to allergies or sensitivities.'],
    ]}
    closing="Schedule Your Appointment Today - We also serve St. Petersburg"
  />;
}

function ServiceArticle({ title, image, intro, sections, benefits, faqs, closing }) {
  return (
    <>
      <Hero eyebrow="Specialty Service" title={title} text={intro} image={image}>
        <HashButton route="services">View All Our Services</HashButton>
      </Hero>
      {sections.map(([heading, text]) => (
        <Section title={heading} key={heading}>
          <p className="lead">{text}</p>
        </Section>
      ))}
      {benefits && <Section title="Benefits" className="soft"><ul className="check-list">{benefits.map(item => <li key={item}>{item}</li>)}</ul></Section>}
      <FAQ items={faqs} />
      <ClosingCTA text={closing || 'Schedule your appointment today.'} />
    </>
  );
}

function FAQ({ items }) {
  return (
    <Section title="Frequently Asked Questions" className="soft">
      <div className="faq-grid">
        {items.map(([q, a]) => (
          <article className="faq" key={q}>
            <SpaIcon type="sparkle" />
            <h3>{q}</h3>
            <p>{a}</p>
          </article>
        ))}
      </div>
    </Section>
  );
}

function ProductsPage() {
  return (
    <>
      <Hero
        eyebrow="Beauty Products"
        title="Products for smoother, healthier skin"
        text="Explore aftercare essentials selected to support exfoliation, hydration and smoother results between appointments."
        image="https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=1800&q=80"
      />
      <Section title="Showing all 8 results">
        <div className="shop-toolbar">
          <span>Beauty Products</span>
          <select aria-label="Sort products">
            <option>Default sorting</option>
            <option>Sort by popularity</option>
            <option>Sort by average rating</option>
            <option>Sort by latest</option>
            <option>Sort by price</option>
          </select>
        </div>
        <div className="product-grid">
          {products.map(([name, price, image]) => (
            <article className="product-card" key={name}>
              <img src={image} alt={name} />
              <div>
                <span className="category">Beauty Products</span>
                <h3>{name}</h3>
                <p className="rating">★★★★★</p>
                <p className="price">{price}</p>
                <p>Product available in store.</p>
                <BookButton>Add to cart</BookButton>
              </div>
            </article>
          ))}
        </div>
      </Section>
      <ContactCTA />
    </>
  );
}

function LocationsPage() {
  return (
    <>
      <PageTitle title="Locations - St. Petersburg, FL and Tampa, FL" />
      <Section title="Visit Sugaring Brazilian Wax">
        <p className="lead">Hair removal can be tiring and embarrassing. Try Sugaring Brazilian Wax and enjoy a fast, effective method that boosts self-esteem. Available cities: St. Petersburg and Tampa.</p>
        <div className="location-grid">
          {locations.slice().reverse().map(location => <LocationCard key={location.name} location={location} />)}
        </div>
      </Section>
    </>
  );
}

function CareersPage() {
  return (
    <>
      <PageTitle title="Careers at Sugaring Brazilian Wax" breadcrumb="Home / Careers" />
      <Section title="Apply now to work with us">
        <div className="content-columns">
          <div>
            <p className="lead">Join a licensed spa team focused on professional service, client comfort and clean beauty standards in Tampa and St. Petersburg.</p>
          </div>
          <div className="card career-card">
            <SpaIcon type="sparkle" />
            <h3>Send your application</h3>
            <p>Tell us about your esthetics experience, preferred location and availability.</p>
            <a className="btn btn-primary" href={`mailto:${EMAIL}?subject=Sugaring Brazilian Wax Career Application`}>Apply by email</a>
          </div>
        </div>
      </Section>
      <ContactCTA />
    </>
  );
}

function PrivacyPage() {
  return (
    <>
      <PageTitle title="Privacy Policy for Sugaring Brazilian Wax - Last updated January 31 2022" />
      <LegalLayout sections={[
        ['Overview', 'This Privacy Policy explains how personal data is collected, used and protected when visitors use the Service.'],
        ['Definitions', 'Account means a unique account created for you. Company means Sugaring Brazilian Wax. Cookies are small files placed on a device. Device means any computer, phone or tablet. Personal Data means information that identifies an individual. Service means the website and related services. Service Provider means a third party processing data for the Company.'],
        ['Personal Data Collected', 'We may collect email address, name, phone number, address and usage data. Usage data may include IP address, browser type, pages visited, time spent and diagnostic information.'],
        ['Tracking Technologies and Cookies', 'We use session cookies and persistent cookies. Session cookies operate only while the browser is open. Persistent cookies remain after the browser closes and help remember preferences, improve service quality and understand website performance.'],
      ]} />
      <ContactCTA />
    </>
  );
}

function TermsPage() {
  return (
    <>
      <PageTitle title="Terms and Conditions for Sugaring Brazilian Wax - Last updated January 31 2022" />
      <LegalLayout sections={[
        ['Interpretation and Definitions', 'Affiliate means an entity that controls, is controlled by or is under common control with a party. Company means Sugaring Brazilian Wax. Device means any device that can access the Service. Service means the website. Terms and Conditions means this agreement.'],
        ['Acknowledgment', 'By accessing the Service, users agree to be bound by these Terms and Conditions, must be over 18 and must also accept the Privacy Policy.'],
        ['Links to Other Websites', 'Our Service may contain links to third-party websites. The Company is not responsible for their content, policies or practices.'],
        ['Termination', 'We may terminate or suspend access immediately for any breach of these Terms.'],
        ['Limitation of Liability', 'To the maximum extent permitted by law, liability is limited to the amount paid through the Service or 100 dollars if no purchase was made.'],
        ['AS IS Disclaimer', 'The Service is provided AS IS and AS AVAILABLE without warranties of any kind.'],
      ]} />
      <ContactCTA />
    </>
  );
}

function LegalLayout({ sections }) {
  return (
    <Section title="Legal Information">
      <div className="legal-stack">
        {sections.map(([title, text]) => (
          <article key={title}>
            <h3>{title}</h3>
            <p>{text}</p>
          </article>
        ))}
      </div>
    </Section>
  );
}

function PageTitle({ title, breadcrumb }) {
  return (
    <section className="page-title">
      <Hummingbird />
      {breadcrumb && <p className="breadcrumb">{breadcrumb}</p>}
      <h1>{title}</h1>
    </section>
  );
}

function ClosingCTA({ text }) {
  return (
    <section className="closing-cta">
      <h2>{text}</h2>
      <div className="button-row centered">
        <BookButton>Book St. Petersburg</BookButton>
        <BookButton>Book Tampa</BookButton>
      </div>
      <div className="closing-contact">
        {locations.map(location => (
          <div key={location.name}>
            <strong>{location.name}</strong>
            <span>{location.address}</span>
            <a href={`tel:${location.phone.replace(/[^0-9]/g, '')}`}>{location.phone}</a>
          </div>
        ))}
        <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
      </div>
    </section>
  );
}

function ContactCTA() {
  return (
    <Section eyebrow="Contact us" title="Plan your visit" className="contact-section">
      <div className="contact-layout">
        <div className="location-grid contact-locations">
          {locations.map(location => <LocationCard key={location.name} location={location} />)}
        </div>
        <form className="contact-form" onSubmit={(event) => event.preventDefault()}>
          <label>
            <span>Full Name*</span>
            <input type="text" name="name" required />
          </label>
          <label>
            <span>Phone Number*</span>
            <input type="tel" name="phone" required />
          </label>
          <label>
            <span>Email Address*</span>
            <input type="email" name="email" required />
          </label>
          <label>
            <span>Message</span>
            <textarea name="message" rows="5" />
          </label>
          <button className="btn btn-primary" type="submit">Submit Now</button>
        </form>
      </div>
    </Section>
  );
}

function LocationCard({ location }) {
  return (
    <article className="location-card">
      <SpaIcon type="drop" />
      <h3>{location.name}</h3>
      <ul>{location.hours.map(hour => <li key={hour}>{hour}</li>)}</ul>
      <p>{location.address}</p>
      <p><a href={`tel:${location.phone.replace(/[^0-9]/g, '')}`}>{location.phone}</a></p>
      <p><a href={`mailto:${EMAIL}`}>{EMAIL}</a></p>
      <BookButton>Book Now!</BookButton>
    </article>
  );
}

function serviceIcon(name) {
  if (/vajacial|bikini|underarm/i.test(name)) return 'mask';
  if (/leg|arm|shoulder|chest|back|stomach|neck/i.test(name)) return 'massage';
  if (/lip|chin|sideburn|nose|ear|hands|feet/i.test(name)) return 'wax';
  return 'leaf';
}

function Footer() {
  return (
    <footer className="site-footer">
      <div>
        <a className="brand footer-brand" href="#/home">
          <img className="brand-logo" src={logoImage} alt="" />
          <span>Sugaring Brazilian Wax</span>
        </a>
        <p>Friendly, professional care for natural beauty, wellness and client comfort.</p>
      </div>
      <nav>
        <NavLink route="home" label="Home" />
        <NavLink route="about" label="About Us" />
        <NavLink route="services" label="Services" />
        <NavLink route="products" label="Products" />
        <NavLink route="locations" label="Locations" />
        <NavLink route="privacy" label="Privacy Policy" />
        <NavLink route="terms" label="Terms of Service" />
      </nav>
      <a className="btn btn-primary footer-apply" href={BOOKING_URL} target="_blank" rel="noreferrer">Apply now</a>
    </footer>
  );
}

function BackToTop() {
  return (
    <button className="back-to-top" type="button" aria-label="Back to top" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
      <span aria-hidden="true">↑</span>
    </button>
  );
}

export default App;
