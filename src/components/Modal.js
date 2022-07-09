import '../style/Modal.css';
import { useState } from "react"

function Modal(props) {
    const score = props.stats.wpm - Math.floor(props.stats.incorrect / 5);
    const [name, setName] = useState('');
    return (
        <div className="modalBackground">
            <div className="modalContainer">
                <div className="title">
                    <h1>Gross WPM: {props.stats.wpm}</h1>
                    <h2>Incorrect keys: {props.stats.incorrect}</h2>
                    <h3>Adjusted Score: {score}</h3>
                </div>
                <div className="body">
                    <p>Put your score on the leaderboard:</p>
                    <div className='personInfo'>
                        <input
                            type="text"
                            value={name}
                            placeholder="Enter your name"
                            onChange={e => setName(e.target.value)}
                        />
                    </div>

                    <button className='btn-primary'
                        onClick={async () => {
                            props.setShowModal(false);
                            if (name.length != 0) {
                                const url = `https://typing-test-apis.herokuapp.com/api/add`
                                const res = await fetch(url, {
                                    method: 'POST',
                                    headers: {
                                        'Accept': 'application/json',
                                        'Content-Type': 'application/json'
                                    },

                                    body: JSON.stringify({
                                        name: name,
                                        score: score,
                                        league: props.originalTime
                                    })
                                })
                            }
                        }

                        }>Close</button>
                </div>
            </div>
        </div>
    )
}
export default Modal;