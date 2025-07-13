import Navbar from '@/components/Navbar';
import PostFeed from '@/components/PostFeed';
import HomepageContent from '@/components/HomepageContent';
import { createClient } from '@/supabase/server';

export default async function Home() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  const { data: posts } = await supabase.from("posts").select();

  return (
    <>
      <Navbar />
      {true ? (
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
