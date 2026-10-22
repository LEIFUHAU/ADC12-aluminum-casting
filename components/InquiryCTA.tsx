'use client';

export default function InquiryCTA() {
  const contacts = [
    {
      icon: (
        <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.6">
          <rect x="3" y="5" width="18" height="14" rx="2"></rect>
          <path d="M3.5 7 12 13l8.5-6"></path>
        </svg>
      ),
      text: 'longwenqi7799@gmail.com',
      href: 'mailto:longwenqi7799@gmail.com'
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.6">
          <path d="M6 3h3l2 5-2.5 1.5a11 11 0 0 0 6 6L16 13l5 2v3a2 2 0 0 1-2 2A16 16 0 0 1 4 5a2 2 0 0 1 2-2Z"></path>
        </svg>
      ),
      text: '+86 134 3168 1201',
      href: 'tel:+8613431681201'
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.6">
          <path d="M12 21s7-6.1 7-11a7 7 0 1 0-14 0c0 4.9 7 11 7 11Z"></path>
          <circle cx="12" cy="10" r="2.6"></circle>
        </svg>
      ),
      text: 'Guangdong, China',
      href: ''
    }
  ];

  return (
    <section className="py-16 bg-slate-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-2xl lg:text-3xl font-bold text-slate-50 mb-3">
          Ready to Start Your Project?
        </h2>
        <p className="text-slate-300 mb-8">
          Upload your drawings or send us a sample. We will review it and provide a quote within 24 hours.
        </p>
        
        <div className="flex flex-wrap justify-center gap-4 mb-10">
          <a
            href="#contact"
            className="px-7 py-3 bg-orange-500 hover:bg-orange-600 text-slate-900 font-semibold text-sm rounded transition-colors"
          >
            Request a Quote
          </a>
          <a
            href="#contact"
            className="px-7 py-3 border border-slate-400 hover:border-white text-white font-semibold text-sm rounded transition-colors"
          >
            Send Drawings
          </a>
        </div>

        <div className="flex flex-wrap justify-center gap-6 text-sm text-slate-400">
          {contacts.map((contact, index) => (
            contact.href ? (
              <a
                key={index}
                href={contact.href}
                className="flex items-center gap-2 hover:text-slate-200 transition-colors"
              >
                {contact.icon}
                <span>{contact.text}</span>
              </a>
            ) : (
              <div key={index} className="flex items-center gap-2">
                {contact.icon}
                <span>{contact.text}</span>
              </div>
            )
          ))}
        </div>
      </div>
    </section>
  );
}