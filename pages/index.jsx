import Layout from '../components/layout';

export default function Home() {
  return (
    <Layout>
      <div className="container mt-5">
        <div className="row">
          <div className="col text-center">
            <h1 className="display-4">Welcome to the Home Page</h1>
            <p className="lead">Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste praesentium doloremque voluptas delectus quibusdam porro, est corrupti impedit. Cum suscipit nihil natus magni obcaecati nesciunt ea tenetur adipisci quis quaerat.</p>
            <hr className="my-4" />
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto excepturi voluptatibus perspiciatis magni laudantium qui rem id consequuntur, quia necessitatibus!</p>
            <a className="btn btn-dark btn-lg" href="/training" role="button">Start training</a>
          </div>
        </div>
      </div>
    </Layout>
    
  );
}