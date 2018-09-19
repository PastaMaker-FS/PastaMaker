import React, {Component} from 'react'
import {connect} from 'react-redux'
import {allAbouts} from '../store/about'
import PropTypes from 'prop-types'
import {withStyles} from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Typography from '@material-ui/core/Typography'

const styles = {
  card: {
    maxWidth: 345,
    height: 350
  },
  media: {
    // ⚠️ object-fit is not supported by IE11.
    objectFit: 'cover'
  },
  divStyle: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginTop: 200,
  }
}

class AboutUs extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.allAbouts()
  }

  render() {
    const {abouts, classes} = this.props

    return (
      <div className="wallpaper">
          <div className="titleLogo">ABOUT US</div>
        <div className={classes.divStyle}>
          {abouts.map(about => {
            return (
              <div key={about.id}>
                <Card className={classes.card}>
                  <CardActionArea>
                    <CardMedia
                      component="img"
                      className={classes.media}
                      height="250"
                      image={about.imgUrl}
                    />
                    <CardContent>
                      <Typography
                        gutterBottom
                        variant="headline"
                        component="h2"
                      >
                        {about.firstName} {about.lastName}
                      </Typography>
                      <Typography component="p">{about.description}</Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </div>
            )
          })}
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    abouts: state.about.abouts
  }
}

const mapDispatchToProps = dispatch => {
  return {
    allAbouts: () => {
      dispatch(allAbouts())
    }
  }
}

export default withStyles(styles)(
  connect(mapStateToProps, mapDispatchToProps)(AboutUs)
)

AboutUs.propTypes = {
  classes: PropTypes.object.isRequired
}
