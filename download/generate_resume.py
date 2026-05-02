#!/usr/bin/env python3
"""
ATS-Friendly Resume for Youssef Mahmoud Hanafy
Front-End Developer | 1 Page | Balanced Layout
"""

from reportlab.lib.pagesizes import A4
from reportlab.lib.units import cm
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.enums import TA_LEFT, TA_CENTER
from reportlab.lib import colors
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, HRFlowable, Table, TableStyle
)
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.pdfbase.pdfmetrics import registerFontFamily

# ── Font Registration ──
pdfmetrics.registerFont(TTFont('TNR', '/usr/share/fonts/truetype/liberation/LiberationSerif-Regular.ttf'))
pdfmetrics.registerFont(TTFont('TNR-B', '/usr/share/fonts/truetype/liberation/LiberationSerif-Bold.ttf'))
registerFontFamily('TNR', normal='TNR', bold='TNR-B')

# ── Colors ──
ACCENT = colors.HexColor('#4b2bab')
TEXT = colors.HexColor('#1f2123')
MUTED = colors.HexColor('#757a81')

# ── Document ──
M = 1.4 * cm
OUT = '/home/z/my-project/download/Youssef_Hanafy_Resume.pdf'
CW = A4[0] - 2 * M  # content width

doc = SimpleDocTemplate(
    OUT, pagesize=A4,
    leftMargin=M, rightMargin=M,
    topMargin=1.0*cm, bottom=0.8*cm,
    title='Resume - Youssef Mahmoud Hanafy',
    author='Youssef Mahmoud Hanafy', creator='Z.ai'
)

# ── Styles ──
S_name = ParagraphStyle('n', fontName='TNR-B', fontSize=20, leading=24,
                         alignment=TA_CENTER, spaceAfter=1, textColor=TEXT)
S_contact = ParagraphStyle('c', fontName='TNR', fontSize=8, leading=10,
                           alignment=TA_CENTER, textColor=MUTED, spaceAfter=3)
S_sec = ParagraphStyle('s', fontName='TNR-B', fontSize=10, leading=12,
                        spaceBefore=4, spaceAfter=1, textColor=ACCENT)
S_title = ParagraphStyle('t', fontName='TNR-B', fontSize=9, leading=11,
                          spaceAfter=0, textColor=TEXT)
S_meta = ParagraphStyle('m', fontName='TNR', fontSize=8, leading=10,
                         textColor=MUTED, spaceAfter=1)
S_body = ParagraphStyle('b', fontName='TNR', fontSize=8.5, leading=11,
                         spaceAfter=1, textColor=TEXT, rightIndent=6)
S_bul = ParagraphStyle('bl', fontName='TNR', fontSize=8.5, leading=11,
                        leftIndent=12, bulletIndent=0,
                        spaceBefore=0, spaceAfter=0, textColor=TEXT,
                        rightIndent=6)
S_cell = ParagraphStyle('cl', fontName='TNR', fontSize=8, leading=10, textColor=TEXT)
S_cell_m = ParagraphStyle('clm', fontName='TNR', fontSize=8, leading=10, textColor=MUTED)

# ── Helpers ──
def sec(title):
    return [Paragraph(title, S_sec),
            HRFlowable(width='100%', thickness=0.4, color=ACCENT,
                       spaceBefore=0, spaceAfter=2)]

def bul(t):
    return Paragraph('- ' + t, S_bul)

# ── Story ──
st = []

# Header
st.append(Paragraph('YOUSSEF MAHMOUD HANAFY', S_name))
st.append(Paragraph(
    'Cairo, Egypt | +20 110 047 6722 | youssefhanafy325@gmail.com', S_contact))
st.append(Paragraph(
    '<a href="https://github.com/Yousef0hanafy" color="#757a81">github.com/Yousef0hanafy</a> | '
    '<a href="https://linkedin.com/in/youssef-hanafy-7986342a8" color="#757a81">linkedin.com/in/youssef-hanafy-7986342a8</a>', S_contact))

# Summary
st.extend(sec('PROFESSIONAL SUMMARY'))
st.append(Paragraph(
    'Front-End Developer with 15+ responsive web projects built using HTML5, CSS3, JavaScript ES6+, '
    'React, Next.js, and Tailwind CSS. Achieved 96% in SEF Academy Front-End diploma and completed '
    '500+ hours of hands-on coding. Strong problem-solving, teamwork, and communication skills with '
    'focus on responsive design, SEO, and performance optimization.', S_body))

