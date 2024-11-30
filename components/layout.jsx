import Navbar from './navbar';
import Footer from './footer'


export default function Layout({ children }) {
    return (
        <div className="d-flex flex-column min-vh-100">
            <Navbar/>
            <main className="flex-grow-1">
                {children}
            </main>
            <Footer/>
        </div>
    );
}