import Navbar from "../components/Navbar";
import ActivityHeatmap from "../components/ActivityHeatmap";
import "../styles/Home.css";

function Home() {
    return (
        <div className="portfolio-container">
            <Navbar />
            <main className="home-main">
                <ActivityHeatmap />
            </main>
        </div>
    );
}

export default Home;
