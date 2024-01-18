import React from 'react';
const today=new Date();

function Footing() {
    return (
        <div class="navbar footer">
            <p>Developed by Southern Railway - {today.getFullYear()}</p>
      </div>
    );
  }
  
  export default Footing;