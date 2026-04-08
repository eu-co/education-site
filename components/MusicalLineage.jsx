'use client';
import { useState, useMemo } from 'react';

export default function MusicalLineage({ composers }) {
  // Start with a high-profile composer
  const [focusId, setFocusId] = useState('beethoven');

  const { focusComposer, teachers, students } = useMemo(() => {
    const focus = composers.find(c => c.id === focusId) || composers[0];
    
    // Teachers: IDs found in the focus composer's connection string
    const teacherIds = focus?.connections?.split(',').map(s => s.trim()) || [];
    const teachersList = composers.filter(c => teacherIds.includes(c.id));

    // Students: Composers who list the current focus ID in THEIR connections
    const studentsList = composers.filter(c => 
      c.connections?.split(',').map(s => s.trim()).includes(focusId)
    );

    return { focusComposer: focus, teachers: teachersList, students: studentsList };
  }, [focusId, composers]);

  return (
    <section className="relative bg-slate-950 rounded-[3rem] p-8 md:p-16 overflow-hidden border border-white/10 shadow-2xl">
      {/* Decorative Background DNA */}
      <div className="absolute top-10 right-10 text-[12rem] font-black text-white/[0.03] select-none leading-none uppercase italic pointer-events-none">
        Legacy
      </div>

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-3 gap-16 items-center">
        
        {/* INFLUENCED BY */}
        <div className="space-y-8 order-2 lg:order-1">
          <h3 className="text-pink-500 font-bold tracking-[0.3em] uppercase text-xs flex items-center gap-3">
            <span className="w-8 h-px bg-pink-500/50" /> Influenced By
          </h3>
          <div className="space-y-6">
            {teachers.length > 0 ? teachers.map(t => (
              <button key={t.id} onClick={() => setFocusId(t.id)} className="block text-left group">
                <p className="text-2xl font-bold text-white group-hover:text-pink-400 transition-colors">{t.name}</p>
                <p className="text-sm text-slate-500 font-medium">Mentor / Catalyst</p>
              </button>
            )) : <p className="text-slate-600 italic">Self-taught or early historical roots.</p>}
          </div>
        </div>

        {/* THE FOCUS POINT */}
        <div className="text-center order-1 lg:order-2">
          <div className="relative inline-block">
            <div className="absolute inset-0 bg-pink-500 rounded-full blur-3xl opacity-20 animate-pulse" />
            <div className="relative w-56 h-56 md:w-64 md:h-64 rounded-full border-4 border-white/10 p-2 mb-8 mx-auto">
              <img 
                src={focusComposer?.imageUrl || '/placeholder.jpg'} 
                alt={focusComposer?.name}
                className="w-full h-full object-cover rounded-full grayscale hover:grayscale-0 transition-all duration-700"
              />
            </div>
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-2 tracking-tighter uppercase italic">
            {focusComposer?.name}
          </h2>
          <p className="text-pink-500 font-mono text-sm tracking-widest">{focusComposer?.lifespan}</p>
        </div>

        {/* MUSICAL LEGACY */}
        <div className="space-y-8 order-3 md:text-right">
          <h3 className="text-cyan-400 font-bold tracking-[0.3em] uppercase text-xs flex items-center gap-3 md:justify-end">
             Musical Legacy <span className="w-8 h-px bg-cyan-400/50" />
          </h3>
          <div className="space-y-6">
            {students.length > 0 ? students.map(s => (
              <button key={s.id} onClick={() => setFocusId(s.id)} className="block w-full md:text-right group">
                <p className="text-2xl font-bold text-white group-hover:text-cyan-400 transition-colors">{s.name}</p>
                <p className="text-sm text-slate-500 font-medium">Protegé / Inheritor</p>
              </button>
            )) : <p className="text-slate-600 italic">A singular voice without direct heirs.</p>}
          </div>
        </div>

      </div>
    </section>
  );
}