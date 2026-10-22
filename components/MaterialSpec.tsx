'use client';

export default function MaterialSpec() {
  const specs = [
    { name: 'Alloy', value: 'ADC12 (A383)' },
    { name: 'Al content', value: '~ 85%' },
    { name: 'Si content', value: '9.6 – 12%' },
    { name: 'Cu content', value: '1.5 – 3.5%' },
    { name: 'Casting method', value: 'High-pressure die cast' },
    { name: 'Min. wall', value: '~ 1.5 mm' }
  ];

  const steps = [
    {
      no: '01',
      title: 'Send your drawing',
      text: 'CAD file, sample or dimensioned photo'
    },
    {
      no: '02',
      title: 'DFM review & quote',
      text: 'We check wall thickness and draft angles, then send a quotation'
    },
    {
      no: '03',
      title: 'Tooling & production',
      text: 'Mould making, die casting, CNC machining and finishing'
    },
    {
      no: '04',
      title: 'Inspection & shipping',
      text: 'Dimensional and appearance checks before worldwide delivery'
    }
  ];

  return (
    <section id="material" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10">
          <h2 className="text-2xl font-bold text-slate-900 mb-2">
            Why ADC12
          </h2>
          <p className="text-sm text-slate-500">
            A workhorse alloy for complex shapes, tight tolerances and high-volume production.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-10">
          {/* Left: Material Spec Table */}
          <div>
            <h3 className="text-base font-bold text-slate-900 mb-4">
              Material Specification
            </h3>
            <div className="border border-slate-200 rounded-lg overflow-hidden">
              {specs.map((spec, index) => (
                <div
                  key={index}
                  className={`grid grid-cols-2 gap-4 p-3 ${index !== specs.length - 1 ? 'border-b border-slate-200' : ''}`}
                >
                  <div className="text-sm font-medium text-slate-700">{spec.name}</div>
                  <div className="text-sm text-slate-900">{spec.value}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Process Steps */}
          <div>
            <h3 className="text-base font-bold text-slate-900 mb-4">
              Customisation Process
            </h3>
            <div className="space-y-4">
              {steps.map((step, index) => (
                <div key={index} className="flex gap-4">
                  <div className="w-10 h-10 flex-shrink-0 bg-orange-500 text-slate-900 font-bold text-sm rounded-full flex items-center justify-center">
                    {step.no}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900 mb-1">
                      {step.title}
                    </h4>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {step.text}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-10 text-center">
          <a
            href="#contact"
            className="inline-block px-6 py-3 bg-orange-500 hover:bg-orange-600 text-slate-900 font-semibold text-sm rounded transition-colors"
          >
            Get a Quote for Your Drawing
          </a>
        </div>
      </div>
    </section>
  );
}