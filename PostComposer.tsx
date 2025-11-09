import { useState, useRef } from 'react';
import { ImageIcon, Smile, X } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { motion, AnimatePresence } from 'motion/react';

interface PostComposerProps {
  onPost: (content: string, imageUrl?: string) => void;
}

export function PostComposer({ onPost }: PostComposerProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [postContent, setPostContent] = useState('');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
        setIsExpanded(true);
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePost = () => {
    if (postContent.trim() || selectedImage) {
      onPost(postContent, selectedImage || undefined);
      setPostContent('');
      setSelectedImage(null);
      setIsExpanded(false);
    }
  };

  const handleCancel = () => {
    setIsExpanded(false);
    setPostContent('');
    setSelectedImage(null);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-4">
      <div className="flex gap-3 mb-3">
        <Avatar className="w-10 h-10">
          <AvatarImage src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&h=150&fit=crop" />
          <AvatarFallback>You</AvatarFallback>
        </Avatar>
        
        {!isExpanded ? (
          <button 
            onClick={() => setIsExpanded(true)}
            className="flex-1 text-left px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-full text-gray-500 transition-colors"
          >
            What's on your mind?
          </button>
        ) : (
          <textarea
            autoFocus
            value={postContent}
            onChange={(e) => setPostContent(e.target.value)}
            placeholder="What's on your mind?"
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            rows={3}
          />
        )}
      </div>

      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mb-3 relative"
          >
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-2 right-2 p-1.5 bg-gray-900/70 hover:bg-gray-900 rounded-full text-white z-10"
            >
              <X className="w-4 h-4" />
            </button>
            <img
              src={selectedImage}
              alt="Selected"
              className="w-full rounded-lg max-h-96 object-cover"
            />
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="border-t pt-3 overflow-hidden"
          >
            <div className="flex items-center justify-between">
              <div className="flex gap-2">
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleImageSelect}
                  accept="image/*"
                  className="hidden"
                />
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="flex items-center gap-2 px-3 py-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <ImageIcon className="w-5 h-5 text-green-600" />
                  <span className="text-gray-600 text-sm">Photo</span>
                </button>
                <button className="flex items-center gap-2 px-3 py-2 hover:bg-gray-100 rounded-lg transition-colors">
                  <Smile className="w-5 h-5 text-yellow-600" />
                  <span className="text-gray-600 text-sm">Feeling</span>
                </button>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={handleCancel}
                  className="px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handlePost}
                  disabled={!postContent.trim() && !selectedImage}
                  className="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
                >
                  Post
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {!isExpanded && (
        <div className="border-t pt-3 flex items-center justify-around">
          <button
            onClick={() => {
              fileInputRef.current?.click();
            }}
            className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 rounded-lg transition-colors flex-1 justify-center"
          >
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleImageSelect}
              accept="image/*"
              className="hidden"
            />
            <ImageIcon className="w-5 h-5 text-green-600" />
            <span className="text-gray-600 text-sm">Photo</span>
          </button>
          <button className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 rounded-lg transition-colors flex-1 justify-center">
            <Smile className="w-5 h-5 text-yellow-600" />
            <span className="text-gray-600 text-sm">Feeling</span>
          </button>
        </div>
      )}
    </div>
  );
}
