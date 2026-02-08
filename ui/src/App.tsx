import { Link, Routes, Route } from 'react-router-dom';
import './App.css'
import { Overview } from './pages/Overview'
import { RunHistory } from './pages/RunHistory'
import { IncidentTable } from './pages/IncidentTable';
import { RunDetail } from './pages/RunDetail';
import { RunComparision } from './pages/RunComparision';

function App() {
  return (
    <div>
      <nav
        style={{
          padding: 12,
          borderBottom: "1px solid #ddd",
          marginBottom: 16
        }}
      >
        <Link to="/" style={{ marginRight: 16 }}>Overview</Link>
        <Link to="/runs">Runs</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Overview />} />
        <Route path="/runs" element={<RunHistory />} />
        <Route path="/runs/:index/incidents" element={<IncidentTable />} />
        <Route path="/runs/:index/" element={<RunDetail />} />
        <Route path="/runs/:index/compare" element={<RunComparision />} />
      </Routes>
    </div>
  )
}

export default App;
