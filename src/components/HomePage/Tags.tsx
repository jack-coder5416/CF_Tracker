import axios from 'axios';
import React, { useEffect, useState } from 'react';

const Tags: React.FC<{
  problemspractice: any;
  setisloading:any;
  onTagsChange: (selectedTags: string[], selectedProblems: any[]) => void;
}> = ({ onTagsChange, setisloading }) => {
  const [checked, setChecked] = useState<string[]>([]);

  
  const tags = [
    "greedy",
    "implementation",
    "math",
    "constructive algorithms",
    "sortings",
    "strings",
    "brute force",
    "data structures",
    "number theory",
    "dp",
    "two pointers",
    "combinatorics",
    "binary search",
    "geometry",
    "dfs and similar",
    "graphs",
    "trees",
    "games",
    "bitmasks",
  ];
  
  const handleToggle = (value: string) => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];
    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }
    setChecked(newChecked);
  };
  
  useEffect(() => {
    const getProblems = async () => {
      let tagString = checked.join(';');
      try {
        const resProblems = await axios.get(
          `https://codeforces.com/api/problemset.problems?tags=${tagString}`
          );
          
          onTagsChange(checked, resProblems.data.result.problems);
        } catch (err) {
          console.log(err);
        }
        finally {
          setisloading(false); // Set loading to false when data fetching is done
        }
      };
      getProblems();
    }, [checked]); // Fetch problems whenever selected tags change
    
  return (
    <div className='flex flex-col px-2 py-1'>
      <h5 className='font-[500] text-[20px] px-5'>Tags</h5>
      <div className='px-5 py-2'>
        {tags.map((tag) => (
          <div key={tag} className='flex items-center'>
            <input
              type='checkbox'
              id={tag}
              checked={checked.includes(tag)}
              onChange={() => handleToggle(tag)}
            />
            <label htmlFor={tag} className='ml-2 text-[16px]'>
              {tag}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Tags;
