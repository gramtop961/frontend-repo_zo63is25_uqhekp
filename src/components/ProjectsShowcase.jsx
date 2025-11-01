import React from 'react';

function ProjectCard({ project, onChange, onRemove }) {
  const update = (k, v) => onChange({ ...project, [k]: v });

  const buildSTAR = () => {
    const { name, situation, task, action, result, tech, lesson } = project;
    const star = `Situation: ${situation}\nTask: ${task}\nAction: ${action}\nResult: ${result}`;
    const pitch = `${name}: Built using ${tech}. ${action} Result: ${result}. Biggest lesson: ${lesson}.`;
    onChange({ ...project, star, pitch });
  };

  return (
    <div className="rounded-lg border p-4 space-y-3">
      <div className="flex items-center justify-between">
        <input
          className="text-base font-semibold focus:outline-none"
          value={project.name}
          onChange={(e) => update('name', e.target.value)}
        />
        <button onClick={onRemove} className="text-sm text-red-600 hover:text-red-700">Remove</button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div>
          <label className="block text-sm font-medium mb-1">Situation</label>
          <textarea
            value={project.situation}
            onChange={(e) => update('situation', e.target.value)}
            rows={2}
            className="w-full rounded-md border px-3 py-2"
            placeholder="Context and constraints"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Task</label>
          <textarea
            value={project.task}
            onChange={(e) => update('task', e.target.value)}
            rows={2}
            className="w-full rounded-md border px-3 py-2"
            placeholder="Your responsibility or goal"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Action (most challenging technical problem solved)</label>
          <textarea
            value={project.action}
            onChange={(e) => update('action', e.target.value)}
            rows={3}
            className="w-full rounded-md border px-3 py-2"
            placeholder="What you did specifically"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Result (quantify impact)</label>
          <textarea
            value={project.result}
            onChange={(e) => update('result', e.target.value)}
            rows={3}
            className="w-full rounded-md border px-3 py-2"
            placeholder="e.g., 30% faster, 2x throughput, 95% accuracy"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div>
          <label className="block text-sm font-medium mb-1">Tech Stack</label>
          <input
            value={project.tech}
            onChange={(e) => update('tech', e.target.value)}
            className="w-full rounded-md border px-3 py-2"
            placeholder="React, FastAPI, MongoDB, Docker"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Biggest Lesson</label>
          <input
            value={project.lesson}
            onChange={(e) => update('lesson', e.target.value)}
            className="w-full rounded-md border px-3 py-2"
            placeholder="What changed in your approach"
          />
        </div>
      </div>

      <div className="flex gap-2">
        <button onClick={buildSTAR} className="px-3 py-2 rounded-md bg-indigo-600 text-white text-sm hover:bg-indigo-700">Generate STAR & Pitch</button>
        <button onClick={() => onChange({ ...project, star: '', pitch: '' })} className="px-3 py-2 rounded-md border text-sm">Clear</button>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">STAR Narrative</label>
        <textarea value={project.star} onChange={(e) => update('star', e.target.value)} rows={4} className="w-full rounded-md border px-3 py-2" />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">60-second Pitch</label>
        <textarea value={project.pitch} onChange={(e) => update('pitch', e.target.value)} rows={3} className="w-full rounded-md border px-3 py-2" />
      </div>
    </div>
  );
}

export default function ProjectsShowcase({ projects, setProjects }) {
  const updateAt = (idx, next) => {
    const copy = [...projects];
    copy[idx] = next;
    setProjects(copy);
  };

  const addProject = () => {
    setProjects([
      ...projects,
      {
        name: 'New Project',
        situation: '',
        task: '',
        action: '',
        result: '',
        tech: '',
        lesson: '',
        star: '',
        pitch: '',
      },
    ]);
  };

  const removeAt = (idx) => {
    setProjects(projects.filter((_, i) => i !== idx));
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold">Projects — S.T.A.R. Narratives</h2>
          <p className="text-sm text-gray-500">Focus on the hardest technical problem and quantify the outcome.</p>
        </div>
        <button onClick={addProject} className="px-3 py-2 rounded-md bg-indigo-600 text-white text-sm hover:bg-indigo-700">Add Project</button>
      </div>

      <div className="space-y-4">
        {projects.map((p, idx) => (
          <ProjectCard key={idx} project={p} onChange={(next) => updateAt(idx, next)} onRemove={() => removeAt(idx)} />
        ))}
      </div>
    </div>
  );
}
