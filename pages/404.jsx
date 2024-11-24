export default function Custom404() {
    return (
      <div className="container text-center d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
      <div>
        <h1 className="display-1">404</h1>
        <p className="lead">Sorry, the page you are looking for does not exist.</p>
        <a href="/" className="btn btn-dark">Go to Homepage</a>
      </div>
      </div>
    );
  }