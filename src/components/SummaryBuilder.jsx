import React, { useEffect, useMemo, useState } from 'react';

export default function SummaryBuilder({ profile, summaryState, onChange }) {
  const [local, setLocal] = useState(summaryState);

  useEffect(() => {
    setLocal(summaryState);
  }, [summaryState]);

  const generateSummary = () => {
    const { jobTitle, topRequirementsRaw, keywordsRaw } = local;
    const reqs = (topRequirementsRaw || '')
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);
    const keywords = (keywordsRaw || '')
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);

    const skillsLine = profile.skills?.length ? `, with hands-on skills in ${profile.skills.join(', ')}` : '';
    const reqLine = reqs.length ? ` I align with your needs across ${reqs.join(', ')}.` : '';
    const kwLine = keywords.length ? ` Keywords: ${keywords.join(', ')}.` : '';

    const summary = `Aspiring ${jobTitle || 'software engineer'} with a CGPA of ${profile.cgpa || '8.2'}/10 (${
      profile.gpaEstimate || '3.3'
    } on a 4.0 scale). My strong academic foundation in computer science, data structures, and systems${skillsLine} enables me to quickly implement solutions using modern tools and best practices. I build clean, reliable code, communicate clearly, and iterate fast with feedback.${reqLine}${kwLine}`;

    onChange({ ...local, summary });
  };

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-lg font-semibold">Professional Summary</h2>
        <p className="text-sm text-gray-500">Tailor this to the job you are interviewing for next week.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Target Job Title</label>
          <input
            value={local.jobTitle}
            onChange={(e) => setLocal({ ...local, jobTitle: e.target.value })}
            className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Junior Python Developer"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Top 3 Technical Requirements (comma-separated)</label>
          <input
            value={local.topRequirementsRaw}
            onChange={(e) => setLocal({ ...local, topRequirementsRaw: e.target.value })}
            className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Python, REST APIs, SQL"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Job Description Keywords (comma-separated)</label>
        <input
          value={local.keywordsRaw}
          onChange={(e) => setLocal({ ...local, keywordsRaw: e.target.value })}
          className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          placeholder="ETL, Flask, Pandas, Git, Docker"
        />
      </div>

      <div className="flex gap-2">
        <button
          type="button"
          onClick={generateSummary}
          className="px-3 py-2 rounded-md bg-indigo-600 text-white text-sm hover:bg-indigo-700"
        >
          Generate Summary
        </button>
        <button
          type="button"
          onClick={() => onChange({ ...local, summary: '' })}
          className="px-3 py-2 rounded-md border text-sm"
        >
          Clear
        </button>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Summary Output</label>
        <textarea
          value={local.summary}
          onChange={(e) => onChange({ ...local, summary: e.target.value })}
          rows={4}
          className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          placeholder="Your tailored summary will appear here..."
        />
        <p className="text-xs text-gray-500 mt-1">Use active voice and integrate keywords naturally.</p>
      </div>
    </div>
  );
}
