import React, { useEffect, useMemo, useState } from 'react';
import ProfileForm from './components/ProfileForm.jsx';
import SummaryBuilder from './components/SummaryBuilder.jsx';
import ProjectsShowcase from './components/ProjectsShowcase.jsx';
import PortfolioPreview from './components/PortfolioPreview.jsx';

export default function App() {
  const [profile, setProfile] = useState({
    name: '',
    email: '',
    phone: '',
    linkedin: '',
    github: '',
    resume: '',
    university: '',
    cgpa: '8.2',
    gpaEstimate: '3.3',
    skills: ['Python', 'FastAPI', 'React', 'MongoDB'],
    certifications: [],
    photo: '',
  });

  const [summaryState, setSummaryState] = useState({
    jobTitle: 'Junior Python Developer',
    topRequirementsRaw: 'Python, REST APIs, SQL',
    keywordsRaw: 'ETL, Flask, Pandas, Git, Docker',
    summary: '',
  });

  const [projects, setProjects] = useState([
    {
      name: 'E-Commerce Platform',
      situation: 'Small business needed an online storefront with secure payments and real-time inventory.',
      task: 'Design and implement a full-stack MVP that could scale to 1k+ products.',
      action:
        'Built a React frontend and FastAPI backend with MongoDB; implemented server-side pagination and caching, and integrated Stripe for payments; resolved race conditions in inventory updates with atomic ops.',
      result: 'Supported 2,500 SKUs, 99.9% uptime, and reduced page load times from 1.8s to 0.9s (50% faster).',
      tech: 'React, FastAPI, MongoDB, Stripe, Vite',
      lesson: 'Designing idempotent APIs prevents edge-case failures under load.',
      star: '',
      pitch: '',
    },
    {
      name: 'Real-Time Sentiment Analysis Tool',
      situation: 'Marketing team needed live sentiment insights for product launches using social streams.',
      task: 'Create a pipeline to ingest, process, and visualize sentiment in near real-time.',
      action:
        'Implemented streaming ingestion with WebSockets, used Python + scikit-learn for a lightweight classifier, optimized text pre-processing, and batched updates to the UI for smooth performance.',
      result: 'Achieved ~92% test accuracy and sub-second latency for 1,000 msgs/min.',
      tech: 'Python, scikit-learn, WebSockets, React, Vite',
      lesson: 'Profiling early avoids premature complexity and keeps latency predictable.',
      star: '',
      pitch: '',
    },
  ]);

  // Persist to localStorage
  useEffect(() => {
    const saved = localStorage.getItem('portfolio_state');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.profile) setProfile(parsed.profile);
        if (parsed.summaryState) setSummaryState(parsed.summaryState);
        if (parsed.projects) setProjects(parsed.projects);
      } catch (e) {
        // ignore parse errors
      }
    }
  }, []);

  useEffect(() => {
    const state = JSON.stringify({ profile, summaryState, projects });
    localStorage.setItem('portfolio_state', state);
  }, [profile, summaryState, projects]);

  const downloadHTML = () => {
    const html = `<!doctype html><html><head><meta charset=\"utf-8\"/><meta name=\"viewport\" content=\"width=device-width,initial-scale=1\"/><title>Portfolio</title><link rel=\"preconnect\" href=\"https://fonts.googleapis.com\"/><link rel=\"preconnect\" href=\"https://fonts.gstatic.com\" crossorigin/><link href=\"https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap\" rel=\"stylesheet\"/><style>body{font-family:Inter,system-ui,-apple-system,Segoe UI,Roboto,Helvetica,Arial;line-height:1.5;color:#111827;background:#f8fafc;padding:24px} .card{background:#fff;border:1px solid #e5e7eb;border-radius:12px;box-shadow:0 1px 2px rgba(0,0,0,.04);padding:24px;max-width:960px;margin:0 auto} .chip{display:inline-flex;align-items:center;border:1px solid #a7f3d0;background:#ecfdf5;color:#065f46;border-radius:9999px;padding:4px 10px;font-size:12px;margin:2px} .h1{font-size:22px;font-weight:700;margin:0} .muted{color:#4b5563;font-size:14px} .section{margin-top:24px} .title{font-size:16px;font-weight:600;margin-bottom:6px} pre{white-space:pre-wrap;background:#f9fafb;border:1px solid #e5e7eb;padding:12px;border-radius:8px}</style></head><body><div class=\"card\"><div style=\"display:flex;gap:16px;align-items:center\">${
      profile.photo ? `<img src=\"${profile.photo}\" alt=\"Headshot\" style=\"width:64px;height:64px;border-radius:9999px;object-fit:cover;border:1px solid #e5e7eb\"/>` :
      `<div style=\"width:64px;height:64px;border-radius:9999px;background:#f3f4f6;border:1px solid #e5e7eb\"></div>`
    }<div style=\"min-width:0\"><div class=\"h1\">${profile.name || 'Your Name'}</div><div class=\"muted\">${profile.email || 'you@example.com'} • ${profile.phone || '+1 234 567 8901'}</div><div style=\"display:flex;gap:12px;margin-top:4px\">${
      profile.linkedin ? `<a href=\"${profile.linkedin}\">LinkedIn</a>` : ''
    } ${profile.github ? `<a href=\"${profile.github}\">GitHub</a>` : ''} ${
      profile.resume ? `<a href=\"${profile.resume}\">Resume</a>` : ''
    }</div></div></div><div class=\"section\"><div style=\"display:grid;grid-template-columns:1fr 2fr;gap:16px\"><div style=\"background:#eef2ff;color:#3730a3;border-radius:10px;padding:12px;border:1px solid #c7d2fe\"><div style=\"font-size:10px;text-transform:uppercase;letter-spacing:.08em\">Education</div><div style=\"font-weight:600\">${
      profile.university || 'Your University Name'
    }</div><div style=\"font-size:14px\">CGPA: ${profile.cgpa || '8.2'}/10 • Est. GPA: ${
      profile.gpaEstimate || '3.3'
    }/4.0</div></div><div style=\"background:#ecfdf5;color:#065f46;border-radius:10px;padding:12px;border:1px solid #a7f3d0\"><div style=\"font-size:10px;text-transform:uppercase;letter-spacing:.08em\">Key Technical Skills</div><div style=\"margin-top:6px\">${
      (profile.skills || []).map((s) => `<span class=\"chip\">${s}</span>`).join(' ') || '<span class=\"muted\">Add skills to highlight your fit.</span>'
    }</div></div></div></div><div class=\"section\"><div class=\"title\">Professional Summary</div><div>${
      summaryState.summary || 'Use the builder to generate a tailored summary for your target role.'
    }</div></div><div class=\"section\"><div class=\"title\">Projects</div>${projects
      .map(
        (p) => `<div style=\"border:1px solid #e5e7eb;border-radius:10px;padding:12px;margin-top:10px\"><div style=\"font-weight:600\">${
          p.name
        }</div><div class=\"muted\">Tech: ${p.tech || '—'}</div>${
          p.star ? `<div style=\"margin-top:6px\"><div style=\"font-size:10px;text-transform:uppercase;color:#6b7280\">S.T.A.R.</div><pre>${p.star}</pre></div>` : ''
        }${
          p.pitch ? `<div style=\"margin-top:6px\"><div style=\"font-size:10px;text-transform:uppercase;color:#6b7280\">60-second Pitch</div><div>${p.pitch}</div></div>` : ''
        }</div>`
      )
      .join('')}</div>${
      profile.certifications?.length
        ? `<div class=\"section\"><div class=\"title\">Certifications</div><ul>${profile.certifications
            .map((c) => `<li>${c}</li>`) 
            .join('')}</ul></div>`
        : ''
    }</div></body></html>`;

    const blob = new Blob([html], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'portfolio.html';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="sticky top-0 z-10 bg-white/80 backdrop-blur border-b">
        <div className="mx-auto max-w-7xl px-4 py-3 flex items-center justify-between">
          <h1 className="text-lg font-semibold">Portfolio Personalizer</h1>
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                localStorage.removeItem('portfolio_state');
                window.location.reload();
              }}
              className="px-3 py-2 rounded-md border text-sm"
            >
              Reset
            </button>
            <button onClick={downloadHTML} className="px-3 py-2 rounded-md bg-indigo-600 text-white text-sm hover:bg-indigo-700">Download HTML</button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-8">
          <section className="rounded-xl bg-white border p-5">
            <ProfileForm profile={profile} onChange={setProfile} />
          </section>

          <section className="rounded-xl bg-white border p-5">
            <SummaryBuilder profile={profile} summaryState={summaryState} onChange={setSummaryState} />
          </section>

          <section className="rounded-xl bg-white border p-5">
            <ProjectsShowcase projects={projects} setProjects={setProjects} />
          </section>
        </div>

        <aside className="rounded-xl bg-white border p-5 h-fit sticky top-20">
          <PortfolioPreview profile={profile} summary={summaryState.summary} projects={projects} />
        </aside>
      </main>
    </div>
  );
}
