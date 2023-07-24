import "./AboutMe.css"
import aboutMePhoto from '../../../images/about-me__photo.jpg'

function AboutMe() {

  return (
    <section className='about-me' id='about-me'>
      <h3 className='about-me__title'>Студент</h3>
      <div className='about-me__blocks'>
        <div className='about-me__block'>
          <h2 className='about-me__name'>Владислав</h2>
          <h4 className='about-me__activity'>Начинающий Фронтенд-разработчик, 25&nbsp;лет</h4>
          <p className='about-me__description'>Я&nbsp;родился и&nbsp;живу в&nbsp;Иркутск, закончил технический университет ИРНИТУ. У&nbsp;меня есть любимая девушка и&nbsp;кот. Я&nbsp;люблю играть в&nbsp;футбол, а&nbsp;ещё увлекаюсь туризмом. Недавно начал кодить. С&nbsp;2022 года начал свое обучение в&nbsp;Яндекс.Практикум на&nbsp;веб-разработчика. После того, как закончу курс планирую связать свою деятельность в&nbsp;этой сфере.</p>
          <h5 className='about-me__platform'>Github</h5>
        </div>
        <div className='about-me__block-photo'>
          <img src={aboutMePhoto} className="about-me__photo" alt="Фото Студента" />
        </div>
      </div>
    </section>
  )
}

export default AboutMe;