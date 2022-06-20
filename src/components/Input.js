function Input(props) {
    function handleTimer() {
        props.startTimer();
    }

    function handleType(e) {
        props.handleTyping(e);
    }
    
    return (
        <>
        <input 
            key="themeset" 
            autoFocus 
            className="hidden" 
            onKeyPress={handleTimer} 
            onChange={handleType}
            value={props.inputValue}
        />
        </>
    )
}

export default Input;