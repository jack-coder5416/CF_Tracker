import React, { useState } from 'react'
import axios, { AxiosResponse } from "axios";
import { toast } from "react-toastify";

const UserContext = React.createContext(
    {
       user:{},
       setCurrentUser: (e: any, handle: string) => {[e,handle]},
       rating:null,
       toggleRating: ()=>{},
    }
);



export const UserContextProvider = (props:any) => {
    const [user,setUser]:any = useState({});
    const [rating,setRating]:any = useState({});

    const setCurrentUser: (e:any, handle:any)=>{} = async (e: any, handle: any) => {
      e.preventDefault();
      try {
        const res:AxiosResponse<any, any> = await axios.get(`https://codeforces.com/api/user.info?handles=${handle}`);
        if(res.status===200 || res.status===201) {
          setUser(res.data.result[0]);
          localStorage.setItem("user", JSON.stringify(res.data.result[0]));
          // console.log(localStorage.getItem("user"))
          window.location.reload();
        }
        
      } catch (err: any) {
        if (err.response.status === 400) {
          toast.error(err.response.data.comment, {position:toast.POSITION.TOP_RIGHT});
        }
        else{
          console.log(err);
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