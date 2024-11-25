import React, { useState } from 'react';
import Buttons from './Buttons';
import Wonderwall from './Wonderwall';
import './Styling.css';

function Wall() {
  const [actPaint, setActPaint] = useState(false);
  const [cursor, setCursor] = useState('default');

  return (
    <div className="board" style={{ cursor: cursor ? "default" : `url(${cursor}), auto` }}>
      {actPaint ? (
        <div className="driver">
          <Buttons status={actPaint} toggleStatus={setActPaint} setCursor={setCursor} />
        </div>
      ) : (
        <>
          <button className="wallButton" onClick={() => setActPaint(true)}>
            Create New
          </button>
          <Wonderwall />
        </>
      )}
    </div>
  );
}

export default Wall;
