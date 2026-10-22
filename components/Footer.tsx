'use client';

export default function Footer() {
  const customerLogos = [
    { name: 'BOSCH', text: 'BOSCH' },
    { name: 'SIEMENS', text: 'SIEMENS' },
    { name: 'ABB', text: 'ABB' },
    { name: 'Schneider', text: 'Schneider' }
  ];

  const certifications = [
    'ISO 9001:2015',
    'IATF 16949',
    'RoHS Compliant'
  ];

  return (
    <footer className="bg-slate-900 text-slate-400">
      {/* Customer Logos Section */}
      <div className="border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <h3 className="text-center text-sm font-semibold text-slate-500 uppercase tracking-wider mb-6">
            Trusted by Global Customers
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center justify-items-center">
            {customerLogos.map((logo, index) => (
              <div key={index} className="text-lg font-bold text-slate-600">
                {logo.text}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="md:col-span-2">
            <h3 className="text-lg font-bold text-white mb-4">ADC12 ALUMINUM</h3>
            <p className="text-sm leading-relaxed mb-4">
              Professional ADC12 aluminum die casting manufacturer providing high-quality products for global markets.
            </p>
            <div className="flex flex-wrap gap-3 text-xs">
              {certifications.map((cert, index) => (
                <span key={index} className="px-3 py-1 bg-slate-800 rounded border border-slate-700">
                  {cert}
                </span>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#products" className="hover:text-white transition-colors">Products</a></li>
              <li><a href="#process" className="hover:text-white transition-colors">Process</a></li>
              <li><a href="#about" className="hover:text-white transition-colors">About Us</a></li>
              <li><a href="#quality" className="hover:text-white transition-colors">Quality</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Contact Us
            </h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <svg className="w-4 h-4 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
                <span>longwenqi7799@gmail.com</span>
              </li>
              <li className="flex items-start gap-2">
                <svg className="w-4 h-4 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                </svg>
                <span>+86 134 3168 1201</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <p className="text-center text-xs text-slate-500">
            © 2024 ADC12 Aluminum Die Casting. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}