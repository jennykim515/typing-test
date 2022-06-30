import '../style/Modal.css';
function Modal(props) {
    return (
        <div className="modalBackground">
            <div className="modalContainer">
                <div className="title">
                    <h1>WPM: {props.stats.wpm}</h1>
                    <h2>Incorrect keys: {props.stats.incorrect}</h2>
                </div>
                <div className="body">
                    <button className='btn-primary' 
                        onClick={() => {
                            props.setShowModal(false);
                            props.refocus(); 
                            console.log("close")}
                        }>Close</button>
                </div>
            </div>
        </div>
    )
}
export default Modal;