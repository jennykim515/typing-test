import { useEffect, useState } from 'react';
import $ from "jquery";
function Text(props) {
    const [text, setText] = useState(''.split(""))
    const [totalCharsTyped, setTotal] = useState(0);
    const [incorrect, setIncorrect] = useState(0);
    let index = props.index;
    let timeLeft = props.timeLeft;


    function handleStats(wpm, incorrect) {
        props.setStats({
            wpm: wpm,
            incorrect: incorrect
        })
    }

    function checkIncorrect() {
        text.map((s, i) => {
            if (i <= index) {
                if (props.word[i] !== s) {
                    setIncorrect(prev => prev + 1);
                }
            }
            return false;
        })
    }

    function getNewText() {
        $.ajax({
            type: "GET",
            url: "https://icanhazdadjoke.com/",
            headers: { Accept: "application/json" }
        }).then((data) => {
            setText(data.joke.split(""));
        });
    }

    function reset() {
        index = 0;
        setTotal(0);
        setIncorrect(0);
        getNewText();
    }

    useEffect(() => {
        getNewText();
    }, []);

    useEffect(() => {
        if (index === text.length - 1) {
            setTotal(prev => {
                return prev + index;
            });
            checkIncorrect()
            index = 0;
            getNewText();
            props.setWord("");
        }
    }, [index])

    useEffect(() => {
        if (timeLeft === 1) {
            setTotal(prev => {
                return prev + index;
            });
            checkIncorrect()
        }
        else if (timeLeft === 0) {
            let wpm = Math.ceil(Math.ceil((totalCharsTyped / 5) / (props.originalTime / 60)) - (incorrect / 5));
            handleStats(wpm, incorrect);
            reset();
        }
    }, [timeLeft])

    return (
        <div className="text" >
            {text.map(function (s, i) {
                let color;
                if (i < props.word.length) {
                    color = s === props.word[i] ? 'var(--correct)' : 'var(--incorrect)';
                }
                return <span key={i} style={{ color: color }}>{s}</span>
            })}
        </div>
    )
}

export default Text;