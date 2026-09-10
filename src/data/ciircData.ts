export interface ResearchAreaItem {
  id: string;
  number: string;
  name: string;
  category: 'Materials' | 'Biology' | 'Engineering' | 'Environment' | 'Computing' | 'Innovation';
  metadata: string;
  image: string;
  description: string;
  url: string;
}

export interface InstrumentItem {
  id: string;
  code: string;
  fullName: string;
  specs: string;
  image: string;
  role: string;
}

export interface AuthenticAchievement {
  id: string;
  title: string;
  category: string;
  description: string;
  accent: 'blue' | 'teal' | 'coral';
}

export interface PartnerItem {
  name: string;
  type: string;
  region: string;
}

export const CIIRC_IDENTITY = {
  name: "CIIRC®",
  fullName: "Centre for Incubation, Innovation, Research and Consultancy",
  recognition: "DSIR–SIRO Recognized Autonomous Research Institution",
  ministry: "Ministry of Science & Technology, Government of India",
  founders: "Joint Initiative of Sri Sringeri Sharada Peetham, Sringeri and Jyothy Institute of Technology (JIT)",
  facilityArea: "50,000+ Sq. Ft.",
  email: "info@ciirc.jyothyit.ac.in",
  phone: "080-50985588",
  location: "Tataguni, Kanakapura Main Road, Bengaluru 560082, Karnataka, India",
  director: {
    name: "Dr. Krishna Venkatesh",
    role: "Founder-Director, CIIRC®",
    qualifications: "IISc Bengaluru Alumnus • Ph.D. in Nanoengineering • GATE Scholar",
    quote: "Bringing science, engineering, business orientation, skill development, innovation, incubation and research onto one platform to generate technologies with profound societal consequence."
  }
};

