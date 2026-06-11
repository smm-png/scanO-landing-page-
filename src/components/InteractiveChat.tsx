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

export default function InteractiveChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [activeScanIndex, setActiveScanIndex] = useState<number | null>(null);
  const [scanStatus, setScanStatus] = useState<"idle" | "uploading" | "analyzing" | "completed">("idle");
  const bottomRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const timeoutsRef = useRef<number[]>([]);

  const clearAllMyTimeouts = () => {
    timeoutsRef.current.forEach(t => window.clearTimeout(t));
    timeoutsRef.current = [];
  };

  // Hardcoded default conversation replay sequence
  const startDefaultSequence = () => {
    clearAllMyTimeouts();
    setMessages([]);
    setIsTyping(false);
    setScanStatus("completed");
    
    // Step 1: Initial welcome
    const t1 = window.setTimeout(() => {
      setMessages([
        {
          id: "1",
          sender: "copilot",
          text: "Hello! I am scanO Copilot. Please upload or drag structured X-rays or dental snapshots here for a preliminary scan, or ask me any questions about treatments, scheduling or fees.",
          time: "1:04 PM"
        }
      ]);
    }, 500);
    timeoutsRef.current.push(t1);

    // Step 2: Show scan finding cards
    const t2 = window.setTimeout(() => {
      setIsTyping(true);
    }, 1800);
    timeoutsRef.current.push(t2);

    const t3 = window.setTimeout(() => {
      setIsTyping(false);
      setMessages(prev => {
        // Prevent duplicate keys
        if (prev.some(m => m.id === "2")) return prev;
        return [
          ...prev,
          {
            id: "2",
            sender: "copilot",
            text: "I finished running the Deep Vision analysis on your uploaded dental photos. Here are the clinical findings:",
            time: "1:05 PM",
            scanResult: {
              images: [
                {
                  type: "cavity",
                  score: 94,
                  status: "Cavity Detected",
                  borderColor: "border-red-500",
                  badgeBg: "bg-red-50 text-red-600 border-red-200",
                  label: "94% Cavity"
                },
                {
                  type: "calculus",
                  score: 87,
                  status: "Moderate Calculus",
                  borderColor: "border-yellow-500",
                  badgeBg: "bg-yellow-50 text-yellow-600 border-yellow-200",
                  label: "87% Calculus"
                },
                {
                  type: "healthy",
                  score: 98,
                  status: "Healthy Molar",
                  borderColor: "border-green-500",
                  badgeBg: "bg-green-50 text-green-600 border-green-200",
                  label: "Healthy"
                }
              ]
            }
          }
        ];
      });
    }, 3200);
    timeoutsRef.current.push(t3);

    // Step 3: Copilot schedules and recommends next action
    const t4 = window.setTimeout(() => {
      setIsTyping(true);
    }, 4500);
    timeoutsRef.current.push(t4);

    const t5 = window.setTimeout(() => {
      setIsTyping(false);
      setMessages(prev => {
        // Prevent duplicate keys
        if (prev.some(m => m.id === "3")) return prev;
        return [
          ...prev,
          {
            id: "3",
            sender: "copilot",
            text: "Good news — that's early decay, not a fracture. A filling now avoids a crown later. Dr. Mehta has Thursday 3:00 PM open.",
            time: "1:05 PM",
            bookingSuggestedSlot: {
              doctor: "Dr. Mehta",
              day: "Thursday",
              timeSlot: "3:00 PM",
              isBooked: false
            }
          }
        ];
      });
    }, 6200);
    timeoutsRef.current.push(t5);
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
              <p className="font-semibold text-gray-900 text-sm sm:text-base">Preliminary AI scan captured straight into Engage</p>
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
            className="inline-flex items-center space-x-2 text-xs sm:text-sm font-bold text-[#5832FA] hover:text-brand-purple-dark transition-all duration-200 cursor-pointer border-b-2 border-brand-purple-light hover:border-[#5832FA] pb-1"
          >
            <RotateCcw size={14} className="animate-spin-once" />
            <span className="uppercase tracking-widest font-sans">REPLAY THE CONVERSATION</span>
          </button>
        </div>
      </div>

      {/* Right side: Interactive Simulated Chat widget */}
      <div className="w-full md:w-1/2 flex justify-center">
        <div className="relative w-full max-w-[440px] h-[580px] rounded-3xl bg-white border border-gray-100 shadow-[0_20px_50px_rgba(88,50,250,0.06)] flex flex-col overflow-hidden">
          
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
                        className="w-full bg-brand-purple hover:bg-brand-hover text-white flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs sm:text-sm font-bold shadow-[0_4px_12px_rgba(88,50,250,0.2)] transition-all hover:scale-[1.01] active:opacity-90 cursor-pointer"
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
