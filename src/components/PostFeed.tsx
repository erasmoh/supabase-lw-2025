import PostCard from "./PostCard";

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
    </div>
  );
}
