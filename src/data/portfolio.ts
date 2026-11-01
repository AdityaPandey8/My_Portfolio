/**
 * Central portfolio data for Aditya Pandey.
 * Every fact on the site comes from this file — edit it here and the whole site follows.
 */

export type Palette = { from: string; via: string; to: string; accent: string };

export const profile = {
  fullName: 'Aditya Pandey',
  displayName: 'Aditya Pandey',
  firstName: 'ADITYA',
  seriesTag: 'THE SERIES',
  /** Fictional studio card shown at the very start of the opening sequence. */
  originalLabel: 'A PANDEY ORIGINAL',
  role: 'AI & Full-Stack Developer',
  tagline: ['AI & Full-Stack Developer', 'Innovation Builder'],
  intro:
    "I'm a Computer Science student specializing in Data Science, passionate about building AI-powered products, full-stack applications, and technology-driven innovation ecosystems. I enjoy turning ideas into working products — from AI platforms and solutions to community initiatives and hackathon projects.",
  location: 'Lucknow, India',
  email: 'pandeyaditya2685@gmail.com',
  links: {
    linkedin: 'https://www.linkedin.com/in/aditya-pandey-3a986b336/',
    github: 'https://github.com/AdityaPandey8',
  },
  githubHandle: 'github.com/AdityaPandey8',
  resumePdf: '/assets/Aditya_Pandey_Resume.pdf',
  resumeFileName: 'Aditya_Pandey_Resume.pdf',
  portrait: {
    src: '/assets/portrait-720.webp',
    srcSet: '/assets/portrait-420.webp 420w, /assets/portrait-720.webp 720w, /assets/portrait-1100.webp 1100w',
    alt: 'Illustrated 3D avatar of Aditya Pandey giving two thumbs up',
  },
  interests: ['Basketball', 'Drawing & Sketching', 'Listening to Music'],
  spokenLanguages: ['English', 'Hindi'],
};

export const education = [
  {
    school: 'Shri Ramswaroop Memorial College of Engineering and Management (SRMCEM)',
    short: 'SRMCEM',
    place: 'Lucknow, Uttar Pradesh',
    degree: 'B.Tech. in Computer Science & Engineering — Specialization: Data Science',
    period: '2023 – Present',
    score: 'Undergraduate',
  },
  {
    school: 'Little Flower School',
    short: 'Little Flower School',
    place: 'Deoria, Uttar Pradesh',
    degree: 'Class XII — ISC',
    period: 'Completed',
    score: 'ISC',
  },
  {
    school: 'Little Flower School',
    short: 'Little Flower School',
    place: 'Deoria, Uttar Pradesh',
    degree: 'Class X — ICSE',
    period: 'Completed',
    score: 'ICSE',
  },
];

export const experience = [
  {
    company: 'SRMCEM — Institution’s Innovation Council',
    role: 'Event Management Coordinator',
    place: 'Lucknow',
    period: '2026 – Present',
    points: ['Leading and supporting innovation-focused events, student engagement, outreach, and event execution.'],
  },
  {
    company: 'AlgoZenith, SRMCEM',
    role: 'Chapter Lead',
    place: 'Lucknow',
    period: '2026 – Present',
    points: [
      'Building the campus coding community, encouraging DSA learning, and helping students engage with competitive programming and technical opportunities.',
    ],
  },
  {
    company: 'AI/DS Department, SRMCEM',
    role: 'Placement Coordinator',
    place: 'Lucknow',
    period: 'Ongoing',
    points: ['Coordinating placement activities for the department and exploring job culture.'],
  },
  {
    company: 'Full-Stack Development Internship',
    role: 'Intern',
    place: '',
    period: 'Completed',
    points: [
      'Completed intensive training and practical work across HTML, CSS, JavaScript, React, Node.js, Express.js, API integration, Context API, Redux, and application development.',
    ],
  },
];