export const AUTHENTIC_17_RESEARCH_AREAS: ResearchAreaItem[] = [
  {
    id: "affordable-medical-devices",
    number: "01",
    name: "Affordable Medical Devices",
    category: "Biology",
    metadata: "Translational Healthcare · Clinical Diagnostics",
    image: "/images/instruments/sem.jpg",
    description: "Low-cost point-of-care microfluidic diagnostic devices, non-invasive metabolic screening tools, and societal health solutions.",
    url: "https://ciirc.res.in/service/affordable-medical-devices-sensors/"
  },
  {
    id: "sensors-and-inks",
    number: "02",
    name: "Sensors & Inks",
    category: "Materials",
    metadata: "Conductive Inks · Flexible Biosensors",
    image: "/images/instruments/xrd.jpg",
    description: "Formulation of conductive graphene/metal nanoparticle inks for printed electronics, flexible biosensor strips, and wearable telemetry.",
    url: "https://ciirc.res.in/service/affordable-medical-devices-sensors/"
  },
  {
    id: "ancient-indian-st",
    number: "03",
    name: "Ancient Indian S&T",
    category: "Innovation",
    metadata: "Heritage Metallurgy · Validation Science",
    image: "/images/instruments/ftir.jpg",
    description: "Rigorous scientific investigation and modern analytical validation (SEM, XRD) of ancient Indian metallurgical treatises and botanical formulations.",
    url: "https://ciirc.res.in/service/ancient-indian-science-and-technology/"
  },
  {
    id: "autonomous-systems",
    number: "04",
    name: "Autonomous Systems",
    category: "Engineering",
    metadata: "UAVs · Polar Robotics · Telemetry",
    image: "/images/facilities/ciirc-lab-main.jpg",
    description: "Pioneering Indian autonomous drone platforms for extreme Arctic glacier mapping, flight stabilization, and precision aerial survey.",
    url: "https://ciirc.res.in/service/autonomous-systems/"
  },
  {
    id: "biocomposites-biopolymers",
    number: "05",
    name: "Biocomposites & Biopolymers",
    category: "Materials",
    metadata: "Sustainable Resins · Natural Fiber Composites",
    image: "/images/instruments/dsc.jpg",
    description: "Biodegradable agricultural waste valorization into natural fiber composites, bio-resins, and high-tensile sustainable polymers.",
    url: "https://ciirc.res.in/service/biopolymers-and-biocomposites/"
  },
  {
    id: "cell-molecular-biology",
    number: "06",
    name: "Cell & Molecular Biology",
    category: "Biology",
    metadata: "Oncology Biomarkers · Molecular Screening",
    image: "/images/instruments/sem.jpg",
    description: "Investigating mechanisms of disease progression, mammalian cytotoxicity assays, anticancer botanical screening, and gene expression.",
    url: "https://ciirc.res.in/service/cell-and-molecular-biology/"
  },
  {
    id: "computational-engineering",
    number: "07",
    name: "Computational Engineering",
    category: "Computing",
    metadata: "FEA · CFD · Multi-Scale Simulation",
    image: "/images/facilities/ciirc-cleanroom.jpg",
    description: "Predictive numeric simulations, aerodynamic flow modeling, thermal dissipation mechanics, and molecular dynamics clusters.",
    url: "https://ciirc.res.in/service/computational-engineering/"
  },
  {
    id: "energy",
    number: "08",
    name: "Energy",
    category: "Environment",
    metadata: "Battery Materials · Supercapacitors",
    image: "/images/instruments/tga.jpg",
    description: "Next-generation nanostructured electrodes for high-capacity lithium and sodium ion cells, electrochemical storage, and supercapacitors.",
    url: "https://ciirc.res.in/service/energy/"
  },
  {
    id: "environment",
    number: "09",
    name: "Environment",
    category: "Environment",
    metadata: "Carbon Capture (CCS) · Air Quality",
    image: "/images/instruments/bet.jpg",
    description: "Solid adsorbents for industrial flue gas CO2 capture and storage (CCS), hazardous effluent degradation, and atmospheric monitoring.",
    url: "https://ciirc.res.in/service/environment/"
  },
  {
    id: "food-technology",
    number: "10",
    name: "Food Technology",
    category: "Biology",
    metadata: "Food Safety · Bioactive Formulations",
    image: "/images/instruments/gc.jpg",
    description: "Screening of botanical antimicrobials for shelf-life extension, rapid pathogen testing kits, and bioactive nutritional profiling.",
    url: "https://ciirc.res.in/service/food-technology/"
  },
  {
    id: "nanobiotechnology",
    number: "11",
    name: "Nanobiotechnology",
    category: "Biology",
    metadata: "Targeted Delivery · Enzyme Immobilization",
    image: "/images/instruments/sem.jpg",
    description: "Biocatalytic nano-assemblies for industrial synthesis, liposomal nanocarriers, and targeted biochemical delivery vectors.",
    url: "https://ciirc.res.in/service/nano-biotechnology/"
  },
  {
    id: "nanoscience-engineering",
    number: "12",
    name: "Nanoscience & Engineering",
    category: "Materials",
    metadata: "Quantum Dots · 2D Graphene · MXenes",
    image: "/images/instruments/xrd.jpg",
    description: "Synthesis and characterization of 0D, 1D, and 2D nanomaterials for energy devices, heterojunction sensors, and functional thin films.",
    url: "https://ciirc.res.in/service/nanosciences-and-engineering/"
  },
  {
    id: "plant-microbial-technology",
    number: "13",
    name: "Plant & Microbial Technology",
    category: "Biology",
    metadata: "Botanical Actives · Microbial Inoculants",
    image: "/images/instruments/ftir.jpg",
    description: "Extraction of secondary therapeutic metabolites, microbial bio-fertilizers, and plant tissue culture for sustainable agriculture.",
    url: "https://ciirc.res.in/service/plant-and-microbial-technology/"
  },
  {
    id: "remote-sensing",
    number: "14",
    name: "Remote Sensing",
    category: "Engineering",
    metadata: "ISRO IRNSS Telemetry · Glacial GIS",
    image: "/images/facilities/ciirc-lab-secondary.jpg",
    description: "Hosting on-campus ISRO IRNSS navigation ground station, multi-spectral satellite processing for Himalayan and Arctic glacier tracking.",
    url: "https://ciirc.res.in/service/remote-sensing/"
  },
  {
    id: "surfaces-interfaces",
    number: "15",
    name: "Surfaces & Interfaces",
    category: "Materials",
    metadata: "Superhydrophobic · Anti-Corrosion",
    image: "/images/instruments/bet.jpg",
    description: "High-performance boundary physics, wetting kinetics, anti-corrosion barriers, and self-cleaning coatings for aerospace and industrial parts.",
    url: "https://ciirc.res.in/service/surfaces-interfaces/"
  },
  {
    id: "thermal-engineering-tribology",
    number: "16",
    name: "Thermal Engineering & Tribology",
    category: "Engineering",
    metadata: "Nano-Lubricants · Heat Dissipation",
    image: "/images/instruments/tga.jpg",
    description: "Friction reduction via hydrodynamic nano-lubrication, pin-on-disc wear analysis, and thermal management in dense microelectronics.",
    url: "https://ciirc.res.in/service/thermal-engineering-tribology/"
  },
  {
    id: "water",
    number: "17",
    name: "Water",
    category: "Environment",
    metadata: "Ceramic Membranes · Heavy Metal Adsorption",
    image: "/images/instruments/dsc.jpg",
    description: "Engineered functional membranes and nano-adsorbents removing arsenic, fluoride, and toxic dye effluents from industrial wastewater.",
    url: "https://ciirc.res.in/service/water/"
  }
];

