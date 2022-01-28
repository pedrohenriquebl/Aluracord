import appConfig from '../config.json'
import { Box, Button, Text, TextField, Image } from '@skynexui/components';
import React from 'react';
import reactDom from 'react-dom';
import { useRouter } from 'next/router';
import ThemeChangeButton from '../src/components/ThemeChangeButton';

function Titulo(props) {
    const Tag = props.tag || 'h1';

    return (
        <>
            <Tag>{props.children}</Tag>
            <style jsx>{`
                ${Tag} {
                    color: ${appConfig.theme.colors.neutrals['000']};
                    font-size: 24px;                    
                }
            `}</style>
        </>
    );
}

export default function PaginaInicial() {

    const [username, setUsername] = React.useState('');
    const useURL = `https://api.github.com/users/${username}`
    const [userLocation, setUserLocation] = React.useState('')
    const roteamento = useRouter();
    let [defaultTheme, setDefaulTheme] = React.useState(appConfig.defaultTheme)

    function HandleChange(event) {
        setUsername(event.target.value)

        if (event.target.value.length > 2) {
            fetch(useURL)
                .then(response => response.json())
                .then(data => {
                    setUserLocation(data.location)
                })
        }
    }

    function changerTheme(theme) {
        setDefaulTheme(defaultTheme = theme)
    }

    const imageError = 'https://i.pinimg.com/736x/4d/9c/82/4d9c826f50fd5c6916d1a28877c574a6.jpg'

    return (
        <>
            <Box
                styleSheet={{
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    backgroundImage: defaultTheme.backgroundImage,
                    backgroundRepeat: 'no-repeat', backgroundSize: 'cover'
                }}
            >
                <Box id="main-box"
                    styleSheet={{
                        backgroundImage: `${defaultTheme.boxWallpaper}`,
                        backgroundRepeat: 'no-repeat',
                        backgroundSize: '100%',
                        opacity: '0.8',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        flexDirection: {
                            xs: 'column',
                            sm: 'row',
                        },
                        width: '100%', maxWidth: '800px', height: {
                            xs: '700px',
                            sm: '400px',
                        },
                        borderRadius: '5px', padding: '32px', margin: '16px',
                        boxShadow: '0 2px 10px 0 rgb(0 0 0 / 20%)',
                        backgroundColor: appConfig.theme.colors.neutrals[700],
                        boxShadow: '10px 05px 40px 10px #0ff',
                    }}
                >
                    {/* Formulário */}
                    <Box
                        as="form"
                        onSubmit={function (event) {
                            event.preventDefault();
                            roteamento.push(`/chat?username=${username}`);
                            // Jeito tradicional
                            // window.location.href = '/chat';

                            //Utilizando o hook do useRouter do next    
                        }}
                        styleSheet={{
                            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                            width: { xs: '100%', sm: '50%' }, textAlign: 'center', marginBottom: '32px'
                        }}
                    >
                        <Titulo tag="h2">Boas vindas de volta!</Titulo>
                        <Text variant="body3" styleSheet={{ marginBottom: '32px', color: defaultTheme.colors.primary[110], fontWeight: 900 }}>
                            {appConfig.name}
                        </Text>

                        <TextField
                            value={username}
                            onChange={HandleChange}
                            fullWidth
                            textFieldColors={{
                                neutral: {
                                    textColor: appConfig.theme.colors.neutrals[200],
                                    mainColor: appConfig.theme.colors.neutrals[900],
                                    mainColorHighlight: appConfig.theme.colors.primary[1010],
                                    backgroundColor: appConfig.theme.colors.neutrals[800],
                                },
                            }}
                        />
                        <Button styleSheet={{
                            marginBottom: '10px'
                        }}
                            type='submit'
                            label='Entrar'
                            fullWidth
                            buttonColors={{
                                contrastColor: appConfig.theme.colors.neutrals["000"],
                                mainColor: appConfig.theme.colors.primary[1010],
                                mainColorLight: appConfig.theme.colors.primary[400],
                                mainColorStrong: appConfig.theme.colors.primary[1020],
                            }}
                        />
                        <Box styleSheet={{
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            borderRadius: '10px',
                            width: '100%'
                        }}
                        >
                            <ThemeChangeButton theme={appConfig.theme2} color="#f107ce" event={changerTheme}></ThemeChangeButton>
                            <ThemeChangeButton theme={appConfig.theme3} color="#14a530" event={changerTheme}></ThemeChangeButton>
                            <ThemeChangeButton theme={appConfig.theme4} color="#0636d1" event={changerTheme}></ThemeChangeButton>
                            <ThemeChangeButton theme={appConfig.theme5} color="#f30101" event={changerTheme}></ThemeChangeButton>
                            <ThemeChangeButton theme={appConfig.theme6} color="#32009f" event={changerTheme}></ThemeChangeButton>
                            <ThemeChangeButton theme={appConfig.theme7} color="#f1f0009c" event={changerTheme}></ThemeChangeButton>
                            <ThemeChangeButton theme={appConfig.defaultTheme} color="#c96b00" event={changerTheme}></ThemeChangeButton>
                        </Box>
                    </Box>
                    {/* Formulário */}


                    {/* Photo Area */}
                    <Box
                        styleSheet={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            maxWidth: '200px',
                            padding: '16px',
                            backgroundColor: appConfig.theme.colors.neutrals[800],
                            border: '1px solid',
                            borderColor: appConfig.theme.colors.primary[1020],
                            borderRadius: '10px',
                            flex: 1,
                            minHeight: '240px',
                            opacity: '1'
                        }}
                    >
                        <Image
                            styleSheet={{
                                borderRadius: '50%',
                                marginBottom: '16px',
                                height: 'auto'
                            }}
                            src={
                                username.length > 2
                                    ? `https://github.com/${username}.png`
                                    : imageError
                            }
                        />
                        <Text
                            variant="body4"
                            styleSheet={{
                                color: appConfig.theme.colors.neutrals[200],
                                backgroundColor: appConfig.theme.colors.neutrals[900],
                                padding: '3px 10px',
                                borderRadius: '1000px'
                            }}
                        >
                            {username}
                        </Text>
                    </Box>
                    {/* Photo Area */}
                </Box>
            </Box>
        </>
    );
}