import '../style/Modal.css';
import { useState } from "react"

function Modal(props) {
    const [name, setName] = useState('');
    return (
        <div className="modalBackground">
            <div className="modalContainer">
                <div className="title">
                    <h1>WPM: {props.stats.wpm}</h1>
                    <h2>Incorrect keys: {props.stats.incorrect}</h2>
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

                            const url = `https://typing-test-apis.herokuapp.com/api/add`
                            const res = await fetch(url, {
                                method: 'POST',
                                headers: {
                                    'Accept': 'application/json',
                                    'Content-Type': 'application/json'
                                },

                                body: JSON.stringify({
                                    name: name,
                                    score: props.stats.wpm,
                                    league: props.originalTime
                                })
                            })
                            console.log(res.json())
                            return res.json()
                        }
                        }>Close</button>
                </div>
            </div>
        </div>
    )
}
export default Modal;