export const properties = [
  {
    id: 1,
    title: '4-Bedroom Detached Duplex',
    location: 'Jahi, Abuja',
    district: 'Jahi',
    type: 'Duplex',
    bedrooms: 4,
    bathrooms: 4,
    toilets: 5,
    parking: 2,
    sqm: 380,
    price: 18000000,
    status: 'available',
    featured: true,
    amenities: [
      'Swimming Pool', 'Boys Quarters', 'CCTV', 'Backup Generator',
      'Ample Parking', 'Water Treatment', 'Security Post', 'Landscaped Garden'
    ],
    description:
      'A stunning detached duplex in the serene Jahi District, offering 4 en-suite bedrooms, a contemporary open-plan living and dining space, and a private garden. Perfect for families seeking prestige and comfort in one of Abuja\'s most sought-after neighbourhoods.',
    annualRent: 18000000,
    cautionFee: 18000000,
    agencyFee: 900000,
    legalFee: 450000,
    agent: 1,
  },
  {
    id: 2,
    title: '5-Bedroom Mansion with Pool',
    location: 'Maitama, Abuja',
    district: 'Maitama',
    type: 'Mansion',
    bedrooms: 5,
    bathrooms: 5,
    toilets: 6,
    parking: 3,
    sqm: 520,
    price: 25000000,
    status: 'available',
    featured: true,
    amenities: [
      'Swimming Pool', 'Home Cinema', 'Smart Home System', 'CCTV',
      'Backup Generator', 'BQ', 'Gym Room', 'Chef\'s Kitchen', 'Security', 'Water Treatment'
    ],
    description:
      'An architectural masterpiece in the heart of Maitama — Abuja\'s most exclusive district. Features a private heated pool, home cinema, smart home automation, and expansive outdoor entertaining areas. Reserved for the most discerning tenant.',
    annualRent: 25000000,
    cautionFee: 25000000,
    agencyFee: 1250000,
    legalFee: 625000,
    agent: 2,
  },
  {
    id: 3,
    title: '3-Bedroom Serviced Apartment',
    location: 'Wuse 2, Abuja',
    district: 'Wuse 2',
    type: 'Apartment',
    bedrooms: 3,
    bathrooms: 3,
    toilets: 3,
    parking: 1,
    sqm: 210,
    price: 12000000,
    status: 'available',
    featured: false,
    amenities: [
      'Backup Generator', 'Security', 'CCTV', 'Ample Parking',
      'Serviced Common Areas', 'Water Treatment', 'Internet Ready'
    ],
    description:
      'A modern 3-bedroom serviced apartment on a quiet estate in Wuse 2. Ideal for professionals and small families. Walking distance to embassies, supermarkets, and fine dining.',
    annualRent: 12000000,
    cautionFee: 12000000,
    agencyFee: 600000,
    legalFee: 300000,
    agent: 3,
  },
  {
    id: 4,
    title: '2-Bedroom Terrace Bungalow',
    location: 'Garki 2, Abuja',
    district: 'Garki',
    type: 'Bungalow',
    bedrooms: 2,
    bathrooms: 2,
    toilets: 2,
    parking: 1,
    sqm: 140,
    price: 7000000,
    status: 'available',
    featured: false,
    amenities: [
      'Security Gate', 'Backup Generator', 'Paved Compound', 'Water Storage'
    ],
    description:
      'A comfortable 2-bedroom terrace bungalow on a secure estate in Garki 2. Great value for young couples or professionals. Centrally located with easy access to major roads.',
    annualRent: 7000000,
    cautionFee: 7000000,
    agencyFee: 350000,
    legalFee: 175000,
    agent: 4,
  },
  {
    id: 5,
    title: '6-Bedroom Luxury Villa',
    location: 'Asokoro, Abuja',
    district: 'Asokoro',
    type: 'Villa',
    bedrooms: 6,
    bathrooms: 6,
    toilets: 8,
    parking: 4,
    sqm: 680,
    price: 45000000,
    status: 'pending',
    featured: false,
    amenities: [
      'Swimming Pool', 'Tennis Court', 'Home Office', 'Smart Home',
      'CCTV', 'BQ x2', 'Generator House', 'Garden', 'Security', 'Gym'
    ],
    description:
      'An ultra-premium villa in Asokoro — Abuja\'s diplomatic enclave. Ideal for ambassadors, diplomats, or top executives. Features a tennis court, dual BQs, and full smart home integration.',
    annualRent: 45000000,
    cautionFee: 45000000,
    agencyFee: 2250000,
    legalFee: 1125000,
    agent: 1,
  },
  {
    id: 6,
    title: '3-Bedroom Semi-Detached',
    location: 'Gwarinpa, Abuja',
    district: 'Gwarinpa',
    type: 'Semi-Detached',
    bedrooms: 3,
    bathrooms: 3,
    toilets: 4,
    parking: 2,
    sqm: 185,
    price: 5500000,
    status: 'available',
    featured: false,
    amenities: [
      'Security Gate', 'Parking', 'Water Storage', 'Backup Power'
    ],
    description:
      'A spacious 3-bedroom semi-detached home in the largest estate in Sub-Saharan Africa. Gwarinpa offers a quieter suburban lifestyle with schools, shopping, and healthcare nearby.',
    annualRent: 5500000,
    cautionFee: 5500000,
    agencyFee: 275000,
    legalFee: 137500,
    agent: 3,
  },
]