/** "What I Do" — the five pillars. */
export const pillars = [
  { title: 'AI & Generative AI', body: 'Building intelligent applications using LLMs, AI agents, RAG, memory systems, and AI-powered workflows.', mono: 'AI' },
  { title: 'Full-Stack Development', body: 'Building modern web applications using React, TypeScript, Node.js, Express, PostgreSQL, and Supabase.', mono: 'FS' },
  { title: 'Product & Startup Building', body: 'Turning ideas into functional digital products with validation, strategy, user-focused experiences, and scalable architecture.', mono: 'PR' },
  { title: 'Data & Intelligent Systems', body: 'Working with data-driven applications, analytics, embeddings, vector search, and decision-support systems.', mono: 'DS' },
  { title: 'Innovation & Community Leadership', body: 'Organizing technical and innovation initiatives, mentoring students, and helping teams move from ideas to prototypes and competitions.', mono: 'IN' },
];

export type Metric = { value: string; label: string };

export type Project = {
  id: string;
  title: string;
  year: string;
  genre: string;
  logline: string;
  stack: string[];
  build: string[];
  features: string[];
  metrics: Metric[];
  /** Omit when the repository isn't public — the GitHub button is hidden instead of linking to a 404. */
  github?: string;
  live?: string;
  palette: Palette;
  motif: 'network' | 'leaf' | 'bridge' | 'pins';
};

export const projects: Project[] = [
  {
    id: 'contrive8',
    title: 'CONTRIVE8',
    year: 'Featured',
    genre: 'AI • Startup Ecosystem • RAG',
    logline:
      'An AI-powered innovation and startup ecosystem that takes students and aspiring founders from idea to execution.',
    stack: ['React', 'TypeScript', 'Supabase', 'PostgreSQL', 'Gemini API', 'AI Agents', 'RAG', 'PGVector'],
    build: [
      'Helps students and aspiring founders validate ideas, develop strategies and access AI mentorship.',
      'Connects founders with real mentors and investors, and helps them create pitch materials.',
      'Built on React + TypeScript with Supabase/PostgreSQL, Gemini-powered AI agents and RAG over PGVector embeddings.',
    ],
    features: ['Idea validation', 'Strategy development', 'AI mentorship', 'Real mentor & investor network', 'Pitch material creation', 'Idea → execution workflow'],
    metrics: [
      { value: 'AI', label: 'mentorship with agents' },
      { value: 'RAG', label: 'retrieval over PGVector' },
      { value: 'Gemini', label: 'LLM backbone' },
      { value: '0 → 1', label: 'idea-to-execution founder journey' },
    ],
    palette: { from: '#0f0826', via: '#4b2bb8', to: '#06060d', accent: '#9d8cff' },
    motif: 'network',
  },
  {
    id: 'kishu',
    title: 'KISHU',
    year: 'Featured',
    genre: 'AgriTech • AI • Edge Functions',
    logline:
      'An AI-driven smart agriculture ecosystem that puts crop intelligence, weather and market data in every farmer’s hands.',
    stack: ['React', 'TypeScript', 'Vite', 'Tailwind CSS', 'Supabase', 'PostgreSQL', 'Edge Functions', 'AI'],
    build: [
      'Helps farmers with crop disease detection, weather alerts and mandi prices.',
      'Surfaces government schemes, crop recommendations and general agricultural assistance.',
      'Built with React, TypeScript, Vite and Tailwind on Supabase/PostgreSQL with Edge Functions and AI.',
    ],
    features: ['Crop disease detection', 'Weather alerts', 'Mandi prices', 'Government schemes', 'Crop recommendations', 'Agricultural assistant'],
    metrics: [
      { value: '6', label: 'farmer-facing modules' },
      { value: 'AI', label: 'crop disease detection' },
      { value: 'Live', label: 'weather & mandi data' },
      { value: 'Edge', label: 'Supabase Edge Functions' },
    ],
    palette: { from: '#03150c', via: '#0f6b3c', to: '#050a07', accent: '#4ade80' },
    motif: 'leaf',
  },
  {
    id: 'shiksha-setu',
    title: 'Shiksha Setu',
    year: 'Live',
    genre: 'EdTech • Offline-first',
    logline:
      'An offline-first EdTech platform for students in remote and underserved regions — learning that works without the internet.',
    stack: ['HTML', 'CSS', 'JavaScript', 'Node.js', 'Express.js', 'JSON', 'LocalStorage', 'Web APIs'],
    build: [
      'Provides learning resources, quizzes, career guidance and scholarship information.',
      'Includes an AI-powered learning assistant for students.',
      'Offline-first architecture using LocalStorage and Web APIs, backed by Node.js and Express.',
    ],
    features: ['Learning resources', 'Quizzes', 'Career guidance', 'Scholarships', 'AI learning assistant', 'Works offline'],
    metrics: [
      { value: 'Offline', label: 'first architecture' },
      { value: '5', label: 'learning modules' },
      { value: 'AI', label: 'learning assistant' },
      { value: 'Live', label: 'deployed on Vercel' },
    ],
    github: 'https://github.com/AdityaPandey8/shiksha-setu-bridge',
    live: 'https://shiksha-setu-bridge.vercel.app/',
    palette: { from: '#1c1003', via: '#8a4a07', to: '#0a0806', accent: '#fbbf24' },
    motif: 'bridge',
  },
  {
    id: 'sahayog-ai',
    title: 'SahayogAI',
    year: 'Live',
    genre: 'Social Impact • AI • Maps',
    logline:
      'An AI-powered NGO and volunteer coordination platform connecting NGOs, volunteers and communities.',
    stack: ['React', 'Node.js', 'Express.js', 'AI', 'Maps', 'Supabase'],
    build: [
      'Connects NGOs, volunteers and communities through issue reporting and intelligent assistance.',
      'Location-based coordination on maps with automated reporting.',
      'Built with React, Node.js/Express and Supabase, with AI assistance and map integrations.',
    ],
    features: ['Issue reporting', 'Intelligent assistance', 'Location-based coordination', 'Automated reporting', 'NGO ↔ volunteer matching'],
    metrics: [
      { value: '3', label: 'sides connected: NGOs, volunteers, communities' },
      { value: 'Maps', label: 'location-based coordination' },
      { value: 'AI', label: 'intelligent assistance' },
      { value: 'Live', label: 'deployed on Vercel' },
    ],
    github: 'https://github.com/AdityaPandey8/sahyogui-design-system',
    live: 'https://sahyogai-gamma.vercel.app/',
    palette: { from: '#04121f', via: '#0f4c6e', to: '#05080d', accent: '#22d3ee' },
    motif: 'pins',
  },
];

