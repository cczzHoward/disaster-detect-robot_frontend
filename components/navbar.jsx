import { useRouter } from "next/router"

export default function Navbar() {
    const router = useRouter();

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light navbar-dark bg-dark">
          <div className="container-fluid">
            <a className="navbar-brand fs-3" href="/">DDRobot</a>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav">
                <li className="nav-item">
                    <a className={`nav-link ${router.pathname === '/training' ? 'active' : ''}`} aria-current={router.pathname === '/training' ? 'page' : undefined} href="/training">
                    <i className="fa-solid fa-flask-vial pe-2"></i>
                      Training Model
                    </a>
                </li>
                <li className="nav-item">
                    <a className={`nav-link ${router.pathname === '/result' ? 'active' : ''}`} aria-current={router.pathname === '/result' ? 'page' : undefined} href="/result">
                      <i className="fa-solid fa-robot pe-2"></i>
                      Model Results
                    </a>
                </li>
              </ul>
            </div>
          </div>
        </nav>
    )
}