import './ActionBar.css';

function ActionBar(props) {
  return (
    <div className="action-bar">
      <div>
        <button onClick={() => props.executeNext()}>Execute next request</button>
      </div>
      <div style={{marginTop: 8}}>
        <button onClick={() => props.getSize()}>Get queue size</button>
      </div>
    </div>
  );
}

export default ActionBar;
