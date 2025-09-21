import { useQuery, useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { PostCard } from "./PostCard";

export function Stream() {
  const posts = useQuery(api.posts.getStream);
  const toggleLike = useMutation(api.posts.toggleLike);

  if (posts === undefined) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (posts.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600 text-lg">No photos in the stream yet.</p>
        <p className="text-gray-500">Be the first to share a photo!</p>
      </div>
    );
  }

  const handleLike = async (postId: string) => {
    try {
      await toggleLike({ postId: postId as any });
    } catch (error) {
      console.error("Failed to toggle like:", error);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-center mb-8">Photo Stream</h2>
      <div className="space-y-8">
        {posts.map((post) => (
          <PostCard
            key={post._id}
            post={post}
            onLike={() => handleLike(post._id)}
            showDelete={false}
          />
        ))}
      </div>
    </div>
  );
}
