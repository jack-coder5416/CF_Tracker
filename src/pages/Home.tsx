import { useContext, useState } from "react";
import { magnify } from "../assets"
import ImageIcon from "../components/ImageIcon"
import UserContext from "../services/user-context-services";


const Home = () => {
  const ctx = useContext(UserContext);

  const [handle, setHandle] = useState("");

  const handleChange = (e:any) => {
    setHandle(e.target.value);
  };

  const handleSubmit = async (e:any) => {
    ctx.setCurrentUser(e, handle);
    setHandle("");
  };
  return (
    <div className="px-7 py-8 flex flex-row justify-between">
        <div className="flex flex-col gap-2 w-[50%]">
            <div className="flex flex-row gap-2 bg-[#f0edede5] px-2 py-1">
                <h5 className="text-[16px] font-[500]">Filter by:</h5>
                
            </div>
            <div className="">

            </div>
        </div>
        <div className="flex flex-col w-[40%] border-[2px] ">
            <div className="ml-auto flex flex-row overflow-x-scroll whitespace-nowrap scrollbar-hide items-center border-[1px] border-[#333] px-2 py-1 rounded-2xl w-[60%] gap-2">
                <ImageIcon url={magnify} wt="17px" ht="17px"/>
                <input placeholder="Enter Codeforces Handle" className=" focus: outline-none" onSubmit={handleSubmit}/>
            </div>
        </div>
    </div>
  )
}

export default Home