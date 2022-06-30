import {useEffect, useState} from 'react';
import $ from "jquery";
function Text(props) {
    // const text = (`Lorem Ipsum is simply dummy t`.split(""));

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
                if(i <= index) {
                    if(props.word[i] !== s) {
                        setIncorrect(prev => prev + 1);
                    }
                }
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
        if(index == text.length - 1) {
            console.log("******** current index", index)
            setTotal(prev => {
                console.log("previously", prev)
                console.log("updating to ", prev+ index)
                return prev + index;
            });
            checkIncorrect()
            index = 0;
            getNewText();
            props.setWord("");
        }
    }, [index])

    useEffect(() => {
        console.log("Total chars updated to", totalCharsTyped)
    }, [totalCharsTyped])
    useEffect(() => {
        if(timeLeft === 1) {
            console.log("~~~~~~~~~~~Setting total")
            console.log("Current index", index)
            setTotal(prev => {
                console.log("PREVIOUSLY", prev)
                console.log("to ", prev + index)
                return prev + index;
            });
            checkIncorrect()
        }
        else if(timeLeft === 0) {
            console.log("total words typed", totalCharsTyped/5)
            console.log("original time", props.originalTime/60)
            let wpm = Math.ceil(Math.ceil((totalCharsTyped / 5) / (props.originalTime / 60)) - (incorrect/5));
            handleStats(wpm, incorrect);
            reset();
        }
    }, [timeLeft])    

    return (
        <div className="text" >
            {text.map(function(s, i) {
                let color;
                if (i < props.word.length) {
                    color = s === props.word[i] ? 'var(--correct)' : 'var(--incorrect)';
                }
                return <span key={i} style={{color: color}}>{s}</span>
            })}
        </div>

)
}

export default Text;