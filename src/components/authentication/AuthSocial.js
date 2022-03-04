import { Icon } from '@iconify/react';
import googleFill from '@iconify/icons-eva/google-fill';
import twitterFill from '@iconify/icons-eva/twitter-fill';
import facebookFill from '@iconify/icons-eva/facebook-fill';
// material
import { Stack, Button, Divider, Typography } from '@mui/material';
import GoogleLogin from 'react-google-login';

// ----------------------------------------------------------------------
export default function AuthSocial() {
    const responseGoogle = (response) => {
        console.log(response);
    };
    const onFailure=(res)=>{
        console.log('[LOGIN FAIlED] res: ',res);
    };
    return (
        <>
            <Stack direction='row' spacing={2}>
                <GoogleLogin clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
                    buttonText="Login"
                    onSuccess={responseGoogle}
                    onFailure={onFailure}
                    cookiePolicy={'single_host_origin'}/>
                <Button fullWidth size='large' color='inherit' variant='outlined'>
                    <Icon icon={googleFill} color='#DF3E30' height={24} />
                </Button>

                <Button fullWidth size='large' color='inherit' variant='outlined'>
                    <Icon icon={facebookFill} color='#1877F2' height={24} />
                </Button>

                <Button fullWidth size='large' color='inherit' variant='outlined'>
                    <Icon icon={twitterFill} color='#1C9CEA' height={24} />
                </Button>
            </Stack>

            <Divider sx={{ my: 3 }}>
                <Typography variant='body2' sx={{ color: 'text.secondary' }}>
                    OR
                </Typography>
            </Divider>
        </>
    );
}
