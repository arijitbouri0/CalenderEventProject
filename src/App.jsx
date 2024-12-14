import { useState } from 'react';
import NavBar from './components/NavBar'
import Home from './pages/Home'
import { Toaster } from "react-hot-toast";

function App() {
  const [searchQuery, setSearchQuery] = useState("");
  return (
    <>
      <Toaster />
      <NavBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <Home searchQuery={searchQuery} />
    </>
  )
}

export default App
