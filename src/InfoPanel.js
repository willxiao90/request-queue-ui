import './InfoPanel.css';

function InfoPanel(props) {
  return (
    <div className="info-panel">
      <ul>
      {props.logs.map((msg, index) =>
        <li key={index}>
          {msg}
        </li>
      )}
      </ul>
    </div>
  );
}

export default InfoPanel;
