import { useQuery, useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { PostCard } from "./PostCard";
import { toast } from "sonner";

export function MyPhotos() {
  const posts = useQuery(api.posts.getMyPosts);
  const deletePost = useMutation(api.posts.deletePost);

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
        <p className="text-gray-600 text-lg">You haven't shared any photos yet.</p>
        <p className="text-gray-500">Upload your first photo to get started!</p>
      </div>
    );
  }

  const handleDelete = async (postId: string) => {
    if (confirm("Are you sure you want to delete this photo?")) {
      try {
        await deletePost({ postId: postId as any });
        toast.success("Photo deleted successfully");
      } catch (error) {
        console.error("Failed to delete post:", error);
        toast.error("Failed to delete photo");
      }
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-center mb-8">My Photos</h2>
      <div className="space-y-8">
        {posts.map((post) => (
          <PostCard
            key={post._id}
            post={post}
            onDelete={() => handleDelete(post._id)}
            showDelete={true}
          />
        ))}
      </div>
    </div>
  );
}
