'use client';
import PostCard from "./PostCard";
import { useRouter } from "next/navigation";

interface Post {
  id: number;
  username: string;
  avatarurl: string;
  imageurl: string;
  caption: string;
  likes: number;
  comments: number;
  createdAt: string;
}

export default function PostFeed({ posts }: { posts: Post[] | null }) {
  const router = useRouter();
  return (
    <div className="space-y-6">
      {posts?.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
      {posts?.length === 0 && (
        <div className="text-center">
          <p className="text-5xl mb-2">😢</p>
          <p className="text-gray-500 text-center">No hay posts disponibles </p>
        </div>
      )}
      <button
        className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-blue-500 text-white w-14 h-14 rounded-full hover:bg-blue-600 transition-colors flex items-center justify-center text-2xl font-semibold shadow-lg"
        onClick={() => router.push("/create-post")}
      >
        +
      </button>
    </div>
  );
}
