import { Box, Text, TextField, Image, Button } from '@skynexui/components';
import React from 'react';
import appConfig from '../config.json';
import { createClient } from '@supabase/supabase-js';

const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTY0MzI5MTQyNSwiZXhwIjoxOTU4ODY3NDI1fQ.hrrZ5TJIrWW9z57am4a2IrmpAKYeJFn4-_pfGYRlk80';
const SUPABASE_URL = 'https://kaoyvwxqyyjlalmccmah.supabase.co';
const supabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export default function ChatPage() {
    let [defaultTheme, setDefaulTheme] = React.useState(appConfig.defaultTheme)
    const [mensagem, setMensagem] = React.useState('')
    const [listaDeMensagens, setListaDeMensagens] = React.useState([])

    React.useEffect(() => {
        supabaseClient
            .from('mensagens')
            .select('*')
            .order('id', { ascending: false })
            .then(({ data }) => {
                console.log('useeffect', data)
                setListaDeMensagens(data);
            });
    }, [])

    function handleNovaMensagem(novaMensagem) {
        const mensagem = {
            // id: listaDeMensagens.length + (Math.random() * 100),
            de: 'pedrohenriquebl',
            texto: novaMensagem,
        }

        supabaseClient
            .from('mensagens')
            .insert([
                mensagem
            ])
            .then(({ data }) => {
                console.log('mensagens', data)
                setListaDeMensagens([
                    data[0],
                    ...listaDeMensagens
                ])
            });

        // setListaDeMensagens([
        //     mensagem,
        //     ...listaDeMensagens
        // ]);
        setMensagem('');
    }

    return (
        <Box
            styleSheet={{
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                backgroundColor: appConfig.theme.colors.primary[500],
                backgroundImage: defaultTheme.backgroundImage,
                backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundBlendMode: 'multiply',
                color: appConfig.theme.colors.neutrals['000']
            }}
        >
            <Box
                styleSheet={{
                    display: 'flex',
                    flexDirection: 'column',
                    flex: 1,
                    boxShadow: '0 2px 10px 0 rgb(0 0 0 / 20%)',
                    borderRadius: '5px',
                    backgroundColor: appConfig.theme.colors.neutrals[700],
                    height: '100%',
                    maxWidth: '95%',
                    maxHeight: '95vh',
                    padding: '32px',
                }}
            >
                <Header />
                <Box
                    styleSheet={{
                        position: 'relative',
                        display: 'flex',
                        flex: 1,
                        height: '80%',
                        backgroundColor: appConfig.theme.colors.neutrals[600],
                        flexDirection: 'column',
                        borderRadius: '5px',
                        padding: '16px',
                    }}
                >

                    <MessageList mensagens={listaDeMensagens} setListaDeMensagens={setListaDeMensagens} />
                    {/* 
                    {listaDeMensagens.map((mensagemAtual) => {
                        return (
                            
                            This key helps each li-msg to contain an unique key.
                            Everytime you render a list it triggers internal mechanism on React
                            the helps to identify each one of it to improve perfomance.                            T
                            
                        <li key={mensagemAtual.id}>
                            {mensagemAtual.de}: {mensagemAtual.texto}
                        </li>
                        );
                    })} */}

                    <Box
                        as="form"
                        styleSheet={{
                            display: 'flex',
                            alignItems: 'center',
                        }}
                    >
                        <TextField
                            value={mensagem}
                            onChange={(event) => {
                                const valor = event.target.value;
                                setMensagem(valor);
                            }}
                            onKeyPress={(event) => {
                                if (event.key === "Enter") {
                                    event.preventDefault();
                                    handleNovaMensagem(mensagem);
                                }
                            }}
                            placeholder="Insira sua mensagem aqui..."
                            type="textarea"
                            styleSheet={{
                                width: '100%',
                                border: '0',
                                resize: 'none',
                                borderRadius: '5px',
                                padding: '6px 8px',
                                backgroundColor: appConfig.theme.colors.neutrals[800],
                                marginRight: '12px',
                                color: appConfig.theme.colors.neutrals[200],
                            }}
                        />
                        <Button
                            onClick={(event) => {
                                event.preventDefault;
                                handleNovaMensagem(mensagem);
                            }}
                            label="Enviar"
                            buttonColors={{
                                contrastColor: appConfig.theme.colors.neutrals["000"],
                                mainColor: appConfig.theme.colors.primary[1010],
                                mainColorLight: appConfig.theme.colors.primary[400],
                                mainColorStrong: appConfig.theme.colors.primary[1020],

                            }}
                            styleSheet={{
                                padding: "12px",
                                marginBottom: "5px"
                            }}>
                        </Button>
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}

function Header() {
    return (
        <>
            <Box styleSheet={{ width: '100%', marginBottom: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }} >
                <Text variant='heading5'>
                    Chat
                </Text>
                <Button
                    variant='tertiary'
                    colorVariant='neutral'
                    label='Logout'
                    href="/"
                />
            </Box>
        </>
    )
}


function MessageList(props) {
    // console.log(props.mensagens)   
    
    function Profile() {
        console.log('teste')
        return (
            <>
                <style jsx>
                    {`
                    div {                        
                        widht: 300px;
                        height: 100px;
                        background-color: ${appConfig.defaultTheme.colors.primary[100]}
                        border: 1px solid red;    
                    }                
                `}
                </style>
                <div>
                    <p>teste</p>
                </div>
            </>
        );
    }

    function handleRemovedMsg(messageId) {

        let novaLista = props.mensagens.filter((message) => {
            if (message.id != messageId) {
                return message;
            }
        })
        props.setListaDeMensagens([
            ...novaLista
        ]);
    }

    return (
        <Box
            tag="ul"
            styleSheet={{
                overflow: 'scroll',
                overflowX: 'hidden',
                display: 'flex',
                flexDirection: 'column-reverse',
                flex: 1,
                color: appConfig.theme.colors.neutrals["000"],
                marginBottom: '16px',
            }}
        >
            {props.mensagens.map((mensagem) => {
                return (
                    <Text
                        key={mensagem.id}
                        tag="li"
                        styleSheet={{
                            borderRadius: '5px',
                            padding: '6px',
                            marginBottom: '12px',
                            hover: {
                                backgroundColor: appConfig.theme.colors.neutrals[700],
                            }
                        }}
                    >
                        <Box
                            styleSheet={{
                                marginBottom: '8px',
                            }}
                        >
                            <Image
                                onMouseOver={Profile}
                                styleSheet={{
                                    textAlign: "center",
                                    width: '30px',
                                    height: '30px',
                                    borderRadius: '50%',
                                    display: 'inline-block',
                                    marginRight: '8px',
                                    marginTop: '5px',
                                    position: "relative",
                                    top: "10px"
                                }}
                                src={`https://github.com/${mensagem.de}.png`}
                            />
                            <Text
                                styleSheet={{

                                }}
                                tag="strong">
                                {mensagem.de}
                            </Text>
                            <Text
                                styleSheet={{
                                    fontSize: '10px',
                                    marginLeft: '8px',
                                    color: appConfig.theme.colors.neutrals[300],
                                }}
                                tag="span"
                            >
                                {(new Date().toLocaleDateString())}
                            </Text>
                            <Button
                                onClick={() => {
                                    handleRemovedMsg(mensagem.id)
                                }}
                                buttonColors={{
                                    contrastColor: appConfig.theme.colors.neutrals["000"],
                                    mainColor: appConfig.theme.colors.primary[1010],
                                    mainColorLight: appConfig.theme.colors.primary[400],
                                    mainColorStrong: appConfig.theme.colors.primary[1020],
                                }}
                                label='x'
                                styleSheet={{
                                    borderRadius: "50%",
                                    height: "30px",
                                    marginLeft: "90%",
                                    paddingLeft: "20px",
                                    marginRight: "0",
                                    width: "20px",
                                    display: "flex",
                                    flexDirection: "row",
                                    justifyContent: "flex-end",
                                    alignItems: "center",
                                    position: "relative",
                                    top: "-30px",
                                    background: "none"
                                }}>

                            </Button>
                        </Box>
                        {mensagem.texto}
                    </Text>
                );
            })}
        </Box>
    )
}