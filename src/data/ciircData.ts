export interface ResearchVista {
  id: string;
  indexNumber: string;
  title: string;
  category: 'Materials & Nano' | 'Engineering' | 'Life & Health' | 'Computing & Systems' | 'Earth & Environment' | 'Innovation';
  tag: string;
  summary: string;
  detailedScope: string;
  instrumentsOrFocus: string[];
  externalUrl: string;
  colorScheme: 'cobalt' | 'teal' | 'amber';
}

export interface StatItem {
  id: string;
  value: string;
  label: string;
  sublabel: string;
  isHighlight?: boolean;
}

export interface MilestoneItem {
  year: string;
  title: string;
  description: string;
  badge: string;
  isArcticOrPolar?: boolean;
}

export interface PartnerItem {
  name: string;
  category: 'Government / Funding' | 'International Academic' | 'Industry & Enterprise';
  logoUrl?: string;
  initials: string;
}

export interface OpportunityItem {
  id: string;
  title: string;
  date: string;
  department: string;
  status: 'Open Application' | 'Archived Record';
  link: string;
}

export const CIIRC_IDENTITY = {
  name: "CIIRC®",
  fullName: "Centre for Incubation, Innovation, Research and Consultancy",
  recognition: "Scientific and Industrial Research Organization (SIRO) Recognized by DSIR, Ministry of Science & Technology, Government of India",
  founders: "Joint Initiative of Sri Sringeri Sharada Peetham, Sringeri and Jyothy Institute of Technology (JIT)",
  vision: "To be a Center of Excellence for Developing New Technologies, Incubation and Innovation",
  mission: "Pioneering Product Development",
  facilityArea: "50,000 sq.ft.",
  email: "info@ciirc.jyothyit.ac.in",
  phone: "080-50985588",
  campusAddress: "Jyothy Institute of Technology Campus, Tataguni, Kanakapura Main Road, Bengaluru - 560082, Karnataka, India",
  director: {
    name: "Dr. Krishna Venkatesh",
    role: "Founder-Director, CIIRC®",
    qualifications: "GATE Scholar • IISc Bengaluru Alumnus • Ph.D. in Nanoengineering",
    bio: "Over 25 years of research, academic, and administrative leadership. Member of the Vision Group on Nanotechnology (GoK), Steering Committee Member at TÜV Rheinland Germany, former Executive Council Member of Visvesvaraya Technological University (VTU), and Member of Karnataka Knowledge Commission for Unmanned Systems Technology.",
    quote: "From times immemorial, teaching and research have been an indispensable activity and, today, is becoming increasingly multidisciplinary in nature. Globalization and technological convergence require a new class of scholars equipped with multiple perspectives, sharp creative skills, and willingness to adapt to new and changing conditions for the benefit of mankind."
  }
};

export const CIIRC_STATS: StatItem[] = [
  {
    id: "facility",
    value: "50,000+",
    label: "Sq. Ft. Dedicated Labs",
    sublabel: "State-of-the-art facility housing 18+ research vistas"
  },
  {
    id: "doctorates",
    value: "27",
    label: "Doctoral Researchers",
    sublabel: "Alumni of IISc, IITs, NITs, Central & Foreign Universities"
  },
  {
    id: "masters",
    value: "13",
    label: "Master's Researchers",
    sublabel: "Specialized investigators across multidisciplinary domains"
  },
  {
    id: "fellows",
    value: "20+",
    label: "PG Research Fellows",
    sublabel: "Engaged in bilateral & nationally funded programs"
  },
  {
    id: "projects",
    value: "50+",
    label: "Funded Projects",
    sublabel: "DST, DRDO, DOS/ISRO, DBT, EU & Indo-French CEFIPRA",
    isHighlight: true
  },
  {
    id: "publications",
    value: "300+",
    label: "Indexed Publications",
    sublabel: "Scopus, Web of Science, Elsevier, Springer & Wiley"
  },
  {
    id: "products",
    value: "35+",
    label: "Societal Products",
    sublabel: "Developed with societal, clinical & environmental impact",
    isHighlight: true
  }
];

