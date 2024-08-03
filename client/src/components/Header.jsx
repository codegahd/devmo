import { useState } from "react"
import { Link } from "react-router-dom";
import useGamesContext from "../hooks/useGamesContext";

// eslint-disable-next-line react/prop-types
export default function Header() {
    const [date, setDate]=useState("2023-10-10");
    const {setType} = useGamesContext()
    const formHandler = async(event)=>{
        event.preventDefault()
        setDate("2023-10-10")
        console.log(date)
    
    }
    const handleClick1 = ()=>{
        localStorage.setItem("type","pool bet")
        setType("pool bet")
    }
    const handleClick2 = ()=>{
        localStorage.setItem("type","odd bet")
        setType("odd bet")

    }
    return (
        <>
            <div className="py-6 bg-gray-200 container mx-auto">
                <form className="container mx-auto flex gap-4 justify-center" onSubmit={formHandler}action="">
                    <label className="w-[50%] text-slate-700 text-sm font-bold" htmlFor="">
                        <select className="block text-lg px-6 py-4 w-full mt-1 outline-none rounded-md shadow-sm ">
                            <option className=" appearance-none">All event</option>
                            <option className=" hover::bg-slate-600">Today</option>
                            <option className="">Tomorrow</option>
                            <option className="">Wednesday</option>
                        </select>
                    </label>
                </form>
            </div>
            <div className="flex container mx-auto bg-gray-200 justify-around">
                <div className="flex gap-2   justify-center py-2">
                    <button onClick={handleClick1} className="bg-green-600 text-white px-6 py-2 shadow-md border border-white-200 border-transparent-lg text-lg font-medium rounded-full hover:bg-green-800">POOL BET</button>
                    <button onClick={handleClick2} className="bg-orange-600 text-white px-6 py-2 shadow-md border border-white-200 border-transparent-lg text-lg font-medium rounded-full hover:bg-orange-800">ODD BET</button>
                </div>
                <div className="pt-6">
                    <Link className="text-lg font-semibold underline-offset-1 underline text-green-600" to="/admin">ADMIN</Link>
                </div>
            </div>
        </>
    )
}

