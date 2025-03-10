import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();
  return (
    <div
      className="relative h-screen w-full flex flex-col justify-center items-center text-center text-white"
      style={{
        backgroundImage: "url('https://ik.imagekit.io/HoneyJoe/St-Joseph-College-Trichy.jpeg?updatedAt=1741577761889')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Black Overlay */}
      <div className="absolute inset-0 bg-black opacity-50"></div>

      {/* Content */}
      <div className="relative z-10 p-10">
        <h1 className="text-4xl font-bold">Welcome to the Alumni Portal</h1>
        <p className="mt-4 text-lg">Join and stay connected with your alma mater.</p>

        <div className="mt-6 max-w-2xl mx-auto">
          <p className="px-6 py-4 text-lg">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum nostrum animi similique dolores deserunt fugiat debitis optio, ipsa a pariatur, ipsam recusandae rerum obcaecati cupiditate dolorum placeat quod quasi error.
          </p>
        </div>

        <button
          onClick={() => navigate('/register')}
          className="mt-6 bg-gray-500 px-6 py-2 rounded-lg hover:border-2 hover:bg-white hover:text-gray-700 shadow-xl transition duration-300"
        >
          Register
        </button>
      </div>
    </div>
  );
};

export default Home;