export const RESEARCH_VISTAS: ResearchVista[] = [
  {
    id: "sophisticated-instrumentation-facility",
    indexNumber: "01",
    title: "Sophisticated Instrumentation Facility (SIF)",
    category: "Materials & Nano",
    tag: "Central Characterization Hub",
    summary: "Centralized analytical infrastructure housing high-end characterization instruments accessible to internal scholars, external academia, and industry.",
    detailedScope: "Provides high-resolution microstructural, crystallographic, spectroscopic, and thermal characterization. The facility supports advanced material synthesis, quality validation, and external testing consultancy.",
    instrumentsOrFocus: ["Scanning Electron Microscope (SEM)", "X-Ray Diffraction (XRD)", "Gas Chromatography (GC)", "FT-IR Spectrophotometer", "DSC & TGA", "BET Surface Area Analyzer"],
    externalUrl: "https://ciirc.res.in/service/sophisticated-instrumentation-facility/",
    colorScheme: "cobalt"
  },
  {
    id: "nanosciences-and-engineering",
    indexNumber: "02",
    title: "Nanosciences and Engineering",
    category: "Materials & Nano",
    tag: "Advanced Nanomaterials",
    summary: "Synthesis, characterization, and device fabrication of 0D, 1D, and 2D nanomaterials for energy, sensors, and structural coatings.",
    detailedScope: "Investigates atomic-scale properties, quantum dot architectures, graphene composites, and nanostructured catalysts. Recognized nationally through the Bangalore Nano and Nano Sparx innovation awards.",
    instrumentsOrFocus: ["Quantum Dots", "Graphene & MXenes", "Nanostructured Thin Films", "Heterojunction Devices"],
    externalUrl: "https://ciirc.res.in/service/nanosciences-and-engineering/",
    colorScheme: "cobalt"
  },
  {
    id: "surfaces-and-interfaces",
    indexNumber: "03",
    title: "Surfaces & Interfaces",
    category: "Materials & Nano",
    tag: "Surface Physics & Coatings",
    summary: "Study of physical and chemical boundary phenomena, high-performance protective coatings, and tribological interfaces.",
    detailedScope: "Explores wetting kinetics, anti-corrosion barriers, self-cleaning superhydrophobic coatings, and functional interface modifications for aerospace and industrial components.",
    instrumentsOrFocus: ["Contact Angle Goniometry", "Thin Film Sputtering", "Corrosion Analysis", "Interfacial Thermodynamics"],
    externalUrl: "https://ciirc.res.in/service/surfaces-interfaces/",
    colorScheme: "cobalt"
  },
  {
    id: "biopolymers-and-biocomposites",
    indexNumber: "04",
    title: "Biopolymers & Biocomposites",
    category: "Materials & Nano",
    tag: "Sustainable Materials",
    summary: "Formulation of biodegradable polymers, natural fiber reinforced composites, and eco-friendly packaging alternatives.",
    detailedScope: "Focuses on circular material solutions, agricultural waste valorization into reinforcing fibers, bio-resins, and high-strength lightweight composite structures.",
    instrumentsOrFocus: ["Cellulose Nanofibers", "Polylactic Acid (PLA) Blends", "Mechanical Testing", "Biodegradability Assays"],
    externalUrl: "https://ciirc.res.in/service/biopolymers-and-biocomposites/",
    colorScheme: "teal"
  },
  {
    id: "affordable-medical-devices-sensors",
    indexNumber: "05",
    title: "Affordable Medical Devices, Sensors & Inks",
    category: "Life & Health",
    tag: "Clinical & Point-of-Care",
    summary: "Translational health technologies, point-of-care microfluidic biosensors, and conductive diagnostic inks.",
    detailedScope: "Develops low-cost diagnostic solutions targeting widespread societal healthcare challenges, non-invasive metabolic monitoring, and screen-printed flexible electrode systems.",
    instrumentsOrFocus: ["Electrochemical Biosensors", "Conductive Functional Inks", "Point-of-Care Strips", "Microfluidic Cartridges"],
    externalUrl: "https://ciirc.res.in/service/affordable-medical-devices-sensors/",
    colorScheme: "teal"
  },
  {
    id: "cell-and-molecular-biology",
    indexNumber: "06",
    title: "Cell & Molecular Biology",
    category: "Life & Health",
    tag: "Biomedical & Oncology",
    summary: "Mechanisms of disease progression, oncology biomarkers, molecular pharmacology, and targeted therapeutics.",
    detailedScope: "Conducts cellular cytotoxicity assays, gene expression profiling, screening of novel anti-cancer compounds, and investigation of cell signaling cascades.",
    instrumentsOrFocus: ["Fluorescence Microscopy", "Mammalian Cell Culture", "RT-PCR", "Protein Electrophoresis"],
    externalUrl: "https://ciirc.res.in/service/cell-and-molecular-biology/",
    colorScheme: "teal"
  },
  {
    id: "nano-biotechnology",
    indexNumber: "07",
    title: "Nano Biotechnology",
    category: "Life & Health",
    tag: "Enzyme & Nanodelivery",
    summary: "Intersection of nanotechnology with biological systems, enzyme immobilization, and targeted nanoscale delivery vehicles.",
    detailedScope: "Engineering biocatalytic nano-assemblies for industrial synthesis, stabilization of bioactive molecules, and targeted carrier systems for drug delivery.",
    instrumentsOrFocus: ["Enzyme Kinetics", "Liposomal Nanocarriers", "Bioconjugation Chemistry", "Thermal Stability Assays"],
    externalUrl: "https://ciirc.res.in/service/nano-biotechnology/",
    colorScheme: "teal"
  },
  {
    id: "food-technology",
    indexNumber: "08",
    title: "Food Technology",
    category: "Life & Health",
    tag: "Food Safety & Quality",
    summary: "Scientific evaluation of food safety, nutritional profiling, bioactive retention, and natural preservative formulations.",
    detailedScope: "Focuses on rapid contaminant screening, shelf-life extension using natural botanical antimicrobials, and post-harvest quality enhancement.",
    instrumentsOrFocus: ["Nutrient Profiling", "Microbial Load Testing", "Natural Extracts", "Quality Assurance Metrics"],
    externalUrl: "https://ciirc.res.in/service/food-technology/",
    colorScheme: "teal"
  },
  {
    id: "plant-and-microbial-technology",
    indexNumber: "09",
    title: "Plant & Microbial Technology",
    category: "Life & Health",
    tag: "Agri-Biotech & Botanical",
    summary: "Exploration of botanical actives, microbial bio-inoculants, secondary metabolites, and agricultural biotechnology.",
    detailedScope: "Bridges classical Ayurvedic botanical insights with modern analytical phytochemistry, discovering plant secondary metabolites with therapeutic and pest-repellent applications.",
    instrumentsOrFocus: ["Phytochemical Isolation", "Microbial Fermentation", "Plant Tissue Culture", "Bio-Fertilizer Formulations"],
    externalUrl: "https://ciirc.res.in/service/plant-and-microbial-technology/",
    colorScheme: "teal"
  },
  {
    id: "ancient-indian-science-and-technology",
    indexNumber: "10",
    title: "Ancient Indian Science & Technology",
    category: "Life & Health",
    tag: "Heritage S&T Validation",
    summary: "Rigorous scientific investigation and contemporary material validation of ancient Indian scientific treatises and practices.",
    detailedScope: "Applying modern analytical instrumentation (SEM, XRD, spectroscopy) to study traditional metallurgic processes (such as Wootz steel), rasashastra formulations, and holistic agricultural practices.",
    instrumentsOrFocus: ["Archaeo-metallurgy", "Traditional Formulation Chemistry", "Ethnobotanical Studies", "Comparative Scientific Metrics"],
    externalUrl: "https://ciirc.res.in/service/ancient-indian-science-and-technology/",
    colorScheme: "amber"
  },
  {
    id: "autonomous-systems",
    indexNumber: "11",
    title: "Autonomous Systems & Drones",
    category: "Engineering",
    tag: "Aerospace & Polar Robotics",
    summary: "Unmanned aerial vehicles (UAVs), telemetry, flight control algorithms, and extreme-environment robotic platforms.",
    detailedScope: "Pioneered Indian drone mapping in polar glaciers during the 4th Indian Arctic Expedition. Focuses on robust flight dynamics, payload stabilization, and long-range environmental mapping.",
    instrumentsOrFocus: ["Autonomous Flight Controllers", "Polar Glacial UAVs", "Computer Vision Payloads", "Telemetry Ground Stations"],
    externalUrl: "https://ciirc.res.in/service/autonomous-systems/",
    colorScheme: "cobalt"
  },
  {
    id: "thermal-engineering-tribology",
    indexNumber: "12",
    title: "Thermal Engineering & Tribology",
    category: "Engineering",
    tag: "Heat Transfer & Friction",
    summary: "Advanced heat transfer optimization, hydrodynamic lubrication, friction reduction, and wear-resistant systems.",
    detailedScope: "Addresses thermal management in high-performance electronics, engine friction mechanics, development of nano-lubricants, and energy-efficient cooling solutions.",
    instrumentsOrFocus: ["Pin-on-Disc Tribometer", "Thermal Conductivity Meter", "Nano-Lubricant Blends", "Heat Pipe Systems"],
    externalUrl: "https://ciirc.res.in/service/thermal-engineering-tribology/",
    colorScheme: "cobalt"
  },
  {
    id: "construction-technology",
    indexNumber: "13",
    title: "Construction Technology",
    category: "Engineering",
    tag: "Structural & Geopolymers",
    summary: "Sustainable construction composites, low-carbon geopolymer cements, and structural engineering materials.",
    detailedScope: "Develops eco-concrete incorporating industrial byproducts, testing structural durability under extreme stress, and advancing lightweight modular infrastructure.",
    instrumentsOrFocus: ["Compression Testing Systems", "Geopolymer Synthesis", "Non-Destructive Testing", "Durability Analysis"],
    externalUrl: "https://ciirc.res.in/service/construction-technology/",
    colorScheme: "cobalt"
  },
  {
    id: "computational-engineering",
    indexNumber: "14",
    title: "Computational Engineering & Modeling",
    category: "Computing & Systems",
    tag: "Simulation & High-Performance Computing",
    summary: "Multi-scale computational physics, finite element analysis (FEA), computational fluid dynamics (CFD), and algorithm design.",
    detailedScope: "Powers predictive engineering through numeric simulation, modeling complex aerodynamic flows, thermal dissipation, and molecular dynamics across interdisciplinary projects.",
    instrumentsOrFocus: ["Finite Element Analysis", "Computational Fluid Dynamics", "Molecular Dynamics Simulation", "High-Performance Clusters"],
    externalUrl: "https://ciirc.res.in/service/computational-engineering/",
    colorScheme: "cobalt"
  },
  {
    id: "energy",
    indexNumber: "15",
    title: "Energy & Clean Storage",
    category: "Earth & Environment",
    tag: "Batteries & Supercapacitors",
    summary: "Electrochemical energy storage, battery materials, supercapacitors, and alternative energy generation systems.",
    detailedScope: "Synthesizing nanostructured electroactive materials for next-generation lithium, sodium, and hybrid energy storage devices with enhanced cycle stability and power density.",
    instrumentsOrFocus: ["Battery Cycler & Potentiostat", "Supercapacitor Assemblies", "Coin Cell Fabrication", "Electrochemical Impedance"],
    externalUrl: "https://ciirc.res.in/service/energy/",
    colorScheme: "teal"
  },
  {
    id: "environment",
    indexNumber: "16",
    title: "Environmental Remediation & CCS",
    category: "Earth & Environment",
    tag: "Carbon Capture & Ecology",
    summary: "Carbon dioxide capture and storage (CCS), air quality monitoring, and ecological pollution remediation.",
    detailedScope: "Focuses on commercializable solid adsorbents for CO2 capture from industrial flue gases, catalytic breakdown of hazardous pollutants, and ecological impact mitigation.",
    instrumentsOrFocus: ["CO2 Adsorption Rig", "Flue Gas Analyzers", "Catalytic Degradation Systems", "Air Quality Monitoring"],
    externalUrl: "https://ciirc.res.in/service/environment/",
    colorScheme: "teal"
  },
  {
    id: "water",
    indexNumber: "17",
    title: "Water Purification & Management",
    category: "Earth & Environment",
    tag: "Filtration & Heavy Metals",
    summary: "Advanced water treatment membranes, nano-adsorbents for heavy metal removal, and wastewater recycling.",
    detailedScope: "Engineers cost-effective functional ceramic and polymer filtration matrices capable of removing arsenic, fluoride, and organic dye effluents from contaminated sources.",
    instrumentsOrFocus: ["Membrane Separation Units", "Heavy Metal Testing", "Batch Adsorption Columns", "Water Quality Indexing"],
    externalUrl: "https://ciirc.res.in/service/water/",
    colorScheme: "teal"
  },
  {
    id: "remote-sensing",
    indexNumber: "18",
    title: "Remote Sensing & Geospatial S&T",
    category: "Earth & Environment",
    tag: "Satellite Telemetry & GIS",
    summary: "Multidisciplinary satellite data telemetry, GIS environmental modeling, glacial monitoring, and terrain analysis.",
    detailedScope: "Hosts the dedicated ISRO IRNSS navigation satellite receiver station. Conducts high-resolution satellite image processing for terrain mapping and glacial movement studies in the Himalayas and Arctic.",
    instrumentsOrFocus: ["ISRO IRNSS Satellite Receiver", "Geographic Information Systems (GIS)", "Multi-spectral Image Analysis", "Glacier Telemetry"],
    externalUrl: "https://ciirc.res.in/service/remote-sensing/",
    colorScheme: "cobalt"
  },
  {
    id: "innovation-and-entrepreneurship-development-centre",
    indexNumber: "19",
    title: "Innovation & Incubation (IEDC / AIC-JIT)",
    category: "Innovation",
    tag: "Enterprise & Tech Transfer",
    summary: "Nurturing student and faculty enterprise, seed incubation, patent filing, and commercial product translation.",
    detailedScope: "Leverages the Atal Incubation Centre (AIC - JIT Foundation) on campus to translate lab inventions into market-viable products, startups, and commercial licenses.",
    instrumentsOrFocus: ["AIC-JIT Incubation Hub", "IP & Patent Desk", "Seed Prototyping Workshop", "Venture Mentorship"],
    externalUrl: "https://ciirc.res.in/service/innovation-and-entrepreneurship-development-centre/",
    colorScheme: "amber"
  }
];

