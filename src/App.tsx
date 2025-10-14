import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Layout from "./components/layout/Layout";

import HomePage from "./pages/homepage";
import Ensembleliste from "./pages/EnsembleListePage/ensembleliste";
import Composants from "./pages/composants";

import './styles/App.css';
import './styles/Layout.css';
import './styles/Partition.css';
import './styles/Note.css';
import MusicPiecePage from "./pages/MusicPiecePage/MusicPiecePage";
import MainMusicPiece from "./pages/MusicPiecePage/MainMusicPiece";
import Inscription from "./pages/inscription";
import MediaPage from "./pages/MediaPage/MediaPage";

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
                    <Route path=":id/medias" element={<MediaPage />} />
                </Route>
            </Routes>
        </Router>
    );
}

export default App;
