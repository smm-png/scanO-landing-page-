import { ShieldAlert, Fingerprint } from "lucide-react";

export default function Footer() {
  const productLinks = ["Features", "AI scan", "Pricing", "Engage dashboard", "Integrations"];
  const companyLinks = ["About", "Partners & resellers", "Careers", "Contact"];
  const resourceLinks = ["Help center", "Setup guide", "Status", "Book a demo"];

  const handleLinkClick = (name: string) => {
    alert(`Simulation: Navigation to /${name.toLowerCase().replace(/ & /g, "-").replace(/ /g, "-")}`);
  };

  return (
    <footer id="compliance" className="scroll-mt-24 bg-[#FAFAFC] border-t border-gray-100/80 pt-16 pb-12 text-left">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Main Footer Sitemap Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12">
          
          {/* Brand Column segment */}
          <div className="md:col-span-4 space-y-4">
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
            
            <p className="text-gray-500 text-sm leading-relaxed max-w-sm">
              The always-on AI front desk for dental clinics — chat, voice, scan and booking, live on your site in minutes.
            </p>
          </div>

          {/* Links segment */}
          <div className="grid grid-cols-3 gap-6 md:col-span-8">
            
            {/* PRODUCT */}
            <div className="space-y-4">
              <h5 className="text-[11px] font-bold uppercase tracking-widest text-brand-purple font-mono">PRODUCT</h5>
              <ul className="space-y-2.5">
                {productLinks.map((link) => (
                  <li key={link}>
                    <button
                      onClick={() => handleLinkClick(link)}
                      className="text-gray-500 hover:text-brand-purple text-xs sm:text-sm font-medium transition cursor-pointer"
                    >
                      {link}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* COMPANY */}
            <div className="space-y-4">
              <h5 className="text-[11px] font-bold uppercase tracking-widest text-brand-purple font-mono">COMPANY</h5>
              <ul className="space-y-2.5">
                {companyLinks.map((link) => (
                  <li key={link}>
                    <button
                      onClick={() => handleLinkClick(link)}
                      className="text-gray-500 hover:text-brand-purple text-xs sm:text-sm font-medium transition cursor-pointer"
                    >
                      {link}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* RESOURCES */}
            <div className="space-y-4">
              <h5 className="text-[11px] font-bold uppercase tracking-widest text-brand-purple font-mono">RESOURCES</h5>
              <ul className="space-y-2.5">
                {resourceLinks.map((link) => (
                  <li key={link}>
                    <button
                      onClick={() => handleLinkClick(link)}
                      className="text-gray-500 hover:text-brand-purple text-xs sm:text-sm font-medium transition cursor-pointer"
                    >
                      {link}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

          </div>

        </div>

        {/* Separator */}
        <div className="h-[1px] bg-gray-200/60 w-full" />

        {/* Bottom Alignment Certifications & Copyright Segment */}
        <div className="flex flex-col sm:flex-row gap-6 justify-between items-center">
          
          {/* Security & Regulatory Compliance Badging */}
          <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
            <span className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-indigo-50/80 border border-indigo-100 text-[10px] sm:text-xs font-semibold text-brand-purple">
              <ShieldAlert size={12} />
              <span>HIPAA-aligned</span>
            </span>
            <span className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-indigo-50/80 border border-indigo-100 text-[10px] sm:text-xs font-semibold text-brand-purple">
              <Fingerprint size={12} />
              <span>GDPR-compliant</span>
            </span>
            <span className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-indigo-50/80 border border-indigo-100 text-[10px] sm:text-xs font-semibold text-brand-purple">
              <ShieldAlert size={12} />
              <span>ABDM-aligned (India)</span>
            </span>
          </div>

          {/* Legal notes */}
          <p className="text-[11px] text-gray-400 font-mono">
            &copy; {new Date().getFullYear()} scanO. All rights reserved.
          </p>

        </div>

      </div>
    </footer>
  );
}
