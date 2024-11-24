

import Head from 'next/head';
import Navbar from './navbar';


export default function Layout({ children }) {
    return <div>
        <Head>
        <title>DDRobot</title>
        <link rel="icon" href="/favicon.ico" />
        <meta charSet='utf-8'/>
        <meta name='viewport' content='initial-scale=1.0, width=device-width'/>
        </Head>
        <Navbar/>
        <main>
        {children}
        </main>
        <footer>
        <p style={{textAlign: "center"}}>&copy; 2024 Disaster Detect Robot</p>
        </footer>
    </div>;
}