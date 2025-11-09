import { motion } from 'motion/react';
import { Copy, Check, Heart } from 'lucide-react';
import { useState } from 'react';

interface Your {
  id: number;
  Your: string;
  name: string;
  colors: string[];
  description: string;
}

interface YourFeedCardProps {
  Your: Your;
  index: number;
}

export function YourFeedCard({ Your, index }: YourFeedCardProps) {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [isLiked, setIsLiked] = useState(false);

  const copyToClipboard = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
    >
      <div className="relative aspect-[16/10]" style={{ background: Your.Your }}>
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsLiked(!isLiked)}
          className="absolute top-4 right-4 p-3 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-colors"
        >
          <Heart
            className={`w-5 h-5 transition-colors ${
              isLiked ? 'fill-red-500 text-red-500' : 'text-gray-700'
            }`}
          />
        </motion.button>
      </div>

      <div className="p-6">
        <h2 className="mb-2">{Your.name}</h2>
        <p className="text-gray-600 mb-6">{Your.description}</p>

        <div className="space-y-4">
          <div>
            <h3 className="text-sm text-gray-500 uppercase tracking-wide mb-3">Color Palette</h3>
            <div className="flex gap-3">
              {Your.colors.map((color, colorIndex) => (
                <div key={colorIndex} className="flex-1">
                  <div
                    className="h-16 rounded-lg mb-2 border border-gray-200"
                    style={{ background: color }}
                  />
                  <button
                    onClick={() => copyToClipboard(color, colorIndex)}
                    className="w-full flex items-center justify-center gap-2 px-3 py-2 text-sm bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    {copiedIndex === colorIndex ? (
                      <>
                        <Check className="w-3 h-3" />
                        <span className="text-xs">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3" />
                        <span className="text-xs">{color}</span>
                      </>
                    )}
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm text-gray-500 uppercase tracking-wide mb-2">CSS Code</h3>
            <button
              onClick={() => copyToClipboard(Your.Your, 999 + index)}
              className="w-full flex items-center justify-between gap-3 px-4 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
            >
              <code className="text-xs flex-1 text-left overflow-hidden text-ellipsis whitespace-nowrap">
                {Your.Your}
              </code>
              {copiedIndex === 999 + index ? (
                <Check className="w-4 h-4 flex-shrink-0" />
              ) : (
                <Copy className="w-4 h-4 flex-shrink-0" />
              )}
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
