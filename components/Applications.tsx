'use client';

export default function Applications() {
  const applications = [
    {
      heading: 'Automotive Parts',
      description: 'Engine covers, housings and structural brackets cast in ADC12.',
      image: 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=800&q=80'
    },
    {
      heading: 'Motorcycle Components',
      description: 'Covers, mounts and custom brackets with tight tolerances.',
      image: 'https://images.unsplash.com/photo-1449426468159-d96dbf08f19f?w=800&q=80'
    },
    {
      heading: 'Door & Window Frames',
      description: 'Thin-wall, dimensionally stable profiles and fittings.',
      image: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=800&q=80'
    },
    {
      heading: 'Lighting Fixtures',
      description: 'Heat-dissipating housings, profiles and end caps.',
      image: 'https://images.unsplash.com/photo-1565003352585-c6c5e5d17e09?w=800&q=80'
    },
    {
      heading: 'Rail Transit',
      description: 'Heavy-duty components for high-speed rail applications.',
      image: 'https://images.unsplash.com/photo-1530124566582-a618bc2615dc?w=800&q=80'
    },
    {
      heading: 'Custom Fabrication',
      description: 'Any part that can be die cast in ADC12 — send your drawing.',
      image: 'https://images.unsplash.com/photo-1581092918484-8313e1f7e8c6?w=800&q=80'
    }
  ];

  return (
    <section id="applications" className="py-16 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-2">
            Applications
          </h2>
          <p className="text-sm text-slate-500">
            One alloy, five industries — plus whatever you can draw.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {applications.map((app, index) => (
            <div
              key={index}
              className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300"
            >
              <div className="aspect-[4/3] overflow-hidden bg-slate-200">
                <img 
                  src={app.image}
                  alt={app.heading}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-5">
                <h3 className="text-base font-semibold text-slate-900 mb-2">
                  {app.heading}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {app.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}