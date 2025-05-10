import { Appbar } from "./Appbar";
import { Blog } from "../hooks";

export const FullBlog = ({ blog }: { blog: Blog }) => {
    return (
        <div>
            <Appbar />
            <div className="flex justify-center py-10">
                <div className="grid grid-cols-12 gap-4 px-10 w-full max-w-screen-2xl">
                    
                    {/* Main Content Area */}
                    <div className="col-span-8 p-4 space-y-4">
                        <h1 className="text-3xl font-extrabold">{blog?.title}</h1>
                        <div className="text-slate-500">Posted on 2nd March 2025</div>
                        <p>{blog?.content}</p>
                    </div>

                    {/* Sidebar */}
                    <div className="col-span-4 p-4">
                        <div className="text-lg font-semibold">
                            {blog?.author?.name || "Anonymous"}
                        </div>
                        <div className="mt-2 text-md italic text-gray-700">
                            Random catchphrase about the author's ability to grab the user's attention
                        </div>
                    </div>
                    
                </div>
            </div>
        </div>
    );
};
