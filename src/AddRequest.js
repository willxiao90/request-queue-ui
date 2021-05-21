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
        <label>request name:</label>
        <input 
          type="text" 
          value={name} 
          onChange={setName}
          ></input>
      </div>
      <div>
        <label>request type:</label>
        <select 
          value={type} 
          onChange={setType}
          >
            <option value="1">echo name in 1 seconds</option>
            <option value="2">return random number in 2 seconds</option>
          </select>
      </div>
      <button onClick={handleSubmit}>Add</button>
    </form>
  );
}

export default AddRequest;
