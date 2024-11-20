import styles from "../styles/navbar.module.css";

export default function Navbar() {
    return (
        <nav>
            <ul className={styles.navbar}>
                <li><a href="/">首頁</a></li>
                <li><a href="/training">訓練模型</a></li>
                <li><a href="/result">展示成果</a></li>
            </ul>
        </nav>
    )
}