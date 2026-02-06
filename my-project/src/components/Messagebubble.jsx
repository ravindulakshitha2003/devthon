import React, { useState, useEffect } from 'react';
import ImageCard from './Imagecard';
import NormalMsg from './NormalMsg';

const MessageBubble = ({ message }) => {
  const { text, sender, timestamp, isError } = message;
  const [status, setStatus] = useState(true);
  const [palces,setplaces] =useState([]);
  const [eroor,rejio]=useState('');

  useEffect(() => {
    try {
      const parsed = JSON.parse(text);
      if (parsed.trip) {
         setStatus(true);
         setplaces(parsed.trip);
       
          
      } else {
        setStatus(false); // optional: reset if no trip
      }
    } catch (e) {
    rejio(e);
      setStatus(false);
    }
  }, [text]); // run every time the message text changes

  const formatTime = (isoString) => {
    const date = new Date(isoString);
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  const wrapperClass = sender === 'user' 
    ? 'message-wrapper user-message-wrapper' 
    : 'message-wrapper bot-message-wrapper';

  const bubbleClass = sender === 'user' 
    ? 'message-bubble user-bubble' 
    : `message-bubble bot-bubble ${isError ? 'error-bubble' : ''}`;

  return (
  <>
   
    {status ? (palces.map((n,index)=>{
    
      (<ImageCard key={index} message={n} />)
      
    })
      
    ) : (
      <NormalMsg
        wrapperClass={wrapperClass}
        bubbleClass={bubbleClass} // notice spelling: bubbleClass
        text={text}
        showtime={formatTime(timestamp)}
      />
    )}
  </>
);
}


export default MessageBubble;
