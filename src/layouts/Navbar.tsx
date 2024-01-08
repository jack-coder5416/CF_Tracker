
const Navbar = () => {
  return (
    <div className='flex flex-col  top-0 sticky z-10'>
        <div className='h-[90%] flex flex-row px-8 py-2 items-center bg-[#333] justify-between'>
             <h5 className='flex flex-row text-[17px] items-center font-[500]'>
                <span className='text-[#fff]'>Codeforces</span>
                <span className='text-[#4de6ba]'>Decoded</span>
             </h5>
             <div className=''>
              
                {
                  localStorage.getItem("user")&&(
                    <h5 className='text-[#4de6ba] font-mono font-[400] cursor-pointer'>{JSON.parse(localStorage.getItem("user")||'').handle}</h5>
                  )
                }
             </div>
        </div>
        <div className='bg-[#4de6ba] w-full h-[20%] absolute top-10'/>
    </div>
  )
}

export default Navbar