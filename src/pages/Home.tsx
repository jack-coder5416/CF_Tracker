import React, { useContext, useState } from 'react';
import ImageIcon from '../components/ImageIcon';
import UserContext from '../services/user-context-services';
import { magnify } from '../assets';
import Tags from '../components/Tags';

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
  
  const handleClick = (e:any, problem:any)=>{
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

  // Logic for pagination
  const indexOfLastProblem = currentPage * problemsPerPage;
  const indexOfFirstProblem = indexOfLastProblem - problemsPerPage;
  const currentProblems = selectedProblems.slice(indexOfFirstProblem, indexOfLastProblem);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const handleNextPage = () => {
    setCurrentPage((prevPage) => {
      const nextPage = Math.min(prevPage + 1, Math.ceil(selectedProblems.length / problemsPerPage));
      paginate(nextPage); // Update the state immediately
      return nextPage;
    });
  };
  
  const handlePrevPage = () => {
    setCurrentPage((prevPage) => {
      const prevPageValue = Math.max(prevPage - 1, 1);
      paginate(prevPageValue); // Update the state immediately
      return prevPageValue;
    });
  };
  return (
    <div className="px-7 py-8 flex flex-row justify-between items-center">
      <div className="flex flex-col gap-2 w-[50%] h-[100%]">
        {/* {Filter Bar} */}
        <div className="flex flex-row gap-2 bg-[#f0edede5] px-2 py-1 h-[10%]">
          <h5 className="text-[16px] font-[500]">Filter by:</h5>
        </div>
        <div className="grid grid-cols-3 gap-4 mt-4 h-[90%]">
          {currentProblems.map((problem) => (
            <div key={problem.id} className="border border-[#4de6ba] shadow-md  p-4 cursor-pointer hover:scale-[1.01]" onClick={(event) => handleClick(event, problem)}>
              <h3 className="text-lg font-semibold">{problem.name}</h3>
              {/* Display other problem details as needed */}
            </div>
          ))}
        </div>
        {/* Pagination */}
        <div className="flex justify-center mt-4">
        <button onClick={handlePrevPage} className="mx-1" disabled={currentPage === 1}>
          Prev
        </button>
        <span className="mx-1">
          Page {currentPage} of {Math.ceil(selectedProblems.length / problemsPerPage)}
        </span>
        <button onClick={handleNextPage} className="mx-1" disabled={currentPage === Math.ceil(selectedProblems.length / problemsPerPage)}>
          Next
        </button>
      </div>
      </div>
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
