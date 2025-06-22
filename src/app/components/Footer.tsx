'use client';

import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-black text-white py-12">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-semibold mb-4">KD Detailing</h3>
            <p className="text-gray-400">Car Detailing</p>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <nav className="space-y-2">
              <Link href="/" className="block text-gray-400 hover:text-white">Home</Link>
              <Link href="/about" className="block text-gray-400 hover:text-white">About</Link>
              <Link href="/services" className="block text-gray-400 hover:text-white">Services</Link>
              <Link href="/work" className="block text-gray-400 hover:text-white">Work</Link>
            </nav>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact</h4>
            <div className="space-y-2 text-gray-400">
              <a href="mailto:hello@kddetailing.co.uk" className="block hover:text-white">hello@kddetailing.co.uk</a>
              <a href="tel:+447777777777" className="block hover:text-white">07777777777</a>
              <div className="flex space-x-4 mt-4">
                <a href="#" className="hover:text-white">LinkedIn</a>
                <a href="#" className="hover:text-white">Instagram</a>
                <a href="#" className="hover:text-white">Behance</a>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} KD Detailing. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
