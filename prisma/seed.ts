import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function seed() {
  console.log('🌱 Seeding database...')

  // Site Info
  const siteInfoData = [
    { key: 'siteTitle', value: 'Youssef Mahmoud Hanafy' },
    { key: 'siteSubtitle', value: 'Front-End Developer' },
    { key: 'aboutText', value: 'Detail-oriented Front-End Developer and Computer Systems Engineering student with 15+ responsive web projects. Achieved 96% in SEF Academy diploma with 500+ hours of hands-on coding. Passionate about building clean, responsive, user-focused web experiences using modern technologies.' },
    { key: 'email', value: 'yousefhanafy325@gmail.com' },
    { key: 'phone', value: '+20 110 047 5722' },
    { key: 'github', value: 'https://github.com/Yousef0hanafy' },
    { key: 'linkedin', value: 'https://linkedin.com/in/youssef-hanafy-7986342a8' },
    { key: 'location', value: 'Cairo, Egypt' },
  ]

  for (const info of siteInfoData) {
    await prisma.siteInfo.upsert({
      where: { key: info.key },
      update: { value: info.value },
      create: info,
    })
  }
  console.log('✅ Site info seeded')

  // Skills
  const skillsData = [
    { name: 'HTML5', category: 'Languages', level: 95, order: 1 },
    { name: 'CSS3', category: 'Languages', level: 90, order: 2 },
    { name: 'SASS', category: 'Languages', level: 85, order: 3 },
    { name: 'JavaScript ES6+', category: 'Languages', level: 90, order: 4 },
    { name: 'Java', category: 'Languages', level: 70, order: 5 },
    { name: 'React.js', category: 'Frameworks', level: 90, order: 1 },
    { name: 'Next.js', category: 'Frameworks', level: 85, order: 2 },
    { name: 'Tailwind CSS', category: 'Frameworks', level: 90, order: 3 },
    { name: 'Bootstrap 5', category: 'Frameworks', level: 85, order: 4 },
    { name: 'Swiper.js', category: 'Frameworks', level: 80, order: 5 },
    { name: 'shadcn/ui', category: 'Frameworks', level: 80, order: 6 },
    { name: 'React Hooks', category: 'Frameworks', level: 90, order: 7 },
    { name: 'React Router', category: 'Frameworks', level: 85, order: 8 },
    { name: 'Font Awesome', category: 'Frameworks', level: 85, order: 9 },
    { name: 'Git', category: 'Tools', level: 85, order: 1 },
    { name: 'GitHub', category: 'Tools', level: 85, order: 2 },
    { name: 'VS Code', category: 'Tools', level: 90, order: 3 },
    { name: 'Vercel', category: 'Tools', level: 85, order: 4 },
    { name: 'Supabase', category: 'Tools', level: 80, order: 5 },
    { name: 'npm', category: 'Tools', level: 85, order: 6 },
    { name: 'Chrome DevTools', category: 'Tools', level: 80, order: 7 },
    { name: 'GitHub Pages', category: 'Tools', level: 80, order: 8 },
    { name: 'Netlify', category: 'Tools', level: 80, order: 9 },
    { name: 'Figma', category: 'Tools', level: 75, order: 10 },
    { name: 'REST APIs', category: 'Web & APIs', level: 80, order: 1 },
    { name: 'Fetch API', category: 'Web & APIs', level: 85, order: 2 },
    { name: 'JSON', category: 'Web & APIs', level: 90, order: 3 },
    { name: 'JSON-LD', category: 'Web & APIs', level: 75, order: 4 },
    { name: 'JSX', category: 'Web & APIs', level: 90, order: 5 },
    { name: 'SPA', category: 'Web & APIs', level: 80, order: 6 },
    { name: 'SSR', category: 'Web & APIs', level: 75, order: 7 },
    { name: 'Responsive Design', category: 'Web & APIs', level: 95, order: 8 },
    { name: 'Mobile-First Design', category: 'Web & APIs', level: 90, order: 9 },
    { name: 'CSS Grid', category: 'CSS & Layout', level: 90, order: 1 },
    { name: 'Flexbox', category: 'CSS & Layout', level: 90, order: 2 },
    { name: 'CSS Variables', category: 'CSS & Layout', level: 80, order: 3 },
    { name: 'CSS Animations', category: 'CSS & Layout', level: 85, order: 4 },
    { name: 'CSS Transitions', category: 'CSS & Layout', level: 80, order: 5 },
    { name: 'Media Queries', category: 'CSS & Layout', level: 90, order: 6 },
    { name: 'Dark/Light Theming', category: 'CSS & Layout', level: 85, order: 7 },
    { name: 'BEM', category: 'CSS & Layout', level: 75, order: 8 },
    { name: 'Parallax', category: 'CSS & Layout', level: 75, order: 9 },
    { name: 'SVG', category: 'CSS & Layout', level: 70, order: 10 },
    { name: 'Semantic HTML', category: 'Concepts', level: 90, order: 1 },
    { name: 'DOM', category: 'Concepts', level: 90, order: 2 },
    { name: 'Form Validation', category: 'Concepts', level: 85, order: 3 },
    { name: 'ARIA/WCAG', category: 'Concepts', level: 75, order: 4 },
    { name: 'SEO', category: 'Concepts', level: 80, order: 5 },
    { name: 'Cross-Browser', category: 'Concepts', level: 85, order: 6 },
    { name: 'Performance Optimization', category: 'Concepts', level: 80, order: 7 },
    { name: 'Image Optimization', category: 'Concepts', level: 85, order: 8 },
    { name: 'Lazy Loading', category: 'Concepts', level: 80, order: 9 },
    { name: 'Problem-Solving', category: 'Soft Skills', level: 90, order: 1 },
    { name: 'Teamwork', category: 'Soft Skills', level: 90, order: 2 },
    { name: 'Communication', category: 'Soft Skills', level: 85, order: 3 },
    { name: 'Time Management', category: 'Soft Skills', level: 85, order: 4 },
    { name: 'Attention to Detail', category: 'Soft Skills', level: 90, order: 5 },
    { name: 'Adaptability', category: 'Soft Skills', level: 85, order: 6 },
    { name: 'Creativity', category: 'Soft Skills', level: 85, order: 7 },
    { name: 'Critical Thinking', category: 'Soft Skills', level: 85, order: 8 },
    { name: 'Fast Learner', category: 'Soft Skills', level: 90, order: 9 },
    { name: 'Collaboration', category: 'Soft Skills', level: 90, order: 10 },
    { name: 'Leadership', category: 'Soft Skills', level: 80, order: 11 },
    { name: 'Initiative', category: 'Soft Skills', level: 85, order: 12 },
  ]

  for (const skill of skillsData) {
    await prisma.skill.upsert({
      where: { id: `${skill.category}-${skill.name}`.replace(/[^a-zA-Z0-9]/g, '-').toLowerCase() },
      update: skill,
      create: { id: `${skill.category}-${skill.name}`.replace(/[^a-zA-Z0-9]/g, '-').toLowerCase(), ...skill },
    })
  }
  console.log('✅ Skills seeded')

  // Projects
  const projectsData = [
    {
      id: 'perf-gym-001',
      title: 'Performance Gym',
      description: 'A comprehensive fitness platform built with Next.js and Supabase. Features user authentication, workout tracking, and a responsive modern UI with SSR capabilities.',
      liveUrl: 'https://perf-gym.vercel.app',
      githubUrl: 'https://github.com/Yousef0hanafy/Performance-Gym',
      imageUrl: '/projects/performance-gym.webp',
      techStack: 'Next.js, Tailwind CSS, Supabase, REST APIs, Vercel, SSR, SEO',
      category: 'fullstack',
      featured: true,
      order: 1,
    },
    {
      id: 'nexdrive-002',
      title: 'NexDrive Car Marketplace',
      description: 'A car marketplace website featuring Swiper.js carousels, Google Maps API integration, JSON-LD structured data for SEO, and fully responsive design.',
      liveUrl: 'https://yousef0hanafy.github.io/NexDrive/',
      githubUrl: 'https://github.com/Yousef0hanafy/NexDrive',
      imageUrl: '/projects/nexdrive.webp',
      techStack: 'Swiper.js, JavaScript, CSS3, Google Maps API, JSON-LD, Responsive Design',
      category: 'big-frontend',
      featured: true,
      order: 2,
    },
    {
      id: 'healio-003',
      title: 'Healio Healthcare Platform',
      description: 'A healthcare platform built with React featuring CSS Grid layouts, ARIA accessibility, semantic HTML, and a polished dark/light theme system.',
      liveUrl: 'https://yousef0hanafy.github.io/Healio/',
      githubUrl: 'https://github.com/Yousef0hanafy/Healio',
      imageUrl: '/projects/healio.webp',
      techStack: 'React, CSS Grid, ARIA, Semantic HTML, Dark/Light Theme',
      category: 'big-frontend',
      featured: true,
      order: 3,
    },
    {
      id: 'dashboard-004',
      title: 'Admin Dashboard',
      description: 'A feature-rich admin dashboard with HTML, CSS3, and JavaScript. Includes data tables, interactive charts, responsive sidebar navigation, and dynamic content.',
      liveUrl: 'https://yousef0hanafy.github.io/Dashboard/',
      githubUrl: 'https://github.com/Yousef0hanafy/Dashboard',
      imageUrl: '/projects/dashboard.webp',
      techStack: 'HTML, CSS3, JavaScript, DOM, Data Tables, Responsive Design',
      category: 'big-frontend',
      featured: false,
      order: 4,
    },
    {
      id: 'creator-compass-005',
      title: 'Creator Compass',
      description: 'A creative resources website built with HTML, CSS3, and JavaScript. Features an image gallery, form validation, WCAG compliance, and accessible UI components.',
      liveUrl: 'https://yousef0hanafy.github.io/Coders-Compass/',
      githubUrl: 'https://github.com/Yousef0hanafy/Coders-Compass',
      imageUrl: '/projects/creator-compass.webp',
      techStack: 'HTML, CSS3, JavaScript, WCAG, Gallery, Form Validation',
      category: 'big-frontend',
      featured: false,
      order: 5,
    },
    {
      id: 'flyora-006',
      title: 'Flyora',
      description: 'A flight booking website built with HTML, CSS3, Bootstrap, and JavaScript. Features a responsive design with interactive UI elements and smooth animations.',
      liveUrl: 'https://yousef0hanafy.github.io/Flyora/',
      githubUrl: 'https://github.com/Yousef0hanafy/Flyora',
      imageUrl: '/projects/flyora.webp',
      techStack: 'HTML, CSS3, Bootstrap, JavaScript, Responsive Design',
      category: 'mini-frontend',
      featured: false,
      order: 6,
    },
    {
      id: 'neuronexus-007',
      title: 'NeuroNexus',
      description: 'Interactive brain training memory game with countdown timer, leaderboard tracking, difficulty levels, and score system built with pure JavaScript.',
      liveUrl: 'https://yousef0hanafy.github.io/NeuroNexus_MJ17/',
      githubUrl: 'https://github.com/Yousef0hanafy/NeuroNexus_MJ17',
      imageUrl: '/projects/neuronexus.webp',
      techStack: 'HTML5, CSS3, JavaScript, DOM, Game Logic, Timer',
      category: 'mini-frontend',
      featured: false,
      order: 7,
    },
    {
      id: 'flowstate-008',
      title: 'FlowState',
      description: 'Multi-mode productivity timer app featuring stopwatch, countdown timer, and lap tracking with clean minimal interface.',
      liveUrl: 'https://yousef0hanafy.github.io/FlowState_MJ4/',
      githubUrl: 'https://github.com/Yousef0hanafy/FlowState_MJ4',
      imageUrl: '/projects/flowstate.webp',
      techStack: 'HTML5, CSS3, JavaScript, DOM, Timer API, Responsive Design',
      category: 'mini-frontend',
      featured: false,
      order: 8,
    },
    {
      id: 'quotely-009',
      title: 'Quotely',
      description: 'Quote discovery app with random quote generator, favorites system, sharing functionality, and daily quote feature using external API integration.',
      liveUrl: 'https://yousef0hanafy.github.io/Quotely_MJ6/',
      githubUrl: 'https://github.com/Yousef0hanafy/Quotely_MJ6',
      imageUrl: '/projects/quotely.webp',
      techStack: 'HTML5, CSS3, JavaScript, REST API, LocalStorage, Responsive Design',
      category: 'mini-frontend',
      featured: false,
      order: 9,
    },
    {
      id: 'tuneflow-010',
      title: 'TuneFlow',
      description: 'Music player interface with playlist management, playback controls, progress tracking, and audio visualization built with modern CSS.',
      liveUrl: 'https://yousef0hanafy.github.io/TuneFlow_MJ5/',
      githubUrl: 'https://github.com/Yousef0hanafy/TuneFlow_MJ5',
      imageUrl: '/projects/tuneflow.webp',
      techStack: 'HTML5, CSS3, JavaScript, Web Audio API, CSS Animations, Responsive Design',
      category: 'mini-frontend',
      featured: false,
      order: 10,
    },
    {
      id: 'willow-hide-011',
      title: 'Willow & Hide',
      description: 'Multi-section leather goods business website with 6 pages: Home, Craft & Services, Gallery, Story, Offerings, and Contact with smooth scrolling navigation.',
      liveUrl: 'https://yousef0hanafy.github.io/Willow-Hide/',
      githubUrl: 'https://github.com/Yousef0hanafy/Willow-Hide',
      imageUrl: '/projects/willow-hide.webp',
      techStack: 'HTML5, CSS3, JavaScript, Multi-Page, Responsive Design, CSS Grid, Gallery',
      category: 'big-frontend',
      featured: false,
      order: 11,
    },
    {
      id: 'deskora-012',
      title: 'Deskora',
      description: 'E-commerce product showcase website for desk accessories with hero section, product cards, featured items, testimonials, and responsive layout.',
      liveUrl: 'https://yousef0hanafy.github.io/Deskora_P3/',
      githubUrl: 'https://github.com/Yousef0hanafy/Deskora_P3',
      imageUrl: '/projects/deskora.webp',
      techStack: 'HTML5, CSS3, JavaScript, E-commerce UI, Product Cards, Responsive Design, CSS Grid',
      category: 'big-frontend',
      featured: false,
      order: 12,
    },
  ]

  for (const project of projectsData) {
    await prisma.project.upsert({
      where: { id: project.id },
      update: project,
      create: project,
    })
  }
  console.log('✅ Projects seeded')

  // Experience
  const experienceData = [
    {
      id: 'depi-exp-001',
      role: 'Front-End Development Trainee',
      company: 'Digital Egypt Pioneers Initiative (DEPI)',
      startDate: 'Nov 2025',
      endDate: '',
      description: 'Built 10+ responsive multi-page websites using HTML5, CSS3, SASS, Bootstrap 5, React.js, and Next.js. Implemented 15+ interactive UI components with JavaScript ES6+, React Hooks, and DOM manipulation. Optimized web performance achieving 30% faster load times. Improved code reusability by 40%.',
      current: true,
      order: 1,
    },
  ]

  for (const exp of experienceData) {
    await prisma.experience.upsert({
      where: { id: exp.id },
      update: exp,
      create: exp,
    })
  }
  console.log('✅ Experience seeded')

  // Certifications
  const certificationsData = [
    { id: 'cert-001', title: 'Front-End Web Development Diploma', issuer: 'SEF Academy', date: '2024', score: '96%', order: 1 },
    { id: 'cert-002', title: 'HTML & CSS', issuer: 'ITI Mahara-Tech', date: '2024', score: '', order: 2 },
    { id: 'cert-003', title: 'JavaScript', issuer: 'ITI Mahara-Tech', date: '2024', score: '', order: 3 },
    { id: 'cert-004', title: 'Computer Networks', issuer: 'ITI', date: '2024', score: '', order: 4 },
    { id: 'cert-005', title: 'IC3 Computing Certification', issuer: 'Certiport', date: '2023', score: '', order: 5 },
    { id: 'cert-006', title: 'IC5 Computing Certification', issuer: 'Certiport', date: '2023', score: '', order: 6 },
  ]

  for (const cert of certificationsData) {
    await prisma.certification.upsert({
      where: { id: cert.id },
      update: cert,
      create: cert,
    })
  }
  console.log('✅ Certifications seeded')

  // Recommendations
  const recommendationsData = [
    {
      id: 'rec-001',
      name: 'Ahmed Mohamed',
      role: 'DEPI Instructor',
      company: 'Digital Egypt Pioneers Initiative',
      text: 'Youssef demonstrates exceptional front-end development skills and a keen eye for detail. His projects showcase strong proficiency in modern web technologies.',
      avatarUrl: '',
      order: 1,
    },
    {
      id: 'rec-002',
      name: 'Sara Ali',
      role: 'Instructor',
      company: 'SEF Academy',
      text: 'A dedicated learner who consistently delivers high-quality work. His problem-solving skills and ability to work under pressure make him a valuable team member.',
      avatarUrl: '',
      order: 2,
    },
  ]

  for (const rec of recommendationsData) {
    await prisma.recommendation.upsert({
      where: { id: rec.id },
      update: rec,
      create: rec,
    })
  }
  console.log('✅ Recommendations seeded')

  console.log('🎉 Database seeded successfully!')
}

seed()
  .catch((e) => {
    console.error('❌ Seed failed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
