import {useEffect, useState, useContext} from 'react';
import Text from './Text'
import '../style/Test.css'
import React, { useCallback } from 'react'


function Home() {
    const [count, setCount] = useState(60);
    const [theme, setTheme] = useState("light");
    const [go, setGo] = useState(0);
    const [letter, setLetter] = useState("");
    const [index, setIndex] = useState(-1);
    const [word, setWord] = useState('')

    const handleCount = (newCount) => {
        setCount(newCount)
    }

    const handleTheme = (newTheme) => {
        setTheme(newTheme);
    }

    const timerOptions = () => {
        const options = [5, 15, 30, 45, 60, 120];
        let buttons = options.map(opt => {
            return <button className="button" onClick={() => {handleCount(opt)}} key={opt}>{opt}</button>
        })
        return (
            <div className="buttons">
                set time: {buttons}
            </div>
        )
    }

    const themeOptions = () => {
        const options = ["ocean", "bubbly", "dark", "light"];
        let buttons = options.map(opt => {
            return <button className="button" onClick={() => {handleTheme(opt)}} key={opt}>{opt}</button>
        })
        return (
            <div className="buttons">
                set theme: {buttons}
            </div>
        )
    }
    
    const startTimer = () => {
        let temp = count;
        setGo((go) => go + 1);
        if(go === 0) {
            let run = setInterval(() => {
                if(temp-- <= 0) clearInterval(run); 
                else setCount((count) => count - 1);
            }, 1000)
        }
    }

    const handleTyping = (e) => {
        let word = e.target.value;
        setWord(word);
        let letter = word.slice(-1);
        let index = word.length - 1;
        setIndex(() => index);
        setLetter(() => letter);
    }
    
    useEffect(() => {
        console.log({theme})
    }, [theme])

    return (
        <div id="contain" className={theme}>
            <div id='center'>
                <>{timerOptions()}</>
                <>{themeOptions()}</>
                <h1>{count}</h1>
                <Text   
                    userLetter={letter} 
                    index={index}
                    timeLeft={count}
                    word={word}
                />
                <input key="themeset" autoFocus="true" className="hidden" onKeyPress={startTimer} onChange={handleTyping}></input>
            </div>
        </div>
    )
}

export default Home;