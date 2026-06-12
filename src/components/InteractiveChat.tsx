import { useState, useEffect, useRef, FormEvent } from "react";
import { 
  Phone, 
  Send, 
  Mic, 
  RotateCcw, 
  MessageSquare, 
  Check, 
  Calendar, 
  Loader2, 
  Sparkles,
  Camera,
  AlertTriangle,
  Grid
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { Message } from "../types";

// Custom generated high-fidelity clinical scan snapshots
const frontalScanImg = "/src/assets/images/frontal_teeth_scan_1781249848595.jpg";
const lowerArchScanImg = "/src/assets/images/lower_arch_scan_1781249870838.jpg";
const upperArchScanImg = "/src/assets/images/upper_arch_scan_1781249889086.jpg";

export default function InteractiveChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [activeScanIndex, setActiveScanIndex] = useState<number | null>(null);
  const [scanStatus, setScanStatus] = useState<"idle" | "uploading" | "analyzing" | "completed">("idle");
  const [activeScanTab, setActiveScanTab] = useState(0);
  const [hoveredFinding, setHoveredFinding] = useState<string | null>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const timeoutsRef = useRef<number[]>([]);

  const clearAllMyTimeouts = () => {
    timeoutsRef.current.forEach(t => window.clearTimeout(t));
    timeoutsRef.current = [];
  };

  // Hardcoded default conversation replay sequence with deep vision scanning
  const startDefaultSequence = () => {
    clearAllMyTimeouts();
    setMessages([]);
    setIsTyping(false);
    setScanStatus("idle");
    setActiveScanTab(0);
    setHoveredFinding(null);
    
    // Step 1: User indicates chipped molar
    const t1 = window.setTimeout(() => {
      setMessages([
        {
          id: "user-1",
          sender: "user",
          text: "I chipped a molar last night",
          time: "1:04 PM"
        }
      ]);
    }, 500);
    timeoutsRef.current.push(t1);

    // Step 2: Copilot replies asking for photo uploads
    const t2 = window.setTimeout(() => {
      setIsTyping(true);
    }, 1800);
    timeoutsRef.current.push(t2);

    const t3 = window.setTimeout(() => {
      setIsTyping(false);
      setMessages(prev => {
        if (prev.some(m => m.id === "copilot-1")) return prev;
        return [
          ...prev,
          {
            id: "copilot-1",
            sender: "copilot",
            text: "Oh no! Chipping a molar cusp can be highly uncomfortable since it often strips away the protective enamel shield and exposes the sensitive dentin layer. This can lead to neural sensitivity or progressive fissure decay if not reinforced.\n\nTo help me evaluate the structural integrity of the tooth, could you snap a clear picture of the area on your mobile and upload it right here?",
            time: "1:04 PM"
          }
        ];
      });
    }, 3200);
    timeoutsRef.current.push(t3);

    // Step 3: User uploads the three pictures requested
    const t4 = window.setTimeout(() => {
      setIsTyping(true);
    }, 4500);
    timeoutsRef.current.push(t4);

    const t5 = window.setTimeout(() => {
      setIsTyping(false);
      setMessages(prev => {
        if (prev.some(m => m.id === "user-2")) return prev;
        return [
          ...prev,
          {
            id: "user-2",
            sender: "user",
            text: "Yes, I just captured and uploaded close-ups of my lower arch, upper arch, and front teeth. Let me know what you see.",
            time: "1:05 PM"
          }
        ];
      });
    }, 5600);
    timeoutsRef.current.push(t5);

    // Step 4: Simulate uploading and advanced vision analysis
    const t6 = window.setTimeout(() => {
      setScanStatus("uploading");
    }, 5800);
    timeoutsRef.current.push(t6);

    const t7 = window.setTimeout(() => {
      setScanStatus("analyzing");
    }, 7200);
    timeoutsRef.current.push(t7);

    const t8 = window.setTimeout(() => {
      setScanStatus("completed");
      setIsTyping(true);
    }, 8900);
    timeoutsRef.current.push(t8);

    // Step 5: Copilot delivers the diagnostic report matching the pictures
    const t9 = window.setTimeout(() => {
      setIsTyping(false);
      setMessages(prev => {
        if (prev.some(m => m.id === "copilot-2")) return prev;
        return [
          ...prev,
          {
            id: "copilot-2",
            sender: "copilot",
            text: "I have successfully processed your high-resolution snaps. Our Computer Vision engine has color-annotated several areas of clinical concern across your lower, upper, and anterior arches.\n\nExplore your interactive Diagnostic Scan Report below to evaluate each snap's bounding boxes:",
            time: "1:05 PM",
            scanResult: {
              mode: "custom_chipped_molar",
              images: [
                {
                  type: "malaligned",
                  score: 84,
                  status: "Anterior Malalignment",
                  borderColor: "border-amber-500",
                  badgeBg: "bg-amber-50 text-amber-600 border-amber-200",
                  label: "Frontal View"
                },
                {
                  type: "cavity",
                  score: 96,
                  status: "Cusp Fracture & Caries",
                  borderColor: "border-red-500",
                  badgeBg: "bg-red-50 text-red-600 border-red-200",
                  label: "Lower Arch"
                },
                {
                  type: "smokers_palate",
                  score: 92,
                  status: "Nicotinic Stomatitis",
                  borderColor: "border-purple-500",
                  badgeBg: "bg-purple-50 text-purple-600 border-purple-200",
                  label: "Upper Arch"
                }
              ]
            }
          }
        ];
      });
    }, 10500);
    timeoutsRef.current.push(t9);

    // Step 6: Booking recommended slot prompt
    const t10 = window.setTimeout(() => {
      setIsTyping(true);
    }, 12200);
    timeoutsRef.current.push(t10);

    const t11 = window.setTimeout(() => {
      setIsTyping(false);
      setMessages(prev => {
        if (prev.some(m => m.id === "copilot-3")) return prev;
        return [
          ...prev,
          {
            id: "copilot-3",
            sender: "copilot",
            text: "To shield that fractured disto-occlusal molar tooth cusp before deep decay infects your root canals, we should seal it promptly. Dr. Mehta has an opening this Thursday at 3:00 PM for a durable, pain-free digital restoration. Shall I lock in this slot for you?",
            time: "1:06 PM",
            bookingSuggestedSlot: {
              doctor: "Dr. Mehta",
              day: "Thursday",
              timeSlot: "3:00 PM",
              isBooked: false
            }
          }
        ];
      });
    }, 14000);
    timeoutsRef.current.push(t11);
  };

  useEffect(() => {
    startDefaultSequence();
    return () => clearAllMyTimeouts();
  }, []);

  // Scroll to bottom on updates (strictly within the chat container to prevent auto-scrolling the entire page)
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTo({
        top: chatContainerRef.current.scrollHeight,
        behavior: "smooth"
      });
    }
  }, [messages, isTyping]);

  const handleSendMessage = (e?: FormEvent) => {
    if (e) e.preventDefault();
    if (!inputValue.trim()) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      sender: "user",
      text: inputValue,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isCustomResponse: true
    };

    setMessages(prev => [...prev, userMsg]);
    setInputValue("");
    setIsTyping(true);

    // AI Response generation logic
    setTimeout(() => {
      setIsTyping(false);
      let replyText = "I'm glad you asked! I can coordinate with Dr. Mehta to secure your booking. Would you like me to reserve a primary check-up session for scheduling?";
      const lowerText = userMsg.text.toLowerCase();

      if (lowerText.includes("pricing") || lowerText.includes("cost") || lowerText.includes("price") || lowerText.includes("fee")) {
        replyText = "Our clinic's standard cavity filling is approximately $150 to $250 depending on depth, and typically covered up to 80% with co-pay insurance. Routine cleanings are usually 100% covered. Would you like to check Dr. Mehta's scheduling calendar for standard teeth cleaning?";
      } else if (lowerText.includes("cavity") || lowerText.includes("pain") || lowerText.includes("hurt") || lowerText.includes("tooth")) {
        replyText = "Understood. Severe tooth sensitivity or pain can signify active decay. I recommend an immediate 20-minute digital diagnostic review. Dr. Mehta has an opening this Thursday at 3:00 PM. Shall I reserve this slot for you?";
      } else if (lowerText.includes("insurance") || lowerText.includes("coverage")) {
        replyText = "Yes, we accept all major PPO insurance plans including Delta Dental, MetLife, Cigna, and Aetna. We will run an automated co-pay check before your visit. Would you like me to gather your card info to speed things up?";
      } else if (lowerText.includes("implant") || lowerText.includes("crown") || lowerText.includes("braces")) {
        replyText = "We offer premium crowns, clear aligners, and dental implant restorations in-house. Consultations are completely free of charge. I can lock in an evaluation slot on Thursday at 3:00 PM if that is convenient?";
      }

      setMessages(prev => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          sender: "copilot",
          text: replyText,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          bookingSuggestedSlot: lowerText.includes("insurance") ? undefined : {
            doctor: "Dr. Mehta",
            day: "Thursday",
            timeSlot: "3:00 PM",
            isBooked: false
          }
        }
      ]);
    }, 1500);
  };

  const executeBookSlot = (msgId: string) => {
    setMessages(prev => 
      prev.map(m => {
        if (m.id === msgId && m.bookingSuggestedSlot) {
          return {
            ...m,
            bookingSuggestedSlot: {
              ...m.bookingSuggestedSlot,
              isBooked: true
            }
          };
        }
        return m;
      })
    );

    // Follow-up message confirming the booking action
    setTimeout(() => {
      setIsTyping(true);
    }, 500);

    setTimeout(() => {
      setIsTyping(false);
      setMessages(prev => [
        ...prev,
        {
          id: Date.now().toString(),
          sender: "copilot",
          text: "Excellent! Your appointment with Dr. Mehta for Thursday at 3:00 PM is now secured. We have sent a confirmation text message to your phone. We look forward to seeing you!",
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    }, 1500);
  };

  // Mock Upload Interactive scanning experience
  const triggerMockImageScan = (index: number) => {
    setActiveScanIndex(index);
    setScanStatus("uploading");
    
    setTimeout(() => {
      setScanStatus("analyzing");
    }, 1000);

    setTimeout(() => {
      setScanStatus("completed");
      setActiveScanIndex(null);

      // Instantly inject a scan response inside messages
      const customScanLabels = [
        { label: "94% Cavity", type: "cavity", text: "Alert: Large lesion on posterior lower molar (94% confidence). Decisive treatment is vital to avoid root canal." },
        { label: "87% Calculus", type: "calculus", text: "Warning: Heavy mineral build-up below gum line (87% confidence). Prophylaxis scale cleaning recommended." },
        { label: "Healthy Enamel", type: "healthy", text: "Perfect: Clean surface density. Tooth enamel and root fibers look exceptionally robust (98% confidence)." }
      ];

      const chosenScan = customScanLabels[index];

      setMessages(prev => [
        ...prev,
        {
          id: Date.now().toString(),
          sender: "copilot",
          text: `Direct X-ray Upload Scan Completed! Finding details: ${chosenScan.text}`,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          scanResult: {
            images: [
              {
                type: chosenScan.type as any,
                score: index === 0 ? 94 : index === 1 ? 87 : 98,
                status: index === 0 ? "Cavity" : index === 1 ? "Calculus" : "Healthy",
                borderColor: index === 0 ? "border-red-500" : index === 1 ? "border-yellow-500" : "border-green-500",
                badgeBg: index === 0 ? "bg-red-50 text-red-600" : index === 1 ? "bg-yellow-50 text-yellow-600" : "bg-green-50 text-green-600",
                label: chosenScan.label
              }
            ]
          },
          bookingSuggestedSlot: {
            doctor: "Dr. Mehta",
            day: "Thursday",
            timeSlot: "3:00 PM",
            isBooked: false
          }
        }
      ]);
    }, 2500);
  };

  return (
    <div className="w-full flex flex-col md:flex-row gap-8 lg:gap-14 items-center">
      
      {/* Left side: Informative Content */}
      <div className="w-full md:w-1/2 flex flex-col space-y-6 text-left">
        <div className="flex items-center space-x-2">
          <div className="h-[2px] w-8 bg-brand-purple"></div>
          <span className="text-xs font-bold text-brand-purple uppercase tracking-widest font-mono">SEE IT WORK</span>
        </div>

        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 tracking-tight leading-tight">
          Your patient's oral health, <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-purple to-purple-600">analyzed inside the chat.</span>
        </h2>

        <p className="text-gray-600 text-base sm:text-lg leading-relaxed">
          No forms. No waiting for a callback. Copilot answers, runs an AI scan right in the chat, and lands the appointment — while the patient is still on your site.
        </p>

        {/* Feature Checkpoints */}
        <div className="flex flex-col space-y-4">
          <div className="flex items-start space-x-3.5">
            <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-purple-50 text-brand-purple shrink-0 mt-0.5 border border-purple-100">
              <MessageSquare size={18} />
            </div>
            <div>
              <p className="font-semibold text-gray-900 text-sm sm:text-base">Answers grounded only in your clinic's knowledge</p>
              <p className="text-xs sm:text-sm text-gray-500 mt-0.5">Locks response guidelines so bot never hallucinate clinic prices or hours.</p>
            </div>
          </div>

          <div className="flex items-start space-x-3.5">
            <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-purple-50 text-brand-purple shrink-0 mt-0.5 border border-purple-100">
              <Camera size={18} />
            </div>
            <div>
              <p className="font-semibold text-gray-900 text-sm sm:text-base">Preliminary AI scan captured</p>
              <p className="text-xs sm:text-sm text-gray-500 mt-0.5">Allows patient to snap a photo on phone camera or drag a panoramic picture.</p>
            </div>
          </div>

          <div className="flex items-start space-x-3.5">
            <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-purple-50 text-brand-purple shrink-0 mt-0.5 border border-purple-100">
              <Calendar size={18} />
            </div>
            <div>
              <p className="font-semibold text-gray-900 text-sm sm:text-base">Books the slot before the patient clicks away</p>
              <p className="text-xs sm:text-sm text-gray-500 mt-0.5">Two-way integrations with dental practice management systems for sync.</p>
            </div>
          </div>
        </div>

        {/* Replay controller button */}
        <div className="pt-2">
          <button
            onClick={startDefaultSequence}
            className="inline-flex items-center space-x-2 text-xs sm:text-sm font-bold text-[#844EED] hover:text-brand-purple-dark transition-all duration-200 cursor-pointer border-b-2 border-brand-purple-light hover:border-[#844EED] pb-1"
          >
            <RotateCcw size={14} className="animate-spin-once" />
            <span className="uppercase tracking-widest font-sans">REPLAY THE CONVERSATION</span>
          </button>
        </div>
      </div>

      {/* Right side: Interactive Simulated Chat widget */}
      <div className="w-full md:w-1/2 flex justify-center">
        <div className="relative w-full max-w-[440px] h-[580px] rounded-3xl bg-white border border-gray-100 shadow-[0_20px_50px_rgba(132,78,237,0.06)] flex flex-col overflow-hidden">
          
          {/* Chat Header Widget */}
          <div className="bg-[#FAF9FF] border-b border-gray-100 p-4 shrink-0 flex justify-between items-center">
            <div className="flex items-center space-x-3">
              {/* Glowing smart avatar */}
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-brand-purple to-purple-500 flex items-center justify-center text-white text-base shadow-inner">
                  <Sparkles size={18} className="animate-bounce-slow" />
                </div>
                <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-green-500 border-2 border-white"></span>
              </div>
              <div className="text-left">
                <h4 className="font-bold text-gray-900 text-sm tracking-tight leading-none">scanO Copilot</h4>
                <p className="text-[10px] text-gray-500 mt-1 flex items-center">
                  <span className="w-1.5 h-1.5 bg-green-500 rounded-full inline-block mr-1"></span>
                  Online • replies instantly
                </p>
              </div>
            </div>
            
            {/* Call Action inside header */}
            <button 
              onClick={() => alert("Simulating HIPAA-compliant audio call with clinic front desk...")}
              className="p-2 h-9 w-9 rounded-full bg-white border border-gray-200 text-gray-600 hover:text-brand-purple hover:border-brand-purple/20 transition-all cursor-pointer flex items-center justify-center shadow-xs"
            >
              <Phone size={14} />
            </button>
          </div>

          {/* Chat Messages Scrolling feed */}
          <div ref={chatContainerRef} className="flex-1 overflow-y-auto p-4 space-y-4 bg-[#FCFCFD]">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${msg.sender === "user" ? "items-end" : "items-start"}`}
              >
                {/* Text Bubble */}
                <div
                  className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                    msg.sender === "user"
                      ? "bg-brand-purple text-white rounded-br-none"
                      : "bg-[#F3F1FF] text-gray-800 rounded-bl-none border border-purple-50"
                  }`}
                >
                  <p>{msg.text}</p>
                </div>

                {/* Optional Interactive X-Ray Scanning Finding Cards */}
                {msg.scanResult && (
                  msg.scanResult.mode === "custom_chipped_molar" ? (
                    <div className="w-full mt-3">
                      <div className="bg-slate-950 text-white border border-slate-800 rounded-2xl p-3 shadow-md space-y-3">
                        {/* Header metadata */}
                        <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                          <span className="text-[10px] font-extrabold font-mono tracking-wider text-purple-400 flex items-center gap-1 select-none">
                            <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse"></span>
                            DIAGNOSTIC SCAN REPORT
                          </span>
                          <span className="text-[9px] text-slate-400 font-mono">HIPAA ENCRYPTED • scanO AI v2.4</span>
                        </div>

                        {/* Top Navigation Tabs */}
                        <div className="flex p-0.5 bg-slate-900 rounded-lg border border-slate-800">
                          {["Frontal Snap", "Lower Arch (Injury)", "Upper Arch"].map((tabLabel, idx) => (
                            <button
                              key={idx}
                              type="button"
                              onClick={() => {
                                setActiveScanTab(idx);
                                setHoveredFinding(null);
                              }}
                              className={`flex-1 text-center py-1.5 rounded-md text-[10px] font-bold transition-all ${
                                activeScanTab === idx
                                  ? "bg-brand-purple text-white shadow-xs"
                                  : "text-slate-400 hover:text-slate-200"
                              }`}
                            >
                              {tabLabel}
                            </button>
                          ))}
                        </div>

                        {/* Visual Scanning Canvas showing tooth structures */}
                        <div className="relative h-44 bg-slate-900 rounded-xl overflow-hidden border border-slate-800 flex items-center justify-center">
                          {/* Inner Scan Grid lines */}
                          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:12px_12px] opacity-60"></div>

                          {/* Render dental views */}
                          {activeScanTab === 0 && (
                            /* Frontal View */
                            <div className="relative w-full h-full flex flex-col justify-center items-center">
                              {/* Clinical photograph background */}
                              <img 
                                src={frontalScanImg} 
                                alt="Frontal Dental scan" 
                                className="absolute inset-0 w-full h-full object-cover opacity-75"
                                referrerPolicy="no-referrer"
                              />
                              
                              {/* Subtle scan target lines overlay */}
                              <div className="absolute inset-0 pointer-events-none border border-brand-purple/20 rounded-xl m-1"></div>

                              {/* Bounding box 1: Stains */}
                              <div 
                                onMouseEnter={() => setHoveredFinding("stains")}
                                onClick={() => setHoveredFinding("stains")}
                                className={`absolute top-[28%] left-[38%] w-[14%] h-[14%] border border-red-500 rounded-sm cursor-pointer transition-all duration-200 ${
                                  hoveredFinding === "stains" ? "bg-red-500/20 shadow-[0_0_12px_rgba(239,68,68,0.5)] scale-105" : "bg-red-500/5"
                                }`}
                              >
                                <span className="absolute -top-3.5 left-0 bg-red-500 text-white text-[7px] font-extrabold px-1 py-0.5 rounded-xs leading-none">stains</span>
                              </div>

                              {/* Bounding box 2: Malaligned bottom */}
                              <div 
                                onMouseEnter={() => setHoveredFinding("frontal_malaligned")}
                                onClick={() => setHoveredFinding("frontal_malaligned")}
                                className={`absolute bottom-[16%] left-[35%] w-[32%] h-[20%] border border-amber-500 rounded-sm cursor-pointer transition-all duration-200 ${
                                  hoveredFinding === "frontal_malaligned" ? "bg-amber-500/20 shadow-[0_0_12px_rgba(245,158,11,0.5)] scale-105" : "bg-amber-500/5"
                                }`}
                              >
                                <span className="absolute -bottom-3.5 left-1/2 -translate-x-1/2 bg-amber-500 text-white text-[7px] font-extrabold px-1 py-0.5 rounded-xs leading-none whitespace-nowrap">malaligned</span>
                              </div>

                              {/* Bounding box 3: Calculus */}
                              <div 
                                onMouseEnter={() => setHoveredFinding("frontal_calculus")}
                                onClick={() => setHoveredFinding("frontal_calculus")}
                                className={`absolute top-[26%] right-[32%] w-[12%] h-[12%] border border-emerald-500 rounded-sm cursor-pointer transition-all duration-200 ${
                                  hoveredFinding === "frontal_calculus" ? "bg-emerald-500/20 shadow-[0_0_12px_rgba(16,185,129,0.5)] scale-105" : "bg-emerald-500/5"
                                }`}
                              >
                                <span className="absolute -top-3.5 right-0 bg-emerald-500 text-white text-[7px] font-extrabold px-1 py-0.5 rounded-xs leading-none">calculus</span>
                              </div>
                            </div>
                          )}

                          {activeScanTab === 1 && (
                            /* Lower Arch view */
                            <div className="relative w-full h-full flex justify-center items-center">
                              {/* Clinical photograph background */}
                              <img 
                                src={lowerArchScanImg} 
                                alt="Lower Arch Dental Scan" 
                                className="absolute inset-0 w-full h-full object-cover opacity-75"
                                referrerPolicy="no-referrer"
                              />

                              {/* Bounding box 1: Fissure caries + chipped molar */}
                              <div 
                                onMouseEnter={() => setHoveredFinding("chipped_molar")}
                                onClick={() => setHoveredFinding("chipped_molar")}
                                className={`absolute top-[22%] right-[22%] w-[18%] h-[18%] border-2 border-red-500 rounded-lg cursor-pointer transition-all duration-200 ${
                                  hoveredFinding === "chipped_molar" ? "bg-red-500/25 shadow-[0_0_15px_rgba(239,68,68,0.6)] scale-105" : "bg-red-500/5 animate-pulse"
                                }`}
                              >
                                <span className="absolute -top-3.5 right-0 bg-red-600 text-white text-[7px] font-black px-1.5 py-0.5 rounded-xs leading-none whitespace-nowrap">pit & fissure caries</span>
                              </div>

                              {/* Bounding box 2: Rotational crowding */}
                              <div 
                                onMouseEnter={() => setHoveredFinding("lower_malaligned")}
                                onClick={() => setHoveredFinding("lower_malaligned")}
                                className={`absolute bottom-[18%] left-[32%] w-[16%] h-[16%] border border-amber-500 rounded-sm cursor-pointer transition-all duration-200 ${
                                  hoveredFinding === "lower_malaligned" ? "bg-amber-500/20 shadow-[0_0_12px_rgba(245,158,11,0.5)] scale-105" : "bg-amber-500/5"
                                }`}
                              >
                                <span className="absolute -bottom-3.5 left-1/2 -translate-x-1/2 bg-amber-500 text-white text-[7px] font-extrabold px-1 py-0.5 rounded-xs leading-none">malaligned</span>
                              </div>
                            </div>
                          )}

                          {activeScanTab === 2 && (
                            /* Upper Arch view */
                            <div className="relative w-full h-full flex justify-center items-center">
                              {/* Clinical photograph background */}
                              <img 
                                src={upperArchScanImg} 
                                alt="Upper Arch Dental Scan" 
                                className="absolute inset-0 w-full h-full object-cover opacity-75"
                                referrerPolicy="no-referrer"
                              />

                              {/* Bounding box 1: Smoker's Palate */}
                              <div 
                                onMouseEnter={() => setHoveredFinding("smokers_palate")}
                                onClick={() => setHoveredFinding("smokers_palate")}
                                className={`absolute top-[38%] left-[40%] w-[18%] h-[18%] border border-purple-500 rounded-sm cursor-pointer transition-all duration-200 ${
                                  hoveredFinding === "smokers_palate" ? "bg-purple-500/20 shadow-[0_0_12px_rgba(168,85,247,0.5)] scale-105" : "bg-purple-500/5"
                                }`}
                              >
                                <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-purple-600 text-white text-[7px] font-black px-1 py-0.5 rounded-xs leading-none whitespace-nowrap">smokers palate</span>
                              </div>

                              {/* Bounding box 2: Upper incisor crowding */}
                              <div 
                                onMouseEnter={() => setHoveredFinding("upper_malaligned")}
                                onClick={() => setHoveredFinding("upper_malaligned")}
                                className={`absolute top-[18%] left-[38%] w-[14%] h-[14%] border border-amber-500 rounded-sm cursor-pointer transition-all duration-200 ${
                                  hoveredFinding === "upper_malaligned" ? "bg-amber-500/20 shadow-[0_0_12px_rgba(245,158,11,0.5)] scale-105" : "bg-amber-500/5"
                                }`}
                              >
                                <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-amber-500 text-white text-[7px] font-extrabold px-1 py-0.5 rounded-xs leading-none">malaligned</span>
                              </div>
                            </div>
                          )}

                          {/* Hover Overlay Prompter */}
                          {!hoveredFinding && (
                            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 text-[9px] text-slate-400 font-bold bg-slate-950/80 px-2 py-1 rounded-md border border-slate-800 pointer-events-none tracking-wide animate-pulse">
                              HOVER OR TAP TARGETS TO INSPECT
                            </div>
                          )}
                        </div>

                        {/* Diagnostic detail readout card */}
                        <div className="bg-slate-900 border border-slate-800 rounded-xl p-3 min-h-[88px] flex flex-col justify-center">
                          {hoveredFinding ? (
                            (() => {
                              const detailMap: Record<string, { title: string; conf: string; badge: string; text: string }> = {
                                stains: {
                                  title: "Extrinsic Chromatic Discoloration",
                                  conf: "91% Confidence Profile",
                                  badge: "bg-red-500/10 text-red-400 border border-red-500/20",
                                  text: "Surface pigment deposits detected near the cervical margin of the upper right canine. Professional dental scaling and custom prophylaxis will easily polish this away."
                                },
                                frontal_malaligned: {
                                  title: "Anterior Dental Malocclusion (Crowding)",
                                  conf: "84% Confidence Profile",
                                  badge: "bg-amber-500/10 text-amber-400 border border-amber-500/20",
                                  text: "Moderate rotational crowding found on lower primary incisors. Restricts standard floss access path, which can aggravate interproximal calculus build-up."
                                },
                                frontal_calculus: {
                                  title: "Calcified Supra-gingival Calculus Deposits",
                                  conf: "87% Confidence Profile",
                                  badge: "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20",
                                  text: "Highly mineralized tartar deposits on the outer upper left molars. Ultrasonic scaling and deep root debridement are indicated to maintain index score health."
                                },
                                chipped_molar: {
                                  title: "Mechanical Coronal Fracture & Occlusal Caries",
                                  conf: "98% Confidence Profile",
                                  badge: "bg-red-500/15 text-red-500 border border-red-500/30 animate-pulse font-black",
                                  text: "A clear mechanical crown crack and cusp structure compromise on the lower right molar disto-occlusal plane, accompanied by active deep-fissure caries. Restoring immediately with a resin composite build-up or inlay will insulate the dental chamber and block root decay."
                                },
                                lower_malaligned: {
                                  title: "Lower Mandibular Overlap (Class I)",
                                  conf: "89% Confidence Profile",
                                  badge: "bg-amber-500/10 text-amber-400 border border-amber-500/20",
                                  text: "Slight overlap on the lower anterior group. Advised to receive dental cleanings biannually to avoid local calculus plaque accretion."
                                },
                                smokers_palate: {
                                  title: "Nicotinic Stomatitis (Keratotic Soft Tissue)",
                                  conf: "92% Confidence Profile",
                                  badge: "bg-purple-500/10 text-purple-400 border border-purple-500/20",
                                  text: "Keratotic mucosal changes and minor papular inflammation on the hard palate from thermal or smoke exposure. Advised to monitor and provide lifestyle checks."
                                },
                                upper_malaligned: {
                                  title: "Upper Maxillary Lateral Incisor Rotation",
                                  conf: "85% Confidence Profile",
                                  badge: "bg-amber-500/10 text-amber-400 border border-amber-500/20",
                                  text: "Lateral incisors show slight rotation pointing palatomesially. Occlusion is functionally balanced, requiring simple periodic observation."
                                }
                              };
                              const item = detailMap[hoveredFinding] || { title: "Clinical Detail", conf: "", badge: "", text: "" };
                              return (
                                <div className="space-y-1 text-left">
                                  <div className="flex items-center gap-2">
                                    <h5 className="text-xs font-bold text-white tracking-tight">{item.title}</h5>
                                    <span className={`text-[8px] font-bold px-1.5 py-0.5 rounded-sm shrink-0 ${item.badge}`}>{item.conf}</span>
                                  </div>
                                  <p className="text-[10px] text-slate-300 leading-normal">{item.text}</p>
                                </div>
                              );
                            })()
                          ) : (
                            <div className="text-left text-slate-400 space-y-1">
                              <h5 className="text-xs font-bold text-white flex items-center gap-1 select-none">
                                <Sparkles size={11} className="text-brand-purple" />
                                {activeScanTab === 0 && "Frontal Diagnostics Summary"}
                                {activeScanTab === 1 && "Lower Arch Diagnostics Summary (Critical!)"}
                                {activeScanTab === 2 && "Upper Arch Diagnostics Summary"}
                              </h5>
                              <p className="text-[10px] leading-relaxed">
                                {activeScanTab === 0 && "Click or hover targets representing stains, crowded incisors, and localized calculus to review instant clinical details."}
                                {activeScanTab === 1 && "Critical focus: Hover/tap the red target over the back molar to inspect the disto-occlusal structural fracture and caries details."}
                                {activeScanTab === 2 && "Click or hover targets over the palate representing smoker's stomatitis and upper crowding to inspect soft-tissue health."}
                              </p>
                            </div>
                          )}
                        </div>

                        {/* Footer info text */}
                        <div className="text-center text-[8px] text-slate-500 font-mono border-t border-slate-900 pt-2 flex justify-between select-none">
                          <span>scanO Deep Diagnostic Engine</span>
                          <span>AI results are indicators only</span>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="w-full mt-3">
                      <div className="bg-white border border-purple-100 rounded-2xl p-3 shadow-xs space-y-2.5">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-bold font-mono tracking-wider text-purple-700 uppercase">AI SCAN • 3 FINDINGS</span>
                          <span className="text-[9px] text-gray-400 font-mono">100% HIPAA protected</span>
                        </div>

                        {/* 3 cards with drag/drop layout matching layout */}
                        <div className="grid grid-cols-3 gap-2">
                          {msg.scanResult.images.map((img, idx) => (
                            <div
                              key={idx}
                              onClick={() => triggerMockImageScan(idx)}
                              className={`relative border-2 border-dashed rounded-xl p-2 cursor-pointer flex flex-col items-center justify-center text-center transition-all duration-200 ${
                                activeScanIndex === idx 
                                  ? "border-brand-purple bg-purple-50" 
                                  : `${img.borderColor} hover:bg-gray-50 bg-[#FBFBFC]`
                              }`}
                            >
                              {/* Tooth Blueprint Drawing */}
                              <div className="w-7 h-7 flex items-center justify-center bg-white rounded-md border border-gray-100 mb-1">
                                {idx === 0 ? (
                                  <span className="text-red-500 font-bold text-xs">🦷</span>
                                ) : idx === 1 ? (
                                  <span className="text-yellow-600 font-bold text-xs">🦷</span>
                                ) : (
                                  <span className="text-green-500 font-bold text-xs">🦷</span>
                                )}
                              </div>
                              
                              <span className="text-[9px] font-extrabold text-gray-900 block truncate w-full">{img.label}</span>
                              <span className="text-[8px] font-sans text-gray-500 block truncate">Tap Scan</span>
                            </div>
                          ))}
                        </div>

                        {/* Dotted Caption footer */}
                        <div className="border-t border-dashed border-gray-100 pt-1.5 flex items-center justify-between text-[8px] sm:text-[9px] text-gray-400 font-mono">
                          <span>captured → Engage</span>
                          <span>preliminary, not a diagnosis</span>
                        </div>
                      </div>
                    </div>
                  )
                )}

                {/* Optional Dynamic Schedule / Appointment Booking Action Card */}
                {msg.bookingSuggestedSlot && (
                  <div className="w-full max-w-[85%] mt-2">
                    {msg.bookingSuggestedSlot.isBooked ? (
                      <div className="bg-emerald-50 border border-emerald-100 text-emerald-800 rounded-xl p-3 text-xs font-semibold flex items-center space-x-2">
                        <div className="w-5 h-5 bg-emerald-500 rounded-full flex items-center justify-center text-white">
                          <Check size={12} />
                        </div>
                        <span>Booked Thursday, 3:00 PM!</span>
                      </div>
                    ) : (
                      <button
                        onClick={() => executeBookSlot(msg.id)}
                        className="w-full bg-brand-purple hover:bg-brand-hover text-white flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs sm:text-sm font-bold shadow-[0_4px_12px_rgba(132,78,237,0.2)] transition-all hover:scale-[1.01] active:opacity-90 cursor-pointer"
                      >
                        <Calendar size={14} />
                        <span>Book {msg.bookingSuggestedSlot.day}, {msg.bookingSuggestedSlot.timeSlot}</span>
                      </button>
                    )}
                  </div>
                )}

                <span className="text-[9px] text-gray-400 mt-1 px-1 font-mono">{msg.time}</span>
              </div>
            ))}

            {/* Simulated Typist indicator */}
            {isTyping && (
              <div className="flex flex-col items-start">
                <div className="bg-[#F3F1FF] text-gray-800 rounded-2xl rounded-bl-none px-4 py-3 text-sm flex items-center space-x-1.5">
                  <Loader2 size={14} className="animate-spin text-brand-purple" />
                  <span className="text-xs text-gray-500 font-mono">Copilot thinking...</span>
                </div>
              </div>
            )}

            {/* Custom file analysis state */}
            {scanStatus !== "idle" && scanStatus !== "completed" && (
              <div className="p-3 rounded-xl border border-dashed border-brand-purple bg-purple-50 flex items-center justify-between">
                <span className="text-xs font-mono text-brand-purple font-medium flex items-center space-x-2">
                  <Loader2 size={12} className="animate-spin" />
                  <span>{scanStatus === "uploading" ? "Receiving dental snaps..." : "Analyzing tooth structures..."}</span>
                </span>
                <span className="text-[10px] text-gray-400">10ms lag</span>
              </div>
            )}

            <div ref={bottomRef} />
          </div>

          {/* Interactive Chat bottom controls */}
          <form onSubmit={handleSendMessage} className="p-3 border-t border-gray-100 bg-white flex items-center space-x-2 shrink-0">
            {/* Quick action helper buttons */}
            <div className="relative flex-1 flex items-center">
              <input
                type="text"
                placeholder="Ask about treatments, pricing, hours..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className="w-full bg-gray-50 border border-gray-200 rounded-full pl-4 pr-10 py-2.5 text-xs sm:text-sm outline-hidden focus:border-brand-purple/50 focus:bg-white transition-all text-gray-800"
              />
              <button
                type="button"
                onClick={() => {
                  setInputValue("How much is a tooth filling? Do you take insurance?");
                  alert("Pre-filled query! Press send (arrow icon) to test.");
                }}
                className="absolute right-3.5 text-gray-400 hover:text-brand-purple"
                title="Microphone Simulation"
              >
                <Mic size={14} />
              </button>
            </div>
            
            <button
              type="submit"
              className="p-2.5 bg-brand-purple text-white rounded-full hover:bg-brand-hover tracking-wider transition-all hover:scale-[1.05] cursor-pointer flex items-center justify-center shadow-sm shrink-0"
            >
              <Send size={14} />
            </button>
          </form>

        </div>
      </div>

    </div>
  );
}
