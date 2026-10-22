'use client';

export default function Process() {
  const processes = [
    {
      title: 'Die Casting',
      description: 'Advanced high-pressure die casting equipment with automated production lines. Monthly capacity of 500+ tons ADC12 aluminum alloy parts.',
      image: 'https://images.unsplash.com/photo-1581092918484-8313e1f7e8c6?w=800&q=80',
      reverse: false
    },
    {
      title: 'CNC Machining',
      description: 'Multi-axis CNC machining centers for precision secondary operations. Achieving tolerances of ±0.01mm with advanced quality control.',
      image: 'https://images.unsplash.com/photo-1565003352585-c6c5e5d17e09?w=800&q=80',
      reverse: true
    },
    {
      title: 'Surface Treatment',
      description: 'Complete surface finishing capabilities including powder coating, anodizing, painting, and plating to meet customer specifications.',
      image: 'https://images.unsplash.com/photo-1530124566582-a618bc2615dc?w=800&q=80',
      reverse: false
    },
    {
      title: 'Quality Control',
      description: 'ISO 9001:2015 certified quality management system. 100% inspection before shipment with CMM measurement and material testing.',
      image: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=800&q=80',
      reverse: true
    }
  ];

  return (
    <section id="process" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-slate-900 mb-3">
            MANUFACTURING PROCESS
          </h2>
          <p className="text-slate-600 max-w-2xl mx-auto">
            From die casting to final inspection, every step meets the highest quality standards
          </p>
        </div>

        <div className="space-y-16">
          {processes.map((process, index) => (
            <div
              key={index}
              className={`flex flex-col ${process.reverse ? 'lg:flex-row-reverse' : 'lg:flex-row'} gap-8 items-center`}
            >
              <div className="w-full lg:w-1/2">
                <div className="aspect-[4/3] rounded-lg overflow-hidden bg-slate-200">
                  <img 
                    src={process.image}
                    alt={process.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <div className="w-full lg:w-1/2">
                <h3 className="text-2xl font-bold text-slate-900 mb-4">
                  {process.title}
                </h3>
                <p className="text-slate-600 leading-relaxed text-base">
                  {process.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}