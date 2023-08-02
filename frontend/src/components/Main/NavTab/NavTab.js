// NavTab.js
import "./NavTab.css"
import { Link } from 'react-scroll';


function NavTab() {

  return (
    <section className="navTab">
      <nav className="navtab">
        <ul className="navtab__links">
          <li><Link smooth={true} duration={500} to="about-project" className="navtab__link">О&nbsp;проекте</Link></li>
          <li><Link smooth={true} duration={500} to="techs" className="navtab__link">Технологии</Link></li>
          <li><Link smooth={true} duration={500} to="about-me" className="navtab__link">Студент</Link></li>
        </ul>
      </nav>
    </section>
  )
}

export default NavTab;