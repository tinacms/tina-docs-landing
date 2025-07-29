import { Check, Copy } from "lucide-react";
import { useState } from "react";

export const CodeButton = ({ label }: { label: string }) => {
    const [copied, setCopied] = useState(false);
  
    const handleCopy = async () => {
      try {
        await navigator.clipboard.writeText(label);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (err) {
        console.error("Failed to copy text: ", err);
      }
    };
  
    return (
      <button
        onClick={handleCopy}
        className="inline-flex items-center justify-between gap-2 h-9 px-4 border border-white/20 rounded-md bg-transparent text-white font-mono text-sm hover:bg-white/5 transition-all duration-200 ease-in-out hover:cursor-pointer"
      >
        <span className="transition-all duration-200">{label}</span>
        <div className="relative w-4 h-4 flex-shrink-0">
          <Copy
            className={`absolute inset-0 w-4 h-4 transition-all duration-200 ease-in-out ${
              copied ? "opacity-0 scale-75" : "opacity-100 scale-100"
            }`}
          />
          <Check
            className={`absolute inset-0 w-4 h-4 text-green-400 transition-all duration-200 ease-in-out ${
              copied ? "opacity-100 scale-100" : "opacity-0 scale-75"
            }`}
          />
        </div>
      </button>
    );
  };