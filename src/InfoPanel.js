import './InfoPanel.css';

function InfoPanel(props) {
  return (
    <div className="info-panel">
      <ul>
      {props.logs.map((msg, index) =>
        <li key={index}>
          <span className="info-panel__msg ellipsis" title={msg}>{msg}</span>
        </li>
      )}
      </ul>
    </div>
  );
}

export default InfoPanel;
