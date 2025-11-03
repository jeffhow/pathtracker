import { useState } from 'react'
import './App.css'
import Abilities from './Abilities';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <div className="bg-stone-700 py-2 px-8 text-white">
      <h1 className="text-sm font-bold m-0">
        <a href="#" className="hover:underline">
          Pathtracker
        </a>
      </h1>
    </div>
    <div className="p-8">
      <Abilities />
    </div>
    </>
  )
}

export default App
