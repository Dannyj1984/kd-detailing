const services = [
  {
    title: 'Exterior Detailing',
    description: 'Meticulous exterior detailing to restore your vehicle’s original appearance.',
    icon: '🚗'
  },
  {
    title: 'Interior Detailing',
    description: 'Interior detailing to keep your vehicle looking fresh and new.',
    icon: '🚗'
  },
  {
    title: 'Paint Correction',
    description: 'Correcting paint damage to restore your vehicle’s original appearance.',
    icon: '�'
  },
  {
    title: 'Ceramic Coating',
    description: 'Protecting your vehicle with a ceramic coating to prevent damage and maintain its original appearance.',
    icon: '✨'
  }
];

export default function Services() {
  return (
    <section id="services" className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold mb-12 text-center">Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <div 
              key={index} 
              className={`p-6 bg-gradient-to-b from-white to-gray-50 rounded-lg shadow-sm hover:shadow-2xl hover:cursor-pointer hover:scale-130 hover:z-10 transition-all duration-300 border border-gray-100 relative
                ${index % 4 === 0 ? 'hover:translate-x-[25%]' : ''}
                ${index % 4 === 3 ? 'hover:translate-x-[-25%]' : ''}
                ${index % 4 === 1 ? 'hover:translate-x-[12%]' : ''}
                ${index % 4 === 2 ? 'hover:translate-x-[-12%]' : ''}`}
            >
              <div className="text-4xl mb-4">{service.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
              <p className="text-gray-600">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
