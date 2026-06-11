import { useState } from "react";
import { Link, Check, Code, BookOpen, Sparkles, Copy, FileCode } from "lucide-react";

export default function TimelineSection() {
  const [copied, setCopied] = useState(false);

  const steps = [
    {
      num: 1,
      icon: <Code size={14} className="text-white" />,
      title: "Paste the embed snippet",
      desc: "Instant integration; add a single script string to your page head."
    },
    {
      num: 2,
      icon: <BookOpen size={14} className="text-white" />,
      title: "Review your auto-built knowledge base",
      desc: "Our model crawls your dental services, fees, and location info automatically."
    },
    {
      num: 3,
      icon: <Sparkles size={14} className="text-white" />,
      title: "Go live — on your site, IG, WhatsApp & GBP",
      desc: "Converse with and book incoming web leads everywhere, 24/7."
    }
  ];

  const htmlCode = `<!-- scanO Copilot -->
<script
  src="https://cdn.scano.ai/copilot.js"
  data-clinic="your-clinic-id"
  defer
></script>`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(htmlCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full flex flex-col md:flex-row gap-12 items-center text-left">
      
      {/* Left Column: Timeline text list */}
      <div className="w-full md:w-1/2 space-y-8">
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <div className="h-[2px] w-8 bg-brand-purple"></div>
            <span className="text-xs font-bold text-brand-purple uppercase tracking-widest font-mono">GET LIVE</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 tracking-tight leading-tight">
            From paste to patients <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-purple to-indigo-600">in 10 Mins.</span>
          </h2>
          <p className="text-gray-600 text-base sm:text-lg">
            Drop one snippet on your site — no developer required. Copilot scrapes your pages to build its knowledge base; you review the pricing and FAQs, then go live.
          </p>
        </div>

        {/* Timeline Steps */}
        <div className="space-y-6">
          {steps.map((step) => (
            <div key={step.num} className="flex space-x-4 items-start group">
              {/* Badge Number & Line */}
              <div className="flex flex-col items-center">
                <div className="w-7 h-7 rounded-full bg-brand-purple flex items-center justify-center text-xs font-extrabold shadow-sm group-hover:scale-105 transition-transform">
                  {step.icon}
                </div>
                {step.num < 3 && (
                  <div className="w-[1.5px] h-12 bg-gray-100 mt-2"></div>
                )}
              </div>
              
              <div className="space-y-0.5">
                <h4 className="font-bold text-gray-900 text-sm sm:text-base tracking-tight">
                  {step.title}
                </h4>
                <p className="text-xs sm:text-sm text-gray-500 leading-normal">
                  {step.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right Column: Code Snippet Card */}
      <div className="w-full md:w-1/2 flex justify-center">
        <div className="w-full max-w-[460px] bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl flex flex-col text-left">
          
          {/* Header layout of code terminal */}
          <div className="bg-slate-950/80 px-5 py-3.5 border-b border-slate-800 flex justify-between items-center shrink-0">
            {/* Mac Window Dots */}
            <div className="flex space-x-1.5 items-center">
              <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block"></span>
              <span className="w-3 h-3 rounded-full bg-yellow-500/80 inline-block"></span>
              <span className="w-3 h-3 rounded-full bg-green-500/80 inline-block"></span>
              
              <span className="ml-3 text-[11px] font-mono text-slate-500 font-medium">index.html</span>
            </div>

            {/* Copy snippet trigger */}
            <button
              onClick={copyToClipboard}
              className="px-2.5 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-[10px] text-slate-400 font-mono hover:text-[#5832FA] hover:border-[#5832FA]/30 hover:bg-slate-950 flex items-center space-x-1 transition cursor-pointer"
            >
              {copied ? (
                <>
                  <Check size={11} className="text-green-400" />
                  <span className="text-green-400">Copied!</span>
                </>
              ) : (
                <>
                  <Copy size={11} />
                  <span>Copy</span>
                </>
              )}
            </button>
          </div>

          {/* Terminal content holding code copy */}
          <div className="p-5 font-mono text-xs sm:text-sm text-slate-300 leading-relaxed bg-slate-950/40 relative overflow-x-auto min-h-[160px]">
            <pre className="text-left select-all">
              <span className="text-slate-500">{"<!-- scanO Copilot -->"}</span>
              <br />
              <span className="text-orange-400">{"<script"}</span>
              <br />
              {"  src="}
              <span className="text-green-400">{"\"https://cdn.scano.ai/copilot.js\""}</span>
              <br />
              {"  data-clinic="}
              <span className="text-green-400">{"\"your-clinic-id\""}</span>
              <br />
              {"  defer"}
              <br />
              <span className="text-orange-400">{"></script>"}</span>
              <span className="text-brand-purple cursor-blink inline-block ml-1">▒</span>
            </pre>
          </div>

          {/* Link label below terminal snippet */}
          <div className="border-t border-slate-800 bg-slate-950/70 p-4 flex items-center justify-center">
            <a 
              href="#trial"
              className="inline-flex items-center space-x-2 text-xs font-semibold text-[#5832FA] hover:text-brand-purple transition"
            >
              <Link size={12} />
              <span>No website? Every clinic also gets a shareable bot link.</span>
            </a>
          </div>

        </div>
      </div>

    </div>
  );
}
