const Error = ({setSelection}) => {
  return (
    <div className="shadow-md text-center w-fit p-6 rounded-sm text-red-600 fixed top-[40vh] mt-10 left-[50vw] z-1 bg-gray-200">
        <div  className="">An error occurred please contact support</div>
        <button onClick={()=>setSelection(null)} className="text-green-600 underline">continue</button>
    </div>
  )
}

export default Error