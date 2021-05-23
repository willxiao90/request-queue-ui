import React, { useState, useMemo } from 'react';
import './RequestList.css';

function RequestList(props) {
  const [query, setQuery] = useState(''); // search text
  const [activeName, setActiveName] = useState(''); // current active request name

  const list = useMemo(() => {
    if(query.trim().length === 0) return props.items;
    return props.items.filter(v => v.name.indexOf(query) >= 0);
  }, [query, props.items]);

  let emptyTips;
  if(list.length === 0){
    if(query.trim().length > 0){
      emptyTips = <div className="empty-tips">No search results</div>
    }else{
      emptyTips = <div className="empty-tips">Request queue is empty</div>
    }
  }

  return (
    <div className="request-list">
      <input 
      className="search-input"
      type="search" 
      placeholder="search request name" 
      value={query} 
      onChange={e => setQuery(e.target.value)}
      ></input>

      <div className="request-container">
      {list.map((request, index) =>
        <div 
          className="request-item" 
          key={request.name} 
          onMouseEnter={() => setActiveName(request.name)} 
          onMouseLeave={() => setActiveName('')}
        >
          <span className="request-no">#{index + 1}</span>
          <span className="request-name ellipsis" title={request.name}>{request.name}</span>
          <span 
            className={`cancel-btn ${activeName === request.name ? 'active' : ''}`} 
            title="cancel"
            onClick={() => props.removeRequest(request)}
          >x</span>
        </div>
      )}

      {emptyTips}
      </div>
    </div>
  );
}

export default RequestList;
