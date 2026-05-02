#!/usr/bin/env python3
"""
ATS-Friendly Resume for Youssef Mahmoud Hanafy
Front-End Developer | 1 Page | Clean Single-Column Layout
"""

from reportlab.lib.pagesizes import A4
from reportlab.lib.units import cm
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.enums import TA_LEFT, TA_CENTER
from reportlab.lib import colors
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, HRFlowable, Table, TableStyle
)
from reportlab.platypus.flowables import Flowable
from reportlab.lib.colors import HexColor
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
M = 1.5 * cm
OUT = '/home/z/my-project/download/Youssef_Hanafy_Resume.pdf'
CW = A4[0] - 2 * M  # content width

doc = SimpleDocTemplate(
    OUT, pagesize=A4,
    leftMargin=M, rightMargin=M,
    topMargin=1.2*cm, bottom=1.0*cm,
    title='Resume - Youssef Mahmoud Hanafy',
    author='Youssef Mahmoud Hanafy', creator='Z.ai'
)

# ── Styles (9pt min, tight leading) ──
S_name = ParagraphStyle('n', fontName='TNR-B', fontSize=20, leading=24,
                         alignment=TA_CENTER, spaceAfter=1, textColor=TEXT)
S_contact = ParagraphStyle('c', fontName='TNR', fontSize=8.5, leading=11,
                           alignment=TA_CENTER, textColor=MUTED, spaceAfter=4)
S_sec = ParagraphStyle('s', fontName='TNR-B', fontSize=10.5, leading=13,
                        spaceBefore=6, spaceAfter=1, textColor=ACCENT)
S_title = ParagraphStyle('t', fontName='TNR-B', fontSize=9.5, leading=12,
                          spaceAfter=0, textColor=TEXT)
S_meta = ParagraphStyle('m', fontName='TNR', fontSize=8.5, leading=11,
                         textColor=MUTED, spaceAfter=2)
S_body = ParagraphStyle('b', fontName='TNR', fontSize=9, leading=12,
                         spaceAfter=2, textColor=TEXT, rightIndent=6)
S_bul = ParagraphStyle('bl', fontName='TNR', fontSize=9, leading=12,
                        leftIndent=12, bulletIndent=0,
                        spaceBefore=0, spaceAfter=0, textColor=TEXT,
                        rightIndent=6)

# ── Helpers ──
def sec(title):
    return [Paragraph(title, S_sec),
            HRFlowable(width='100%', thickness=0.5, color=ACCENT,
                       spaceBefore=0, spaceAfter=3)]

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
    'Detail-oriented and self-motivated Front-End Developer and Computer Systems Engineering student '
    'with hands-on experience building 15+ responsive, user-focused web applications using HTML, CSS, '
    'JavaScript, React, and Next.js. Strong problem-solving and teamwork skills developed through '
    'collaborative training and independent projects. Skilled in modern UI development, responsive design, '
    'SEO optimization, and cross-browser compatibility. Adaptable fast learner with creative thinking '
    'and effective communication skills. Seeking a Front-End Developer role to contribute to '
    'high-quality web solutions.', S_body))

# Skills
st.extend(sec('TECHNICAL SKILLS'))
S_cell = ParagraphStyle('cl', fontName='TNR', fontSize=8.5, leading=11, textColor=TEXT)
S_cell_m = ParagraphStyle('clm', fontName='TNR', fontSize=8.5, leading=11, textColor=MUTED)

c0 = 2.3 * cm
c1 = CW - c0
sd = [
    [Paragraph('Languages:', S_cell_m), Paragraph('HTML5, CSS3, JavaScript (ES6+), Java', S_cell)],
    [Paragraph('Frameworks:', S_cell_m), Paragraph('React, Next.js, Tailwind CSS, Bootstrap, Swiper.js, shadcn/ui', S_cell)],
    [Paragraph('Tools:', S_cell_m), Paragraph('Git/GitHub, VS Code, Vercel, Supabase, npm, Chrome DevTools', S_cell)],
    [Paragraph('Concepts:', S_cell_m), Paragraph(
        'Responsive/Mobile-First Design, Semantic HTML, SEO, DOM Manipulation, '
        'CSS Grid/Flexbox, Dark/Light Theming, Form Validation, Accessibility (ARIA), '
        'JSON-LD, CSS Animations, Image Optimization, Parallax Effects', S_cell)],
    [Paragraph('Soft Skills:', S_cell_m), Paragraph(
        'Problem-Solving, Teamwork, Communication, Time Management, Attention to Detail, '
        'Adaptability, Creativity, Critical Thinking, Self-Motivated, Fast Learner, '
        'Collaboration, Analytical Thinking, Leadership, Initiative', S_cell)],
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
st.append(bul('Built 10+ responsive multi-page websites using HTML5, CSS3, Bootstrap, and React'))
st.append(bul('Implemented 15+ interactive UI features using JavaScript (DOM manipulation, modals, sliders)'))
st.append(bul('Applied mobile-first design and ensured cross-browser compatibility across all devices'))
st.append(bul('Improved code reusability, reducing design repetition by 40%'))
st.append(Spacer(1, 2))

# Projects
st.extend(sec('SELECTED PROJECTS'))
projs = [
    ('Performance Gym', 'perf-gym.vercel.app',
     'Full-featured gym website with <b>Next.js, Tailwind CSS, Supabase</b>; deployed on <b>Vercel</b> with dark/light theme, responsive gallery, and SEO.'),
    ('NexDrive - Car Marketplace', 'yousef0hanafy.github.io/NexDrive/',
     'Car marketplace with <b>Swiper.js</b> sliders, parallax scrolling, theme toggle, form validation, Google Maps, and <b>JSON-LD</b> structured data.'),
    ('Healio - Healthcare Platform', 'yousef0hanafy.github.io/Healio/',
     'Healthcare site with appointment booking, doctor profiles, reviews, blog, dark/light theme, and responsive layout.'),
    ('Admin Dashboard', 'yousef0hanafy.github.io/Dashboard/',
     'Multi-page admin panel with sidebar nav, data tables, progress tracking, task management, and statistics dashboard.'),
    ('Creator Compass', 'yousef0hanafy.github.io/Coders-Compass/',
     'Freelance platform with articles, gallery, testimonials, pricing plans, countdown timers, video masterclasses, and ARIA accessibility.'),
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
st.append(bul('Computer Network Fundamentals - ITI | IC3 &amp; IC5 Computing Certifications'))

# Languages
st.extend(sec('LANGUAGES'))
st.append(Paragraph('<b>Arabic:</b> Native | <b>English:</b> Fluent', S_body))

# Build
doc.build(st)
print(f"Resume generated: {OUT}")
