import { Icon } from '@iconify/react';
import windowsFilled from '@iconify/icons-ant-design/windows-filled';
// material
import { alpha, styled } from '@mui/material/styles';
import { Card, Typography } from '@mui/material';
// utils
import { fShortenNumber } from '../../../utils/formatNumber';
import axios from 'axios';
import addAxiosHearder from '../../../utils/addAxiosHeader';
import { useState,useEffect } from 'react';

// ----------------------------------------------------------------------

const RootStyle = styled(Card)(({ theme }) => ({
    boxShadow: 'none',
    textAlign: 'center',
    padding: theme.spacing(5, 0),
    color: theme.palette.warning.darker,
    backgroundColor: theme.palette.warning.lighter
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
    color: theme.palette.warning.dark,
    backgroundImage: `linear-gradient(135deg, ${alpha(theme.palette.warning.dark, 0)} 0%, ${alpha(
        theme.palette.warning.dark,
        0.24
    )} 100%)`
}));
const headers=addAxiosHearder();
// ----------------------------------------------------------------------


export default function AppItemOrders() {
    const [total,setTotal] = useState(0);

    useEffect(()=>{
        fetchData();
    },[]);
    const fetchData = async()=>{
        try {
            let res = await axios.get('https://localhost:44349/api/Products',{headers});
            setTotal(res.data.$values.length);
        } catch (e) {
            console.log(e);
        }
    };
    return (
        <RootStyle>
            <IconWrapperStyle>
                <Icon icon={windowsFilled} width={24} height={24} />
            </IconWrapperStyle>
            <Typography variant='h3'>{fShortenNumber(total)}</Typography>
            <Typography variant='subtitle2' sx={{ opacity: 0.72 }}>
                Số sản phẩm
            </Typography>
        </RootStyle>
    );
}
