import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { useRuns } from './hooks/useRuns'

function App() {
  const [count, setCount] = useState(0)
  const { runs, loading, error } = useRuns();

  if (loading) return <div>Loading runs...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <p>Total runs loaded : {runs.length}</p>
        {runs[0] && (
          <pre>{JSON.stringify(runs[0], null, 2)}</pre>
        )}
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
