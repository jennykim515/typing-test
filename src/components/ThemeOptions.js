function ThemeOptions(props) {
    function handleTheme(opt) {
        props.updateTheme(opt);
    }
    const options = ["ocean", "bubbly", "dark", "light"];
    let buttons = options.map(opt => {
        return <button className="button" onClick={() => { handleTheme(opt) }} key={opt}>{opt}</button>
    })
    return (
        <div className="buttons">
            set theme: {buttons}
        </div>
    )
}

export default ThemeOptions;