import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Layout from "./components/layout/Layout";

import HomePage from "./pages/homepage";
import Ensembleliste from "./pages/ensembleliste";
import Composants from "./pages/composants";

import './styles/app.css';
import './styles/layout.css';
import './styles/partition.css';
import './styles/note.css';
import MusicPiecePage from "./pages/MusicPiecePage/MusicPiecePage";
import MainMusicPiece from "./pages/MusicPiecePage/MainMusicPiece";
import Inscription from "./pages/inscription";

function App() {
    return (
        <Router>
            <Routes>
                {/* Page d’accueil (connexion) */}
                <Route
                    path="/"
                    element={
                        <Layout hideHeader={true}>
                            <HomePage />
                        </Layout>
                    }
                />

                {/* Page inscription */}
                <Route
                    path="/inscription"
                    element={
                        <Layout>
                            <Inscription />
                        </Layout>
                    }
                />

                {/* Page liste d’ensembles */}
                <Route
                    path="/listeensembles"
                    element={
                        <Layout>
                            <Ensembleliste />
                        </Layout>
                    }
                />

                {/* Page composants */}
                <Route
                    path="/composants"
                    element={
                        <Layout>
                            <Composants />
                        </Layout>
                    }
                />

                {/* Page Fiche Morceau */}
                <Route path="/tracks" element={<Layout> <MainMusicPiece /> </Layout>}>
                    <Route path="" element={<MusicPiecePage />} />
                </Route>
            </Routes>
        </Router>
    );
}

export default App;
