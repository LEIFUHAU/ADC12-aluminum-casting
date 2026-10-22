'use client';

export default function Hero() {
  const stats = [
    { value: 'OEM & ODM', label: 'Custom programs' },
    { value: '5', label: 'Industries served' },
    { value: 'Drawing-based', label: 'Quotes from CAD files' }
  ];

  return (
    <section id="home" className="relative flex items-center pt-16" style={{ minHeight: '65vh' }}>
      {/* Background */}
      <div className="absolute inset-0">
        <img 
          src="https://images.unsplash.com/photo-1565003352585-c6c5e5d17e09?w=1920&q=80" 
          alt="ADC12 aluminium die-cast parts"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-slate-900/55" />
      </div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-16 text-center">
        <p className="text-xs font-semibold tracking-widest uppercase text-orange-400 mb-4">
          ADC12 ALUMINUM ALLOY
        </p>

        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-50 leading-tight mb-5 max-w-3xl mx-auto">
          Custom ADC12 Aluminum Parts, Built to Your Drawings
        </h1>
        
        <p className="text-base sm:text-lg text-slate-300 leading-relaxed mb-8 max-w-2xl mx-auto">
          From automotive and motorcycle components to door and window frames, lighting fixtures and rail transit parts — we die cast, machine and finish to your drawings. Send us a CAD file or a sample and get a quote.
        </p>
        
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          <a
            href="#contact"
            className="px-7 py-3 bg-orange-500 hover:bg-orange-600 text-slate-900 font-semibold text-sm rounded transition-colors"
          >
            Request a Quote
          </a>
          <a
            href="#process"
            className="px-7 py-3 border border-slate-400 hover:border-white text-white font-semibold text-sm rounded transition-colors"
          >
            Explore Capabilities
          </a>
        </div>

        <div className="grid grid-cols-3 max-w-xl mx-auto gap-4 pt-6 border-t border-white/10">
          {stats.map((stat, index) => (
            <div key={index}>
              <div className="text-lg font-bold text-slate-50">{stat.value}</div>
              <div className="text-xs text-slate-400 mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}