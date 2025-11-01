import React, { useEffect, useRef, useState } from 'react';

function classNames(...arr) {
  return arr.filter(Boolean).join(' ');
}

export default function ProfileForm({ profile, onChange }) {
  const fileInputRef = useRef(null);
  const [photoPreview, setPhotoPreview] = useState(profile.photo || '');

  useEffect(() => {
    setPhotoPreview(profile.photo || '');
  }, [profile.photo]);

  const handleInput = (e) => {
    const { name, value } = e.target;
    onChange({ ...profile, [name]: value });
  };

  const handleSkillsChange = (e) => {
    const raw = e.target.value;
    const skills = raw
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);
    onChange({ ...profile, skills, skillsRaw: raw });
  };

  const handleCertsChange = (e) => {
    const raw = e.target.value;
    const certs = raw
      .split('\n')
      .map((s) => s.trim())
      .filter(Boolean);
    onChange({ ...profile, certifications: certs, certsRaw: raw });
  };

  const handlePhoto = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setPhotoPreview(url);
    onChange({ ...profile, photo: url });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold">Contact & Header</h2>
        <p className="text-sm text-gray-500">Make sure your core info is accurate and professional.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Full Name</label>
          <input
            name="name"
            value={profile.name}
            onChange={handleInput}
            className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Your Name"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Email</label>
          <input
            name="email"
            type="email"
            value={profile.email}
            onChange={handleInput}
            className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="you@example.com"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Phone</label>
          <input
            name="phone"
            value={profile.phone}
            onChange={handleInput}
            className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="+1 234 567 8901"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">University</label>
          <input
            name="university"
            value={profile.university}
            onChange={handleInput}
            className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Your University Name"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">LinkedIn URL</label>
          <input
            name="linkedin"
            value={profile.linkedin}
            onChange={handleInput}
            className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="https://linkedin.com/in/username"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">GitHub URL</label>
          <input
            name="github"
            value={profile.github}
            onChange={handleInput}
            className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="https://github.com/username"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Resume (PDF URL)</label>
          <input
            name="resume"
            value={profile.resume}
            onChange={handleInput}
            className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="https://.../resume.pdf"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">CGPA (out of 10)</label>
          <input
            name="cgpa"
            type="number"
            step="0.01"
            value={profile.cgpa}
            onChange={handleInput}
            className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="8.2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Estimated GPA (4.0 scale)</label>
          <input
            name="gpaEstimate"
            type="number"
            step="0.01"
            value={profile.gpaEstimate}
            onChange={handleInput}
            className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="3.3"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Headshot</label>
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-full bg-gray-100 overflow-hidden ring-1 ring-gray-200">
              {photoPreview ? (
                <img src={photoPreview} alt="Headshot" className="h-full w-full object-cover" />
              ) : (
                <div className="h-full w-full flex items-center justify-center text-gray-400 text-xs">No photo</div>
              )}
            </div>
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="px-3 py-2 rounded-md bg-indigo-600 text-white text-sm hover:bg-indigo-700"
            >
              Upload
            </button>
            <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handlePhoto} />
          </div>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Key Technical Skills (comma-separated)</label>
        <input
          value={profile.skillsRaw || profile.skills?.join(', ') || ''}
          onChange={handleSkillsChange}
          className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          placeholder="Python, FastAPI, React, MongoDB, Pandas"
        />
        <div className="mt-2 flex flex-wrap gap-2">
          {profile.skills?.map((s, idx) => (
            <span
              key={idx}
              className="inline-flex items-center gap-1 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200 px-3 py-1 text-xs"
            >
              {s}
              <button
                type="button"
                onClick={() => {
                  const next = profile.skills.filter((_, i) => i !== idx);
                  onChange({ ...profile, skills: next, skillsRaw: next.join(', ') });
                }}
                className="ml-1 text-indigo-500 hover:text-indigo-700"
                aria-label={`Remove ${s}`}
              >
                ×
              </button>
            </span>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Certifications (one per line)</label>
        <textarea
          value={profile.certsRaw || profile.certifications?.join('\n') || ''}
          onChange={handleCertsChange}
          rows={4}
          className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          placeholder={"AWS Certified Cloud Practitioner\nGoogle Data Analytics Professional Certificate"}
        />
      </div>
    </div>
  );
}
