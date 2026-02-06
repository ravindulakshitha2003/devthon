import React from 'react';
import './Chatbot.css' 

const NormalMsg = ({text,wrapperClass,bubbleClass,showtime}) => {
    return (
        <div className={ wrapperClass } >
            <div className={bubbleClass}>
        <p className="message-text">{text}</p>
        <span className="message-time">{showtime}</span>
        {status && <p style={{color: 'green'}}>Trip detected!</p>}
      </div>
    </div>
    );
}

export default NormalMsg;
