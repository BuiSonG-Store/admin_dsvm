import { Icon } from '@iconify/react';
import androidFilled from '@iconify/icons-ant-design/android-filled';
// material
import { alpha, styled } from '@mui/material/styles';
import { Card, Typography } from '@mui/material';
// utils
import { fShortenNumber } from '../../../utils/formatNumber';
import  {useState,useEffect} from 'react';
import axios from 'axios';

// ----------------------------------------------------------------------

const RootStyle = styled(Card)(({ theme }) => ({
    boxShadow: 'none',
    textAlign: 'center',
    padding: theme.spacing(5, 0),
    color: theme.palette.primary.darker,
    backgroundColor: theme.palette.primary.lighter
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
    color: theme.palette.primary.dark,
    backgroundImage: `linear-gradient(135deg, ${alpha(theme.palette.primary.dark, 0)} 0%, ${alpha(
        theme.palette.primary.dark,
        0.24
    )} 100%)`
}));

// ----------------------------------------------------------------------

// const TOTAL = 714000;

export default function AppWeeklySales() {
    const [total,setTotal] = useState(0);
    useEffect(()=>{
        fetchData();
    },[]);
    const fetchData = async()=>{
        try {
            let res = await axios.get('https://localhost:44349/api/Bills');
            setTotal(res.data.$values.length);
        } catch (e) {
            console.log(e);
        }
    };
    return (
        <RootStyle>
            <IconWrapperStyle>
                <Icon icon={androidFilled} width={24} height={24} />
            </IconWrapperStyle>
            <Typography variant='h3'>{fShortenNumber(total)}</Typography>
            <Typography variant='subtitle2' sx={{ opacity: 0.72 }}>
                Số đơn hàng đã đặt
            </Typography>
        </RootStyle>
    );
}