export const HISTORIC_MILESTONES: MilestoneItem[] = [
  {
    year: "2017",
    title: "Pace-Setting Biodiesel Vehicle at Asia Pacific Rally",
    badge: "Automotive Innovation",
    description: "Successfully engineered and demonstrated a vehicle running on 100% used cooking oil (WCO) biodiesel, serving as the official pace-setting car at the prestigious Asia Pacific Coffee-500 rally."
  },
  {
    year: "2018",
    title: "Bangalore Nano Most Innovative Product Display",
    badge: "National Honour",
    description: "Recognized at the prestigious Bangalore India Nano summit for breakthrough innovative nanotechnology displays and translational materials developed in CIIRC laboratories."
  },
  {
    year: "2019",
    title: "4th Indian Scientific Expedition to the North Pole (Arctic)",
    badge: "Polar Milestone",
    isArcticOrPolar: true,
    description: "Led the Indian scientific contingent to the Arctic in September 2019 for mapping glaciers, proudly becoming the first Indians to fly autonomous research drones in the extreme Arctic climate."
  },
  {
    year: "2019",
    title: "ISRO IRNSS Satellite Receiver Ground Station",
    badge: "Space Telemetry",
    description: "Commissioned a dedicated on-campus ISRO IRNSS (NavIC) satellite receiver for precision atmospheric data collection, positioning telemetry, and aerospace research."
  },
  {
    year: "2020",
    title: "National Nano Sparx Innovation Award",
    badge: "Nanotechnology",
    description: "Conferred the acclaimed Nano Sparx 2020 recognition for high-impact translational research in functional nanomaterials and healthcare sensors."
  },
  {
    year: "2022",
    title: "Selected for Scientific Expedition to the South Pole (Antarctica)",
    badge: "Polar Milestone",
    isArcticOrPolar: true,
    description: "Faculty selected as part of an elite international scientific expedition to the South Pole (Antarctica) in March 2022, expanding polar climate, ice shelf, and instrumentation research."
  }
];

