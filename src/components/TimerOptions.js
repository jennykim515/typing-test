const TimerOptions = (props) => {
    function changeCount(opt) {
        props.updateCount(opt); 
        props.setOriginalTime(opt);
    }
    const options = [5, 15, 30, 45, 60, 120];
    let buttons = options.map(opt => {
        return <button className="button" onClick={() => {changeCount(opt)}} key={opt}>{opt}</button>
    })
    return (
        <div className="buttons">
            set time: {buttons}
        </div>
    )
}
export default TimerOptions;