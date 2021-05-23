import React, { useState } from 'react';
import './AddRequest.css';

function AddRequest(props) {
  const [name, setName] = useState('');
  const [type, setType] = useState('1');

  const nameInput = React.createRef();

  function handleSubmit(){
    if(name.trim().length === 0){
      nameInput.current.focus();
      return;
    }
    props.submit({name, type});
    setName('');
    setType('1');
  }

  return (
    <div className="add-request">
      <div className="form-item">
        <label>Request name: </label>
        <input 
          type="text" 
          ref={nameInput}
          value={name} 
          onChange={e => setName(e.target.value)}
          placeholder="required"
          ></input>
      </div>
      <div className="form-item">
        <label>Request type: </label>
        <select 
          value={type} 
          onChange={e => setType(e.target.value)}
          >
            <option value="1">Echo name in 1 seconds</option>
            <option value="2">Echo random number in 2 seconds</option>
          </select>
      </div>
      <button onClick={handleSubmit}>Add request</button>
    </div>
  );
}

export default AddRequest;
