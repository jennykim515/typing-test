import {useEffect, useState} from 'react';
import Text from './Text'
import '../style/Test.css'
import ThemeOptions from './ThemeOptions';
import TimerOptions from './TimerOptions';
import Input from './Input';
import Modal from './Modal';
function Home() {
    // const [init, setInit] = useState({
    //     timeLeft: 60,
    //     originalTime: 60,
    //     go: 0,
    //     index: -1,
    //     userInput: '',
    //     showModal: false
    // })

    const [count, setCount] = useState(60);
    const [originalTime, setOriginalTime] = useState(60);
    const [theme, setTheme] = useState("light");
    const [go, setGo] = useState(0);
    const [index, setIndex] = useState(-1);
    const [word, setWord] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [stats, setStats] = useState({
        wpm: 0,
        incorrect: 0
    })

    const handleCount = (newCount) => {
        setCount(newCount)
    }

    const handleTheme = (newTheme) => {
        setTheme(newTheme);
    }

    const handleStats = (stats) => {
        setStats({
            wpm: stats.wpm,
            incorrect: stats.incorrect
        })
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
        let index = word.length - 1;
        setIndex(() => index);
    }

    const stopTimer = () => {
        setShowModal(true);
        setGo(0);
        setIndex(-1);
        setWord('');
        setCount(60);
    }

    useEffect(() => {
        if(count === 0) {
            console.log("Here")
            stopTimer();
        }
    })

    return (
        <div id="contain" className={theme}>
            {showModal && 
                    <Modal 
                        setShowModal={setShowModal} 
                        stats={stats}
                    />
            }
            <div id='center'>
                <TimerOptions updateCount={handleCount} setOriginalTime={setOriginalTime} />
                <ThemeOptions updateTheme={handleTheme}/>
                <h1>{count}</h1>
                <div className="txt">
                    <Text   
                        index={index}
                        timeLeft={count}
                        originalTime={originalTime}
                        word={word}
                        setStats={handleStats}
                    />
                    <Input inputValue={word} startTimer={startTimer} handleTyping={handleTyping} />
                </div>
                
            </div>
        </div>
    )
}

export default Home;