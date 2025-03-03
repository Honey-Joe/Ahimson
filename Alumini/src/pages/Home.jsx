import React from 'react'
import { useNavigate } from 'react-router-dom'

const Home = () => {
  const navigate = useNavigate()
  return (
    <div>
      <div className="text-center p-10 h-screen w-full">
        <h1 className="text-4xl font-bold text-blue-600">Welcome to the Alumni Portal</h1>
        <p className="mt-4 text-gray-600">Join and stay connected with your alma mater.</p>
        <img src='../assets/react.svg' alt="Alumni" className="mx-auto mt-6 w-1/2 rounded-lg shadow-md"/>
        <div>
          <p className=' px-6 sm:px-20%] py-10'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum nostrum animi similique dolores deserunt fugiat debitis optio, ipsa a pariatur, ipsam recusandae rerum obcaecati cupiditate dolorum placeat quod quasi error.</p>
        </div>
        <div>
          <button onClick={()=> navigate('/register')} className=' bg-gray-500 border px-6 py-2 rounded-lg hover:border-2 hover:bg-white shadow-2xl '>Register</button>
        </div>
      </div>
    </div>
  )
}

export default Home