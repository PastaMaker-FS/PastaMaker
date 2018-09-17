import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {withStyles} from '@material-ui/core/styles'
import {connect} from 'react-redux'
import GridList from '@material-ui/core/GridList'
import GridListTile from '@material-ui/core/GridListTile'
import {getProductTHUNK} from '../store/product'

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper
  },
  gridList: {
    width: 500,
    height: 450
  },
  subheader: {
    width: '100%'
  },
  divStyle: {
    backgroundColor: 'red'
  }
})

class Home extends Component {
  componentDidMount() {
    this.props.fetchAllProducts()
  }

  render() {
    const classes = this.props
    const products = this.props.products.products
    return (
      <React.Fragment>
        <div className="homeDiv">
          <div className="logoDiv">
            <span className="logo">PastaBoss!</span>
            <span>We sell pasta and stuff(description of company)</span>
            <span>
              We want everyone to have our awsome pasta and stuff(our mission)
            </span>
          </div>
        </div>
        <div className={classes.root}>
          <GridList cellHeight={300} className={classes.gridList} cols={3}>
            {products.map(data => (
              <GridListTile key={data.id}>
                <img src={data.imgUrl} alt={data.name} />
              </GridListTile>
            ))}
          </GridList>
        </div>
      </React.Fragment>
    )
  }
}

const mapStoreToProps = store => {
  return {
    products: store.product
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchAllProducts: () => dispatch(getProductTHUNK())
  }
}

Home.propTypes = {
  classes: PropTypes.object.isRequired
}

export default connect(mapStoreToProps, mapDispatchToProps)(
  withStyles(styles)(Home)
)
