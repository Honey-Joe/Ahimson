import React from "react";

const EventsSection = () => {
  return (
    <section id="events" className="py-16 bg-white text-gray-800">
      <div className="container mx-auto px-4">
        <h3 className="text-3xl font-bold text-center mb-6">Upcoming Events</h3>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-gray-100 p-6 rounded-lg shadow-md">
            <h4 className="text-xl font-bold mb-2">Alumni Meet 2024</h4>
            <p className="text-gray-600">Date: January 20, 2024</p>
            <p className="text-gray-600">Location: College Auditorium</p>
          </div>
          <div className="bg-gray-100 p-6 rounded-lg shadow-md">
            <h4 className="text-xl font-bold mb-2">Career Networking</h4>
            <p className="text-gray-600">Date: March 5, 2024</p>
            <p className="text-gray-600">Location: Virtual</p>
          </div>
          <div className="bg-gray-100 p-6 rounded-lg shadow-md">
            <h4 className="text-xl font-bold mb-2">Fundraiser Gala</h4>
            <p className="text-gray-600">Date: April 15, 2024</p>
            <p className="text-gray-600">Location: College Grounds</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EventsSection;
