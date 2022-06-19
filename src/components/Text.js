import {useEffect, useState} from 'react'
function Text(props) {
    const text = (`Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.    `.split(""));
    const [keysPressed, setKeysPressed] = useState(0);
    const [incorrect, setIncorrect] = useState([]);

    let index = props.index;
    let userLetter = props.userLetter;

    
    useEffect(() => {
        let timeLeft = props.timeLeft;
        
        if(timeLeft === 0) {
            let countIncorrect = 0;
            text.map((s, i) => {
                if(i <= index) {
                    if(props.word[i] != s) countIncorrect++;
                }
                else return;
            })
            console.log("keys pressed", props.word.length)
            console.log("incorrect", countIncorrect)
        }
    })    

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