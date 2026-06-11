import { useState, FormEvent } from "react";
import { 
  Phone, 
  Calendar, 
  Check, 
  ShieldCheck, 
  ChevronRight, 
  Info,
  Sparkles,
  Clipboard,
  X,
  Loader2,
  Lock,
  ArrowRight
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

import Header from "./components/Header";
import InteractiveOrb from "./components/InteractiveOrb";
import InteractiveChat from "./components/InteractiveChat";
import FeaturesGrid from "./components/FeaturesGrid";
import TimelineSection from "./components/TimelineSection";
import PricingSection from "./components/PricingSection";
import Footer from "./components/Footer";

import { DemoRequest, TrialRequest } from "./types";

export default function App() {
  // Modal Popups states
  const [demoOpen, setDemoOpen] = useState(false);
  const [trialOpen, setTrialOpen] = useState(false);
  
  // Form submission feedback states
  const [demoSubmitted, setDemoSubmitted] = useState(false);
  const [trialSubmitted, setTrialSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // Form input states
  const [demoForm, setDemoForm] = useState<DemoRequest>({
    name: "",
    email: "",
    clinicName: "",
    phone: ""
  });

  const [trialForm, setTrialForm] = useState<TrialRequest>({
    email: "",
    clinicName: "",
    acceptedTerms: true
  });

  // Handle Demo Booking
  const handleDemoSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setDemoSubmitted(true);
    }, 1200);
  };

  // Handle Trial Signup
  const handleTrialSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setTrialSubmitted(true);
    }, 1200);
  };

  // Quick reset modals
  const closeModals = () => {
    setDemoOpen(false);
    setTrialOpen(false);
    // Wait for fade out to reset submissions
    setTimeout(() => {
      setDemoSubmitted(false);
      setTrialSubmitted(false);
      setDemoForm({ name: "", email: "", clinicName: "", phone: "" });
      setTrialForm({ email: "", clinicName: "", acceptedTerms: true });
    }, 3500);
  };

  return (
    <div id="hero" className="min-h-screen bg-[#FCFCFD] selection:bg-brand-purple-light selection:text-brand-purple relative overflow-hidden flex flex-col font-sans">
      
      {/* Decorative Background Mesh Glows */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-indigo-50/50 rounded-full filter blur-[120px] pointer-events-none -translate-y-1/2"></div>
      <div className="absolute top-[40%] right-0 w-[450px] h-[450px] bg-purple-50/40 rounded-full filter blur-[100px] pointer-events-none translate-x-1/3"></div>

      {/* HEADER NAVIGATION */}
      <Header 
        onOpenDemopane={() => setDemoOpen(true)}
        onOpenTrialpane={() => setTrialOpen(true)}
      />

      {/* HERO SECTION */}
      <main className="flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 lg:py-24 space-y-24 sm:space-y-36">
          
          {/* HERO BANNER BLOCK */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 sm:gap-16 items-center">
            
            {/* Left Hero Column */}
            <div className="lg:col-span-7 text-left space-y-6 max-w-2xl">
              
              {/* Badge info bubble */}
              <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 bg-[#FAF9FF] border border-brand-purple/10 rounded-full shadow-2xs hover:border-brand-purple/20 transition-all">
                <span className="w-1.5 h-1.5 bg-brand-purple rounded-full animate-pulse"></span>
                <span className="text-xs font-semibold text-brand-purple tracking-wide font-sans">
                  Trained on 1.5m Dental X-Rays
                </span>
                <ChevronRight size={12} className="text-brand-purple/60" />
              </div>

              {/* Main Headline */}
              <h1 className="text-4xl sm:text-5xl lg:text-6.5xl font-extrabold text-gray-900 tracking-tight leading-[1.08]">
                The only AI front desk that actually understands <span className="text-brand-purple inline-block relative">dentistry.</span>
              </h1>

              {/* Description */}
              <p className="text-gray-600 text-base sm:text-lg lg:text-xl leading-relaxed font-sans font-light">
                scanO Copilot greets every visitor, answers their questions, runs an AI scan and books the appointment — in chat or voice, the moment they land on your site.
              </p>

              {/* Action row */}
              <div className="flex flex-col sm:flex-row gap-4 pt-3 items-stretch sm:items-center">
                <a
                  href="http://copilot.scanoengage.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-brand-purple hover:bg-brand-hover text-white text-sm sm:text-base font-extrabold px-8 py-4.5 rounded-full shadow-[0_4px_22px_rgba(88,50,250,0.35)] transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer tracking-wider flex items-center justify-center space-x-2 text-center"
                >
                  <span>START FREE TRIAL</span>
                  <ChevronRight size={16} />
                </a>
                
                <a
                  href="https://calendly.com/dentaldost-team/scano-copilot-demo"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white hover:bg-gray-50 text-gray-700 hover:text-[#5832FA] border border-gray-200 text-sm sm:text-base font-bold px-8 py-4.5 rounded-full shadow-2xs transition-all hover:scale-[1.01] flex items-center justify-center space-x-2.5 cursor-pointer text-center"
                >
                  <Phone size={16} className="text-brand-purple/80" />
                  <span>BOOK A DEMO</span>
                </a>
              </div>

              {/* Proof list underneath hero */}
              <div className="flex flex-wrap gap-x-5 gap-y-2 pt-3 text-xs text-gray-500 font-medium border-t border-gray-100 max-w-lg">
                <div className="flex items-center space-x-1.5">
                  <Check size={14} className="text-emerald-500 stroke-[3]" />
                  <span>14-day free trial</span>
                </div>
                <span className="text-gray-300">•</span>
                <div className="flex items-center space-x-1.5">
                  <Check size={14} className="text-emerald-500 stroke-[3]" />
                  <span>No credit card</span>
                </div>
                <span className="text-gray-300">•</span>
                <div className="flex items-center space-x-1.5">
                  <Check size={14} className="text-emerald-500 stroke-[3]" />
                  <span>Live in ~10 minutes</span>
                </div>
              </div>

            </div>

            {/* Right Hero Column: Interactive voice globe */}
            <div className="lg:col-span-5 flex justify-center items-center">
              <InteractiveOrb />
            </div>

          </div>

          {/* CHAT DEMO ACTION SEGMENT */}
          <div className="border-t border-gray-100/60 pt-20">
            <InteractiveChat />
          </div>

          {/* DYNAMIC SENSATIONAL SATE GRID */}
          <div className="border-t border-gray-100/60 pt-20">
            <FeaturesGrid />
          </div>

          {/* TIMELINE CODE TERMINAL MODULE */}
          <div className="border-t border-gray-100/60 pt-20">
            <TimelineSection />
          </div>

          {/* COMPACT PRICING LAYOUT GRID */}
          <div className="border-t border-gray-100/60 pt-20">
            <PricingSection onOpenTrialpane={() => setTrialOpen(true)} />
          </div>

          {/* STOP LOSING PATIENTS CONVERSION CALLOUT CONTAINER */}
          <div className="border-t border-gray-100/60 pt-10">
            <div className="bg-gradient-to-br from-indigo-50/60 via-[#F5F2FF] to-white border border-indigo-100/50 rounded-3xl p-8 sm:p-14 text-center space-y-6 max-w-4xl mx-auto shadow-2xs relative overflow-hidden flex flex-col items-center">
              
              {/* Backglow element */}
              <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-80 h-40 bg-brand-purple/5 blur-[50px] rounded-full pointer-events-none"></div>

              <div className="w-12 h-12 rounded-2.5xl bg-white shadow-xs border border-purple-100/60 flex items-center justify-center text-brand-purple">
                <Sparkles size={24} />
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5.5xl font-extrabold text-gray-900 tracking-tight max-w-2xl leading-tight">
                Stop losing patients to your <span className="text-brand-purple">contact form.</span>
              </h2>

              <p className="text-gray-600 text-sm sm:text-base max-w-lg leading-relaxed">
                Turn on an AI clinical front desk that never sleeps, never misses a web lead, and calendars appointments while you perform dentistry. Live in ten minutes.
              </p>

              {/* Dual button */}
              <div className="flex flex-col sm:flex-row gap-4 w-full justify-center pt-2 sm:items-center max-w-md">
                <a
                  href="http://copilot.scanoengage.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-brand-purple hover:bg-brand-hover text-white text-xs sm:text-sm font-extrabold py-4 px-8 rounded-full shadow-md transition-all hover:scale-[1.01] active:scale-98 cursor-pointer tracking-wider text-center flex items-center justify-center"
                >
                  START FREE TRIAL
                </a>
                <a
                  href="https://calendly.com/dentaldost-team/scano-copilot-demo"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white hover:bg-gray-50 border border-gray-200 text-gray-700 text-xs sm:text-sm font-bold py-4 px-8 rounded-full shadow-2xs transition-all hover:scale-[1.01] cursor-pointer inline-flex items-center justify-center gap-1.5 text-center"
                >
                  <Phone size={14} className="text-brand-purple/80" />
                  <span>BOOK A DEMO</span>
                </a>
              </div>

              <div className="text-[10px] sm:text-xs text-gray-400 font-medium font-sans">
                14-day free trial  •  No credit card  •  Sold direct & through partners worldwide
              </div>
            </div>
          </div>

        </div>
      </main>

      {/* COMPLIANCE FOOTER */}
      <Footer />

      {/* ============================================== */}
      {/* MODAL POPUPS & INTERACTIVE EXPERIENCES MODALS */}
      {/* ============================================== */}
      <AnimatePresence>
        
        {/* MODAL 1: BOOK A DEMO */}
        {demoOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop dark blurred layout */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeModals}
              className="absolute inset-0 bg-slate-900/40 backdrop-blur-xs"
            ></motion.div>

            {/* Content box popup card */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 15 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 15 }}
              transition={{ type: "spring", damping: 25, stiffness: 350 }}
              className="relative w-full max-w-md bg-white rounded-3xl border border-gray-100 shadow-2xl p-6 sm:p-8 overflow-hidden z-10 text-left flex flex-col space-y-5"
            >
              {/* Close Button element */}
              <button
                onClick={closeModals}
                className="absolute top-4 right-4 p-2 rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition cursor-pointer"
              >
                <X size={18} />
              </button>

              {demoSubmitted ? (
                // SUCCESS STATE
                <div className="py-8 text-center space-y-4 flex flex-col items-center">
                  <div className="w-16 h-16 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-500 mb-2">
                    <Check size={32} className="stroke-[3]" />
                  </div>
                  <h3 className="text-2xl font-extrabold text-gray-950">Demo Reserved!</h3>
                  <p className="text-sm text-gray-500 max-w-xs leading-relaxed">
                    Awesome! We are customizing a custom scanO visual demo instance for <span className="font-semibold text-gray-800">{demoForm.clinicName}</span>. One of our specialist clinical concierges will call you at <span className="font-semibold text-gray-800">{demoForm.phone}</span> shortly.
                  </p>
                  <button
                    onClick={closeModals}
                    className="mt-4 bg-brand-purple text-white px-6 py-2.5 rounded-full font-bold text-xs hover:bg-brand-hover tracking-wider transition cursor-pointer"
                  >
                    CLOSE WINDOW
                  </button>
                </div>
              ) : (
                // FORM STATE
                <>
                  <div className="space-y-1.5 text-left">
                    <div className="flex items-center space-x-1.5 text-brand-purple">
                      <Sparkles size={16} />
                      <span className="text-[10px] font-bold uppercase tracking-widest font-mono">scanO Copilot Demo</span>
                    </div>
                    <h3 className="text-2xl font-black text-gray-900 tracking-tight leading-none">Book clinic demo</h3>
                    <p className="text-xs text-gray-400">See scanO Copilot sync with your custom practice software rules live.</p>
                  </div>

                  <form onSubmit={handleDemoSubmit} className="space-y-4 pt-1 flex flex-col">
                    <div className="space-y-1 text-left">
                      <label className="text-xs font-bold text-gray-600">Your Name</label>
                      <input
                        type="text"
                        required
                        placeholder="Dr. Austin Mehta"
                        value={demoForm.name}
                        onChange={(e) => setDemoForm({ ...demoForm, name: e.target.value })}
                        className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:bg-white focus:border-brand-purple outline-hidden transition"
                      />
                    </div>

                    <div className="space-y-1 text-left">
                      <label className="text-xs font-bold text-gray-600">Business Email</label>
                      <input
                        type="email"
                        required
                        placeholder="doctor@clinic.com"
                        value={demoForm.email}
                        onChange={(e) => setDemoForm({ ...demoForm, email: e.target.value })}
                        className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:bg-white focus:border-brand-purple outline-hidden transition"
                      />
                    </div>

                    <div className="space-y-1 text-left">
                      <label className="text-xs font-bold text-gray-600">Dental Practice Name</label>
                      <input
                        type="text"
                        required
                        placeholder="Summit Dental Group"
                        value={demoForm.clinicName}
                        onChange={(e) => setDemoForm({ ...demoForm, clinicName: e.target.value })}
                        className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:bg-white focus:border-brand-purple outline-hidden transition"
                      />
                    </div>

                    <div className="space-y-1 text-left">
                      <label className="text-xs font-bold text-gray-600">Contact Phone Number</label>
                      <input
                        type="tel"
                        required
                        placeholder="+1 (555) 0192-384"
                        value={demoForm.phone}
                        onChange={(e) => setDemoForm({ ...demoForm, phone: e.target.value })}
                        className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:bg-white focus:border-brand-purple outline-hidden transition"
                      />
                    </div>

                    <div className="pt-2">
                      <button
                        type="submit"
                        disabled={submitting}
                        className="w-full bg-brand-purple hover:bg-brand-hover text-white py-3.5 px-4 rounded-xl text-sm font-extrabold tracking-wider transition-all cursor-pointer flex items-center justify-center gap-2 shadow-md disabled:opacity-80"
                      >
                        {submitting ? (
                          <>
                            <Loader2 size={16} className="animate-spin" />
                            <span>CONFIRMING CALENDAR...</span>
                          </>
                        ) : (
                          <>
                            <span>SCHEDULE LIVE DEMO</span>
                            <ArrowRight size={16} />
                          </>
                        )}
                      </button>
                    </div>

                    <p className="text-[10px] text-center text-gray-400 mt-2">
                      *By proceeding you agree to receive HIPAA-secure demo updates over phone.
                    </p>
                  </form>
                </>
              )}
            </motion.div>
          </div>
        )}

        {/* MODAL 2: START FREE TRIAL */}
        {trialOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeModals}
              className="absolute inset-0 bg-slate-900/40 backdrop-blur-xs"
            ></motion.div>

            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 15 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 15 }}
              transition={{ type: "spring", damping: 25, stiffness: 350 }}
              className="relative w-full max-w-md bg-white rounded-3xl border border-gray-100 shadow-2xl p-6 sm:p-8 overflow-hidden z-10 text-left flex flex-col space-y-5"
            >
              <button
                onClick={closeModals}
                className="absolute top-4 right-4 p-2 rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition cursor-pointer"
              >
                <X size={18} />
              </button>

              {trialSubmitted ? (
                // TRIAL SUCCESS STATE
                <div className="py-6 text-center space-y-4 flex flex-col items-center">
                  <div className="w-16 h-16 rounded-full bg-[#EBE8FF] flex items-center justify-center text-brand-purple mb-1">
                    <Sparkles size={28} className="animate-pulse" />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-extrabold text-gray-950 leading-none">Trial Provisioned!</h3>
                  <p className="text-xs sm:text-sm text-gray-500 max-w-xs leading-relaxed">
                    Fantastic! We programmatically generated a custom clinical interface key for <span className="font-semibold text-gray-800">{trialForm.clinicName}</span>. Your unique setup script is ready!
                  </p>
                  
                  {/* Generated code key element block */}
                  <div className="w-full bg-slate-950 rounded-xl p-3 text-left font-mono text-[9px] text-green-400 border border-slate-800 select-all relative group">
                    <code>{`<script src="https://cdn.scano.ai/copilot.js" data-clinic="sc-${trialForm.clinicName.toLowerCase().replace(/[^a-z0-9]/g, "")}-7x" defer></script>`}</code>
                  </div>

                  <p className="text-[10px] text-gray-400">
                    We also sent comprehensive login details to <span className="font-semibold text-gray-600">{trialForm.email}</span>.
                  </p>

                  <button
                    onClick={closeModals}
                    className="mt-2 bg-brand-purple text-white px-6 py-2.5 rounded-full font-bold text-xs hover:bg-brand-hover tracking-wider transition cursor-pointer"
                  >
                    DEPLOY CO-PILOT
                  </button>
                </div>
              ) : (
                // FORM STATE
                <>
                  <div className="space-y-1.5 text-left">
                    <div className="flex items-center space-x-1.5 text-indigo-600">
                      <Lock size={14} />
                      <span className="text-[10px] font-bold uppercase tracking-widest font-mono">14-Day Free Trial</span>
                    </div>
                    <h3 className="text-2xl font-black text-gray-900 tracking-tight leading-none">Deploy 10 Min Trial</h3>
                    <p className="text-xs text-gray-400">Unlock fully white-labeled teeth-scanning chat immediately, no credit card.</p>
                  </div>

                  <form onSubmit={handleTrialSubmit} className="space-y-4.5 pt-1 flex flex-col">
                    <div className="space-y-1 text-left">
                      <label className="text-xs font-bold text-gray-600">Practice Email Address</label>
                      <input
                        type="email"
                        required
                        placeholder="office@apex-orthodontics.com"
                        value={trialForm.email}
                        onChange={(e) => setTrialForm({ ...trialForm, email: e.target.value })}
                        className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:bg-white focus:border-brand-purple outline-hidden transition"
                      />
                    </div>

                    <div className="space-y-1 text-left">
                      <label className="text-xs font-bold text-gray-600">Clinic / Office Name</label>
                      <input
                        type="text"
                        required
                        placeholder="Apex Orthodontics Group"
                        value={trialForm.clinicName}
                        onChange={(e) => setTrialForm({ ...trialForm, clinicName: e.target.value })}
                        className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:bg-white focus:border-brand-purple outline-hidden transition"
                      />
                    </div>

                    {/* Checkbox agreement */}
                    <div className="flex items-center space-x-2 text-left pt-1">
                      <input
                        type="checkbox"
                        id="terms"
                        checked={trialForm.acceptedTerms}
                        onChange={(e) => setTrialForm({ ...trialForm, acceptedTerms: e.target.checked })}
                        className="rounded border-gray-300 text-brand-purple focus:ring-brand-purple shrink-0"
                      />
                      <label htmlFor="terms" className="text-[11px] text-gray-400 cursor-pointer select-none">
                        I authorize scanO to provision sandbox scripts matching my site's assets under medical privacy consent laws.
                      </label>
                    </div>

                    <div className="pt-1.5">
                      <button
                        type="submit"
                        disabled={submitting}
                        className="w-full bg-brand-purple hover:bg-brand-hover text-white py-3.5 px-4 rounded-xl text-sm font-extrabold tracking-wider transition-all cursor-pointer flex items-center justify-center gap-2 shadow-md disabled:opacity-85"
                      >
                        {submitting ? (
                          <>
                            <Loader2 size={16} className="animate-spin" />
                            <span>GENERATING INTEGRATION KEY...</span>
                          </>
                        ) : (
                          <>
                            <span>GENERATE EMBED SNIPPET</span>
                            <ChevronRight size={16} />
                          </>
                        )}
                      </button>
                    </div>

                    <div className="flex justify-center items-center space-x-1.5 pt-2 text-[10px] text-gray-400 font-sans mx-auto">
                      <ShieldCheck size={14} className="text-emerald-500" />
                      <span>Zero setup fee • Immediate cloud sandbox</span>
                    </div>
                  </form>
                </>
              )}
            </motion.div>
          </div>
        )}

      </AnimatePresence>

    </div>
  );
}