export const agents = [
  {
    id: 1,
    name: 'Jay Okonkwo',
    role: 'Principal Agent & Founder',
    bio: 'Jay has over 12 years of experience in the Abuja property market. Known for his in-depth knowledge of high-end residential districts and his no-pressure, transparent approach, he has helped hundreds of families find their ideal homes.',
    specialties: ['Maitama', 'Asokoro', 'Jahi'],
    listings: 48,
    closed: 120,
    rating: 4.9,
    phone: '+234 802 000 0001',
    whatsapp: '2348020000001',
    email: 'jay@jaygproperties.com',
    initials: 'JO',
  },
  {
    id: 2,
    name: 'Gloria Adeyemi',
    role: 'Senior Property Consultant',
    bio: 'Gloria brings a warm, client-first approach to every search. With 8 years focusing on serviced apartments and mid-to-high value properties, she has built a reputation for listening carefully and delivering exactly what clients need.',
    specialties: ['Wuse 2', 'Central Abuja', 'Garki'],
    listings: 32,
    closed: 84,
    rating: 4.8,
    phone: '+234 803 000 0002',
    whatsapp: '2348030000002',
    email: 'gloria@jaygproperties.com',
    initials: 'GA',
  },
  {
    id: 3,
    name: 'Emeka Eze',
    role: 'Property Consultant',
    bio: 'Emeka specialises in family homes and suburban estates. His encyclopaedic knowledge of Gwarinpa, Katampe, and Kubwa makes him the go-to agent for families seeking space and value without compromising on quality.',
    specialties: ['Gwarinpa', 'Katampe', 'Kubwa'],
    listings: 27,
    closed: 61,
    rating: 4.7,
    phone: '+234 806 000 0003',
    whatsapp: '2348060000003',
    email: 'emeka@jaygproperties.com',
    initials: 'EE',
  },
  {
    id: 4,
    name: 'Nkechi Obi',
    role: 'Property Consultant',
    bio: 'Nkechi focuses on first-time renters and young professionals entering the Abuja market. Her patient, educational approach ensures clients fully understand every step of the rental process before signing anything.',
    specialties: ['Garki', 'Wuse', 'Utako'],
    listings: 21,
    closed: 45,
    rating: 4.8,
    phone: '+234 808 000 0004',
    whatsapp: '2348080000004',
    email: 'nkechi@jaygproperties.com',
    initials: 'NO',
  },
]

export const testimonials = [
  {
    id: 1,
    name: 'Adaeze Nwosu',
    detail: 'Maitama • Rented July 2024',
    rating: 5,
    quote: 'From the first call to key handover, everything was smooth and professional. Jay was transparent about every cost and never pushed us towards anything outside our budget. We are absolutely in love with our new home.',
  },
  {
    id: 2,
    name: 'Tunde Fashola',
    detail: 'Jahi • Rented March 2024',
    rating: 5,
    quote: 'The team at Jay G found us a property that matched our criteria perfectly within two weeks. The application process was straightforward and well-explained. Refreshingly honest agents.',
  },
  {
    id: 3,
    name: 'Blessing Okwu',
    detail: 'Wuse 2 • Rented October 2023',
    rating: 5,
    quote: 'Gloria was incredibly patient with all my questions as a first-time renter in Abuja. She helped me understand every clause in the tenancy agreement. I felt genuinely protected throughout.',
  },
  {
    id: 4,
    name: 'Dr. Chidi Amaechi',
    detail: 'Asokoro • Rented January 2024',
    rating: 5,
    quote: 'I was relocating from Lagos and needed everything handled remotely. The team arranged virtual viewings, digital signing, and coordinated the move-in perfectly. Truly world-class service.',
  },
  {
    id: 5,
    name: 'Fatima Al-Hassan',
    detail: 'Gwarinpa • Rented May 2024',
    rating: 5,
    quote: 'Emeka went above and beyond to find us a home near good schools for our children. He knew the neighbourhood inside out and helped us negotiate a fair rent. Highly recommend.',
  },
  {
    id: 6,
    name: 'Ngozi & Ifeanyi Obi',
    detail: 'Garki • Rented August 2023',
    rating: 5,
    quote: 'We had tried two other agencies before Jay G and the difference was night and day. No hidden charges, no vague answers — just honest, helpful professionals who genuinely wanted us to find the right home.',
  },
]

