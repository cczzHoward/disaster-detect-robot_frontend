

import Head from 'next/head';
import Navbar from './navbar';
import Footer from './footer'


export default function Layout({ children }) {
    return (
        <div className="d-flex flex-column min-vh-100">
            <Head>
            <title>DDRobot</title>
            <link rel="icon" href="/favicon.ico" />
            <meta charSet='utf-8'/>
            <meta name='viewport' content='initial-scale=1.0, width=device-width'/>
            </Head>
            <Navbar/>
            <main className="flex-grow-1">
                {children}
            </main>
            <Footer/>
        </div>
    );
}