import React, { useState } from 'react';
import './wallStyle.css';
import Canvas from './Canvas';
import brush from '../Pictures/brush.png';
import eraser from '../Pictures/eraser.png';
import close from '../Pictures/close.png';
import save from '../Pictures/diskette.png';
import blue from '../Pictures/blueColor.png';
import yellow from '../Pictures/yellowColor.png';
import red from '../Pictures/redColor.png';

function Buttons({ status, toggleStatus, setCursor }) {
  const [tool, setTool] = useState("");
  const [color, setColor] = useState("black");
  

  const handleToolSelect = (value) => {
    switch (value) {
      case 'BRUSH':
        setCursor(brush);
        setTool('BRUSH');
        break;
      case 'ERASER':
        setCursor(eraser);
        setTool('ERASER');
        break;
      case 'SAVE':
        setTool('SAVE');
        setTimeout(() => {
           toggleStatus(false) 
        }, 2000);
        break;
      case 'CLOSE':
        toggleStatus(false);
        setCursor('default');
        break;
      default:
        console.error('Unknown tool selected');
    }
  };

  const handleColorSelect = (color) => {
    setColor(color);
  };

  return (
    <>
      <div className="box">
        <button onClick={() => handleToolSelect('BRUSH')}>
          <img src={brush} alt="Brush Tool" />
        </button>
        <button onClick={() => handleToolSelect('ERASER')}>
          <img src={eraser} alt="Eraser Tool" />
        </button>
        <button onClick={() => handleToolSelect('SAVE')}>
          <img src={save} alt="Save Canvas" />
        </button>
        <button onClick={() => handleToolSelect('CLOSE')}>
          <img src={close} alt="Close" />
        </button>
      </div>
      <div className="screen">
        <Canvas tool={tool} color={color}/>
      </div>
      <div className="bucket">
        <button onClick={() => handleColorSelect('blue')}>
          <img src={blue} alt="Blue Color" />
        </button>
        <button onClick={() => handleColorSelect('yellow')}>
          <img src={yellow} alt="Yellow Color" />
        </button>
        <button onClick={() => handleColorSelect('red')}>
          <img src={red} alt="Red Color" />
        </button>
      </div>
      <div className='save'>
       
      </div>
    </>
  );
}

export default Buttons;