export const AUTHENTIC_INSTRUMENTS: InstrumentItem[] = [
  {
    id: "sem",
    code: "SEM",
    fullName: "Scanning Electron Microscope",
    specs: "High-resolution surface topography & morphological analysis down to nanometer resolution with elemental EDX mapping.",
    image: "/images/instruments/sem.jpg",
    role: "Nanoscale Morphology"
  },
  {
    id: "xrd",
    code: "XRD",
    fullName: "X-Ray Diffractometer",
    specs: "Crystal phase identification, lattice parameter determination, and thin film crystallographic orientation analysis.",
    image: "/images/instruments/xrd.jpg",
    role: "Crystallography"
  },
  {
    id: "gc",
    code: "GC",
    fullName: "Gas Chromatography System",
    specs: "High-sensitivity separation and quantification of volatile organic compounds, fatty acid methyl esters, and gases.",
    image: "/images/instruments/gc.jpg",
    role: "Chemical Separation"
  },
  {
    id: "ftir",
    code: "FT-IR",
    fullName: "Fourier Transform Infrared Spectrophotometer",
    specs: "Functional group identification across polymers, nanocomposites, and biological specimens in ATR and transmission modes.",
    image: "/images/instruments/ftir.jpg",
    role: "Molecular Spectroscopy"
  },
  {
    id: "dsc",
    code: "DSC",
    fullName: "Differential Scanning Calorimeter",
    specs: "Precision measurement of thermal transitions, glass transition (Tg), melting point, crystallization kinetics, and curing.",
    image: "/images/instruments/dsc.jpg",
    role: "Thermal Transitions"
  },
  {
    id: "tga",
    code: "TGA",
    fullName: "Thermogravimetric Analyzer",
    specs: "Evaluation of thermal decomposition thresholds, volatile filler content, oxidation kinetics, and residue quantification.",
    image: "/images/instruments/tga.jpg",
    role: "Decomposition Kinetics"
  },
  {
    id: "bet",
    code: "BET SURFACE AREA ANALYZER",
    fullName: "Brunauer-Emmett-Teller Analyzer",
    specs: "Precise multi-point determination of specific surface area, pore size distribution, and sorption capacity of nanoadsorbents.",
    image: "/images/instruments/bet.jpg",
    role: "Surface Porosimetry"
  }
];

