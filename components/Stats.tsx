'use client';

export default function Stats() {
  const advantages = [
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M12 3.6l1.6 1.1 1.9-.4 1 1.7 1.9.5.4 1.9 1.1 1.6-1.1 1.6-.4 1.9-1.9.5-1 1.7-1.9-.4L12 20.4l-1.6-1.1-1.9.4-1-1.7-1.9-.5-.4-1.9-1.1-1.6 1.1-1.6.4-1.9 1.9-.5 1-1.7 1.9.4z" />
          <circle cx="12" cy="12" r="2.8" />
        </svg>
      ),
      title: 'ADVANCED TECHNOLOGY',
      text: 'Innovative solutions for modern manufacturing.'
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M12 3.2l7 2.6v5.4c0 4.2-2.9 7.3-7 8.7-4.1-1.4-7-4.5-7-8.7V5.8z" />
          <path d="M9 11.8l2.2 2.2 4-4.3" />
        </svg>
      ),
      title: 'PRECISION QUALITY',
      text: 'Strict quality control at every production stage.'
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M4.8 15.2V12a7.2 7.2 0 0 1 14.4 0v3.2" />
          <path d="M3.2 15.4a1.8 1.8 0 0 1 1.8-1.8h1.2v5.2H5a1.8 1.8 0 0 1-1.8-1.8z" />
          <path d="M20.8 15.4a1.8 1.8 0 0 0-1.8-1.8h-1.2v5.2H19a1.8 1.8 0 0 0 1.8-1.8z" />
        </svg>
      ),
      title: 'EXPERT SUPPORT',
      text: 'Global service and technical support you can count on.'
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <circle cx="12" cy="12" r="8.4" />
          <path d="M3.6 12h16.8" />
          <path d="M12 3.6c2.4 2.3 3.7 5.2 3.7 8.4s-1.3 6.1-3.7 8.4c-2.4-2.3-3.7-5.2-3.7-8.4S9.6 5.9 12 3.6z" />
        </svg>
      ),
      title: 'GLOBAL DELIVERY',
      text: 'Reliable lead times and export experience worldwide.'
    }
  ];

  return (
    <section className="py-8 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {advantages.map((item, index) => (
            <div key={index} className="flex items-start gap-3">
              <div className="w-10 h-10 flex-shrink-0 text-orange-500">
                {item.icon}
              </div>
              <div>
                <div className="text-sm font-bold text-slate-900 mb-1">
                  {item.title}
                </div>
                <div className="text-xs text-slate-600 leading-relaxed">
                  {item.text}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}