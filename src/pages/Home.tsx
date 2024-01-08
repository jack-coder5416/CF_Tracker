import React, { useContext, useState } from 'react';
import ImageIcon from '../components/ImageIcon';
import UserContext from '../services/user-context-services';
import { magnify } from '../assets';
import Tags from '../components/HomePage/Tags';
import Problems from '../components/HomePage/Problems';

const Home = () => {
  const ctx = useContext(UserContext);
  const [handle, setHandle] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const problemsPerPage = 10; // Set the number of problems per page

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setHandle(e.target.value);
  };

  const handleSubmit = async (e: any) => {
    ctx.setCurrentUser(e, handle);
    setHandle('');
  };

  const handleClick = (e: any, problem: any) => {
    e.preventDefault();
    window.open(
      `https://codeforces.com/contest/${problem.contestId}/problem/${problem.index}`,
      "_blank"
    );
  }
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectedProblems, setSelectedProblems] = useState<any[]>([]);

  const handleTagsChange = (tags: string[], problems: any[]) => {
    setSelectedTags(tags);
    setSelectedProblems(problems);
    setCurrentPage(1); // Reset to the first page when tags change
  };



 

  return (
    <div className="px-7 py-8 flex flex-row justify-between items-center">
      <Problems />
      <div className="flex flex-col w-[40%] h-[100%]">
        {/* {Search Handle Component} */}
        <div className="ml-auto flex flex-row overflow-x-scroll whitespace-nowrap scrollbar-hide items-center border-[1px] border-[#333] px-2 py-1 rounded-2xl w-[60%] gap-2">
          <div className="" onClick={handleSubmit}>
            <ImageIcon url={magnify} wt="17px" ht="17px" />
          </div>
          <input
            placeholder="Enter Codeforces Handle"
            className="focus:outline-none"
            value={handle}
            onChange={handleChange}
            onSubmit={handleSubmit}
          />
        </div>
        {/* {Category Select} */}
        <Tags problemspractice={selectedProblems} onTagsChange={handleTagsChange} />
      </div>
    </div>
  );
};

export default Home;
