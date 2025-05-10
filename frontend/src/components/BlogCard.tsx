import { Link } from "react-router-dom";

interface BlogCardProps {
  id: number;
  authorName: string;
  title: string;
  content: string;
  publishDate: string;
}

export const BlogCard = ({
  id,
  authorName,
  title,
  content,
  publishDate,
}: BlogCardProps) => {
  const readingTime = `${Math.ceil(content.length / 100)} min read`;

  return (
    <div className="bg-yellow-100 flex flex-col p-6 shadow-lg border border-yellow-200 mb-6 transition hover:shadow-md hover:bg-yellow-50 rounded-lg">
      <div className="flex items-center gap-3 mb-4 text-gray-700 text-sm">
        <Avatar name={authorName} />
        <div>
          <div className="font-semibold">{authorName || "Unknown Author"}</div>
          <div className="text-xs text-gray-600">
            {publishDate} • {readingTime}
          </div>
        </div>
      </div>

      <h2 className="text-2xl font-bold text-gray-900 mb-3">{title}</h2>

      <p className="text-gray-800 mb-4 text-sm">
        {content.length > 180 ? `${content.slice(0, 180)}...` : content}
      </p>

      <Link
        to={`/blog/${id}`}
        className="text-blue-700 hover:underline text-sm font-medium"
      >
        Read more →
      </Link>
    </div>
  );
};

interface AvatarProps {
  name: string;
  size?: number;
}

export function Avatar({ name, size = 12 }: AvatarProps) {
  const initials = name ? name.charAt(0).toUpperCase() : "?";

  return (
    <div
      className={`flex items-center justify-center w-${size} h-${size} bg-yellow-300 text-yellow-900 rounded-full font-bold shadow-sm`}
      style={{ width: `${size * 4}px`, height: `${size * 4}px` }}
    >
      {initials}
    </div>
  );
}
