const Sequelize = require('sequelize')
const db = require('../db')

const About = db.define('about', {
  firstName: {
    type: Sequelize.STRING,
    allowNull: false
  },
  lastName: {
    type: Sequelize.STRING,
    allowNull: false
  },
  description: {
    type: Sequelize.TEXT
  },
  imgUrl: {
    type: Sequelize.STRING,
    defaultValue: 'https://i.imgur.com/N26YHFn.png',
    allowNull: false
  }
})

module.exports = About
