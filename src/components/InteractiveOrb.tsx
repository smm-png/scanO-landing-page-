import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Volume2, VolumeX } from "lucide-react";

export default function InteractiveOrb() {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isAudioEnabled, setIsAudioEnabled] = useState(true);
  const [displayText, setDisplayText] = useState("TAP ORB TO SPEAK");

  const phrases = [
    "Welcome to scanO Copilot! Tap to try speech recognition.",
    "Did you know? I analyze dental X-rays in 10 seconds.",
    "Let's book a routine cleaning at Dr. Mehta's practice.",
    "I triage emergency tooth pain instantly to prevent major issues."
  ];

  const speechResponses = [
    "Hello there! I'm scanO Copilot, the dental AI assistant. I converse with your patients and schedule slots instantly.",
    "That sounds perfect! Let's capture an oral scan directly inside our dental chat widget to diagnose findings.",
    "No worries at all! scanO Copilot handles HIPAA-compliant triage on autopilot and flags emergencies to your staff.",
    "I can easily integrate with Dentrix, Open Dental, or Eaglesoft behind the scenes to sync your booking calendars."
  ];

  const handleOrbClick = () => {
    if (isSpeaking) {
      // Stop speech
      window.speechSynthesis?.cancel();
      setIsSpeaking(false);
      setDisplayText("SPEECH INQUIRY CANCELLED");
      setTimeout(() => setDisplayText("TAP ORB TO SPEAK"), 1500);
      return;
    }

    setIsSpeaking(true);
    const randomIndex = Math.floor(Math.random() * speechResponses.length);
    const textToSpeak = speechResponses[randomIndex];
    setDisplayText(`" ${textToSpeak.substring(0, 50)}... "`);

    if (isAudioEnabled && window.speechSynthesis) {
      // Create synthesis utterance
      const utterance = new SpeechSynthesisUtterance(textToSpeak);
      
      // Attempt to find a warm, smooth voice if available
      const voices = window.speechSynthesis.getVoices();
      const preferredVoice = voices.find(v => 
        v.lang.startsWith("en") && (v.name.includes("Google") || v.name.includes("Natural") || v.name.includes("Samantha"))
      );
      if (preferredVoice) {
        utterance.voice = preferredVoice;
      }
      utterance.rate = 1.0;
      utterance.pitch = 1.0;

      utterance.onend = () => {
        setIsSpeaking(false);
        setDisplayText("TAP ORB TO LISTEN AGAIN");
        setTimeout(() => setDisplayText("TAP ORB TO SPEAK"), 3000);
      };

      utterance.onerror = () => {
        setIsSpeaking(false);
        setDisplayText("TAP ORB TO SPEAK");
      };

      window.speechSynthesis.speak(utterance);
    } else {
      // Fallback for no speech or sound disabled
      setTimeout(() => {
        setIsSpeaking(false);
        setDisplayText("TAP ORB TO SPEAK");
      }, 5000);
    }
  };

  // Stop talking if component unmounts
  useEffect(() => {
    return () => {
      window.speechSynthesis?.cancel();
    };
  }, []);

  return (
    <div className="flex flex-col items-center justify-center p-4">
      {/* Interactive Floating Orb Sphere */}
      <div className="relative w-72 h-72 sm:w-80 sm:h-80 flex items-center justify-center">
        
        {/* Animated Background Ring Glows */}
        <div className="absolute inset-0 rounded-full bg-brand-purple/20 blur-[50px] animate-pulse"></div>
        
        <AnimatePresence>
          {isSpeaking && (
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: [1, 1.25, 1], opacity: [0.6, 1, 0.6] }}
              exit={{ opacity: 0 }}
              transition={{ repeat: Infinity, duration: 2.2, ease: "easeInOut" }}
              className="absolute inset-0 rounded-full border border-brand-purple/40 blur-md pointer-events-none"
            />
          )}
        </AnimatePresence>

        {/* Core Orb Sphere Container */}
        <button
          onClick={handleOrbClick}
          className="relative w-60 h-60 sm:w-64 sm:h-64 rounded-full bg-radial from-brand-purple/95 via-brand-purple-dark/95 to-[#1A0A60] cursor-pointer ring-4 ring-white/10 hover:ring-brand-purple/30 transition-all duration-300 transform hover:scale-105 active:scale-95 animate-float flex items-center justify-center overflow-hidden z-10 orb-glow"
        >
          {/* Glossy Reflection overlays */}
          <div className="absolute top-4 left-6 w-16 h-12 bg-white/25 rounded-full filter blur-[2px] transform -rotate-12 pointer-events-none"></div>
          <div className="absolute top-2 left-10 w-32 h-20 bg-white/10 rounded-full filter blur-[6px] transform -rotate-12 pointer-events-none"></div>
          <div className="absolute bottom-6 right-8 w-24 h-12 bg-brand-purple-light/25 rounded-full filter blur-[8px] pointer-events-none"></div>

          {/* Animated SVG Neural Fiber lines twisting inside */}
          <svg
            className="absolute inset-0 w-full h-full opacity-70 pointer-events-none"
            viewBox="0 0 200 200"
            fill="none"
          >
            {/* Core glowing filaments */}
            <motion.path
              d="M100 20 Q120 70 80 120 T100 180"
              stroke="#FFF"
              strokeWidth="1.5"
              strokeLinecap="round"
              animate={isSpeaking ? {
                d: [
                  "M100 20 Q125 65 75 125 T100 180",
                  "M100 20 Q70 80 130 110 T100 180",
                  "M100 20 Q120 70 80 120 T100 180"
                ]
              } : {
                d: [
                  "M100 20 Q110 80 90 120 T100 180",
                  "M100 20 Q90 60 110 130 T100 180",
                  "M100 20 Q110 80 90 120 T100 180"
                ]
              }}
              transition={{ repeat: Infinity, duration: isSpeaking ? 1.5 : 4, ease: "easeInOut" }}
            />
            
            <motion.path
              d="M30 100 Q80 80 120 120 T170 100"
              stroke="rgba(216, 180, 254, 0.85)"
              strokeWidth="1.2"
              strokeLinecap="round"
              animate={isSpeaking ? {
                d: [
                  "M30 100 Q70 110 130 90 T170 100",
                  "M30 100 Q90 60 110 130 T170 100",
                  "M30 100 Q80 80 120 120 T170 100"
                ]
              } : {
                d: [
                  "M30 100 Q80 90 120 110 T170 100",
                  "M30 100 Q80 70 120 130 T170 100",
                  "M30 100 Q80 90 120 110 T170 100"
                ]
              }}
              transition={{ repeat: Infinity, duration: isSpeaking ? 1.8 : 5, ease: "easeInOut" }}
            />

            <motion.path
              d="M50 50 Q100 100 150 150"
              stroke="rgba(255, 255, 255, 0.4)"
              strokeWidth="1"
              strokeLinecap="round"
              animate={{
                d: [
                  "M50 50 Q80 110 150 150",
                  "M50 50 Q120 90 150 150",
                  "M50 50 Q100 100 150 150"
                ]
              }}
              transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
            />

            <motion.path
              d="M150 50 Q100 100 50 150"
              stroke="rgba(168, 85, 247, 0.6)"
              strokeWidth="1"
              strokeLinecap="round"
              animate={{
                d: [
                  "M150 50 Q90 110 50 150",
                  "M150 50 Q110 90 50 150",
                  "M150 50 Q100 100 50 150"
                ]
              }}
              transition={{ repeat: Infinity, duration: 7, ease: "easeInOut" }}
            />
          </svg>

          {/* Core glow light dot inside */}
          <motion.div
            animate={isSpeaking ? {
              scale: [1, 2, 1],
              opacity: [0.3, 0.8, 0.3]
            } : {
              scale: [1, 1.2, 1],
              opacity: [0.15, 0.3, 0.15]
            }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="w-10 h-10 rounded-full bg-white blur-[8px]"
          />
        </button>

        {/* Audio Mute/Unmute Indicator */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            setIsAudioEnabled(!isAudioEnabled);
            if (isSpeaking) {
              window.speechSynthesis?.cancel();
              setIsSpeaking(false);
              setDisplayText("TAP ORB TO SPEAK");
            }
          }}
          className="absolute bottom-2 right-6 p-2 rounded-full bg-white shadow-md border border-gray-100 text-gray-500 hover:text-brand-purple transition-all duration-200 z-20 cursor-pointer"
          title={isAudioEnabled ? "Mute interactive speech" : "Enable interactive speech"}
        >
          {isAudioEnabled ? <Volume2 size={16} /> : <VolumeX size={16} />}
        </button>
      </div>

      {/* Subtitles / Speech Text Visualizer */}
      <div className="mt-4 flex flex-col items-center text-center max-w-sm px-4">
        <div className="flex items-center space-x-2">
          {/* Flashing blue indicator */}
          <span className={`w-2.5 h-2.5 rounded-full bg-brand-purple ${isSpeaking ? 'animate-ping' : 'opacity-70'}`}></span>
          <span className="text-[11px] font-bold font-sans tracking-widest text-[#844EED]/80 uppercase">
            {isSpeaking ? "SPEAKING DENTAL ANSWER" : "TAP ORB TO SPEAK"}
          </span>
        </div>
        
        <p className={`mt-2 font-sans font-medium text-sm transition-all duration-300 ${isSpeaking ? 'text-gray-900 font-semibold h-12' : 'text-gray-500 h-12'}`}>
          {displayText}
        </p>
      </div>
    </div>
  );
}
