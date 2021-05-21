import './RequestList.css';

function RequestList(props) {
  return (
    <div className="request-list">
      <input 
      type="search" 
      placeholder="search request name" 
      value={props.searchText} 
      onChange={props.onSearchTextChange}
      ></input>

      <ul>
      {props.requestList.map((request, index) =>
        <li key={request.name}>
          <span className="request-no">#{index + 1}</span>
          <span className="request-name">{request.name}</span>
        </li>
      )}
      </ul>
    </div>
  );
}

export default RequestList;
