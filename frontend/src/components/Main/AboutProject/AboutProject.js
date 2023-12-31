import './AboutProject.css'

function AboutProject() {

  return (
    <section className='about-project' id='about-project'>
      <h2 className='about-project__title'>О проекте</h2>
      <div className='about-project__blocks'>
        <div className='about-project__block'>
          <h3 className='about-project__block-name'>Дипломный проект включал 5&nbsp;этапов</h3>
          <p className='about-project__block-text'>Составление плана, работу над бэкендом, вёрстку, добавление функциональности и&nbsp;финальные доработки.</p>
        </div>
        <div className='about-project__block about-project__block_mod'>
          <h3 className='about-project__block-name about-project__block-name_mod'>На&nbsp;выполнение диплома ушло 5&nbsp;недель</h3>
          <p className='about-project__block-text'>У&nbsp;каждого этапа был мягкий и&nbsp;жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
        </div>
      </div>
      <div className='about-project__blocks about-project__blocks_mod'>
        <div className='about-project__blocks-items-1'>
          <p className='about-project__time'>1&nbsp;неделя</p>
          <p className='about-project__development'>Back-end</p>
        </div>
        <div className='about-project__blocks-items-2'>
          <p className='about-project__time about-project__time_mod'>4&nbsp;недели</p>
          <p className='about-project__development'>Front-end</p>
        </div>
      </div>
    </section>
  )
}

// BEM validate done!
export default AboutProject;