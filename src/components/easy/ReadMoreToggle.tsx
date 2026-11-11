import React, { useState } from 'react'

const text = `React is a popular JavaScript library developed by Facebook for 
  building user interfaces, especially single-page applications. It allows
   developers to create reusable UI components that efficiently update and 
   render as data changes. One of React’s key features is the virtual DOM, 
   which improves performance by minimizing direct manipulation of the actual
    DOM.`;

const ReadMoreToggle = () => {

    const [toggle, setToggle] = useState<boolean>(false);

    return (
        <div style={{
            width: '40%',
            backgroundColor: 'lightgray',
            padding: '10px',
            borderRadius: '10px',
            marginInline: 'auto',
            marginTop: '10%'
        }}>
            <h1>Read More Toggle</h1>
            <div>
                {toggle ? text : text.substring(0, 100)}...
            </div>
            <button onClick={() => setToggle(!toggle)}>{toggle ? 'Read Less' : 'Read More'}</button>
        </div>
    )
}

export default ReadMoreToggle