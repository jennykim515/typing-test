import {useEffect, useRef, useState} from 'react';
import Text from './Text'
import '../style/Test.css'
import ThemeOptions from './ThemeOptions';
import TimerOptions from './TimerOptions';
import Input from './Input';
import Modal from './Modal';
function Home() {
    const [count, setCount] = useState(60);
    const [originalTime, setOriginalTime] = useState(60);
    const [theme, setTheme] = useState("light");
    const [init, setInit] = useState({
        go: 0,
        index: -1,
        word: '',
        showModal: false
    })
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

    const handleTyping = (e) => {
        let word = e.target.value;
        setWord(word);
        let ind = word.length - 1;
        // setIndex(() => index);
        setInit(prevConfig => {
            return {
                ...prevConfig,
                index: ind
            }
        })
    }

    const setWord = (newWord) => {
        setInit(prevConfig => {
            return {
                ...prevConfig,
                word: newWord
            }
        })
    }
    
    const setShowModal = (bool) => {
        setInit(prevConfig => {
            return {
                ...prevConfig,
                showModal: bool
            }
        })
    }

    const startTimer = () => {
        let temp = count;
        setInit(prevConfig => {
            return {
                ...prevConfig,
                go: init.go + 1
            }
        })
        if(init.go === 0) {
            setInit(prevConfig => {
                return {
                    ...prevConfig,
                    index: 0
                }
            })
            let run = setInterval(() => {
                if(temp-- <= 0) clearInterval(run); 
                else setCount((count) => count - 1);
            }, 1000)
        }
    }

    const stopTimer = () => {
        setShowModal(true);
        setInit(prevConfig => {
            return {
                ...prevConfig,
                go: 0
            }
        })
        setWord('');
        setCount(originalTime);
    }

    const inputRef = useRef();

    const refocus = () => {
        inputRef.current.focus();
    }

    useEffect(() => {
        if(count === 0) {
            stopTimer();
        }
    })

    useEffect(() => {
        refocus();
    }, [originalTime, theme])

    useEffect(() => {
        function handleKeyDown(e) {
          refocus();
        }
        document.addEventListener('keydown', handleKeyDown);
        return function cleanup() {
          document.removeEventListener('keydown', handleKeyDown);
        }
      }, []);

    return (
        <div id="contain" className={theme}>
            {init.showModal && 
                    <Modal 
                        setShowModal={setShowModal} 
                        stats={stats}
                    />
            }
            <div id='center'>
                {!init.go ? <TimerOptions updateCount={handleCount} setOriginalTime={setOriginalTime} /> : <></>}
                {!init.go ? <ThemeOptions updateTheme={handleTheme}/> : <></>}
                <div id='timer'>
                    <h1>{count}</h1>
                </div>
                <div className="txt">
                    <Text   
                        index={init.index}
                        timeLeft={count}
                        originalTime={originalTime}
                        word={init.word}
                        setWord={setWord}
                        setStats={handleStats}
                    />
                    <Input key="input" modalShow={init.showModal} ref={inputRef} inputValue={init.word} startTimer={startTimer} handleTyping={handleTyping} />
                </div>
                
            </div>
        </div>
    )
}

export default Home;