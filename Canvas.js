import React, { useEffect, useRef, useState } from "react";

function Canvas({ tool, color }) {
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    if (tool === "ERASER") {
      context.lineWidth = 25; // Eraser size
      context.strokeStyle = "#ffffff"; // Erase to white (background)
    } else if (tool === "BRUSH") {
      context.lineWidth = 10; // Brush size
      context.strokeStyle = color; // Brush color
    } else if (tool === "SAVE") {
      saveCanvas(); // Trigger saving
    } else {
      context.lineWidth = 0;
      context.strokeStyle = null;
    }
    context.lineCap = "round";
  }, [tool, color]);

  const startDrawing = (e) => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    context.beginPath();
    context.moveTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
    setIsDrawing(true);
  };

  const draw = (e) => {
    if (!isDrawing) return;

    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    context.lineTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
    context.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const saveCanvas = async () => {
    const canvas = canvasRef.current;
    const dataURL = canvas.toDataURL("image/png"); // Save as PNG
    const fileName = `drawing-${Date.now()}.png`; // Default filename
    console.log('save called')
    try {
      const result = await fetch("http://localhost:5000/save-image", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ imageData: dataURL, fileName }), // Fixed case
      });

      const resp = await result.json();
      if (result.ok) {
        console.log('saved')
      } else {
        alert(`Failed to save image: ${resp.error || "Unknown error"}`);
      }
    } catch (error) {
      console.error("Error saving image:", error);
      alert("Error saving image.");
    }
  };

  return (
    <div className="canvo">
      <canvas
        ref={canvasRef}
        width={450}
        height={350}
        style={{ border: "2px solid black" }}
        className="canvas"
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={stopDrawing}
        onMouseLeave={stopDrawing}
      />
    </div>
  );
}

export default Canvas;
