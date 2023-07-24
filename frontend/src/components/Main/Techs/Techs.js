// Techs.js
import './Techs.css';

function Techs() {

  return (
    <section className='techs' id='techs'>
      <h3 className='techs__heading'>Технологии</h3>
      <div className='techs__block'>
        <h2 className='techs__title'>7&nbsp;технологий</h2>
        <p className='techs__text'>На&nbsp;курсе веб-разработки мы&nbsp;освоили технологии, которые применили в&nbsp;дипломном проекте.</p>
        <div className='techs__grid-blocks'>
          <ul className='techs__lists'>
            <li className='techs__list'>HTML</li>
            <li className='techs__list'>CSS</li>
            <li className='techs__list'>JS</li>
            <li className='techs__list'>React</li>
            <li className='techs__list'>Git</li>
            <li className='techs__list'>Express.js</li>
            <li className='techs__list'>mongoDB</li>
          </ul>
        </div>
      </div>
    </section>
  )
}

// BEM validation done!
export default Techs;