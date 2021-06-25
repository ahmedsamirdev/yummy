import Footer from "../components/Footer";
import Link from "next/link";
import Navbar from "../components/Navbar";
export default function Layout({ children }) {
  return (
    <div className="layout">
      <header >
        <Navbar />
      </header>

      <div className="page-content">{children}</div>

      <footer><Footer /> </footer>
    </div>
  );
}
