import React, { memo } from 'react'
import PropTypes from 'prop-types'
import { Grid, Typography, Grow, Card } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import ConditionalLinkWrapper from '../Miscellaneous/ConditionalLinkWrapper'

const styles = theme => ({
  link: {
    textDecoration: 'none'
  },
  cardButton: {
    padding: '16px',
    height: '100%',
    '&:hover': {
      boxShadow: `0px 0px 0px 2px ${theme.palette.alt.third}`
    }
  },
  gridContainer: {
    alignContent: 'center',
    height: '100%'
  }
})

const HomeMenuLinkItem = ({ link, name, classes }) => {
  return (
    <Grid
      item
      xs={6}
      md={3}
      className={classes.gridContainer}
    >
      <ConditionalLinkWrapper
        href={link}
        className={classes.link}
      >
        <Grow in
          timeout={500}
        >
          <Card elevation={0}
            className={classes.cardButton}
          >
            <Grid container
              className={classes.gridContainer}
              alignItems='stretch'
            >
              <Typography
                variant='body2'
              >
                {name}
              </Typography>
            </Grid>
          </Card>
        </Grow>
      </ConditionalLinkWrapper>
    </Grid>
  )
}

HomeMenuLinkItem.propTypes = {
  name: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
  classes: PropTypes.object.isRequired
}

export default memo(withStyles(styles)(HomeMenuLinkItem))
