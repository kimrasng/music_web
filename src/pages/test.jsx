import React  from 'react';

const test = () => {
    const discordLogin = async () => {
        const url = `https://discord.com/oauth2/authorize?client_id=1325978603174887494&response_type=code&redirect_uri=http%3A%2F%2Flocalhost%3A3000&scope=identify+email`;

        // 사용자를 Discord 로그인 페이지로 리디렉션합니다.
        window.location.href = url;
        
        // URL에서 authorization code를 추출
        const urlParams = new URLSearchParams(window.location.search);
        const code = urlParams.get('code');

        if (code) {
            const data = {
                client_id: 'id-',
                client_secret: '비밀번호',
                grant_type: 'authorization_code',
                code: code,
                redirect_uri: 'http://localhost:3000/oauth/redirect',
                scope: 'identify, email',
            }

            const response = await fetch('https://discord.com/api/oauth2/token', {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            });

            const responseData = await response.json();

            console.log(responseData.access_token); // Here is your access token
        }
    };

    // 임시 스타일 정의
    const buttonStyle = {
        backgroundColor: 'blue',
        color: 'white',
        fontSize: '20px',
        padding: '10px 20px',
        borderRadius: '5px',
        border: 'none',
        cursor: 'pointer',
    };
    
    return (
        <button onClick={discordLogin} style={buttonStyle} >
            Login with Discord
        </button>
    );
};

export default test;