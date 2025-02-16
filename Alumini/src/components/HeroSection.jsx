import React from "react";

const HeroSection = () => {
  return (
    <section className="bg-cover bg-center h-screen text-white" style={{ backgroundImage: "url(https://ik.imagekit.io/HoneyJoe/Revamp%20web/blog-02.jpg?updatedAt=1733151460110)" }}>
      <div className="container mx-auto flex flex-col items-center justify-center h-full text-center">
        <h2 className="text-5xl font-bold mb-4">Welcome Back, Alumni!</h2>
        <p className="text-xl mb-8">Stay connected and contribute to our legacy.</p>
        <a
          href="#about"
          className="bg-red-950 hover:bg-red-900 text-white py-3 px-6 rounded-lg transition"
        >
          Learn More
        </a>
      </div>
    </section>
  );
};

export default HeroSection;
