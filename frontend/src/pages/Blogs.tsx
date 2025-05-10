import { Appbar } from "../components/Appbar";
import { BlogCard } from "../components/BlogCard";
import { BlogSkeleton } from "../components/BlogSkeleton";
import { useBlogs } from "../hooks";
import { Link } from "react-router-dom";

export const Blogs = () => {
  const { loading, blogs } = useBlogs();

  if (loading) {
    return (
      <div className="flex justify-center p-10">
        <div className="flex gap-4">
          <BlogSkeleton />
          <BlogSkeleton />
          <BlogSkeleton />
        </div>
      </div>
    );
  }

  return (
    <div>
      <Appbar />
      <div className="flex justify-between items-center p-4">
        <h1 className="text-2xl font-bold">All Blogs</h1>
        <Link
          to="/publish"
          className="bg-blue-500 text-white px-4 py-2 rounded-lg"
        >
          New Blog
        </Link>
      </div>
      <div className="flex justify-center">
        <div className="grid grid-cols-1 gap-6 max-w-3xl">
          {blogs.length > 0 ? (
            blogs.map((blog) => (
              <BlogCard
                
                id={blog.id}
                authorName={blog.author.name || "Anonymous"}
                title={blog.title}
                content={blog.content}
                publishDate={"2nd of Feb"} // Adjust with actual date
              />
            ))
          ) : (
            <p>No blogs available.</p>
          )}
        </div>
      </div>
    </div>
  );
};