export const STRATEGIC_COLLABORATIONS: PartnerItem[] = [
  { name: "DST - Dept. of Science & Technology", category: "Government / Funding", initials: "DST" },
  { name: "DRDO - Defence Research & Development", category: "Government / Funding", initials: "DRDO" },
  { name: "ISRO / DOS - Dept. of Space", category: "Government / Funding", initials: "ISRO" },
  { name: "DBT - Dept. of Biotechnology", category: "Government / Funding", initials: "DBT" },
  { name: "CEFIPRA - Indo-French S&T Council", category: "Government / Funding", initials: "CEFIPRA" },
  { name: "P.N. Lebedev Physical Institute (Russia)", category: "International Academic", initials: "LPI", logoUrl: "https://ciirc.res.in/wp-content/uploads/2021/05/PN-Lebedev-Institute-Russia.jpg" },
  { name: "Tunghai University (Taiwan)", category: "International Academic", initials: "THU", logoUrl: "https://ciirc.res.in/wp-content/uploads/2021/01/Tunghai-University.jpg" },
  { name: "TÜV Rheinland (Germany)", category: "Industry & Enterprise", initials: "TUV", logoUrl: "https://ciirc.res.in/wp-content/uploads/2021/01/TUV-Rheinland.jpg" },
  { name: "National Remote Sensing Centre (NRSC)", category: "Government / Funding", initials: "NRSC", logoUrl: "https://ciirc.res.in/wp-content/uploads/2021/01/National-Remote-Sensing-Centre.jpg" },
  { name: "BOHECO", category: "Industry & Enterprise", initials: "BHC", logoUrl: "https://ciirc.res.in/wp-content/uploads/2021/01/BOHECO.jpg" },
  { name: "Desicon", category: "Industry & Enterprise", initials: "DSC", logoUrl: "https://ciirc.res.in/wp-content/uploads/2021/05/Desicon.jpg" },
  { name: "Dover", category: "Industry & Enterprise", initials: "DVR", logoUrl: "https://ciirc.res.in/wp-content/uploads/2021/01/Dover.jpg" },
  { name: "S-VYASA Yoga University", category: "International Academic", initials: "SVYASA", logoUrl: "https://ciirc.res.in/wp-content/uploads/2021/05/svyasa-logo.jpg" },
  { name: "Vsix Analytical Solutions", category: "Industry & Enterprise", initials: "V6", logoUrl: "https://ciirc.res.in/wp-content/uploads/2021/05/Vsix_new.jpg" }
];

