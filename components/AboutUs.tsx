'use client';

export default function AboutUs() {
  const stats = [
    { value: '15+', label: 'Years of Experience' },
    { value: '500+', label: 'Tons Monthly Capacity' },
    { value: '40+', label: 'Countries Served' }
  ];

  return (
    <section id="about" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          <div className="aspect-[4/3] rounded overflow-hidden bg-slate-100">
            <img 
              src="https://images.unsplash.com/photo-1565003352585-c6c5e5d17e09?w=800&q=80"
              alt="ADC12 die casting factory workshop"
              className="w-full h-full object-cover"
            />
          </div>

          <div>
            <p className="text-xs font-bold tracking-widest text-orange-500 uppercase mb-3">
              ABOUT US
            </p>
            <h2 className="text-2xl lg:text-3xl font-bold text-slate-900 mb-6">
              A die-casting partner built around your drawings
            </h2>

            <div className="grid grid-cols-3 gap-4 mb-6 pb-6 border-b border-slate-200">
              {stats.map((stat, index) => (
                <div key={index}>
                  <div className="text-xl font-bold text-slate-900">{stat.value}</div>
                  <div className="text-xs text-slate-500 mt-1">{stat.label}</div>
                </div>
              ))}
            </div>

            <p className="text-sm text-slate-600 leading-relaxed mb-4">
              We are an aluminum die-casting and machining supplier working with ADC12 alloy. From tooling and casting to CNC machining, deburring and surface finishing, every step runs in house under one quality plan.
            </p>
            <p className="text-sm text-slate-600 leading-relaxed mb-6">
              Engineering support starts before production: we review your drawings, flag manufacturability risks early and quote a realistic lead time.
            </p>

            <a
              href="#contact"
              className="inline-block px-6 py-3 bg-orange-500 hover:bg-orange-600 text-slate-900 font-semibold text-sm rounded transition-colors"
            >
              Learn More
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}