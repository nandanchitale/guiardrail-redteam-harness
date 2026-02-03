import { Link, Routes, Route } from 'react-router-dom';
import './App.css'
import { Overview } from './pages/Overview'
import { RunHistory } from './pages/RunHistory'
import { IncidentTable } from './pages/IncidentTable';

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
      </Routes>
    </div>
  )
}

export default App;
