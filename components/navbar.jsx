import { useRouter } from "next/router"

export default function Navbar() {
    const router = useRouter();

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light navbar-dark bg-dark">
          <div className="container-fluid">
            <a className="navbar-brand" href="/">DDRobot</a>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav">
                <li className="nav-item">
                    <a className={`nav-link ${router.pathname === '/training' ? 'active' : ''}`} aria-current={router.pathname === '/training' ? 'page' : undefined} href="/training">訓練模型</a>
                </li>
                <li className="nav-item">
                    <a className={`nav-link ${router.pathname === '/result' ? 'active' : ''}`} aria-current={router.pathname === '/result' ? 'page' : undefined} href="/result">成果展示</a>
                </li>
              </ul>
            </div>
          </div>
        </nav>
    )
}