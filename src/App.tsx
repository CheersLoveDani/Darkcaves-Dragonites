import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Layout } from "./components/layout";
import {
  HomePage,
  PokedexPage,
  CollectionPage,
  ConverterPage,
  SettingsPage,
} from "./pages";
import "./App.css";

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/pokedex" element={<PokedexPage />} />
          <Route path="/collection" element={<CollectionPage />} />
          <Route path="/converter" element={<ConverterPage />} />
          <Route path="/settings" element={<SettingsPage />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
