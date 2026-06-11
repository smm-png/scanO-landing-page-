import { 
  Clock, 
  Stethoscope, 
  Calendar, 
  Mic, 
  BookOpen, 
  AlertTriangle, 
  LayoutDashboard 
} from "lucide-react";

export default function FeaturesGrid() {
  const statCards = [
    {
      id: "stat-1",
      icon: <Clock className="text-brand-purple" size={24} />,
      title: "24/7 patient coverage",
      description: "Every visitor greeted the instant they land — 2am or 2pm, any day. No inquiry slips away.",
      statNumber: "24/7",
      statLabel: "always-on coverage"
    },
    {
      id: "stat-2",
      icon: <Stethoscope className="text-brand-purple" size={24} />,
      title: "Clinical AI depth",
      description: "Answers only from your clinic's knowledge, and runs a real-to-chat dental scan.",
      statNumber: "1.5M",
      statLabel: "dental images trained"
    },
    {
      id: "stat-3",
      icon: <Calendar className="text-brand-purple" size={24} />,
      title: "Direct calendar booking",
      description: "Reads your availability and books the slot in seconds — lead and transcript into Engage.",
      statNumber: "30s",
      statLabel: "to a booked slot"
    }
  ];

  const modularCards = [
    {
      id: "mod-1",
      icon: <Mic className="text-brand-purple" size={20} />,
      title: "Voice + text",
      description: "Live voice conversations as well as chat, on any mobile or desktop hardware device."
    },
    {
      id: "mod-2",
      icon: <BookOpen className="text-brand-purple" size={20} />,
      title: "Clinic knowledge base",
      description: "Auto-built in minutes from scraping your website; you review and edit before it goes live."
    },
    {
      id: "mod-3",
      icon: <AlertTriangle className="text-brand-purple" size={20} />,
      title: "Emergency triage",
      description: "Flags severe pain, swelling, abscess or trauma and routes immediately to your team's phones."
    },
    {
      id: "mod-4",
      icon: <LayoutDashboard className="text-brand-purple" size={20} />,
      title: "Lead dashboard",
      description: "Every patient chat, scan findings, and booking lands directly inside Engage with full analytical context."
    }
  ];

  return (
    <div className="space-y-24 sm:space-y-32">
      
      {/* SECTION 1: Built to Convert, not just chat */}
      <section id="product" className="scroll-mt-24 space-y-12">
        <div className="max-w-3xl text-left space-y-4">
          <div className="flex items-center space-x-2">
            <div className="h-[2px] w-8 bg-brand-purple"></div>
            <span className="text-xs font-bold text-brand-purple uppercase tracking-widest font-mono">WHY COPILOT</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 tracking-tight leading-tight">
            Built to <span className="text-brand-purple underline decoration-brand-purple/20 decoration-wavy">convert</span>, not just chat.
          </h2>
          <p className="text-gray-600 text-base sm:text-lg max-w-2xl">
            Most chat widgets answer a generic question and stop. Copilot is built to move every digital patient conversation toward a booked clinical appointment.
          </p>
        </div>

        {/* 3 STAT CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {statCards.map((card) => (
            <div 
              key={card.id}
              className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 hover:border-brand-purple/10 hover:shadow-[0_20px_40px_rgba(88,50,250,0.03)] transition-all duration-300 flex flex-col justify-between text-left group"
            >
              <div>
                <div className="w-12 h-12 rounded-2xl bg-purple-50 flex items-center justify-center mb-6 border border-purple-100/50 group-hover:scale-105 transition-transform duration-200">
                  {card.icon}
                </div>
                <h4 className="text-lg sm:text-xl font-bold text-gray-900 tracking-tight mb-2">
                  {card.title}
                </h4>
                <p className="text-gray-500 text-xs sm:text-sm leading-relaxed mb-8">
                  {card.description}
                </p>
              </div>

              <div className="border-t border-gray-100 pt-5 mt-auto">
                <span className="text-2xl sm:text-3xl font-extrabold text-brand-purple block tracking-tight">
                  {card.statNumber}
                </span>
                <span className="text-[10px] sm:text-xs font-bold text-gray-400 uppercase tracking-widest font-sans block mt-1">
                  {card.statLabel}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 2: One widget. The whole front desk */}
      <section id="how-it-works" className="scroll-mt-24 space-y-12">
        <div className="max-w-4xl text-left space-y-4">
          <div className="flex items-center space-x-2">
            <div className="h-[2px] w-8 bg-brand-purple"></div>
            <span className="text-xs font-bold text-brand-purple uppercase tracking-widest font-mono">EVERYTHING THE FRONT DESK DOES</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 tracking-tight leading-tight">
            One widget. The whole <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-purple to-purple-600">front desk.</span>
          </h2>
          <p className="text-gray-600 text-base sm:text-lg max-w-2xl">
            From the first hello to a confirmed clinical chair appointment — and the dental emergencies in between — Copilot handles the communication end to end.
          </p>
        </div>

        {/* 4 COLS MODULAR GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {modularCards.map((card) => (
            <div 
              key={card.id}
              className="bg-white rounded-2xl p-6 border border-gray-100 hover:border-brand-purple/10 hover:shadow-[0_16px_36px_rgba(88,50,250,0.02)] transition-all flex flex-col justify-between text-left group"
            >
              <div>
                <div className="w-10 h-10 rounded-xl bg-purple-50 flex items-center justify-center mb-5 border border-purple-100/30 group-hover:scale-105 transition-transform">
                  {card.icon}
                </div>
                <h4 className="font-bold text-gray-900 text-sm sm:text-base mb-1.5 tracking-tight">
                  {card.title}
                </h4>
                <p className="text-gray-500 text-xs sm:text-sm leading-relaxed">
                  {card.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
