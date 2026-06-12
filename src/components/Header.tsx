import { useState } from "react";
import { Menu, X, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface HeaderProps {
  onOpenDemopane: () => void;
  onOpenTrialpane: () => void;
}

export default function Header({ onOpenDemopane, onOpenTrialpane }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Smooth scroll handler
  const handleScroll = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 sm:h-20">
          
          {/* Logo */}
          <div className="flex items-center cursor-pointer" onClick={() => handleScroll("hero")}>
            <div className="flex items-center space-x-2">
              <span className="text-2xl font-extrabold font-sans text-gray-900 tracking-tight flex items-center select-none">
                <span>c</span>
                <span className="inline-flex flex-col items-center justify-center relative mx-[1.5px]">
                  <span className="text-2xl font-black text-gray-900 leading-none">O</span>
                  <span className="absolute -bottom-[6px] left-1/2 -translate-x-1/2 flex items-center space-x-[2px]">
                    <span className="w-[5px] h-[5px] rounded-full bg-[#8B5CF6]"></span>
                    <span className="w-[6.5px] h-[6.5px] rounded-full bg-[#FFAF3D]"></span>
                    <span className="w-[8px] h-[8px] rounded-full bg-[#FF4B55]"></span>
                  </span>
                </span>
                <span className="ml-[1px]">pilot</span>
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8 text-sm font-medium text-gray-600">
            <button 
              onClick={() => handleScroll("product")} 
              className="hover:text-brand-purple transition-colors duration-200 cursor-pointer"
            >
              Product
            </button>
            <button 
              onClick={() => handleScroll("how-it-works")} 
              className="hover:text-brand-purple transition-colors duration-200 cursor-pointer"
            >
              How it works
            </button>
            <button 
              onClick={() => handleScroll("pricing")} 
              className="hover:text-brand-purple transition-colors duration-200 cursor-pointer"
            >
              Pricing
            </button>
            <button 
              onClick={() => handleScroll("compliance")} 
              className="hover:text-brand-purple transition-colors duration-200 cursor-pointer"
            >
              Compliance
            </button>
          </nav>

          {/* Action Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <a 
              href="https://calendly.com/dentaldost-team/scano-copilot-demo"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-semibold text-gray-700 hover:text-brand-purple transition-colors cursor-pointer"
            >
              Book a demo
            </a>
            <a 
              href="http://copilot.scanoengage.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-brand-purple text-white shadow-[0_4px_16px_rgba(132, 78, 237, 0.3)] hover:bg-brand-hover text-sm font-bold px-6 py-3.5 rounded-full transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer tracking-wider block text-center"
            >
              START FREE TRIAL
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-gray-600 hover:text-gray-900 focus:outline-none"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-b border-gray-100 overflow-hidden"
          >
            <div className="px-4 pt-2 pb-6 space-y-4 text-base font-semibold">
              <button 
                onClick={() => handleScroll("product")} 
                className="block w-full text-left py-2 text-gray-700 hover:text-brand-purple"
              >
                Product
              </button>
              <button 
                onClick={() => handleScroll("how-it-works")} 
                className="block w-full text-left py-2 text-gray-700 hover:text-brand-purple"
              >
                How it works
              </button>
              <button 
                onClick={() => handleScroll("pricing")} 
                className="block w-full text-left py-2 text-gray-700 hover:text-brand-purple"
              >
                Pricing
              </button>
              <button 
                onClick={() => handleScroll("compliance")} 
                className="block w-full text-left py-2 text-gray-700 hover:text-brand-purple"
              >
                Compliance
              </button>
              
              <div className="pt-4 border-t border-gray-100 flex flex-col space-y-3">
                <a 
                  href="https://calendly.com/dentaldost-team/scano-copilot-demo"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-left py-2 text-gray-700 hover:text-brand-purple font-semibold"
                >
                  Book a demo
                </a>
                <a 
                  href="http://copilot.scanoengage.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setMobileMenuOpen(false)}
                  className="bg-brand-purple text-white text-center font-bold px-6 py-3.5 rounded-full shadow-md hover:bg-brand-hover block"
                >
                  START FREE TRIAL
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
