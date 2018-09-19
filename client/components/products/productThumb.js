import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const styles = (theme) => ({
	card: {
		maxWidth: 345,
		height: 380
	},
	media: {
		// ⚠️ object-fit is not supported by IE11.
		objectFit: 'cover'
	},
	divStyle: {
		width: '30%',
		marginTop: 20,
		marginLeft: 40
	}
});

export function ProductThumb({ product, user, addToCart, selectProduct, deselectProduct, classes }) {
	return (
		<div className={classes.divStyle}>
			<Card className={classes.card}>
				<CardActionArea onClick={() => selectProduct(product)}>
					<CardMedia
						component="img"
						className={classes.media}
						height="140"
						image={product.imgUrl}
						title={product.name}
					/>
					<CardContent>
						<Typography gutterBottom variant="headline" component="h2">
							{product.name}
						</Typography>
						<Typography component="p">{product.description}</Typography>
					</CardContent>
				</CardActionArea>
				<CardActions>
					<Button size="small" color="primary" onClick={() => addToCart(user, product, 1)}>
						Add to Cart
					</Button>
				</CardActions>
			</Card>
		</div>
	);
}

export default withStyles(styles)(ProductThumb);

ProductThumb.propTypes = {
	classes: PropTypes.object.isRequired
};
