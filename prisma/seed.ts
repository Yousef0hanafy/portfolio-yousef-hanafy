import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // Clear existing data
  await prisma.contactMessage.deleteMany()
  await prisma.recommendation.deleteMany()
  await prisma.certification.deleteMany()
  await prisma.experience.deleteMany()
  await prisma.project.deleteMany()
  await prisma.skill.deleteMany()
  await prisma.siteInfo.deleteMany()

  // Seed SiteInfo
  const siteInfos = [
    { key: 'siteTitle', value: 'Youssef Mahmoud Hanafy' },
    { key: 'siteSubtitle', value: 'Front-End Developer' },
    { key: 'aboutText', value: 'Detail-oriented Front-End Developer and Computer Systems Engineering student with 15+ responsive web projects. Achieved 96% in SEF Academy diploma with 500+ hours of hands-on coding. Passionate about building clean, responsive, user-focused web experiences using modern technologies.' },
    { key: 'email', value: 'yousefhanafy325@gmail.com' },
    { key: 'phone', value: '+20 110 047 6722' },
    { key: 'github', value: 'https://github.com/Yousef0hanafy' },
    { key: 'linkedin', value: 'https://linkedin.com/in/youssef-hanafy-7986342a8' },
    { key: 'location', value: 'Cairo, Egypt' },
  ]
  for (const info of siteInfos) {
    await prisma.siteInfo.upsert({ where: { key: info.key }, update: { value: info.value }, create: info })
  }

  // Seed Skills
  const skills = [
    // Languages
    { name: 'HTML5', category: 'Languages', level: 95, order: 1 },
    { name: 'CSS3', category: 'Languages', level: 90, order: 2 },
    { name: 'SASS', category: 'Languages', level: 85, order: 3 },
    { name: 'JavaScript ES6+', category: 'Languages', level: 90, order: 4 },
    { name: 'Java', category: 'Languages', level: 70, order: 5 },
    // Frameworks
    { name: 'React.js', category: 'Frameworks', level: 90, order: 1 },
    { name: 'Next.js', category: 'Frameworks', level: 85, order: 2 },
    { name: 'Tailwind CSS', category: 'Frameworks', level: 90, order: 3 },
    { name: 'Bootstrap 5', category: 'Frameworks', level: 85, order: 4 },
    { name: 'Swiper.js', category: 'Frameworks', level: 80, order: 5 },
    { name: 'shadcn/ui', category: 'Frameworks', level: 80, order: 6 },
    { name: 'React Hooks', category: 'Frameworks', level: 90, order: 7 },
    { name: 'React Router', category: 'Frameworks', level: 85, order: 8 },
    { name: 'Font Awesome', category: 'Frameworks', level: 85, order: 9 },
    // Tools
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
    // Web/APIs
    { name: 'REST APIs', category: 'Web & APIs', level: 80, order: 1 },
    { name: 'Fetch API', category: 'Web & APIs', level: 85, order: 2 },
    { name: 'JSON', category: 'Web & APIs', level: 90, order: 3 },
    { name: 'JSON-LD', category: 'Web & APIs', level: 75, order: 4 },
    { name: 'JSX', category: 'Web & APIs', level: 90, order: 5 },
    { name: 'SPA', category: 'Web & APIs', level: 80, order: 6 },
    { name: 'SSR', category: 'Web & APIs', level: 75, order: 7 },
    { name: 'Responsive Design', category: 'Web & APIs', level: 95, order: 8 },
    { name: 'Mobile-First Design', category: 'Web & APIs', level: 90, order: 9 },
    // CSS/Layout
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
    // Concepts
    { name: 'Semantic HTML', category: 'Concepts', level: 90, order: 1 },
    { name: 'DOM', category: 'Concepts', level: 90, order: 2 },
    { name: 'Form Validation', category: 'Concepts', level: 85, order: 3 },
    { name: 'ARIA/WCAG', category: 'Concepts', level: 75, order: 4 },
    { name: 'SEO', category: 'Concepts', level: 80, order: 5 },
    { name: 'Cross-Browser', category: 'Concepts', level: 85, order: 6 },
    { name: 'Performance Optimization', category: 'Concepts', level: 80, order: 7 },
    { name: 'Image Optimization', category: 'Concepts', level: 85, order: 8 },
    { name: 'Lazy Loading', category: 'Concepts', level: 80, order: 9 },
    // Soft Skills
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
  for (const skill of skills) {
    await prisma.skill.create({ data: skill })
  }

  // Seed Projects
  const projects = [
    {
      title: 'Performance Gym',
      description: 'A comprehensive fitness platform built with Next.js and Supabase. Features user authentication, workout tracking, and a responsive modern UI with SSR capabilities.',
      liveUrl: 'https://perf-gym.vercel.app',
      githubUrl: 'https://github.com/Yousef0hanafy/Performance-Gym',
      imageUrl: '',
      techStack: 'Next.js, Tailwind CSS, Supabase, REST APIs, Vercel, SSR, SEO',
      featured: true,
      order: 1,
    },
    {
      title: 'NexDrive Car Marketplace',
      description: 'A car marketplace website featuring Swiper.js carousels, Google Maps API integration, JSON-LD structured data for SEO, and fully responsive design.',
      liveUrl: 'https://yousef0hanafy.github.io/NexDrive/',
      githubUrl: 'https://github.com/Yousef0hanafy/NexDrive',
      imageUrl: '',
      techStack: 'Swiper.js, JavaScript, CSS3, Google Maps API, JSON-LD, Responsive Design',
      featured: true,
      order: 2,
    },
    {
      title: 'Healio Healthcare Platform',
      description: 'A healthcare platform built with React featuring CSS Grid layouts, ARIA accessibility, semantic HTML, and a polished dark/light theme system.',
      liveUrl: 'https://yousef0hanafy.github.io/Healio/',
      githubUrl: 'https://github.com/Yousef0hanafy/Healio',
      imageUrl: '',
      techStack: 'React, CSS Grid, ARIA, Semantic HTML, Dark/Light Theme',
      featured: true,
      order: 3,
    },
    {
      title: 'Admin Dashboard',
      description: 'A feature-rich admin dashboard with HTML, CSS3, and JavaScript. Includes data tables, interactive charts, responsive sidebar navigation, and dynamic content.',
      liveUrl: 'https://yousef0hanafy.github.io/Dashboard/',
      githubUrl: 'https://github.com/Yousef0hanafy/Dashboard',
      imageUrl: '',
      techStack: 'HTML, CSS3, JavaScript, DOM, Data Tables, Responsive Design',
      featured: false,
      order: 4,
    },
    {
      title: 'Creator Compass',
      description: 'A creative resources website built with HTML, CSS3, and JavaScript. Features an image gallery, form validation, WCAG compliance, and accessible UI components.',
      liveUrl: 'https://yousef0hanafy.github.io/Coders-Compass/',
      githubUrl: 'https://github.com/Yousef0hanafy/Coders-Compass',
      imageUrl: '',
      techStack: 'HTML, CSS3, JavaScript, WCAG, Gallery, Form Validation',
      featured: false,
      order: 5,
    },
    {
      title: 'Flyora',
      description: 'A flight booking website built with HTML, CSS3, Bootstrap, and JavaScript. Features a responsive design with interactive UI elements and smooth animations.',
      liveUrl: 'https://yousef0hanafy.github.io/Flyora/',
      githubUrl: 'https://github.com/Yousef0hanafy/Flyora',
      imageUrl: '',
      techStack: 'HTML, CSS3, Bootstrap, JavaScript, Responsive Design',
      featured: false,
      order: 6,
    },
  ]
  for (const project of projects) {
    await prisma.project.create({ data: project })
  }

  // Seed Experience
  const experiences = [
    {
      role: 'Front-End Development Trainee',
      company: 'Digital Egypt Pioneers Initiative (DEPI)',
      startDate: 'Nov 2025',
      endDate: '',
      description: 'Built 10+ responsive multi-page websites using HTML5, CSS3, SASS, Bootstrap 5, React.js, and Next.js. Implemented 15+ interactive UI components with JavaScript ES6+, React Hooks, and DOM manipulation. Optimized web performance achieving 30% faster load times. Improved code reusability by 40%.',
      current: true,
      order: 1,
    },
  ]
  for (const exp of experiences) {
    await prisma.experience.create({ data: exp })
  }

  // Seed Certifications
  const certifications = [
    { title: 'Front-End Web Development Diploma', issuer: 'SEF Academy', date: '2024', score: '96%', order: 1 },
    { title: 'HTML & CSS', issuer: 'ITI Mahara-Tech', date: '2024', score: '', order: 2 },
    { title: 'JavaScript', issuer: 'ITI Mahara-Tech', date: '2024', score: '', order: 3 },
    { title: 'Computer Networks', issuer: 'ITI', date: '2024', score: '', order: 4 },
    { title: 'IC3 Computing Certification', issuer: 'Certiport', date: '2023', score: '', order: 5 },
    { title: 'IC5 Computing Certification', issuer: 'Certiport', date: '2023', score: '', order: 6 },
  ]
  for (const cert of certifications) {
    await prisma.certification.create({ data: cert })
  }

  // Seed Recommendations
  const recommendations = [
    {
      name: 'Ahmed Mohamed',
      role: 'DEPI Instructor',
      company: 'Digital Egypt Pioneers Initiative',
      text: 'Youssef demonstrates exceptional front-end development skills and a keen eye for detail. His projects showcase strong proficiency in modern web technologies.',
      avatarUrl: '',
      order: 1,
    },
    {
      name: 'Sara Ali',
      role: 'Instructor',
      company: 'SEF Academy',
      text: 'A dedicated learner who consistently delivers high-quality work. His problem-solving skills and ability to work under pressure make him a valuable team member.',
      avatarUrl: '',
      order: 2,
    },
  ]
  for (const rec of recommendations) {
    await prisma.recommendation.create({ data: rec })
  }

  console.log('✅ Seed data has been successfully inserted!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
