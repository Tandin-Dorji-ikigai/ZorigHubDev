import { Facebook, Instagram, Linkedin, Youtube, Send } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white pt-16 pb-10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-16">
          <div>
            <h4 className="text-xl font-bold mb-4">ZorigHub</h4>
            <p className="text-gray-300 mb-4">
              Preserving Bhutanese cultural heritage while empowering artisans to build sustainable livelihoods.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-white">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-300 hover:text-white">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-300 hover:text-white">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-300 hover:text-white">
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-xl font-bold mb-4">About</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-300 hover:text-white">Our Story</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white">Our Impact</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white">Artisan Stories</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white">Press & Media</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white">Careers</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xl font-bold mb-4">Help</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-300 hover:text-white">FAQs</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white">Shipping Policy</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white">Returns & Exchanges</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white">Contact Us</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white">Privacy Policy</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xl font-bold mb-4">Subscribe</h4>
            <p className="text-gray-300 mb-4">
              Get updates on new crafts, artisan stories, and special offers.
            </p>
            <form className="flex">
              <input 
                type="email" 
                placeholder="Your email address" 
                className="px-4 py-2 rounded-l w-full text-gray-900"
              />
              <button className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-r">
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>

        <div className="border-t border-gray-700 pt-8 text-center text-gray-400">
          <p>© 2025 ZorigHub. All rights reserved. Keeping Bhutanese traditions alive, one craft at a time.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