export type Achievement = {
  id: string;
  title: string;
  org: string;
  detail: string;
  laurel: string;
  link?: string;
};

/** Leadership & competition moments. */
export const achievements: Achievement[] = [
  {
    id: 'sih',
    title: 'Team Lead',
    org: 'Smart India Hackathon',
    detail: 'Led a student team through ideation, problem analysis, solution development, and presentation.',
    laurel: 'National Hackathon',
  },
  {
    id: 'algozenith',
    title: 'Chapter Lead',
    org: 'AlgoZenith · SRMCEM',
    detail: 'Building the campus coding community and championing DSA and competitive programming.',
    laurel: 'Community',
  },
  {
    id: 'iic',
    title: 'Event Coordinator',
    org: 'Institution’s Innovation Council',
    detail: 'Leading innovation-focused events, student engagement, outreach and event execution at SRMCEM.',
    laurel: 'Innovation',
  },
  {
    id: 'placement',
    title: 'Placement Coordinator',
    org: 'AI/DS Department · SRMCEM',
    detail: 'Coordinating placements for the department and exploring job culture.',
    laurel: 'Leadership',
  },
  {
    id: 'hackathons',
    title: 'Hackathon Lead',
    org: 'National & Regional Hackathons',
    detail: 'Led teams through ideation, prototyping, technical development, and pitching across multiple hackathons.',
    laurel: 'Multiple Events',
  },
];

export type Certification = { issuer: string; name: string; link: string };

/** Add certificates here (issuer, name, link) — the certifications rail appears automatically once this has entries. */
export const certifications: Certification[] = [];

export type Skill = { name: string; mono: string; note?: string };
export type SkillCategory = { id: string; title: string; subtitle: string; skills: Skill[] };

