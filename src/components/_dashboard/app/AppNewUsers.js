import { Icon } from '@iconify/react';
import appleFilled from '@iconify/icons-ant-design/apple-filled';
// material
import { alpha, styled } from '@mui/material/styles';
import { Card, Typography } from '@mui/material';
// utils
import { fShortenNumber } from '../../../utils/formatNumber';
import { useState,useEffect } from 'react';
import addAxiosHearder from '../../../utils/addAxiosHeader';
import axios from 'axios';
// ----------------------------------------------------------------------

const RootStyle = styled(Card)(({ theme }) => ({
    boxShadow: 'none',
    textAlign: 'center',
    padding: theme.spacing(5, 0),
    color: theme.palette.info.darker,
    backgroundColor: theme.palette.info.lighter
}));

const IconWrapperStyle = styled('div')(({ theme }) => ({
    margin: 'auto',
    display: 'flex',
    borderRadius: '50%',
    alignItems: 'center',
    width: theme.spacing(8),
    height: theme.spacing(8),
    justifyContent: 'center',
    marginBottom: theme.spacing(3),
    color: theme.palette.info.dark,
    backgroundImage: `linear-gradient(135deg, ${alpha(theme.palette.info.dark, 0)} 0%, ${alpha(
        theme.palette.info.dark,
        0.24
    )} 100%)`
}));

// ----------------------------------------------------------------------

const headers=addAxiosHearder();
export default function AppNewUsers() {
    const [total,setTotal] = useState(0);

    useEffect(()=>{
        fetchData();
    },[]);
    const fetchData = async()=>{
        try {
            let res = await axios.get(process.env.REACT_APP_HOST +'/api/Accounts',{headers});
            setTotal(res.data.$values.length);
        } catch (e) {
            console.log(e);
        }
    };
    return (
        <RootStyle>
            <IconWrapperStyle>
                <Icon icon={appleFilled} width={24} height={24} />
            </IconWrapperStyle>
            <Typography variant='h3'>{fShortenNumber(total)}</Typography>
            <Typography variant='subtitle2' sx={{ opacity: 0.72 }}>
                Số người dùng
            </Typography>
        </RootStyle>
    );
}
