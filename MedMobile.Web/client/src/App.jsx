import {useState} from 'react'
import PlayingComponent from './conponents/PlayingComponent'
import './App.css'


function App() {
    const [count, setCount] = useState(0);

    return (
        <>
            <PlayingComponent/>
        </>
    )
}

export default App