export const RESEARCH_FELLOWSHIPS_WON = [
  "Commonwealth Fellowship",
  "BRICS Young Scientist",
  "DBT Women Fellowship",
  "DBT Ramalingaswami Fellowship",
  "CSIR Fellowship",
  "Raman Charpak (Indo-French) Fellowship",
  "WOS-A & WOS-B (DST)",
  "BIRAC-Shrishti Award",
  "DST Young Scientist Award",
  "Soviet Union Grant Challenge"
];

export const LIVE_OPPORTUNITIES: OpportunityItem[] = [
  {
    id: "rf-sept-2023",
    title: "Requirement for Research Fellow — Translational Instrumentation",
    date: "September 5, 2023",
    department: "Multidisciplinary Engineering",
    status: "Open Application",
    link: "https://ciirc.res.in/requirement-for-research-fellow/"
  },
  {
    id: "rf-rs-apr-2023",
    title: "Requirement for Research Fellow RS — Remote Sensing & Geospatial",
    date: "April 11, 2023",
    department: "Remote Sensing & Satellite Lab",
    status: "Open Application",
    link: "https://ciirc.res.in/requirement-for-research-fellow-rs/"
  },
  {
    id: "rf-as-apr-2023",
    title: "Requirement for Research Fellow AS — Autonomous Systems & Avionics",
    date: "April 11, 2023",
    department: "Autonomous Systems Lab",
    status: "Open Application",
    link: "https://ciirc.res.in/requirement-for-research-fellow-as/"
  },
  {
    id: "rf-cb-apr-2023",
    title: "Requirement for Research Fellow CB — Cell & Molecular Biology",
    date: "April 11, 2023",
    department: "Life & Health Sciences",
    status: "Open Application",
    link: "https://ciirc.res.in/requirement-for-research-fellow-cb/"
  },
  {
    id: "pa-indo-swedish",
    title: "Project Assistant Post — Indo-Swedish GITA Bilateral Initiative",
    date: "June 6, 2021",
    department: "International Collaborations",
    status: "Archived Record",
    link: "https://ciirc.res.in/requirement-for-project-assistant-post-indo-swedish-gita/"
  }
];

export const INDUSTRY_5_ENABLERS = [
  { title: "Nanotechnology", desc: "Atomic precision engineering and nanomaterials" },
  { title: "Additive Technology", desc: "Rapid 3D micro-fabrication and structural printing" },
  { title: "Biotechnology", desc: "Cellular diagnostics, natural actives and biopolymers" },
  { title: "Autonomous Systems", desc: "UAVs, telemetry control and robotics" },
  { title: "Artificial Intelligence", desc: "Predictive modeling, data telemetry and sensor fusion" },
  { title: "5G+ Communication", desc: "Low-latency satellite & remote sensing networks" }
];