export const skillCategories: SkillCategory[] = [
  {
    id: 'ai',
    title: 'AI / ML',
    subtitle: 'LLMs, agents & RAG',
    skills: [
      { name: 'Generative AI', mono: 'Ga', note: 'Core' },
      { name: 'LLM Integration', mono: 'Ll' },
      { name: 'AI Agents', mono: 'Ag' },
      { name: 'Agentic AI', mono: 'Aa' },
      { name: 'RAG', mono: 'Rg' },
      { name: 'Prompt Engineering', mono: 'Pe' },
      { name: 'Machine Learning', mono: 'Ml' },
      { name: 'AI-Powered Applications', mono: 'Ap' },
    ],
  },
  {
    id: 'languages',
    title: 'Languages',
    subtitle: 'Python & TypeScript lead',
    skills: [
      { name: 'Python', mono: 'Py' },
      { name: 'TypeScript', mono: 'Ts' },
      { name: 'JavaScript', mono: 'Js' },
      { name: 'Java', mono: 'Jv' },
      { name: 'C', mono: 'C' },
    ],
  },
  {
    id: 'frontend',
    title: 'Frontend',
    subtitle: 'Responsive web',
    skills: [
      { name: 'React', mono: 'Re', note: 'Core' },
      { name: 'React Router', mono: 'Rr' },
      { name: 'HTML', mono: 'Ht' },
      { name: 'CSS', mono: 'Cs' },
      { name: 'Tailwind CSS', mono: 'Tw' },
      { name: 'Responsive Web Dev', mono: 'Rw' },
    ],
  },
  {
    id: 'backend',
    title: 'Backend & APIs',
    subtitle: 'Servers & edge',
    skills: [
      { name: 'Node.js', mono: 'No' },
      { name: 'Express.js', mono: 'Ex' },
      { name: 'Django', mono: 'Dj' },
      { name: 'REST APIs', mono: 'Ra' },
      { name: 'Supabase Edge Functions', mono: 'Ef' },
    ],
  },
  {
    id: 'data',
    title: 'Data & Databases',
    subtitle: 'SQL, vectors & analysis',
    skills: [
      { name: 'PostgreSQL', mono: 'Pg' },
      { name: 'Supabase', mono: 'Sb' },
      { name: 'PGVector', mono: 'Pv' },
      { name: 'NumPy', mono: 'Np' },
      { name: 'Pandas', mono: 'Pd' },
      { name: 'Matplotlib', mono: 'Mp' },
    ],
  },
  {
    id: 'tools',
    title: 'Tools & Cloud',
    subtitle: 'Ship it',
    skills: [
      { name: 'Git', mono: 'Gt' },
      { name: 'GitHub', mono: 'Gh' },
      { name: 'VS Code', mono: 'Vs' },
      { name: 'Vercel', mono: 'Vc' },
      { name: 'Google Cloud', mono: 'Gc' },
    ],
  },
  {
    id: 'core',
    title: 'Core Skills',
    subtitle: 'The foundations',
    skills: [
      { name: 'Data Structures & Algorithms', mono: 'Ds' },
      { name: 'Problem Solving', mono: 'Ps' },
      { name: 'System Design', mono: 'Sd' },
      { name: 'Database Design', mono: 'Dd' },
      { name: 'API Integration', mono: 'Ai' },
      { name: 'Product Development', mono: 'Pd' },
    ],
  },
  {
    id: 'soft',
    title: 'Soft Skills',
    subtitle: 'How I work with people',
    skills: [
      { name: 'Leadership', mono: 'Le' },
      { name: 'Communication', mono: 'Co' },
      { name: 'Teamwork', mono: 'Tm' },
      { name: 'Critical Thinking', mono: 'Ct' },
      { name: 'Adaptability', mono: 'Ad' },
      { name: 'Time Management', mono: 'Ti' },
      { name: 'Decision Making', mono: 'Dm' },
    ],
  },
];

