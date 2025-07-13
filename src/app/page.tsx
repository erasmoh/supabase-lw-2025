import PostFeed from "@/components/PostFeed";
import HomepageContent from "@/components/HomepageContent";
import { createClient } from "@/utils/supabase/server";

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

export default async function Home() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Solo cargar posts si hay un usuario autenticado
  const { data: rawPosts } = user
    ? await supabase
        .from("posts")
        .select()
    : { data: null };

  // Mapear los posts y convertir created_at a createdAt
  const posts = rawPosts
    ? rawPosts.map(post => ({
        ...post,
        createdAt: post.created_at
      })).reverse()
    : null;

  return (
    <>
      {user ? (
        <div className="pt-16 min-h-screen bg-gray-50">
          <main className="max-w-xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <PostFeed posts={posts} />
          </main>
        </div>
      ) : (
        <HomepageContent />
      )}
    </>
  );
}
