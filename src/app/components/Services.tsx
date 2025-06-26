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

const pricing = [
  {
    title: 'Exterior Valet',
    services: [
      {title: 'Pre-Wash'},
      {title: 'Snow Foam'},
      {title: 'Contact wash'},
      {title: 'Arches Flushed'},
      {title: 'Drying Aid'},
      {title: 'Glass & Mirrors Cleaned'},
      {title: 'Paint Sealant (spray on)'},
      {title: 'Tyre Dressing'},
    ],
    cars: [
      {
        title: 'Car', price: '£30'
      },
      {
        title: 'SUV', price: '£35'
      },
      {
        title: 'Vans', price: '£40'
      },
      {
        title: 'LWB Vans', price: '£45'
      },
    ]
  },
  {
    title: 'Mini Valet',
    services: [
      {title: 'Everything from Exterior Valet'},
      {title: 'Light Vacuum'},
      {title: 'Interior Wipedown'},
      {title: 'Deodorised'},
      {title: 'Window Seals'},
    ],
    cars: [
      {
        title: 'Car', price: '£55'
      },
      {
        title: 'SUV', price: '£60'
      },
      {
        title: 'Vans', price: '£65'
      },
      {
        title: 'LWB Vans', price: '£70'
      },
    ]
  },
  {
    title: 'Prestige Valet',
    services: [
      {title: 'Everything from Mini Valet'},
      {title: 'Mats Deep Cleaned'},
      {title: 'Seats Deep Cleaned'},
      {title: 'Vents Cleaned'},
      {title: 'Gloss Spray over Paintwork'},
      {title: 'Customised Scented Air Freshener'},
      {title: 'Wet Vacuumed'},
    ],
    cars: [
      {
        title: 'Car', price: '£75'
      },
      {
        title: 'SUV', price: '£80'
      },
      {
        title: 'Vans', price: '£85'
      },
      {
        title: 'LWB Vans', price: '£90'
      },
    ]
  },
]

const additionalServices = [
  { title: 'Engine Bay Cleaned', price: '£45' },
  { title: 'Pet Hair Removal', price: '£10' },
  { title: 'Custom Scented Air Freshener', price: '£5' },
]

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
      <div className="max-w-6xl mx-auto px-4 pt-10">
        <h2 className="text-3xl font-bold mb-12 text-center">Pricing</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {pricing.map((price, index) => (
            <div 
              key={index} 
              className={`p-6 bg-gradient-to-b from-white to-gray-50 rounded-lg shadow-sm hover:shadow-2xl hover:cursor-pointer hover:scale-130 hover:z-10 transition-all duration-300 border border-gray-100 relative
                ${index % 4 === 0 ? 'hover:translate-x-[25%]' : ''}
                ${index % 4 === 3 ? 'hover:translate-x-[-25%]' : ''}
                ${index % 4 === 1 ? 'hover:translate-x-[12%]' : ''}
                ${index % 4 === 2 ? 'hover:translate-x-[-12%]' : ''}`}
            >
              <div className="flex flex-col h-full">
                <div>
                  <h3 className="text-xl font-semibold mb-2">{price.title}</h3>
                  {price.services.map((service, index) => (
                    <li key={index} className="text-gray-600">{service.title}</li>
                  ))}
                </div>
                
                <div className="mt-auto">
                <hr className="my-4 mx-4 opacity-20" />
                  {price.cars.map((car, index) => (
                    <p key={index} className="text-gray-600">{car.title} - {car.price}</p>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="max-w-6xl mx-auto px-4 pt-10">
        <h2 className="text-3xl font-bold mb-12 text-center">Additional Charges</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {additionalServices.map((service, index) => (
            <div 
              key={index} 
              className={`p-6 bg-gradient-to-b from-white to-gray-50 rounded-lg shadow-sm hover:shadow-2xl hover:cursor-pointer hover:scale-130 hover:z-10 transition-all duration-300 border border-gray-100 relative
                ${index % 4 === 0 ? 'hover:translate-x-[25%]' : ''}
                ${index % 4 === 3 ? 'hover:translate-x-[-25%]' : ''}
                ${index % 4 === 1 ? 'hover:translate-x-[12%]' : ''}
                ${index % 4 === 2 ? 'hover:translate-x-[-12%]' : ''}`}
            >
              {/* <div className="text-4xl mb-4">{service.icon}</div> */}
              <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
              <p className="text-gray-600">{service.price}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
