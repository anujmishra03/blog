import { Auth } from "../components/Auth";
import { Quote } from "../components/Quote";

export const Signin = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2">
        <div>
            <Auth type={"signin"}/>
        </div>  
      {/* Right Column: Quote component, visible only on large screens */}
      <div className="hidden lg:block">
        <Quote />
      </div>
    </div>
  );
};
