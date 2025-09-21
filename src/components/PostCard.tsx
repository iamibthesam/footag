interface PostCardProps {
  post: {
    _id: string;
    imageUrl: string | null;
    caption?: string;
    likeCount: number;
    isLiked?: boolean;
    user?: { name?: string; email?: string } | null;
    _creationTime: number;
  };
  onLike?: () => void;
  onDelete?: () => void;
  showDelete?: boolean;
}

export function PostCard({ post, onLike, onDelete, showDelete = false }: PostCardProps) {
  if (!post.imageUrl) {
    return null;
  }

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden max-w-lg mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
            <span className="text-sm font-medium text-gray-600">
              {post.user?.name?.[0] || post.user?.email?.[0] || "?"}
            </span>
          </div>
          <div>
            <p className="font-medium text-sm">
              {post.user?.name || post.user?.email || "Anonymous"}
            </p>
            <p className="text-xs text-gray-500">
              {new Date(post._creationTime).toLocaleDateString()}
            </p>
          </div>
        </div>
        {showDelete && onDelete && (
          <button
            onClick={onDelete}
            className="text-red-500 hover:text-red-700 p-1"
            title="Delete photo"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>
          </button>
        )}
      </div>

      {/* Image */}
      <div className="aspect-square">
        <img
          src={post.imageUrl}
          alt={post.caption || "Photo"}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Actions and Caption */}
      <div className="p-4">
        {/* Like Button */}
        {onLike && (
          <div className="flex items-center space-x-4 mb-3">
            <button
              onClick={onLike}
              className={`flex items-center space-x-1 ${
                post.isLiked ? "text-red-500" : "text-gray-600 hover:text-red-500"
              }`}
            >
              <svg
                className="w-6 h-6"
                fill={post.isLiked ? "currentColor" : "none"}
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
          </div>
        )}

        {/* Like Count */}
        <p className="font-semibold text-sm mb-2">
          {post.likeCount} {post.likeCount === 1 ? "like" : "likes"}
        </p>

        {/* Caption */}
        {post.caption && (
          <p className="text-sm">
            <span className="font-medium">
              {post.user?.name || post.user?.email || "Anonymous"}
            </span>{" "}
            {post.caption}
          </p>
        )}
      </div>
    </div>
  );
}
