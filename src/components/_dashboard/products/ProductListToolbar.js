import PropTypes from 'prop-types';
import {Icon} from '@iconify/react';
import trash2Fill from '@iconify/icons-eva/trash-2-fill';
// material
import {styled} from '@mui/material/styles';
import {
    Toolbar,
    Tooltip,
    IconButton,
    Typography,
} from '@mui/material';
import {useDispatch} from 'react-redux';
import {deleteProduct} from '../../../store/slice/products';
import {unwrapResult} from '@reduxjs/toolkit';

// ----------------------------------------------------------------------

const RootStyle = styled(Toolbar)(({theme}) => ({
    height: 96,
    display: 'flex',
    justifyContent: 'space-between',
    padding: theme.spacing(0, 1, 0, 3)
}));

// ----------------------------------------------------------------------

ProductListToolbar.propTypes = {
    numSelected: PropTypes.number
};

export default function ProductListToolbar({numSelected, selected,handleDelete}) {
    const dispatch = useDispatch();

    const handleRemove = () => {
        selected.forEach(async (id) => {
            try {
                const res = await dispatch(deleteProduct(id));
                unwrapResult(res);
                handleDelete(res);
            } catch (e) {
                console.log(e);
            }
        });
    };

    return (
        <RootStyle
            sx={{
                color: 'primary.main',
                bgcolor: 'primary.lighter'
            }}
        >
            <Typography component="div" variant="subtitle1">
                {numSelected} selected
            </Typography>
            <Tooltip title="Delete">
                <IconButton>
                    <Icon icon={trash2Fill} onClick={handleRemove}/>
                </IconButton>
            </Tooltip>

        </RootStyle>
    );
}
