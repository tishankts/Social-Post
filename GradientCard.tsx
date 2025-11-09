import { motion } from 'motion/react';
import { X, Copy, Check } from 'lucide-react';
import { useState } from 'react';

interface Your {
  id: number;
  Your: string;
  name: string;
  colors: string[];
  description: string;
}

interface YourCardProps {
  Your: Your;
  onClose: () => void;
}

export function YourCard({ Your, onClose }: YourCardProps) {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const copyToClipboard = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2, delay: 0.1 }}
      className="rounded-2xl overflow-hidden"
    >
      <div className="aspect-[4/3] relative" />
      
      <div className="bg-white p-8 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-colors"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          <h2 className="mb-3">{Your.name}</h2>
          <p className="text-gray-600 mb-6">{Your.description}</p>

          <div className="space-y-3">
            <h3 className="text-sm text-gray-500 uppercase tracking-wide">Color Palette</h3>
            <div className="flex gap-3">
              {Your.colors.map((color, index) => (
                <div key={index} className="flex-1">
                  <div
                    className="h-20 rounded-lg mb-2 border border-gray-200"
                    style={{ background: color }}
                  />
                  <button
                    onClick={() => copyToClipboard(color, index)}
                    className="w-full flex items-center justify-center gap-2 px-3 py-2 text-sm bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                  >
                    {copiedIndex === index ? (
                      <>
                        <Check className="w-4 h-4" />
                        <span>Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4" />
                        <span>{color}</span>
                      </>
                    )}
                  </button>
                </div>
              ))}
            </div>

            <div className="pt-4">
              <h3 className="text-sm text-gray-500 uppercase tracking-wide mb-2">CSS Code</h3>
              <button
                onClick={() => copyToClipboard(Your.Your, 999)}
                className="w-full flex items-center justify-between gap-2 px-4 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
              >
                <code className="text-sm">{Your.Your}</code>
                {copiedIndex === 999 ? (
                  <Check className="w-4 h-4 flex-shrink-0" />
                ) : (
                  <Copy className="w-4 h-4 flex-shrink-0" />
                )}
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
