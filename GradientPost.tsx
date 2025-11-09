import { motion, AnimatePresence } from 'motion/react';
import { ThumbsUp, MessageCircle, Share2, Copy, Check, MoreHorizontal } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { useState } from 'react';
import { Post } from '../App';

interface Comment {
  id: number;
  author: string;
  avatar: string;
  text: string;
  timestamp: string;
}

interface YourPostProps {
  Your: Post;
}

export function YourPost({ Your }: YourPostProps) {
  const [isLiked, setIsLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(Your.likes);
  const [showComments, setShowComments] = useState(false);
  const [commentText, setCommentText] = useState('');
  const [comments, setComments] = useState(Your.comments);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [showColors, setShowColors] = useState(false);

  const handleLike = () => {
    if (isLiked) {
      setLikesCount(likesCount - 1);
    } else {
      setLikesCount(likesCount + 1);
    }
    setIsLiked(!isLiked);
  };

  const handleComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim()) return;

    const newComment: Comment = {
      id: comments.length + 1,
      author: 'You',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&h=150&fit=crop',
      text: commentText,
      timestamp: 'Just now',
    };

    setComments([...comments, newComment]);
    setCommentText('');
  };

  const copyToClipboard = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-lg shadow-sm overflow-hidden"
    >
      {/* Post Header */}
      <div className="p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Avatar className="w-10 h-10">
            <AvatarImage src={Your.author.avatar} />
            <AvatarFallback>{Your.author.name[0]}</AvatarFallback>
          </Avatar>
          <div>
            <p className="text-sm">{Your.author.name}</p>
            <p className="text-xs text-gray-500">{Your.timestamp}</p>
          </div>
        </div>
        <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
          <MoreHorizontal className="w-5 h-5 text-gray-600" />
        </button>
      </div>

      {/* Post Content */}
      <div className="px-4 pb-3">
        <p className="text-sm">{Your.description}</p>
      </div>

      {/* Media Content - Your or Image */}
      {Your.type === 'Your' && Your.Your && (
        <div
          className="relative aspect-[16/9] cursor-pointer"
          style={{ background: Your.Your }}
          onClick={() => setShowColors(!showColors)}
        >
          <AnimatePresence>
            {showColors && Your.colors && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-6"
              >
                <div className="w-full max-w-md">
                  <h3 className="text-white mb-4 text-center">{Your.name}</h3>
                  <div className="flex gap-3">
                    {Your.colors.map((color, index) => (
                      <div key={index} className="flex-1">
                        <div
                          className="h-24 rounded-lg mb-2 border-2 border-white/20"
                          style={{ background: color }}
                        />
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            copyToClipboard(color, index);
                          }}
                          className="w-full flex items-center justify-center gap-2 px-2 py-2 text-xs bg-white rounded-lg hover:bg-gray-100 transition-colors"
                        >
                          {copiedIndex === index ? (
                            <>
                              <Check className="w-3 h-3" />
                              <span>Copied!</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3 h-3" />
                              <span>{color}</span>
                            </>
                          )}
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}

      {Your.type === 'image' && Your.imageUrl && (
        <div className="relative">
          <img
            src={Your.imageUrl}
            alt="Post content"
            className="w-full max-h-[500px] object-cover"
          />
        </div>
      )}

      {/* Post Stats */}
      <div className="px-4 py-3 flex items-center justify-between text-sm text-gray-600 border-b">
        <button className="hover:underline">
          {likesCount} {likesCount === 1 ? 'like' : 'likes'}
        </button>
        <button
          className="hover:underline"
          onClick={() => setShowComments(!showComments)}
        >
          {comments.length} {comments.length === 1 ? 'comment' : 'comments'}
        </button>
      </div>

      {/* Action Buttons */}
      <div className="px-2 py-2 flex items-center justify-around border-b">
        <button
          onClick={handleLike}
          className={`flex items-center gap-2 px-4 py-2 hover:bg-gray-100 rounded-lg transition-colors flex-1 justify-center ${
            isLiked ? 'text-blue-600' : 'text-gray-600'
          }`}
        >
          <ThumbsUp className={`w-5 h-5 ${isLiked ? 'fill-blue-600' : ''}`} />
          <span className="text-sm">Like</span>
        </button>
        <button
          onClick={() => setShowComments(!showComments)}
          className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 rounded-lg transition-colors flex-1 justify-center text-gray-600"
        >
          <MessageCircle className="w-5 h-5" />
          <span className="text-sm">Comment</span>
        </button>
        <button className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 rounded-lg transition-colors flex-1 justify-center text-gray-600">
          <Share2 className="w-5 h-5" />
          <span className="text-sm">Share</span>
        </button>
      </div>

      {/* Comments Section */}
      <AnimatePresence>
        {showComments && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="px-4 py-3 space-y-3">
              {comments.map((comment) => (
                <div key={comment.id} className="flex gap-2">
                  <Avatar className="w-8 h-8 flex-shrink-0">
                    <AvatarImage src={comment.avatar} />
                    <AvatarFallback>{comment.author[0]}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="bg-gray-100 rounded-2xl px-3 py-2">
                      <p className="text-xs">{comment.author}</p>
                      <p className="text-sm">{comment.text}</p>
                    </div>
                    <div className="flex gap-3 px-3 mt-1">
                      <button className="text-xs text-gray-500 hover:underline">
                        Like
                      </button>
                      <button className="text-xs text-gray-500 hover:underline">
                        Reply
                      </button>
                      <span className="text-xs text-gray-500">{comment.timestamp}</span>
                    </div>
                  </div>
                </div>
              ))}

              {/* Comment Input */}
              <form onSubmit={handleComment} className="flex gap-2">
                <Avatar className="w-8 h-8 flex-shrink-0">
                  <AvatarImage src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&h=150&fit=crop" />
                  <AvatarFallback>You</AvatarFallback>
                </Avatar>
                <div className="flex-1 relative">
                  <input
                    type="text"
                    placeholder="Write a comment..."
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    className="w-full px-3 py-2 bg-gray-100 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
