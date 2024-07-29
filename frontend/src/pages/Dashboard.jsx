import {useEffect} from "react";
import { useUser } from "../context/UserContext";

const Dashboard = () => {
  const {user} = useUser();

  useEffect(() => {
    console.log(user);
  }, []);

  return (
    <div>
        <div className="flex flex-row w-full h-full ">
            <div className="w-[35%] h-screen bg-neutral-600">
                <h2 className="font-semibold text-5xl text-white mt-14 ml-20">Recharge Online</h2>
                <h4 className="font-thin text-xl text-white mt-2 ml-20">Faster recharges - anywhere, any time</h4>
            </div>
            <div className="w-[65%] h-screen bg-neutral-50">
                <h2 className="font-bold text-3xl text-black mt-14 ml-20">Prepaid mobile recharge</h2>
                <h2 className="font-thin text-xl text-neutral-600 mt-1 ml-20">Recharge your number for validity, talktime or data</h2>
                <h2 className="font-semibold text-xl text-neutral-600 ml-20 mt-4">Mobile number</h2>
                <input type="text" placeholder="Enter mobile number" className="w-[50%] h-10 mt-1 ml-20 border-2 p-2 border-gray-300 rounded-md"></input>
            </div>
        </div>
    </div>
  )
}

export default Dashboard