/** Shown when a skill card is hovered/tapped: where the skill shows up across projects and roles. */
export const skillEvidence: Record<string, string[]> = {
  'Generative AI': ['CONTRIVE8', 'KISHU', 'SahayogAI'],
  'LLM Integration': ['CONTRIVE8 · Gemini API'],
  'AI Agents': ['CONTRIVE8'],
  'Agentic AI': ['CONTRIVE8'],
  RAG: ['CONTRIVE8 · PGVector'],
  'AI-Powered Applications': ['Shiksha Setu learning assistant', 'SahayogAI'],
  TypeScript: ['CONTRIVE8', 'KISHU'],
  JavaScript: ['Shiksha Setu', 'Full-Stack internship'],
  React: ['CONTRIVE8', 'KISHU', 'SahayogAI', 'Full-Stack internship'],
  'Tailwind CSS': ['KISHU'],
  HTML: ['Shiksha Setu'],
  CSS: ['Shiksha Setu'],
  'Node.js': ['Shiksha Setu', 'SahayogAI'],
  'Express.js': ['Shiksha Setu', 'SahayogAI'],
  'Supabase Edge Functions': ['KISHU'],
  PostgreSQL: ['CONTRIVE8', 'KISHU'],
  Supabase: ['CONTRIVE8', 'KISHU', 'SahayogAI'],
  PGVector: ['CONTRIVE8'],
  Vercel: ['Shiksha Setu', 'SahayogAI'],
  'Data Structures & Algorithms': ['AlgoZenith Chapter Lead'],
  Leadership: ['SIH Team Lead', 'AlgoZenith Chapter Lead', 'IIC Event Coordinator'],
  Communication: ['Hackathon pitching', 'Placement Coordinator'],
  Teamwork: ['Smart India Hackathon', 'Multiple hackathons'],
};

export type Episode = {
  code: string;
  title: string;
  description: string;
  tags: string[];
  runtime: string;
  palette: Palette;
};

export type Season = {
  number: number;
  title: string;
  period: string;
  synopsis: string;
  episodes: Episode[];
};

const violet: Palette = { from: '#120822', via: '#3d1a6e', to: '#07060c', accent: '#b98bff' };
const amber: Palette = { from: '#1c1003', via: '#6b3c06', to: '#0a0806', accent: '#fbbf24' };
const ocean: Palette = { from: '#04121f', via: '#0f4c6e', to: '#05080d', accent: '#22d3ee' };
const indigo: Palette = { from: '#0c0b26', via: '#2f2a8f', to: '#06060d', accent: '#9d8cff' };
const jade: Palette = { from: '#03150f', via: '#0d5a40', to: '#050a08', accent: '#4ade80' };