# Skills
st.extend(sec('TECHNICAL SKILLS'))
c0 = 2.3 * cm
c1 = CW - c0
sd = [
    [Paragraph('Languages:', S_cell_m), Paragraph('HTML5, CSS3, SASS, JavaScript ES6+, Java', S_cell)],
    [Paragraph('Frameworks:', S_cell_m), Paragraph('React.js, Next.js, Tailwind CSS, Bootstrap 5, Swiper.js, shadcn/ui, React Hooks, React Router, Font Awesome', S_cell)],
    [Paragraph('Tools:', S_cell_m), Paragraph('Git, GitHub, VS Code, Vercel, Supabase, npm, Chrome DevTools, GitHub Pages, Netlify, Figma', S_cell)],
    [Paragraph('Web/APIs:', S_cell_m), Paragraph('REST APIs, Fetch API, JSON, JSON-LD, JSX, SPA, SSR, Responsive Design, Mobile-First Design', S_cell)],
    [Paragraph('CSS/Layout:', S_cell_m), Paragraph('CSS Grid, Flexbox, CSS Variables, CSS Animations, CSS Transitions, Media Queries, Dark/Light Theming, BEM, Parallax, SVG', S_cell)],
    [Paragraph('Concepts:', S_cell_m), Paragraph('Semantic HTML, DOM, Form Validation, ARIA/WCAG, SEO, Cross-Browser, Performance Optimization, Image Optimization, Lazy Loading', S_cell)],
    [Paragraph('Soft Skills:', S_cell_m), Paragraph('Problem-Solving, Teamwork, Communication, Time Management, Attention to Detail, Adaptability, Creativity, Critical Thinking, Fast Learner, Collaboration, Leadership, Initiative', S_cell)],
]
tbl = Table(sd, colWidths=[c0, c1])
tbl.setStyle(TableStyle([
    ('VALIGN', (0, 0), (-1, -1), 'TOP'),
    ('LEFTPADDING', (0, 0), (-1, -1), 0),
    ('RIGHTPADDING', (0, 0), (-1, -1), 0),
    ('TOPPADDING', (0, 0), (-1, -1), 0),
    ('BOTTOMPADDING', (0, 0), (-1, -1), 1),
]))
st.append(tbl)
st.append(Spacer(1, 1))

# Experience
st.extend(sec('WORK EXPERIENCE'))
st.append(Paragraph('<b>Front-End Development Trainee</b>', S_title))
st.append(Paragraph(
    'Digital Egypt Pioneers Initiative (DEPI) | Nov 2025 - Present | Cairo, Egypt', S_meta))
st.append(bul('Built 10+ responsive multi-page websites using HTML5, CSS3, SASS, Bootstrap 5, React.js, and Next.js'))
st.append(bul('Implemented 15+ interactive UI components with JavaScript ES6+, React Hooks, DOM manipulation, REST APIs'))
st.append(bul('Optimized web performance achieving 30% faster load times through image optimization and lazy loading'))
st.append(bul('Improved code reusability by 40%, reducing design repetition across 10+ projects'))
st.append(bul('Achieved 100% mobile responsiveness across 320px-1920px viewports using CSS Grid and Flexbox'))
st.append(bul('Integrated 3+ third-party APIs including Google Maps and Supabase for dynamic data rendering'))
st.append(Spacer(1, 1))

# Projects
st.extend(sec('SELECTED PROJECTS'))
projs = [
    ('Performance Gym', 'perf-gym.vercel.app',
     '<b>Next.js, Tailwind CSS, Supabase</b>; deployed on <b>Vercel</b> with SSR, dark/light theme, 5+ page sections, SEO meta tags, responsive gallery.'),
    ('NexDrive - Car Marketplace', 'yousef0hanafy.github.io/NexDrive/',
     '7-section car marketplace with <b>Swiper.js</b>, parallax, form validation, Google Maps API, <b>JSON-LD</b>, 100% responsive layout.'),
    ('Healio - Healthcare Platform', 'yousef0hanafy.github.io/Healio/',
     '5-page healthcare SPA with appointment booking, 4 doctor profile cards, reviews, ARIA accessibility, CSS Grid, dark/light theme.'),
    ('Admin Dashboard', 'yousef0hanafy.github.io/Dashboard/',
     '6-section admin panel with sidebar nav, 3 interactive data tables, progress bars, task management, dynamic statistics.'),
    ('Creator Compass', 'yousef0hanafy.github.io/Coders-Compass/',
     '7-section platform with gallery, testimonials, 3 pricing plans, countdown timers, video embeds, WCAG compliance.'),
]
proj_urls = {
    'Performance Gym': 'https://perf-gym.vercel.app',
    'NexDrive - Car Marketplace': 'https://yousef0hanafy.github.io/NexDrive/',
    'Healio - Healthcare Platform': 'https://yousef0hanafy.github.io/Healio/',
    'Admin Dashboard': 'https://yousef0hanafy.github.io/Dashboard/',
    'Creator Compass': 'https://yousef0hanafy.github.io/Coders-Compass/',
}
for nm, url, desc in projs:
    link = proj_urls.get(nm, 'https://' + url)
    st.append(Paragraph(f'<b>{nm}</b>  <a href="{link}" color="#{ACCENT.hexval()[2:]}">{url}</a>', S_body))
    st.append(bul(desc))

# Education
st.extend(sec('EDUCATION'))
st.append(Paragraph('<b>B.Sc. Systems &amp; Computers Engineering</b>', S_title))
st.append(Paragraph('Al-Azhar University, Faculty of Engineering | 2023 - 2027 (Expected)', S_meta))

# Certifications
st.extend(sec('CERTIFICATIONS'))
st.append(bul('Front-End Web Development Diploma - SEF Academy (Score: 96%)'))
st.append(bul('HTML &amp; CSS - ITI Mahara-Tech | JavaScript - ITI Mahara-Tech'))
st.append(bul('Computer Networks - ITI | IC3 &amp; IC5 Computing Certifications'))

# Languages
st.extend(sec('LANGUAGES'))
st.append(Paragraph('<b>Arabic:</b> Native | <b>English:</b> Fluent', S_body))

# Build
doc.build(st)
print(f"Resume generated: {OUT}")
