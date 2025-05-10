import axios from "axios";
import { useEffect, useState } from "react";
import { BACKEND_URL } from "../config";

// Define the Blog interface
export interface Blog {
    createdAt: string | number | Date;
    content: string;
    title: string;
    id: number;
    author: {
        name: string;
    };
}

// Hook to fetch a single blog by id
export const useBlog = ({ id }: { id: string }) => {
    const [loading, setLoading] = useState(true);
    const [blog, setBlog] = useState<Blog | null>(null); // For a single blog
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchBlog = async () => {
            try {
                const response = await axios.get(`${BACKEND_URL}/api/v1/blog/${id}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                });
                setBlog(response.data); // Set the single blog data
            } catch (err: any) {
                setError(err.message); // Error handling
            } finally {
                setLoading(false);
            }
        };

        fetchBlog();

        return () => {
            // Cleanup function if needed
        };
    }, [id]); // Dependency on `id`, will re-fetch if `id` changes

    return {
        loading,
        blog,
        error,
    };
};

// Hook to fetch all blogs
export const useBlogs = () => {
    const [loading, setLoading] = useState(true);
    const [blogs, setBlogs] = useState<Blog[]>([]); // Typed as an array of Blog
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const response = await axios.get(`${BACKEND_URL}/api/v1/blog/bulk`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                });
                setBlogs(response.data); // Set the list of blogs
            } catch (err: any) {
                setError(err.message); // Error handling
            } finally {
                setLoading(false);
            }
        };

        fetchBlogs();

        return () => {
            // Cleanup function if needed
        };
    }, []); // Empty dependency array means this runs once when component mounts

    return {
        loading,
        blogs,
        error,
    };
};
