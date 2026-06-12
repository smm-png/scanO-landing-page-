import { Check, ShieldCheck, Zap } from "lucide-react";

interface PricingSectionProps {
  onOpenTrialpane: () => void;
}

export default function PricingSection({ onOpenTrialpane }: PricingSectionProps) {
  const plans = [
    {
      id: "plus",
      name: "Copilot Plus",
      tagline: "Everything a busy practice needs to stop losing website visitors.",
      price: "$199",
      isPopular: false,
      buttonStyle: "bg-brand-purple hover:bg-brand-hover text-white shadow-[0_4px_16px_rgba(132,78,237,0.25)]",
      features: [
        "Unlimited conversations — never capped",
        "Clinical AI chat + voice",
        "AI scan in chat",
        "Instant calendar booking"
      ]
    },
    {
      id: "pro",
      name: "Copilot Pro",
      tagline: "For groups and brands that want the bot to look entirely their own.",
      price: "$299",
      isPopular: true,
      buttonStyle: "bg-white hover:bg-gray-100 text-gray-900 shadow-md",
      features: [
        "Everything in Plus",
        "White-label: custom name, avatar & logo",
        "HIPAA BAA included",
        "Priority knowledge-base review"
      ]
    }
  ];

  return (
    <section id="pricing" className="scroll-mt-24 space-y-12">
      
      {/* Header labels */}
      <div className="max-w-3xl mx-auto text-center space-y-4">
        <div className="flex items-center justify-center space-x-2">
          <div className="h-[2px] w-6 bg-brand-purple"></div>
          <span className="text-xs font-bold text-brand-purple uppercase tracking-widest font-mono">PRICING</span>
          <div className="h-[2px] w-6 bg-brand-purple"></div>
        </div>
        
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 tracking-tight leading-tight">
          One front desk. <span className="text-brand-purple">Less than a no-show.</span>
        </h2>
        
        <p className="text-gray-600 text-sm sm:text-base max-w-2xl mx-auto">
          14-day free trial, no credit card. Conversations are never capped on any plan — you only upgrade when you want the fully white-labelled.
        </p>

        {/* Pricing Comparison Anchor Info Tag */}
        <div className="pt-2">
          <span className="inline-flex items-center space-x-1.5 px-4.5 py-2 rounded-full bg-purple-50 border border-purple-100 text-[11px] sm:text-xs font-bold text-brand-purple font-sans shadow-2xs">
            <ShieldCheck size={14} className="text-purple-600 shrink-0" />
            <span>Under Peerlogic ($399/mo) and Viva AI ($349/mo)</span>
          </span>
        </div>
      </div>

      {/* Pricing Cards Container */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto items-stretch pt-6">
        {plans.map((plan) => (
          <div
            key={plan.id}
            className={`relative rounded-3xl p-8 flex flex-col justify-between text-left transition-all duration-300 transform hover:scale-[1.01] ${
              plan.isPopular
                ? "bg-slate-900 border border-slate-800 text-white shadow-[0_24px_50px_rgba(132,78,237,0.12)]"
                : "bg-white border border-gray-100 text-gray-800 shadow-sm"
            }`}
          >
            {/* Coral Popular Badge Banner overlay */}
            {plan.isPopular && (
              <span className="absolute -top-3.5 right-6 inline-flex items-center space-x-1 px-3 py-1 bg-red-500 border border-red-400 rounded-full text-[10px] font-extrabold uppercase text-white tracking-widest leading-none shadow-xs">
                <Zap size={10} className="fill-white" />
                <span>MOST POPULAR</span>
              </span>
            )}

            <div>
              {/* Plan Brand Title */}
              <h3 className={`text-xl sm:text-2xl font-extrabold tracking-tight ${plan.isPopular ? "text-white" : "text-gray-900"}`}>
                {plan.name}
              </h3>
              
              <p className={`mt-2.5 text-xs sm:text-sm leading-relaxed ${plan.isPopular ? "text-slate-400" : "text-gray-500"}`}>
                {plan.tagline}
              </p>

              {/* Price level */}
              <div className="my-8 flex items-baseline">
                <span className={`text-4xl sm:text-5xl font-black tracking-tight ${plan.isPopular ? "text-white" : "text-gray-900"}`}>
                  {plan.price}
                </span>
                <span className={`ml-2 text-xs sm:text-sm font-semibold uppercase tracking-wider ${plan.isPopular ? "text-slate-400" : "text-gray-400"}`}>
                  / mo
                </span>
              </div>

              {/* CTA Link to Free Trial */}
              <a
                href="http://copilot.scanoengage.com/"
                target="_blank"
                rel="noopener noreferrer"
                className={`w-full py-4.5 px-6 rounded-2xl text-xs sm:text-sm font-extrabold tracking-wider transition-all duration-200 transform active:scale-98 cursor-pointer text-center block ${plan.buttonStyle}`}
              >
                START FREE TRIAL
              </a>

              {/* Feature Points comparison */}
              <ul className="mt-8 space-y-4 text-xs sm:text-sm">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start space-x-3">
                    <span className={`flex items-center justify-center w-5 h-5 rounded-full shrink-0 mt-0.5 ${
                      plan.isPopular ? "bg-slate-800 text-purple-400" : "bg-purple-50 text-brand-purple"
                    }`}>
                      <Check size={12} className="stroke-[3]" />
                    </span>
                    <span className={plan.isPopular ? "text-slate-300" : "text-gray-600"}>
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div className={`mt-8 pt-4 border-t text-[10px] font-medium font-sans text-center transition-colors ${
              plan.isPopular ? "border-slate-800 text-slate-500" : "border-gray-100 text-gray-400"
            }`}>
              Setup takes &lt;10 minutes. Cancel or change tier literally anytime.
            </div>
          </div>
        ))}
      </div>

    </section>
  );
}
