import {useEffect, forwardRef} from 'react';
function Input(props, ref) {
    function handleTimer() {
        props.startTimer();
    }

    function handleType(e) {
        props.handleTyping(e);

    }

    return (
        <>
        <input 
            disabled={props.modalShow}
            ref={ref}
            key="themeset" 
            id="themeset"
            className="hidden" 
            onKeyPress={handleTimer} 
            onChange={handleType}
            value={props.inputValue}
        />
        </>
    )
}

export default forwardRef(Input);