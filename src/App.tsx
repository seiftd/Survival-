import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import CategoryPage from './pages/Category';
import GuideDetail from './pages/GuideDetail';
import Search from './pages/Search';
import EmergencyMode from './pages/EmergencyMode';
import Favorites from './pages/Favorites';
import CompassPage from './pages/Compass';
import Checklist from './pages/Checklist';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="category/:id" element={<CategoryPage />} />
          <Route path="guide/:id" element={<GuideDetail />} />
          <Route path="search" element={<Search />} />
          <Route path="favorites" element={<Favorites />} />
        </Route>
        <Route path="/emergency" element={<EmergencyMode />} />
        <Route path="/compass" element={<CompassPage />} />
        <Route path="/checklist" element={<Checklist />} />
      </Routes>
    </BrowserRouter>
  );
}
