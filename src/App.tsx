import {BrowserRouter as Router, Routes, Route} from "react-router-dom";

import Layout from "./components/layout/Layout";

import HomePage from "./pages/homepage";
import Ensembleliste from "./pages/ensembleliste";
import Composants from "./pages/composants";

import './styles/app.css';
import './styles/layout.css';
import './styles/partition.css';
import './styles/note.css';

function App() {
    return (
        <Router>
            <Routes>
                {/* Page d’accueil (connexion) */}
                <Route
                    path="/homepage"
                    element={
                        <Layout hideHeader={true}>
                            <HomePage/>
                        </Layout>
                    }
                />

                {/* Page liste d’ensembles */}
                <Route
                    path="/listeensembles"
                    element={
                        <Layout>
                            <Ensembleliste/>
                        </Layout>
                    }
                />

                {/* Page composants */}
                <Route
                    path="/composants"
                    element={
                        <Layout>
                            <Composants/>
                        </Layout>
                    }
                />
            </Routes>
        </Router>
    );
}

export default App;
