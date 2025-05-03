import { Auth } from "../components/Auth";
import { Quote } from "../components/Quote";

export const Signup = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2">
        <div>
            <Auth type={"signup"}/>
        </div>  
      {/* Right Column: Quote component, visible only on large screens */}
      <div className="hidden lg:block">
        <Quote />
      </div>
    </div>
  );
};
