import './Problems.css';

const Problems = ({ problems, currentPage, setCurrentPage, isloading }:any) => {
    const problemsPerPage = 12;
    const handleClick = (e: any, problem: any) => {
        e.preventDefault();
        window.open(
            `https://codeforces.com/contest/${problem.contestId}/problem/${problem.index}`,
            "_blank"
        );
    };

    // Logic to slice problems array based on current page
    const startIndex = (currentPage - 1) * problemsPerPage;
    const endIndex = startIndex + problemsPerPage;
    const currentProblems = problems.slice(startIndex, endIndex);

    return (
        <div className="flex flex-col gap-2 w-[70%] h-[100%]">
            {isloading ? ( 
                 <div className="loader-container">
                    <div className="loader"></div>
                 </div>
            ) : (
                <>
                    <div className="grid grid-cols-3 gap-4 mt-4 h-[90%]">
                        {currentProblems.map((problem:any, index:any) => (
                            <div key={index} className="flex flex-col border border-[#4de6ba] shadow-md p-4 cursor-pointer hover:scale-[1.01] rounded-md" onClick={(e) => handleClick(e, problem)} >
                                <h3 className="text-lg font-semibold" >{problem.name} </h3>
                                <h3 className='w-fit rounded-[20px] px-2 py-1 text-[10px] bg-[#4de6ba]'>&#11088;{(problem.rating)?(problem.rating):('unrated')}</h3>
                            </div>
                        ))}
                    </div>
                    <div className="flex justify-center mt-4">
                        <button
                            className="px-4 py-2 mx-2 bg-[#4de6ba] hover:bg-opacity-80 cursor-pointer text-white rounded-md"
                            onClick={() => setCurrentPage((prev:any) => Math.max(prev - 1, 1))}
                            disabled={currentPage === 1}
                        >
                            Previous
                        </button>
                        <div className='text-center px-4 py-2'>Page {currentPage}</div>
                        <button
                            className="px-8 py-2 mx-2 bg-[#4de6ba] hover:bg-opacity-80 cursor-pointer text-[#fff] rounded-md "
                            onClick={() => setCurrentPage((prev:any) => prev + 1)}
                            disabled={currentProblems.length < problemsPerPage}
                        >
                            Next
                        </button>
                    </div>
                </>
            )}
        </div>
    );
};

export default Problems;
