import { useState } from "react";
import { Dialog } from "@headlessui/react";

const images = [
  "https://source.unsplash.com/800x600/?college",
  "https://source.unsplash.com/800x600/?campus",
  "https://source.unsplash.com/800x600/?library",
  "https://source.unsplash.com/800x600/?university",
  "https://source.unsplash.com/800x600/?education",
  "https://source.unsplash.com/800x600/?students"
];

export default function Gallery() {
  const [selectedImage, setSelectedImage] = useState(null);

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-center mb-6">College Gallery</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {images.map((img, index) => (
          <img
            key={index}
            src={img}
            alt={`Gallery ${index + 1}`}
            className="w-full h-48 object-cover rounded-lg shadow-md cursor-pointer hover:scale-105 transition-transform"
            onClick={() => setSelectedImage(img)}
          />
        ))}
      </div>

      {/* Modal for Image Preview */}
      {selectedImage && (
        <Dialog open={!!selectedImage} onClose={() => setSelectedImage(null)} className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75">
          <div className="relative bg-white p-4 rounded-lg max-w-3xl">
            <button className="absolute top-2 right-2 text-gray-600" onClick={() => setSelectedImage(null)}>✖</button>
            <img src={selectedImage} alt="Selected" className="w-full rounded-md" />
          </div>
        </Dialog>
      )}
    </div>
  );
}
