// InfoTooltip.js
import './InfoTooltip.css'
import React from "react"
import succesIcon from '../../images/succes.svg'
import error from '../../images/error.svg'

function InfoTooltip({onClose, isOpened, name , title, message}) {
  
  // ОТКРЫТЬ ПОПАП
  function handleClick(e) {
    e.stopPropagation();
    onClose();
  }

  // ОТКРЫТЬ НУЖНЫЙ ПОПАП
  function handleClickForChildren(e) {
    e.stopPropagation();
    return
  }

  return (
    <div onClick={handleClick} className={isOpened ? 'popup popup_is-opened' : 'popup'} >
      <div className='popup__container'>
        <div onClick={handleClickForChildren} className="popup__block">
          <img alt={title ? "Успешно" : "Отказано"} src={title ? succesIcon : error} onClick={onClose}/>
          <h3 className="popup__title-help">{message}</h3>
        </div>
      </div>
    </div>
  )
}

export default InfoTooltip;