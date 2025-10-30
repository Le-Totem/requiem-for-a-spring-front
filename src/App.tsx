import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Layout from "./components/layout/Layout";

import Ensembleliste from "./pages/EnsembleListePage/ensembleliste";

import './styles/styleApp.css';
import './styles/styleLayout.css';
import './styles/stylePartition.css';
import './styles/styleNote.css';
import MusicPiecePage from "./pages/MusicPiecePage/MusicPiecePage";
import MainMusicPiece from "./pages/MusicPiecePage/MainMusicPiece";
import Inscription from "./pages/inscription";
import MediaPage from "./pages/MediaPage/MediaPage";

import EnsemblePage from "./pages/EnsemblePage/ensemble";
import ListeMembres from "./pages/ListeMembres";
import Homepage from "./pages/homepage";
import ProtectedRoute from "./components/errorPages/ProtectedRoute";

function App() {
    return (
        <Router>
            <Routes>
                {/* Page d’accueil (connexion) */}
                <Route
                    path="/"
                    element={
                        <Layout showHeader={false} >
                            <Homepage showModale={false} children={undefined} />
                        </Layout>
                    }
                />

                <Route
                    path="/reset-password"
                    element={
                        <Layout showHeader={false}>
                            <Homepage showModale={true} children={undefined} />
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
                        <ProtectedRoute>
                        <Layout>
                            <Ensembleliste />
                        </Layout>
                        </ProtectedRoute>
                    }
                />
                <Route path="/ensemble/:id" element={
                    <ProtectedRoute>
                    <Layout>
                        <EnsemblePage />
                    </Layout>
                    </ProtectedRoute>
                } />

                {/* Page composants 
                <Route
                    path="/composants"
                    element={
                        <Layout>
                            <Composants />
                        </Layout>
                    }
                /> */}

                {/* Liste des membres */}
                <Route
                    path="/listemembres/:id"
                    element={
                        <ProtectedRoute>
                        <Layout>
                            <ListeMembres />
                        </Layout>
                        </ProtectedRoute>
                    } />

                {/* Page Fiche Morceau */}
                <Route path="/tracks" element={
                    <ProtectedRoute>
                        <Layout> 
                            <MainMusicPiece />
                        </Layout>
                        </ProtectedRoute>
                        }>
                    <Route path=""
                        element={
                        <MusicPiecePage />}
                        />
                    <Route path=":id/medias"
                        element={<MediaPage />}
                        />
                </Route>
            </Routes>
        </Router>
    );
}

export default App;
