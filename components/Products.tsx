'use client';

export default function Products() {
  const categories = [
    {
      name: 'Automotive Parts',
      image: 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=600&q=80'
    },
    {
      name: 'Motorcycle Components',
      image: 'https://images.unsplash.com/photo-1449426468159-d96dbf08f19f?w=600&q=80'
    },
    {
      name: 'Door & Window Frames',
      image: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=600&q=80'
    },
    {
      name: 'Lighting Fixtures',
      image: 'https://images.unsplash.com/photo-1565003352585-c6c5e5d17e09?w=600&q=80'
    },
    {
      name: 'Rail Transit Parts',
      image: 'https://images.unsplash.com/photo-1530124566582-a618bc2615dc?w=600&q=80'
    },
    {
      name: 'Custom Machining',
      image: 'https://images.unsplash.com/photo-1581092918484-8313e1f7e8c6?w=600&q=80'
    }
  ];

  return (
    <section id="products" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 mb-8">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 mb-2">
              OUR PRODUCTS
            </h2>
            <p className="text-sm text-slate-500">
              A wide range of die-cast aluminum parts built to meet the demands of today&apos;s production environments.
            </p>
          </div>
          <a
            href="#contact"
            className="text-sm font-bold text-slate-900 hover:underline whitespace-nowrap"
          >
            VIEW ALL PRODUCTS →
          </a>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
          {categories.map((category, index) => (
            <a
              key={index}
              href="#contact"
              className="block bg-white border border-slate-200 rounded overflow-hidden hover:shadow-md transition-shadow"
            >
              <div className="aspect-[4/3] overflow-hidden bg-slate-100">
                <img 
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="text-sm font-semibold text-slate-900 mb-2">
                  {category.name}
                </h3>
                <span className="text-xs font-bold text-orange-500">
                  LEARN MORE →
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}