import { Link } from "react-router-dom"
import Styles from "./Home.module.css"

function Home() {
    return (
    <div className={Styles.home}>

      <section
        className={Styles.hero}
      >
        <div className={Styles.heroOverlay}></div>

        <div className={Styles.heroContent}>
          <h1>Nutrición consciente para una vida saludable</h1>
          <p>
            Planes personalizados, acompañamiento profesional y hábitos que duran.
          </p>
          <label>
            <Link className={Styles.appLink} to="/agendar-turnos">Registrar Turno</Link>
          </label>
        </div>
      </section>

      <section className={Styles.services}>
        <h2>Mis Servicios</h2>

        <div className={Styles.servicesGrid}>
          <div className={Styles.serviceCard}>
            <h3>🍎 Planes personalizados</h3>
            <p>Adaptados a tus objetivos, gustos y estilo de vida.</p>
          </div>

          <div className={Styles.serviceCard}>
            <h3>🥗 Educación alimentaria</h3>
            <p>Aprendé a comer mejor sin dietas extremas.</p>
          </div>

          <div className={Styles.serviceCard}>
            <h3>💪 Seguimiento continuo</h3>
            <p>Acompañamiento real para sostener resultados.</p>
          </div>
        </div>
      </section>

      <section className={Styles.benefits}>
        <h2>¿Por qué elegirme?</h2>
        <ul>
          <li>✔ Atención personalizada</li>
          <li>✔ Enfoque integral en salud</li>
          <li>✔ Planes flexibles y realistas</li>
          <li>✔ Resultados sostenibles</li>
        </ul>
      </section>

    </div>
    )
}

export default Home