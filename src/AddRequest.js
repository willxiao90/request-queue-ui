import React, { useState } from 'react';
import './AddRequest.css';

function AddRequest(props) {
  const [name, setName] = useState('');
  const [type, setType] = useState('1');

  function handleSubmit(){
    props.submit({name, type})
  }

  return (
    <form className="add-request">
      <div>
        <label>Request name:</label>
        <input 
          type="text" 
          value={name} 
          onChange={setName}
          ></input>
      </div>
      <div>
        <label>Request type:</label>
        <select 
          value={type} 
          onChange={setType}
          >
            <option value="1">Echo name in 1 seconds</option>
            <option value="2">Return random number in 2 seconds</option>
          </select>
      </div>
      <button onClick={handleSubmit}>Add</button>
    </form>
  );
}

export default AddRequest;
