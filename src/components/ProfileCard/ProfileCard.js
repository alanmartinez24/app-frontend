import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import { Card, Chip, Icon } from '@material-ui/core'
import Typography from '@material-ui/core/Typography'
import UserAvatar from '../UserAvatar/UserAvatar'
import Grid from '@material-ui/core/Grid'
import FollowButton from '../Followers/FollowButton'
import EditProfile from '../EditProfile/EditProfile'
import FollowersDialog from '../Followers/FollowersDialog'
import FollowingDialog from '../Followers/FollowingDialog'
import ErrorBoundary from '../ErrorBoundary/ErrorBoundary'
import { levelColors } from '../../utils/colors'
import numeral from 'numeral'
import { connect } from 'react-redux'
import Tooltip from '@material-ui/core/Tooltip'
import LinesEllipsis from 'react-lines-ellipsis'
import CountUp from 'react-countup'

import { fetchSocialLevel } from '../../redux/actions'

const styles = theme => ({
  avatarImage: {
    width: 100 - theme.spacing(),
    height: 100 - theme.spacing(),
    minHeight: 100 - theme.spacing(),
    minWidth: 100 - theme.spacing(),
    fontSize: '60px',
    marginTop: '0px',
    marginBottom: '-4px',
    borderRadius: '100%',
    border: `solid 3px ${theme.palette.common.third}`,
    position: 'absolute',
    [theme.breakpoints.down('xs')]: {
      fontSize: '45px',
      marginLeft: '15px',
      marginBottom: '6vw',
      borderRadius: '100%',
      width: '80px',
      height: '80px',
      minHeight: '80px',
      minWidth: '80px'
    }
  },
  bio: {
    fontSize: '12px',
    padding: '0px',
    marginTop: theme.spacing(1),
    fontFamily: 'Gilroy',
    fontWeight: '100',
    display: 'inherit',
    [theme.breakpoints.down('xs')]: {
      fontSize: '12px',
      display: 'none'
    }
  },
  card: {
    paddingTop: theme.spacing(-10),
    paddingBottom: theme.spacing(-10),
    boxShadow: `0px 0px 0px ${theme.palette.alt.third}81`,
    background: 'transparent',
    backgroundSize: 'cover',
    width: '550px',
    margin: 'auto',
    marginTop: '75px',
    maxWidth: '100vw',
    maxHeight: '225px',
    position: 'relative',
    [theme.breakpoints.down('lg')]: {
      margin: '75px 0px 0px 30px'
    },
    [theme.breakpoints.down('xs')]: {
      margin: 'auto',
      marginTop: theme.spacing(10),
      height: '175px',
      width: '100vw'
    }
  },
  chip: {
    margin: '0 10px',
    height: '26px',
    backgroundColor: theme.palette.alt.third,
    color: theme.palette.text.secondary,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  content: {
    color: 'black'
  },
  eos: {
    display: 'none'
  },
  hidden: {
    display: 'none'
  },
  largeStat: {
    fontSize: '24px',
    padding: '0px',
    fontFamily: 'Gilroy',
    fontWeight: '500',
    marginRight: '5px',
    [theme.breakpoints.down('xs')]: {
      fontSize: '22px',
      width: '2rem'
    }
  },
  LinearProgress: {
    height: '3px'
  },
  LinkDecoration: {
    textDecoration: 'none'
  },
  minimize: {
    width: '45px',
    height: '45px',
    minWidth: '45px',
    minHeight: '45px',
    fontSize: '18px',
    [theme.breakpoints.down('xs')]: {
      width: '35px',
      height: '35px',
      minWidth: '35px',
      minHeight: '35px',
      fontSize: '14px'
    }
  },
  minimizeCard: {
    maxHeight: '55px',
    transition: 'max-height 0.2s linear',
    overflow: 'hidden',
    [theme.breakpoints.down('xs')]: {
      maxHeight: '45px'
    }
  },
  name: {
    padding: '0px'
  },
  profileDetails: {
    ...theme.mixins.gutters(),
    paddingBottom: theme.spacing(1),
    boxShadow: 'none',
    maxHeight: '250px',
    height: '140px',
    display: 'inline-grid',
    width: '100%',
    position: 'relative',
    [theme.breakpoints.down('xs')]: {
      paddingTop: '10px',
      display: 'block',
      height: '100px'
    }
  },
  profileStats: {
    marginLeft: '0px',
    padding: '0px 0rem',
    width: '100%',
    flexWrap: 'nowrap',
    [theme.breakpoints.down('xs')]: {
      padding: '0px 2rem 0px calc(2rem - 12px)'
    }
  },
  text2: {
    fontSize: '18px',
    fontWeight: '500',
    fontFamily: 'Gilroy',
    [theme.breakpoints.down('xs')]: {
      fontSize: '14px'
    }
  },
  twitter: {
    color: theme.palette.text.secondary,
    fontSize: '14px'
  },
  username: {
    fontSize: '18px',
    padding: '0px',
    fontFamily: 'Gilroy',
    fontWeight: '100',
    [theme.breakpoints.down('xs')]: {
      fontSize: '12px'
    }
  }
})

function formatBio (bio = '') {
  if (!bio) {
    return ''
  }
  if (bio.length > 120) {
    return bio.slice(0, 120) + '...'
  }
  return bio
}

function ProfileCard (props) {
  const {
    classes,
    balanceInfo,
    account,
    accountInfo,
    isLoggedIn,
    ratingCount,
    isMinimize,
    levels,
    dispatch
  } = props
  const YUPBalance = (balanceInfo && balanceInfo.YUP) || 0
  const YUPBalanceError =
    (balanceInfo && balanceInfo.YUP && balanceInfo.YUP.error) || null

  const formattedYUPBalance =
    YUPBalance && numeral(Number(YUPBalance)).format('0,0.00')
  const formattedWeight = numeral(
    Math.floor(Number(accountInfo.weight))
  ).format('0,0')
  const formattedRatings = numeral(ratingCount)
    .format('0a')
    .toUpperCase()

  if (!accountInfo.eosname) {
    return <div />
  }
  if (!levels[accountInfo.eosname]) {
     dispatch(fetchSocialLevel(accountInfo.eosname))
      return (<div />)
   }

   if (levels[accountInfo.eosname].isLoading) {
    // return <div />
  }

  const eosname = accountInfo && (accountInfo.eosname || accountInfo._id)
  const levelInfo = levels[eosname] && levels[eosname].levelInfo

  const quantile = levelInfo && levelInfo.quantile
  const socialLevelColor = levelColors[quantile] || 'sixth'

  const displayName = (levelInfo && levelInfo.fullname) || (accountInfo && (
    accountInfo.fullname || accountInfo.username || accountInfo._id))
  const isMirror =
    accountInfo && accountInfo.twitterInfo && accountInfo.twitterInfo.isMirror
  const isAuthUser =
    accountInfo && accountInfo.twitterInfo && accountInfo.twitterInfo.isAuthUser
  const defaultUsername = accountInfo && (accountInfo.username || accountInfo._id)
  const username = isMirror ? accountInfo.twitterInfo.username : defaultUsername

  const hidden = isMinimize ? classes.hidden : null
  const minimize = isMinimize ? classes.minimize : null
  const minimizeCard = isMinimize ? classes.minimizeCard : null
  const isMobile = window.innerWidth <= 600

  const avatar = levelInfo && levelInfo.avatar
  const twitterName = accountInfo && accountInfo.twitterInfo && accountInfo.twitterInfo.username
  const ethAddress = accountInfo && accountInfo.ethInfo && accountInfo.ethInfo.address
  return (
    <ErrorBoundary>
      <Card
        className={`${classes.card} ${minimizeCard}`}
        tourname='ProfileUsername'
      >
        <UserAvatar
          alt={accountInfo.username}
          username={accountInfo.username}
          className={`${classes.avatarImage} ${minimize}`}
          src={avatar}
          style={{ border: `solid 3px ${socialLevelColor}` }}
        />
        <Grid alignItems='center'
          container
          direction='row'
          justify='left'
        >
          <Grid
            item
            className={classes.profileDetails}
            style={{ paddingTop: isMinimize ? '5px' : '', marginLeft: isMinimize ? 50 : 100 }}
          >
            <Grid
              alignItems={isMinimize ? 'flex-start' : 'center'}
              container
              direction='row'
              justify='space-between'
              spacing={0}
            >
              <Grid
                alignItems={isMinimize ? 'flex-start' : 'center'}
                container
                sm={10}
                xs={8}
                direction='row'
                justify='flex-start'
                spacing={0}
              >
                <Grid
                  xs={6}
                  item
                >
                  <Typography
                    align='left'
                    className={classes.name}
                    display='inline'
                    variant='h3'
                  >
                    <LinesEllipsis
                      basedOn='letters'
                      ellipsis='...'
                      maxLine='4'
                      text={displayName}
                      trimRight
                    />
                  </Typography>
                </Grid>
                {twitterName && (
                <Grid item
                  xs={3}
                >
                  <a href={`https://twitter.com/${twitterName}`}
                    target='_blank'
                    rel='noopener noreferrer'
                    className={classes.LinkDecoration}
                  >
                    <Chip label={twitterName}
                      className={classes.chip}
                      onClick
                      icon={
                        <Icon fontSize='small'
                          className={['fab fa-twitter', classes.twitter]}
                        />

                  }
                    />
                  </a>
                </Grid>
              )}
                {ethAddress && (
                <Grid item
                  xs={3}
                > <a href={`https://etherscan.io/address/${ethAddress}`}
                  target='_blank'
                  rel='noopener noreferrer'
                  className={classes.LinkDecoration}
                  >
                  <Chip label={ethAddress.slice(0, 5)}
                    className={classes.chip}
                    onClick
                  />
                </a>
                </Grid>
              )}
              </Grid>
              <Grid item
                sm={2}
                xs={3}
              >
                {isLoggedIn ? (
                  <EditProfile
                    accountInfo={accountInfo}
                    className={classes.button}
                    username={username}
                    size='small'
                    variant='contained'
                  />
                ) : (
                  <FollowButton
                    account={account}
                    eosname={accountInfo.eosname}
                    isLoggedIn={isLoggedIn}
                  />
                )}
              </Grid>
            </Grid>

            <Typography
              align='left'
              variant='h5'
              className={`${classes.username} ${hidden}`}
            >
              <Grid container
                direction='row'
                spacing={0}
              >
                <Grid item>
                  <Typography
                    variant='body2'
                    style={{
                      textDecoration: socialLevelColor ? 'none' : 'none',
                      textDecorationColor: socialLevelColor,
                      textDecorationStyle: socialLevelColor ? 'solid' : 'none',
                      padding: '0px'
                    }}
                  >
                    {`@${username}`}
                  </Typography>
                </Grid>
                <Grid item>
                  {isMirror && !isAuthUser ? (
                    <Tooltip
                      enterDelay={200}
                      disableTouchListener
                      title="This account is a mirror of this Twitter user's activity"
                    >
                      <img
                        src='/images/icons/twitter.svg'
                        style={{
                          height: '20px',
                          paddingLeft: '15px',
                          marginTop: '1px'
                        }}
                        alt='twitter'
                      />
                    </Tooltip>
                  ) : null}
                </Grid>
              </Grid>
            </Typography>
            <Typography
              align='left'
              className={classes.bio}
              color='inherit'
              nowrap
              style={{ wordWrap: 'break-word' }}
              variant='body3'
            >
              <LinesEllipsis
                basedOn='letters'
                ellipsis='...'
                maxLine='2'
                text={formatBio(levelInfo && levelInfo.bio) || (accountInfo && accountInfo.bio)}
                className={hidden}
                trimRight
              />
            </Typography>
          </Grid>

          <Grid
            alignItems='baseline'
            alignContent='center'
            container
            direction='row'
            justify='end'
            spacing={3}
            className={`${classes.profileStats} ${hidden}`}
          >
            <Grid item
              xs={6}
              sm={3}
              md={3}
            >
              <Tooltip
                placement='bottom'
                disableTouchListener
                title={
                  <Typography
                    variant='tooltip'
                  >
                    Yup Score: score out of 100 showing how influential
                    you are. The higher the number, the more valuable your
                    rating!
                  </Typography>
                }
              >
                <div tourname='Influence'>
                  <Typography
                    className={classes.largeStat}
                    style={{
                      display: 'inline-block',
                      fontFamily: 'Gilroy',
                      color: socialLevelColor
                    }}
                    variant='caption'
                  >
                    <CountUp
                      end={`${formattedWeight}`}
                      duration={2}
                      useEasing={false}
                    />
                  </Typography>
                  <Typography
                    variant='body2'
                    style={{
                      display: 'inline-block'
                    }}
                  >
                    Influence
                  </Typography>
                </div>
              </Tooltip>
            </Grid>
            <Grid item
              xs={6}
              sm={3}
              md={3}
            >
              <Tooltip
                placement='bottom'
                disableTouchListener
                title={
                  <Typography variant='tooltip'>
                    {' '}
                    Amount of YUP held by user
                  </Typography>
                }
              >
                {YUPBalanceError ? (
                  ''
                ) : (
                  <Typography
                    className={classes.text2}
                    style={{ display: isMobile ? 'block' : 'inline-block', fontFamily: 'Gilroy' }}
                    variant='caption'
                    tourname='YUPBalance'
                  >
                    <Grid
                      container
                      direction='row'
                      alignItems='flex-end'
                      spacing={1}
                    >
                      <Grid item>
                        <img
                          src='/images/logos/logo_outline_w.svg'
                          style={{ width: '15px', height: '15px' }}
                          alt='yup logo'
                        />
                      </Grid>
                      <Grid item>
                        {YUPBalanceError ? 0 : formattedYUPBalance}
                      </Grid>
                    </Grid>
                  </Typography>
                )}
              </Tooltip>
            </Grid>
          </Grid>
          <Grid
            alignItems='center'
            container
            direction='row'
            justify='start'
            spacing={3}
            className={`${classes.profileStats} ${hidden}`}
          >
            <Grid item>
              <Typography align='left'
                variant='body3'
              >
                <a style={{ fontWeight: 500 }}>{formattedRatings}</a> Ratings
              </Typography>
            </Grid>
            <Grid item>
              <FollowersDialog
                account={account}
                className={classes.text}
                isLoggedIn={isLoggedIn}
                username={eosname}
              />
            </Grid>
            <Grid item>
              <FollowingDialog
                account={account}
                className={classes.text}
                isLoggedIn={isLoggedIn}
                username={eosname}
              />
            </Grid>
          </Grid>
        </Grid>
      </Card>
    </ErrorBoundary>
  )
}
const mapStateToProps = (state, ownProps) => {
  return {
    levels: state.socialLevels.levels || {
      isLoading: true,
      levels: {}
    }
  }
}

ProfileCard.propTypes = {
  dispatch: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
  ratingCount: PropTypes.number.isRequired,
  balanceInfo: PropTypes.object.isRequired,
  accountInfo: PropTypes.object.isRequired,
  isMinimize: PropTypes.bool.isRequired,
  levels: PropTypes.object,
  account: PropTypes.object
}

export default connect(mapStateToProps)(withStyles(styles)(ProfileCard))
