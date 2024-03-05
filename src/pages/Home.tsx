import React, { useState, useContext } from 'react';
import ImageIcon from '../components/ImageIcon';
import UserContext from '../services/user-context-services'; // Import your UserContext
import { magnify } from '../assets';
import Tags from '../components/HomePage/Tags';
import Problems from '../components/HomePage/Problems';

const Home = () => {
  const ctx = useContext(UserContext); // Use useContext hook to access the context
  const [handle, setHandle] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setHandle(e.target.value);
  };

  const handleSubmit = async (e: any) => {
    ctx.setCurrentUser(e, handle); // Assuming setCurrentUser is a function in your context
    setHandle('');
  };

  

  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectedProblems, setSelectedProblems] = useState<any[]>([]);
  const [isLoading,setIsLoading]=useState<boolean>(true);

  const handleTagsChange = (tags: string[], problems: any[]) => {
    setSelectedTags(tags);
    setSelectedProblems(problems);
    setCurrentPage(1); // Reset to the first page when tags change
  };

  return (
    <div className="px-[10%] py-8 flex flex-row justify-between items-center gap-5 ">
      
      <Problems problems={selectedProblems} currentPage={currentPage} setCurrentPage={setCurrentPage} isloading={isLoading} selectedTags={selectedTags} />
      <div className="flex flex-col w-[40%] h-screen">
        {/* {Search Handle Component} */}
        <div className="ml-auto flex flex-row overflow-x-scroll whitespace-nowrap scrollbar-hide items-center border-[1px] border-[#333] px-2 py-1 rounded-2xl w-[60%] gap-2">
          <input
            placeholder="Enter Codeforces Handle"
            className="focus:outline-none w-[90%]"
            value={handle}
            onChange={handleChange}
            onSubmit={handleSubmit}
          />
          <div className="bg-[#4de6ba] rounded-[15px] p-1" onClick={handleSubmit}>
            <ImageIcon url={magnify} wt="20px" ht="20px" />
          </div>
        </div>
        {/* {Category Select} */}
        <div className='px-[10%]'>
          <Tags problemspractice={selectedProblems} onTagsChange={handleTagsChange} setisloading={setIsLoading}/>
        </div>
      </div>
    </div>
  );
};

export default Home;
