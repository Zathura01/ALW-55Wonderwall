import React, { useEffect, useState } from 'react';
import './Styling.css'; // CSS file for enhanced styling

function Wonderwall() {
  const [images, setImages] = useState([]);

  useEffect(() => {
    fetchWall();
  }, []);

  const fetchWall = async () => {
    try {
      const response = await fetch("http://localhost:5000/fetch");
      const result = await response.json();
      console.log("Fetched Images:", result); // Log fetched data for debugging
      setImages(result);
    } catch (err) {
      console.error("Failed to fetch images:", err);
    }
  };

  return (
    <div className="wonderwall-container">
      <h2>Image Gallery</h2>
      <div className="grid-container">
        {images.length > 0 ? (
          images.map((image, index) => (
            <div key={image._id || index} className="grid-item">
              <img
                src={`http://localhost:5000/images/${image.fileName}`} // Path to the images
                alt={`Image-${index}`}
              />
            </div>
          ))
        ) : (
          <p>Loading images or no images found...</p>
        )}
      </div>
    </div>
  );
}

export default Wonderwall;