export const AUTHENTIC_ACHIEVEMENTS: AuthenticAchievement[] = [
  {
    id: "north-pole-expedition",
    title: "Fourth Indian Scientific Expedition to the North Pole (Arctic)",
    category: "Polar Milestone",
    description: "Led the Indian scientific contingent to the Arctic in September 2019, successfully mapping Arctic glaciers using autonomous research drones.",
    accent: "blue"
  },
  {
    id: "arctic-drone",
    title: "First Autonomous Drone Missions in Arctic Glaciers",
    category: "Autonomous Systems",
    description: "Pioneered extreme-cold autonomous UAV flights over polar ice sheets for precision geospatial photogrammetry.",
    accent: "blue"
  },
  {
    id: "isro-receiver",
    title: "ISRO Satellite Receiver & IRNSS Telemetry Station",
    category: "Space Telemetry",
    description: "Commissioned a dedicated on-campus ISRO IRNSS (NavIC) ground station for precision navigation and atmospheric data collection.",
    accent: "blue"
  },
  {
    id: "himalayan-mapping",
    title: "Himalayan Glacier Geospatial Telemetry",
    category: "Remote Sensing",
    description: "High-altitude multi-spectral telemetry monitoring glacial retreat and water security dynamics across the Himalayas.",
    accent: "teal"
  },
  {
    id: "bangalore-nano-2018",
    title: "Bangalore Nano 2018 Innovation Display Award",
    category: "Nanotechnology",
    description: "Recognized at the prestigious Bangalore India Nano summit for outstanding translational nanomaterial exhibits.",
    accent: "teal"
  },
  {
    id: "nano-sparx-2020",
    title: "National Nano Sparx 2020 Innovation Award",
    category: "Healthcare Sensors",
    description: "Conferred the national Nano Sparx award for breakthrough point-of-care medical sensors and translational devices.",
    accent: "teal"
  },
  {
    id: "coffee-500-rally",
    title: "Asia Pacific Coffee-500 Rally Pace-Setting Vehicle",
    category: "Automotive Innovation",
    description: "Engineered and deployed a vehicle operating on 100% used cooking oil (WCO) biodiesel as the official pace car.",
    accent: "coral"
  },
  {
    id: "biodiesel-wco",
    title: "Biodiesel from Used Cooking Oil (WCO)",
    category: "Clean Energy",
    description: "Developed proprietary transesterification catalyst processes to convert commercial food waste oil into standardized fuel.",
    accent: "coral"
  },
  {
    id: "south-pole-antarctica",
    title: "Scientific Expedition to the South Pole (Antarctica)",
    category: "Polar Milestone",
    description: "Faculty selected for an elite international scientific expedition to the South Pole, investigating ice shelf dynamics and extreme-climate materials.",
    accent: "blue"
  }
];

export const AUTHENTIC_PARTNERS: PartnerItem[] = [
  { name: "DST - Dept. of Science & Technology", type: "Government / R&D", region: "India" },
  { name: "DRDO - Defence Research & Development", type: "Defence / R&D", region: "India" },
  { name: "ISRO - Indian Space Research Organisation", type: "Space / Telemetry", region: "India" },
  { name: "DBT - Dept. of Biotechnology", type: "Biotech / R&D", region: "India" },
  { name: "CEFIPRA - Indo-French Centre", type: "International / Bilateral", region: "France - India" },
  { name: "P.N. Lebedev Physical Institute", type: "International Academic", region: "Russia" },
  { name: "Tunghai University", type: "International Academic", region: "Taiwan" },
  { name: "TÜV Rheinland", type: "Industrial Quality & Certification", region: "Germany" },
  { name: "National Remote Sensing Centre (NRSC)", type: "Earth Observation", region: "India" },
  { name: "BOHECO", type: "Industrial Enterprise", region: "India" },
  { name: "Desicon", type: "Industrial Enterprise", region: "India" },
  { name: "Dover", type: "Enterprise Consultancy", region: "Global" }
];

export const AUTHENTIC_NEWS_POSTS = [
  {
    id: "news-rf-trans",
    isFeatured: true,
    title: "Requirement for Research Fellow — Translational Instrumentation & Advanced Characterization",
    date: "September 5, 2023",
    category: "Call for Research Fellows",
    summary: "Inviting applications from qualified doctoral and post-graduate candidates for sponsored translational projects utilizing SEM, XRD, and microfluidic fabrication lines.",
    link: "https://ciirc.res.in/requirement-for-research-fellow/"
  },
  {
    id: "news-rf-rs",
    isFeatured: false,
    title: "Requirement for Research Fellow RS — Remote Sensing & Geospatial Satellite Telemetry",
    date: "April 11, 2023",
    category: "Research Fellowship",
    summary: "Dedicated position supporting the ISRO IRNSS receiver project and Himalayan glacier GIS modeling.",
    link: "https://ciirc.res.in/requirement-for-research-fellow-rs/"
  },
  {
    id: "news-rf-as",
    isFeatured: false,
    title: "Requirement for Research Fellow AS — Autonomous Systems, Drone Avionics & Flight Control",
    date: "April 11, 2023",
    category: "Research Fellowship",
    summary: "Investigation into polar drone telemetry, computer vision payloads, and fail-safe flight stabilization.",
    link: "https://ciirc.res.in/requirement-for-research-fellow-as/"
  }
];
