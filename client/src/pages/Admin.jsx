import { useResolveBet } from "../hooks/useResolveBet"
const Admin = () => {
  const {resolveBet,error,isloading,success}=useResolveBet()
 const handleClick =async()=>{
    await resolveBet()
 }
 
  return (
    <div className="container mx-auto pt-4">
        <p>Admin:</p>
        <div className="mt-6">
         <button 
         onClick={()=>{handleClick()}}
         className="bg-green-600 text-white px-6 py-2 shadow-md border border-white-200 border-transparent-lg text-lg font-medium rounded-full hover:bg-green-800">Settle Bets</button>
        </div>
        <div>
          {isloading&& <div>loading</div>}
          {error && <div className="text-red-700">error has occurred</div>}
          {success&& <div>bet settled</div>} 
        </div>
    </div>
  )
}

export default Admin