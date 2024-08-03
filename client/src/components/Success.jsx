

const Success = ({setSelection}) => {
  return (
    <div className="shadow-md text-center w-fit p-4 px-6 rounded-sm text-white fixed top-[40vh] mt-10 left-[50vw] z-1 bg-green-600">
        <div  className="">bet placed successfully</div>
        <button onClick={()=>setSelection(null)} className="text-black underline">continue betting</button>
    </div>
  )
}

export default Success