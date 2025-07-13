import Image from 'next/image';
import Link from 'next/link';

interface PostCardProps {
  post: {
    id: number;
    user: {
      username: string;
      avatarUrl: string;
    };
    imageUrl: string;
    caption: string;
    likes: number;
    comments: number;
    createdAt: string;
  };
}

export default function PostCard({ post }: PostCardProps) {
  return (
    <div className="bg-white rounded-lg shadow mb-6">
      {/* Header */}
      <div className="flex items-center p-4">
        <div className="relative w-8 h-8 mr-3">
          <Image
            src={`${post.user.avatarUrl}?random=${post.id}`}
            alt={post.user.username}
            fill
            className="rounded-full object-cover"
          />
        </div>
        <Link
          href={`/profile/${post.user.username}`}
          className="hover:underline text-gray-800 font-regular"
        >
          {post.user.username}
        </Link>
      </div>

      {/* Image */}
      <div className="relative aspect-square">
        <Image
          src={`${post.imageUrl}?random=${post.id}`}
          alt="Post image"
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Actions */}
      <div className="p-4">
        <div className="flex gap-4 mb-2">
          <button className="hover:text-gray-800 text-gray-400 cursor-pointer">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
          </button>
          <button className="hover:text-gray-800 text-gray-400 cursor-pointer">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
              />
            </svg>
          </button>
        </div>

        {/* Likes count */}
        <p className="font-bold mb-2 text-gray-500">{post.likes} Me gusta</p>

        {/* Caption */}
        <p className="mb-2 text-gray-500">
          <Link
            href={`/profile/${post.user.username}`}
            className="font-bold hover:underline mr-2 text-gray-800"
          >
            {post.user.username}
          </Link>
          {post.caption}
        </p>

        {/* Comments count */}
        <Link
          href={`/post/${post.id}`}
          className="text-gray-500 text-sm hover:underline"
        >
          Ver los {post.comments} comentarios
        </Link>

        {/* Timestamp */}
        <p className="text-gray-400 text-xs mt-2">
          {new Date(post.createdAt).toLocaleDateString()}
        </p>
      </div>
    </div>
  );
}