export const seasons: Season[] = [
  {
    number: 1,
    title: 'The Beginning',
    period: 'School years',
    synopsis: 'Little Flower School, Deoria — where the foundations were laid.',
    episodes: [
      {
        code: 'S01 E01',
        title: 'The Foundation',
        description: 'Class X (ICSE) at Little Flower School, Deoria, Uttar Pradesh.',
        tags: ['ICSE', 'Class X'],
        runtime: 'Completed',
        palette: amber,
      },
      {
        code: 'S01 E02',
        title: 'The Launchpad',
        description: 'Class XII (ISC) at Little Flower School, Deoria, Uttar Pradesh.',
        tags: ['ISC', 'Class XII'],
        runtime: 'Completed',
        palette: violet,
      },
    ],
  },
  {
    number: 2,
    title: 'Enter: Data Science',
    period: '2023 – Present',
    synopsis: 'B.Tech in Computer Science & Engineering (Data Science) at SRMCEM, Lucknow.',
    episodes: [
      {
        code: 'S02 E01',
        title: 'The Engineer',
        description: 'B.Tech CSE with a specialization in Data Science at Shri Ramswaroop Memorial College of Engineering and Management.',
        tags: ['B.Tech', 'CSE', 'Data Science'],
        runtime: '2023 – Present',
        palette: indigo,
      },
      {
        code: 'S02 E02',
        title: 'The Trainee',
        description: 'Full-Stack Development internship — HTML, CSS, JavaScript, React, Node.js, Express.js, API integration, Context API and Redux.',
        tags: ['React', 'Node.js', 'Redux'],
        runtime: 'Internship',
        palette: ocean,
      },
    ],
  },
  {
    number: 3,
    title: 'The Hackathon Arc',
    period: 'Competitions',
    synopsis: 'Leading teams from a blank whiteboard to a working prototype and a pitch.',
    episodes: [
      {
        code: 'S03 E01',
        title: 'The Captain',
        description: 'Team Lead at Smart India Hackathon — ideation, problem analysis, solution development and presentation.',
        tags: ['SIH', 'Team Lead'],
        runtime: 'National stage',
        palette: jade,
      },
      {
        code: 'S03 E02',
        title: 'The Builder',
        description: 'Multiple national and regional hackathons — prototyping, technical development and pitching.',
        tags: ['Prototyping', 'Pitching'],
        runtime: 'Multiple events',
        palette: amber,
      },
    ],
  },
  {
    number: 4,
    title: 'Building Real Products',
    period: 'Now streaming',
    synopsis: 'Four Originals — a startup OS, a smart-agriculture ecosystem, an offline-first EdTech platform and an NGO coordination platform.',
    episodes: [
      {
        code: 'S04 E01',
        title: 'The Founder',
        description: 'CONTRIVE8 — an AI-powered innovation and startup ecosystem with AI agents, RAG and PGVector.',
        tags: ['Gemini', 'RAG', 'PGVector'],
        runtime: 'AI platform',
        palette: indigo,
      },
      {
        code: 'S04 E02',
        title: 'The Grower',
        description: 'KISHU — crop disease detection, weather alerts, mandi prices and schemes for farmers.',
        tags: ['AgriTech', 'Supabase'],
        runtime: 'AI ecosystem',
        palette: jade,
      },
      {
        code: 'S04 E03',
        title: 'The Bridge',
        description: 'Shiksha Setu and SahayogAI — technology for remote learners, NGOs and volunteers.',
        tags: ['EdTech', 'Social Impact'],
        runtime: 'Live on Vercel',
        palette: ocean,
      },
    ],
  },
  {
    number: 5,
    title: 'The Community',
    period: '2026 – Present',
    synopsis: 'Building the people side of innovation on campus.',
    episodes: [
      {
        code: 'S05 E01',
        title: 'The Chapter Lead',
        description: 'AlgoZenith Chapter Lead at SRMCEM — growing the campus coding community and DSA culture.',
        tags: ['AlgoZenith', 'DSA', 'CP'],
        runtime: '2026 – Present',
        palette: violet,
      },
      {
        code: 'S05 E02',
        title: 'The Organizer',
        description: 'Event Management Coordinator at the Institution’s Innovation Council — events, outreach and engagement.',
        tags: ['IIC', 'Events'],
        runtime: '2026 – Present',
        palette: amber,
      },
      {
        code: 'S05 E03',
        title: 'The Coordinator',
        description: 'Placement Coordinator for the AI/DS department — exploring job culture.',
        tags: ['Placements'],
        runtime: 'Ongoing',
        palette: indigo,
      },
    ],
  },
];

export type TopPick = { label: string; title: string; detail: string; palette: Palette };

export const topPicks: TopPick[] = [
  { label: 'The flagship', title: 'CONTRIVE8', detail: 'AI startup ecosystem • Agents + RAG', palette: indigo },
  { label: 'Biggest stage', title: 'Smart India Hackathon', detail: 'Team Lead', palette: jade },
  { label: 'Community', title: 'AlgoZenith', detail: 'Chapter Lead, SRMCEM', palette: violet },
  { label: 'For farmers', title: 'KISHU', detail: 'Smart agriculture with AI', palette: jade },
  { label: 'Works offline', title: 'Shiksha Setu', detail: 'EdTech for remote regions • Live', palette: amber },
  { label: 'For NGOs', title: 'SahayogAI', detail: 'Volunteer coordination • Live', palette: ocean },
  { label: 'Specialization', title: 'Data Science', detail: 'B.Tech CSE, SRMCEM', palette: indigo },
  { label: 'Go-to stack', title: 'React + Supabase', detail: 'with TypeScript & PostgreSQL', palette: ocean },
  { label: 'AI toolkit', title: 'LLMs & Agents', detail: 'RAG • Embeddings • Vector search', palette: violet },
  { label: 'Innovation', title: 'IIC Coordinator', detail: 'Events & outreach', palette: amber },
];

