import { Routes, Route } from 'react-router-dom'
import Portfolio from './Profile'

// Example extra components
import VSAdminPanel from './Admin'

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Portfolio />} />
        <Route path="/admin" element={<VSAdminPanel />} />
      </Routes>
    </>
  )
}

export default App