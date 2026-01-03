"use client"
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useSession, signIn, signOut } from "next-auth/react"
export default function Home() {
  const { data: session } = useSession()
  const router = useRouter()
  
  return (
    <div className="">
      <div className="flex flex-col justify-center items-center min-h-[44vh]  text-white">
        <div className="flex justify-center items-center font-bold text-2xl md:text-5xl">BUY ME A CHAI
          <span><img src="/tea.gif" width={100} alt="" /></span>
          </div>
        <p className="px-5 pb-7">A corwd founding pplatform for creater,Get fund by your fans and followers.Start Now!</p>
        <div className="flex gap-4">
          <button type="button" className="cursor-pointer text-white bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-teal-300 dark:focus:ring-teal-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Start Here</button>
          <button type="button" className="cursor-pointer text-white bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-teal-300 dark:focus:ring-teal-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Read More</button>
        </div>

      </div>
      <div className="h-[0.5px] opacity-40 bg-white"></div>
      <div className="text-white my-8  mx-auto mb-10 min-h-[28vh]">
        <p className="text-2xl font-bold my-4 text-center">Your Fan Can Buy Your Chai</p>
        <div className="flex justify-around py-10 my-5">
          <div className="item space-y-3  flex flex-col justify-center items-center">
            <img className="rounded-full p-2 bg-gray-300" width={88} src="/man.gif" alt="" />
            <p className="px-5  text-center">People wants to help you</p>
            <p className="text-center px-3">Your fans are here to help you</p>
          </div>
          <div className="item space-y-3 flex flex-col justify-center items-center">
            <img className="rounded-full p-2 bg-gray-300" width={88} src="/coin.gif" alt="" />
            <p className="px-5 text-center">People wants to help you</p>
            <p className="text-center">Your fans are here to help you</p>
          </div>
          <div className="item  flex flex-col justify-center items-center">
            <img className="rounded-full p-2 bg-gray-300" width={88} src="/group.gif" alt="" />
            <p className="px-5  text-center">People wants to help you</p>
            <p className="text-center">Your fans are here to help you</p>
          </div>
        </div>
      </div>
      <div className="h-[0.5px] opacity-40 bg-white"></div>
      <div className="text-white flex flex-col justify-center items-center py-10  min-h-[28vh] overflow-hidden mx-auto">
        <p className="text-2xl font-bold my-4 text-center">Learn More!</p>
        <iframe  className="object-fit w-[350px] h-[210px]" width="560" height="315" src="https://www.youtube.com/embed/OyKIbaSk2s4?si=Jf8HV9yzPjMHMJjS" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
      </div>
      
    </div>
  );
}
