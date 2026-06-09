import { useEffect, useMemo, useState } from 'react';

const BOOKING_URL = 'https://sugaringbrazilianwax.com/book-now/';
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

function App() {
  const [route, setRoute] = useState(getRoute());
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handler = () => setRoute(getRoute());
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
    privacy: PrivacyPage,
    terms: TermsPage,
  }[route] || HomePage), [route]);

  return (
    <>
      <header className="site-header">
        <a className="brand" href="#/home" onClick={() => setMenuOpen(false)}>
          <Hummingbird small />
          <span>Sugaring Brazilian Wax</span>
        </a>
        <button className="menu-button" onClick={() => setMenuOpen(!menuOpen)}>Menu</button>
        <nav className={menuOpen ? 'nav nav-open' : 'nav'}>
          <NavLink route="home" label="Home" />
          <NavLink route="about" label="About Us" />
          <div className="nav-group">
            <button onClick={() => go('services')}>Services</button>
            <div className="nav-dropdown">
              <NavLink route="services" label="All Services" />
              <NavLink route="body-sculpting" label="Body Sculpting" />
              <NavLink route="lymphatic-drainage" label="Lymphatic Massage" />
              <NavLink route="eyebrow-lamination" label="Eyebrow Lamination" />
              <NavLink route="vajacial" label="Vajacial Treatment" />
            </div>
          </div>
          <NavLink route="products" label="Products" />
          <NavLink route="locations" label="Locations" />
          <a href={BOOKING_URL} target="_blank" rel="noreferrer">Book Now</a>
          <NavLink route="privacy" label="Privacy Policy" />
          <NavLink route="terms" label="Terms" />
        </nav>
      </header>
      <main>
        <Page />
      </main>
      <Footer />
    </>
  );
}

function NavLink({ route, label }) {
  return <a href={`#/${route}`}>{label}</a>;
}

function Hero({ eyebrow, title, text, image, children }) {
  return (
    <section className="hero">
      <img src={image} alt="" className="hero-image" />
      <div className="hero-overlay" />
      <div className="hero-content">
        <div className="eyebrow">{eyebrow}</div>
        <h1>{title}</h1>
        <p>{text}</p>
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
        title="book Sugaring Brazilian Wax services"
        text="Always be prepared for the special moments in life!"
        image="https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1800&q=80"
      >
        <HashButton route="services">View Our Services</HashButton>
      </Hero>
      <Section eyebrow="Mission" title="Mission - Our Mission Statement">
        <div className="split">
          <p>
            Our spa provides first-class services, top-quality products and excellent customer care.
            Our goal is to offer the most comfortable and effective natural sugaring wax services in
            a friendly, professional setting focused on wellness and confidence.
          </p>
          <HashButton route="about" variant="outline">Read more</HashButton>
        </div>
      </Section>
      <Section eyebrow="About" title="Smooth, soft and healthy skin">
        <div className="feature-grid">
          <article>
            <Hummingbird />
            <h3>Look no further</h3>
            <p>If having smooth, soft and healthy skin in an inexpensive way has been what you are looking for, look no further. Tired of stubble and razor bumps? You have come to the perfect place.</p>
          </article>
          <article>
            <h3>What sugaring is</h3>
            <p>Sugaring is a natural technique made from lemon juice, water and sugar. The paste is applied opposite hair growth and removed in the direction of hair growth.</p>
          </article>
          <article>
            <h3>Gentler and hygienic</h3>
            <p>Because sugar paste adheres to hair and dead skin cells, it is gentler than traditional waxing and supports a cleaner, more comfortable experience.</p>
          </article>
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
  return (
    <article className="card service-mini">
      <Hummingbird small />
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
    <Section eyebrow="Testimonials" title="What Our Clients Are Saying">
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
      />
      <Section title="Our Safety Standards - Waxing Safety">
        <div className="content-columns">
          <div>
            <p>Clients should avoid waxing irritated skin, varicose veins, areas with rashes, Botox or collagen injections, areas waxed within the last 24 hours, around piercings, areas treated with salicylic or glycolic acids, areas treated with skin medications and recently exfoliated skin.</p>
            <h3>Contraindications</h3>
            <ul>
              <li>High blood sugar.</li>
              <li>Recent Accutane or skin medications.</li>
              <li>Antibiotics.</li>
              <li>Skin problems such as acne, eczema or psoriasis.</li>
            </ul>
          </div>
          <div>
            <h3>After-waxing care</h3>
            <ul>
              <li>Do not touch freshly waxed skin.</li>
              <li>Avoid thick body butters and scented products.</li>
              <li>Do not pick ingrown hairs.</li>
              <li>Use only warm or cold showers for 48 hours.</li>
              <li>Avoid tanning, swimming and exercise for the recommended time period.</li>
            </ul>
          </div>
        </div>
      </Section>
      <Section title="Hygiene & Safety Practices" className="soft">
        <p className="lead">We maintain a clean environment with gloves and masks for estheticians, clean wax pots, disposable tools, sanitized tables and surfaces, hand sanitizer and contactless checkout.</p>
      </Section>
      <Section title="Company Information">
        <p>Sugaring Brazilian Wax encourages clients to visit for the best Brazilian wax experience. The spa has served clients since 2022, and all estheticians are licensed, skilled professionals dedicated to comfort, precision and care.</p>
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
      <Section title="Introduction to Sugaring">
        <p className="lead">Each sugaring appointment includes thoughtful details such as a hot towel, aromatherapy and massage after treatment. All equipment is sterilized and the experience is designed around comfort and visible results.</p>
      </Section>
      <Section title="Service Menu" className="soft">
        <div className="service-list">
          {detailedServices.map(([name, summary]) => (
            <article className="service-row" key={name}>
              <div>
                <h3>{name}</h3>
                <p>{summary}</p>
              </div>
              <BookButton />
            </article>
          ))}
        </div>
      </Section>
      <Section title="Hard Waxing">
        <p>Hard wax removes hair at the root, leaving skin smooth. It is applied warm and removed without strips. Different formulas are selected for Brazilian waxing versus delicate facial areas, so each service is tailored to the skin and body area.</p>
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
      <PageTitle title="Products" breadcrumb="Home / Products" />
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
      <div className="location-grid">
        {locations.map(location => <LocationCard key={location.name} location={location} />)}
      </div>
    </Section>
  );
}

function LocationCard({ location }) {
  return (
    <article className="location-card">
      <h3>{location.name}</h3>
      <ul>{location.hours.map(hour => <li key={hour}>{hour}</li>)}</ul>
      <p>{location.address}</p>
      <p><a href={`tel:${location.phone.replace(/[^0-9]/g, '')}`}>{location.phone}</a></p>
      <p><a href={`mailto:${EMAIL}`}>{EMAIL}</a></p>
      <BookButton>Book Now!</BookButton>
    </article>
  );
}

function Footer() {
  return (
    <footer className="site-footer">
      <div>
        <a className="brand footer-brand" href="#/home">
          <Hummingbird small />
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
      <a className="btn btn-primary" href="#/careers">Apply now to work with us!</a>
    </footer>
  );
}

export default App;
