import PropTypes from 'prop-types';
import {Link as RouterLink} from 'react-router-dom';
// material
import {Box, Card, Link, Typography, Stack, Checkbox, TableCell} from '@mui/material';
import {styled} from '@mui/material/styles';
// utils
import {fCurrency} from '../../../utils/formatNumber';
//
// ----------------------------------------------------------------------
const urlImage = 'https://localhost:44349/uploads/';

const ProductImgStyle = styled('img')({
    top: 0,
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    position: 'absolute'
});

// ----------------------------------------------------------------------

ShopProductCard.propTypes = {
    product: PropTypes.object
};

export default function ShopProductCard({item, isClick, handleClick, selected}) {

    const {name, price, priceSale, id} = item.product;
    const imageSrc = urlImage + item.image;
    const isItemSelected = selected.indexOf(id) !== -1;

    return (
        <Card>
            <Box sx={{pt: '100%', position: 'relative'}}>
                <ProductImgStyle alt={name} src={imageSrc}/>
            </Box>

            <Stack spacing={2} sx={{p: 3}}>
                <Link to="#" color="inherit" underline="hover" component={RouterLink}>
                    <Typography variant="subtitle2" noWrap onClick={() => isClick(id)}>
                        {name}
                    </Typography>
                </Link>
                <Stack direction="row" alignItems="center" justifyContent="space-between">
                    <Typography variant="subtitle1">
                        Price:
                        <Typography
                            component="span"
                            variant="body1"
                            sx={{
                                color: 'text.disabled',
                                textDecoration: 'line-through',
                                marginLeft: '20px'
                            }}
                        >
                            {priceSale && fCurrency(price)}
                        </Typography>
                        &nbsp;
                        {priceSale ? fCurrency(priceSale) : fCurrency(price)}
                    </Typography>
                    <TableCell padding='checkbox'>
                        <Checkbox
                            checked={isItemSelected}
                            onChange={(event) => handleClick(event, id)}
                        />
                    </TableCell>
                </Stack>
            </Stack>
        </Card>
    );
}
