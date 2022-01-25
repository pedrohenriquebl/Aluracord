export default function ThemeChangeButton(props) {
    const color = props.color
    const handlerClick = props.event
    const theme = props.theme       

    return (
        <>
            <input type="button" onClick={() => handlerClick(theme)}></input>
            <style jsx>{/*css*/`
            input{
                background-image: ${theme.icon};
                background-size: cover;
                width: 30px;
                height: 30px;
                border-radius: 12%;
                margin: 0 5px;
                border: solid 1px ${color};
                cursor: pointer;
                transition: 200ms ease-in-out;
            }
           
            input:hover {
                border: solid 1px #000000
            }
            `
            }           

            </style>
        </>
    );
}