/** Slides for the "▶ Play Intro" cinematic sequence. */
export type IntroSlide = { kicker: string; title: string; lines: string[]; chips?: string[] };

export const introSlides: IntroSlide[] = [
  {
    kicker: 'Education',
    title: 'B.Tech · CSE (Data Science)',
    lines: ['SRMCEM, Lucknow', '2023 – Present'],
    chips: ['Data Science'],
  },
  {
    kicker: 'Skills',
    title: 'AI meets full-stack.',
    lines: ['LLMs · AI Agents · RAG · Prompt Engineering', 'React · TypeScript · Node.js · Express · PostgreSQL · Supabase'],
    chips: ['Python', 'TypeScript', 'React', 'Supabase', 'RAG', 'Agents'],
  },
  {
    kicker: 'Projects',
    title: 'Four Originals',
    lines: ['CONTRIVE8 — AI startup ecosystem', 'KISHU — smart agriculture', 'Shiksha Setu — offline-first EdTech', 'SahayogAI — NGO & volunteer coordination'],
  },
  {
    kicker: 'Leadership',
    title: 'Top Moments',
    lines: ['Team Lead — Smart India Hackathon', 'Chapter Lead — AlgoZenith, SRMCEM', 'Event Coordinator — Innovation Council'],
  },
  {
    kicker: 'Current mission',
    title: 'Ideas → Products',
    lines: ['Building AI-powered products and innovation ecosystems'],
  },
];

export type ProfileId = 'aditya' | 'recruiter' | 'developer' | 'founder';
export type SectionId = 'about' | 'journey' | 'originals' | 'picks' | 'skills' | 'moments' | 'story';

export const viewerProfiles: {
  id: ProfileId;
  name: string;
  blurb: string;
  color: string;
  order: SectionId[];
}[] = [
  {
    id: 'aditya',
    name: 'Aditya',
    blurb: 'The full series, in order',
    color: '#6d4aff',
    order: ['about', 'journey', 'originals', 'picks', 'skills', 'moments', 'story'],
  },
  {
    id: 'recruiter',
    name: 'Recruiter',
    blurb: 'Resume, leadership & skills first',
    color: '#22d3ee',
    order: ['story', 'moments', 'skills', 'originals', 'about', 'journey', 'picks'],
  },
  {
    id: 'developer',
    name: 'Developer',
    blurb: 'Projects, stack & GitHub first',
    color: '#4ade80',
    order: ['originals', 'skills', 'journey', 'moments', 'about', 'picks', 'story'],
  },
  {
    id: 'founder',
    name: 'Founder',
    blurb: 'Products & the story arc first',
    color: '#fbbf24',
    order: ['originals', 'journey', 'picks', 'moments', 'about', 'skills', 'story'],
  },
];

export const sectionMeta: Record<SectionId, { nav: string; card: string; meta: string; palette: Palette }> = {
  about: { nav: 'About', card: 'About Me', meta: 'The Pilot • What I do', palette: violet },
  journey: { nav: 'Journey', card: 'My Journey', meta: `${seasons.length} Seasons • ${seasons.reduce((n, s) => n + s.episodes.length, 0)} Episodes`, palette: amber },
  originals: { nav: 'Originals', card: 'My Projects', meta: `${projects.length} Originals`, palette: indigo },
  picks: { nav: 'Top Picks', card: 'Top Picks', meta: 'Top 10 highlights', palette: jade },
  skills: { nav: 'Skills', card: 'My Skills', meta: `${skillCategories.length} Categories`, palette: ocean },
  moments: { nav: 'Moments', card: 'Leadership', meta: `${achievements.length} Moments`, palette: violet },
  story: { nav: 'Resume', card: 'The Full Story', meta: 'Resume • View & download', palette: indigo },
};
