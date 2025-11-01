import React from 'react';

function LinkBadge({ href, label }) {
  if (!href) return null;
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="inline-flex items-center text-sm text-indigo-700 hover:text-indigo-900 underline underline-offset-2"
    >
      {label}
    </a>
  );
}

export default function PortfolioPreview({ profile, summary, projects }) {
  return (
    <div className="prose max-w-none">
      <div className="rounded-xl border bg-white p-6 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="h-16 w-16 rounded-full bg-gray-100 overflow-hidden ring-1 ring-gray-200">
            {profile.photo ? (
              <img src={profile.photo} alt="Headshot" className="h-full w-full object-cover" />
            ) : (
              <div className="h-full w-full flex items-center justify-center text-gray-400 text-xs">No photo</div>
            )}
          </div>
          <div className="min-w-0">
            <h1 className="text-xl font-semibold truncate">{profile.name || 'Your Name'}</h1>
            <div className="text-sm text-gray-600 truncate">{profile.email || 'you@example.com'} • {profile.phone || '+1 234 567 8901'}</div>
            <div className="flex flex-wrap gap-3 mt-1">
              <LinkBadge href={profile.linkedin} label="LinkedIn" />
              <LinkBadge href={profile.github} label="GitHub" />
              <LinkBadge href={profile.resume} label="Resume" />
            </div>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="rounded-lg bg-indigo-50 p-4">
            <div className="text-xs uppercase tracking-wide text-indigo-700">Education</div>
            <div className="mt-1 font-medium">{profile.university || 'Your University Name'}</div>
            <div className="text-sm text-indigo-800">
              CGPA: {profile.cgpa || '8.2'}/10 • Est. GPA: {profile.gpaEstimate || '3.3'}/4.0
            </div>
          </div>
          <div className="rounded-lg bg-emerald-50 p-4 md:col-span-2">
            <div className="text-xs uppercase tracking-wide text-emerald-700">Key Technical Skills</div>
            <div className="mt-2 flex flex-wrap gap-2">
              {(profile.skills || []).map((s, i) => (
                <span key={i} className="inline-flex items-center rounded-full bg-white border border-emerald-200 text-emerald-900 px-3 py-1 text-xs">{s}</span>
              ))}
              {(!profile.skills || profile.skills.length === 0) && (
                <span className="text-sm text-emerald-900">Add skills to highlight your fit.</span>
              )}
            </div>
          </div>
        </div>

        <div className="mt-6">
          <h2 className="text-base font-semibold">Professional Summary</h2>
          <p className="text-gray-700 mt-1 whitespace-pre-wrap">{summary || 'Use the builder to generate a tailored summary for your target role.'}</p>
        </div>

        <div className="mt-6">
          <h2 className="text-base font-semibold">Projects</h2>
          <div className="mt-3 grid grid-cols-1 gap-4">
            {projects.map((p, idx) => (
              <div key={idx} className="rounded-lg border p-4">
                <div className="font-medium">{p.name}</div>
                <div className="text-sm text-gray-600 mt-1">Tech: {p.tech || '—'}</div>
                {p.star && (
                  <div className="mt-2">
                    <div className="text-xs font-semibold uppercase text-gray-500">S.T.A.R.</div>
                    <pre className="whitespace-pre-wrap text-sm text-gray-800">{p.star}</pre>
                  </div>
                )}
                {p.pitch && (
                  <div className="mt-2">
                    <div className="text-xs font-semibold uppercase text-gray-500">60-second Pitch</div>
                    <p className="text-sm text-gray-800">{p.pitch}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {profile.certifications?.length ? (
          <div className="mt-6">
            <h2 className="text-base font-semibold">Certifications</h2>
            <ul className="list-disc pl-5 mt-2 text-gray-700">
              {profile.certifications.map((c, i) => (
                <li key={i}>{c}</li>
              ))}
            </ul>
          </div>
        ) : null}
      </div>
    </div>
  );
}
