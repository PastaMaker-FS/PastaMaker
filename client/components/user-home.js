import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {OrderHistory, Cart} from '../components'
import {withStyles} from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto'
  },
  table: {
    minWidth: 700
  },
})

export const UserHome = props => {
  const {firstName, lastName, email, classes} = props

  return (
    <div>
      <Toolbar>
        <Typography variant="title" color="inherit">
          User Profile
        </Typography>
      </Toolbar>
      <Paper className={classes.root}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell>First Name</TableCell>
              <TableCell>Last Name</TableCell>
              <TableCell>Email</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell component="th" scope="row">
                {firstName}
              </TableCell>
              <TableCell component="th" scope="row">
                {lastName}
              </TableCell>
              <TableCell component="th" scope="row">
                {email}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Paper>
      {/* <h3>
        Welcome, {firstName} {lastName}
      </h3>
      <h3>{email}</h3> */}
      <Cart />
      <OrderHistory />
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    email: state.user.email,
    firstName: state.user.firstName,
    lastName: state.user.lastName
  }
}

export default withStyles(styles)(connect(mapState)(UserHome))

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string,
  classes: PropTypes.object.isRequired
}
