export default function Footer() {
    return (
        <div className="container">
          <footer className="py-3 my-4">
            <ul className="nav justify-content-center border-bottom pb-3 mb-3">
                <li className="nav-item"><a href="/" className="nav-link px-2 text-body-secondary">Home</a></li>
                <li className="nav-item"><a href="/training" className="nav-link px-2 text-body-secondary">Training Model</a></li>
                <li className="nav-item"><a href="/result" className="nav-link px-2 text-body-secondary">Model Results</a></li>
            </ul>
            <p className="text-center text-body-secondary">© 2024 Disaster Detect Robot</p>
          </footer>
        </div>
    );
}