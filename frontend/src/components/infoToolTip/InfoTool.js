import './InfoTool.css';
import success from '../../images/succes.svg';
import oops from '../../images/oops.svg';

function InfoTool({ statusOk, text, opened, onClose }) {

  const handleOverlayClick = () => {
    onClose();
  };

  return (
    <div className={opened ? 'info-tool info-tool_opened' : 'info-tool'} onClick={handleOverlayClick}>
      <div className="info-tool__tooltip">
        <img className='info-tool__icon' alt='иконка' src={statusOk ? success : oops}></img>
        <p className="info-tool__tooltip-text">{text}</p>
      </div>
    </div>
  );
}

export default InfoTool;