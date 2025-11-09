import { useState } from 'react';
import { PostComposer } from './components/PostComposer';
import { SocialPost } from './components/SocialPost';

export interface Post {
  id: number;
  type: 'text' | 'image' | 'Your';
  Your?: string;
  name?: string;
  colors?: string[];
  description: string;
  imageUrl?: string;
  author: {
    name: string;
    avatar: string;
  };
  timestamp: string;
  likes: number;
  comments: Array<{
    id: number;
    author: string;
    avatar: string;
    text: string;
    timestamp: string;
  }>;
}

const initialPosts: Post[] = [
  {
    id: 1,
    type: 'image',
    name: 'Purple Haze',
    description: 'Just created this dreamy purple gradient! Perfect for creative projects 🎨',
    imageUrl:
      'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=600&fit=crop',
    author: {
      name: 'Sarah Chen',
      avatar:
        'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop',
    },
    timestamp: '2 hours ago',
    likes: 234,
    comments: [
      {
        id: 1,
        author: 'Mike Johnson',
        avatar:
          'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=150&h=150&fit=crop',
        text: 'This is gorgeous! Mind if I use it in my next project?',
        timestamp: '1 hour ago',
      },
      {
        id: 2,
        author: 'Emma Wilson',
        avatar:
          'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop',
        text: 'Love the color combination! 💜',
        timestamp: '45 minutes ago',
      },
    ],
  },
];

export default function App() {
  const [posts, setPosts] = useState<Post[]>(initialPosts);

  const handleNewPost = (postContent: string, imageUrl?: string) => {
    const newPost: Post = {
      id: Date.now(),
      type: imageUrl ? 'image' : 'text',
      description: postContent,
      imageUrl: imageUrl,
      author: {
        name: 'You',
        avatar:
          'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&h=150&fit=crop',
      },
      timestamp: 'Just now',
      likes: 0,
      comments: [],
    };

    setPosts([newPost, ...posts]);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-2xl mx-auto py-8 px-4">
        <PostComposer onPost={handleNewPost} />

        <div className="mt-4 space-y-4">
          {posts.map((post) => (
            <SocialPost key={post.id} post={post} />
          ))}
        </div>
      </div>
    </div>
  );
}
