import React from 'react';
import { Utensils, Globe, AtSign } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="border-t border-slate-200 bg-white pt-12 pb-8 mt-12">
            <div className="max-w-7xl mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 gap-8 mb-12">
                    <div className="col-span-1 lg:col-span-2 space-y-4 pr-4">
                        <div className="flex items-center gap-2">
                            <Utensils className="w-6 h-6 text-[#137EED]" />
                            <div className="font-bold text-xl text-slate-900 tracking-tight">
                                Book <span className="text-[#137EED]">Bawarchi</span>
                            </div>
                        </div>
                        <p className="text-sm text-slate-500 max-w-sm leading-relaxed">
                            The enterprise solution for scalable culinary hiring and event management. Connecting communities through the joy of food.
                        </p>
                        <div className="flex space-x-3 mt-4">
                            <a href="#" className="h-8 w-8 rounded flex items-center justify-center border border-slate-200 text-slate-500 hover:border-[#137EED] hover:text-[#137EED] transition-colors"><Globe className="w-4 h-4" /></a>
                            <a href="#" className="h-8 w-8 rounded flex items-center justify-center border border-slate-200 text-slate-500 hover:border-[#137EED] hover:text-[#137EED] transition-colors"><AtSign className="w-4 h-4" /></a>
                        </div>
                    </div>

                    <div>
                        <h4 className="font-bold text-slate-900 mb-4 text-sm uppercase tracking-wider">Platform</h4>
                        <ul className="space-y-2 text-sm text-slate-600">
                            <li><a href="#" className="hover:text-[#137EED] transition-colors">Find a Cook</a></li>
                            <li><a href="#" className="hover:text-[#137EED] transition-colors">For Communities</a></li>
                            <li><a href="#" className="hover:text-[#137EED] transition-colors">Pricing</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-bold text-slate-900 mb-4 text-sm uppercase tracking-wider">Company</h4>
                        <ul className="space-y-2 text-sm text-slate-600">
                            <li><a href="#" className="hover:text-[#137EED] transition-colors">About Us</a></li>
                            <li><a href="#" className="hover:text-[#137EED] transition-colors">Careers</a></li>
                            <li><a href="#" className="hover:text-[#137EED] transition-colors">Contact</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-bold text-slate-900 mb-4 text-sm uppercase tracking-wider">Legal</h4>
                        <ul className="space-y-2 text-sm text-slate-600">
                            <li><a href="#" className="hover:text-[#137EED] transition-colors">Terms of Service</a></li>
                            <li><a href="#" className="hover:text-[#137EED] transition-colors">Privacy Policy</a></li>
                            <li><a href="#" className="hover:text-[#137EED] transition-colors">Security</a></li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-slate-200 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-slate-500">
                    <p>&copy; {new Date().getFullYear()} Book Bawarchi. All rights reserved.</p>
                    <div className="flex items-center gap-6 mt-4 md:mt-0">
                        <div className="flex items-center gap-1 hover:text-[#137EED] transition-colors cursor-pointer">
                            <Globe className="w-4 h-4" /> English (US)
                        </div>
                        <div className="flex items-center gap-1 font-bold text-slate-600">
                            USD
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
