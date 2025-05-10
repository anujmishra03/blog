import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BACKEND_URL } from "../config";

export const Publish = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate();

  const handlePublish = async () => {
    try {
      await axios.post(
        `${BACKEND_URL}/api/v1/blog`,
        { title, content },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      navigate("/");
    } catch (error) {
      console.error("Error publishing blog:", error);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-xl font-bold mb-4">Publish New Blog</h2>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border p-2 mb-4 w-full"
        />
        <textarea
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="border p-2 mb-4 w-full"
          rows={5}
        />
        <button
          onClick={handlePublish}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg"
        >
          Publish
        </button>
      </div>
    </div>
  );
};
