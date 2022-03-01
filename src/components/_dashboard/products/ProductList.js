import PropTypes from 'prop-types';
// material
import {Grid} from '@mui/material';
import ShopProductCard from './ProductCard';
import {useState} from 'react';
import ProductListToolbar from './ProductListToolbar';

// ----------------------------------------------------------------------

ProductList.propTypes = {
    products: PropTypes.array.isRequired
};

export default function ProductList({items, handleClickProductName,handleDeleteProduct, ...other}) {
    const [selected, setSelected] = useState([]);

    const handleClick = (event, id) => {
        const selectedIndex = selected.indexOf(id);
        let newSelected = [];
        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, id);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1)
            );
        }
        setSelected(newSelected);
    };

    const handleDelete=(value)=>{
        console.log(value);
        setSelected([]);
        handleDeleteProduct(value);
    };

    return (
        <>
            {selected.length > 0 && <ProductListToolbar
                selected={selected}
                numSelected={selected.length}
                handleDelete={handleDelete}
            />}
            <Grid container spacing={3} {...other}>

                {items.map((item) => (
                    item.product.name !== undefined &&
                    <Grid key={item.$id} item xs={12} sm={6} md={3}>
                        <ShopProductCard
                            item={item}
                            isClick={(id) => handleClickProductName(id)}
                            handleClick={handleClick}
                            selected={selected}/>
                    </Grid>
                ))}
            </Grid>
        </>
    );
}
