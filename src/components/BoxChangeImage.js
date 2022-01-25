export default function BoxChangeImage(props){

    const theme = props.theme;
    const boxWallpaper = props.boxWallpaper;

    return (
        <>  
            <style jsx>{`
                div {                        
                    background-image: ${theme.boxWallpaper}';
                    background-size: '100%';  
                    opacity: '0.8';                                       
                    display: 'flex';
                    align-items: 'center';
                    justify-content: 'space-between';
                    flex-direction: column;
                    width: '100%';
                    max-width: '800px';
                    border-radius: '5px';
                    padding: '32px';
                    margin: '16px';
                    box-shadow: '0 2px 10px 0 rgb(0 0 0 / 20%)';
                    background-color: #40566a70;
                    box-shadow:'10px 05px 40px 10px #0ff';
                }
            `
            }
            </style>
        </>
    );
}