export const faqs = [
  {
    id: 1,
    category: 'Process',
    q: 'How does the rental process work?',
    a: 'Our process has four steps: Search (browse our listings or describe your needs to an agent), View (schedule physical or virtual viewings of shortlisted properties), Apply (submit your rental application with required documents), and Move In (sign tenancy agreement, pay fees, and collect keys). We guide you through every step.',
  },
  {
    id: 2,
    category: 'Process',
    q: 'How long does it take to rent a property?',
    a: 'For qualified applicants with all documents ready, the process typically takes 5–10 working days from application to key handover. The majority of this time is document verification by the landlord.',
  },
  {
    id: 3,
    category: 'Process',
    q: 'Can I view properties virtually before visiting Abuja?',
    a: 'Yes. We offer video walkthroughs and live virtual viewings via WhatsApp or Zoom for clients relocating from other cities or abroad. Contact your assigned agent to schedule one.',
  },
  {
    id: 4,
    category: 'Costs',
    q: 'What fees will I pay beyond the annual rent?',
    a: 'Standard fees include: Caution Deposit (typically 1 year\'s rent, refundable at end of tenancy), Agency Fee (5% of annual rent), and Legal/Agreement Fee (2.5% of annual rent). All fees are clearly stated before you commit to anything.',
  },
  {
    id: 5,
    category: 'Costs',
    q: 'Is the caution deposit refundable?',
    a: 'Yes. The caution deposit is fully refundable at the end of your tenancy, less any deductions for unpaid rent or property damage beyond fair wear and tear. We document the property\'s condition at move-in and move-out to ensure fairness.',
  },
  {
    id: 6,
    category: 'Costs',
    q: 'Can I pay rent in instalments?',
    a: 'Payment terms are set by individual landlords. Some accept 6-monthly or quarterly payments. Let us know your preferred payment schedule and we will try to match you with landlords who accommodate it.',
  },
  {
    id: 7,
    category: 'Requirements',
    q: 'What documents do I need to apply?',
    a: 'You will need: a valid government-issued ID (National ID, International Passport, or Driver\'s Licence), proof of income or employment (recent payslips, bank statements, or a letter of employment), and two references (employer or personal). Self-employed applicants should provide 6 months of bank statements.',
  },
  {
    id: 8,
    category: 'Requirements',
    q: 'Can expatriates or foreigners rent through you?',
    a: 'Absolutely. We have extensive experience helping expatriates, diplomats, and international professionals find homes in Abuja. A valid passport, embassy or employer reference, and proof of income are typically sufficient.',
  },
  {
    id: 9,
    category: 'Tenancy',
    q: 'What happens if I need to leave before my tenancy ends?',
    a: 'You should notify us and your landlord in writing, ideally with at least 3 months\' notice. Early termination clauses are outlined in your tenancy agreement. In most cases, you may be asked to find a replacement tenant or forfeit a portion of your deposit.',
  },
  {
    id: 10,
    category: 'Tenancy',
    q: 'Who is responsible for repairs and maintenance?',
    a: 'Structural and major repairs (roofing, electrical faults, plumbing) are the landlord\'s responsibility. Tenants are responsible for routine maintenance and minor repairs. All responsibilities are clearly defined in the tenancy agreement we prepare.',
  },
]

export const values = [
  {
    id: 1,
    icon: 'T',
    title: 'Transparency',
    body: 'Every fee, every clause, every condition — disclosed upfront. No surprises on move-in day.',
  },
  {
    id: 2,
    icon: 'T',
    title: 'Trust',
    body: 'We represent both tenant and landlord fairly. Our repeat business speaks for itself.',
  },
  {
    id: 3,
    icon: 'S',
    title: 'Speed',
    body: 'Qualified applications processed within 48 hours. We respect that your time has value.',
  },
  {
    id: 4,
    icon: 'Q',
    title: 'Quality',
    body: 'Every property on our books is personally inspected. We only list what we\'d rent ourselves.',
  },
]

export const formatPrice = (n) => {
  if (n >= 1_000_000) return `₦${(n / 1_000_000).toFixed(1)}M`
  if (n >= 1_000) return `₦${(n / 1_000).toFixed(0)}K`
  return `₦${n.toLocaleString()}`
}

export const WA_NUMBER = '2348020000001'
export const WA_BASE = `https://wa.me/${WA_NUMBER}`
