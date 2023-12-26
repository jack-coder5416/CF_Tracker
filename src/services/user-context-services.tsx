import React, { useState } from 'react'
import axios from "axios";
import { toast } from "react-toastify";

const UserContext = React.createContext(
    {
       user:{},
       setCurrentUser: ()=>{},
       rating:null,
       toggleRating: ()=>{},
    }
);

export const UserContextProvider = (props:any) => {
    const [user,setUser]:any = useState({});
    const [rating,setRating]:any = useState({});

    const setCurrentUser:any = async(e:any, handle:any) => {
       e.preventDefault();
       try{
         const res = await axios.get(`https://codeforces.com/api/user.info?handles=${handle}`)
         setUser(res.data.result[0]);
         localStorage.setItem("user", JSON.stringify(res.data.result[0]));
       }catch(err:any){
        if (err.response.status === 400) {
          toast.error(err.response.data.comment, toast.POSITION.TOP_RIGHT);
        }
       }
    };
    const toggleRating:any = (e:any) => {
      e.preventDefault();
      setRating((prev:any) => !prev);
    };
    return (
      <UserContext.Provider
      value={{
        user: user,
        setCurrentUser: setCurrentUser,
        rating: rating,
        toggleRating: toggleRating,
      }}
    >
      {props.children}
    </UserContext.Provider>
  )
}

export default UserContext