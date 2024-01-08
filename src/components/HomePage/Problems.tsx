// Problems.tsx
import { useEffect, useState } from 'react';


let worker: Worker | null = null;
const Problems = () => {
    const itemsPerPage = 20;

    const [problems, setProblems] = useState<any[] | []>([]);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [isLoading, setIsLoading] = useState<boolean>(false);



    const fetchData = (page: number, forceRefresh: boolean = false) => {
        setIsLoading(true);

        if (!worker) return;
        // Listen for messages from the Web Worker
        worker.onmessage = (event) => {

            console.log("Frontend Side", event);
            const { data, fromCache, error } = event.data;

            console.log("Application Side", data);

            if (error) {
                console.error(error);
            } else {
                setProblems(data);
                console.log(fromCache ? 'Data from cache' : 'Data fetched from API');
            }

            setIsLoading(false);
        };

        // Start the Web Worker and pass data to it
        worker.postMessage({ page, pageSize: itemsPerPage, forceRefresh });
    };


    useEffect(() => {
        // Create a new Web Worker instance
        worker = new Worker(new URL("./../../workers/problemsCache.ts", import.meta.url));

        // Clean up the worker when the component unmounts
      
    }, []);


    useEffect(() => {
        fetchData(currentPage);
    }, []);

    const handlePageChange = (type: string) => {
       setCurrentPage((prev) => type === "inc" ? prev + 1 : prev - 1);
       fetchData(currentPage + 1);
    };

    return (
        <div className="flex flex-col gap-2 w-[70%] h-[100%]">
            <div className="grid grid-cols-3 gap-4 mt-4 h-[90%]">
                {problems.map((problem, index) => (
                    <div key={index} className="border border-[#4de6ba] shadow-md p-4 cursor-pointer hover:scale-[1.01]">
                        <h3 className="text-lg font-semibold">{problem.name}</h3>
                    </div>
                ))}
            </div>
            <div className="flex justify-center mt-4">
                <button
                    className="px-4 py-2 mx-2 bg-blue-500 hover:bg-opacity-80 cursor-pointer text-white rounded-md"
                    onClick={() => handlePageChange("dec")}
                    disabled={currentPage === 1}
                >
                    Previous
                </button>
                <button
                    className="px-4 py-2 mx-2 bg-blue-500 hover:bg-opacity-80 cursor-pointer text-white rounded-md"
                    onClick={() => handlePageChange("inc")}
                    disabled={problems.length < itemsPerPage}
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default Problems;
