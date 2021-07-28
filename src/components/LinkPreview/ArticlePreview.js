import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types'
import Img from 'react-image'
import { Grid, Typography } from '@material-ui/core'
import LinesEllipsis from 'react-lines-ellipsis'
import ErrorBoundary from '../ErrorBoundary/ErrorBoundary'

const DEFAULT_POST_IMAGE = process.env.DEFAULT_POST_IMAGE

const styles = theme => ({
  container: {
    width: '100%',
    position: 'relative',
    overflow: 'hidden',
    borderTopLeftRadius: '10px',
    borderTopRightRadius: '10px'
  },
  link: {
    textDecoration: 'none',
    color: theme.palette.common.first,
    '&:visited': {
      textDecoration: 'none',
      color: theme.palette.common.first
    }
  },
  linkImg: {
    width: '100%',
    aspectRatio: '1 / 1',
    border: 'none',
    borderRadius: '0.5rem',
    [theme.breakpoints.down('xs')]: {
      maxHeight: 20,
      maxWidth: 20
    }
  },
  previewContainer: {
    textDecoration: 'none',
    color: theme.palette.common.first,
    '&:visited': {
      textDecoration: 'none',
      color: theme.palette.common.first
    },
    maxHeight: '500px'
  },
  title: {
    position: 'relative',
    fontSize: '1rem',
    fontWeight: 600,
    textShadow: `0px 0px 5px ${theme.palette.alt.first}aa`,
    color: theme.palette.common.first,
    opacity: 0.9
  },
  description: {
    position: 'relative',
    textShadow: `0px 0px 5px ${theme.palette.alt.first}88`,
    lineHeight: '1.25rem',
    margin: '0.5rem 0'
  },
  url: {
    position: 'relative',
    fontSize: '10px',
    fontWeight: 300,
    overflowWrap: 'break-word',
    whiteSpace: 'nowrap',
    overflowX: 'hidden',
    textOverflow: 'ellipsis',
    width: '70%',
    marginTop: '0px',
    opacity: '0.5'
  },
  previewData: {
    bottom: '0',
    textAlign: 'left',
    zIndex: 5,
    background:
      `linear-gradient(${theme.palette.alt.second}00, ${theme.palette.alt.second}46, ${theme.palette.alt.second}ae, ${theme.palette.alt.second}dd, ${theme.palette.alt.second}ed, ${theme.palette.alt.second}fe, ${theme.palette.alt.second}, ${theme.palette.alt.second})`,
    padding: '4% 3% 2% 3%',
    width: '100%'
  }
})

class ArticlePreview extends Component {
  cutUrl (inUrl) {
    const protocol = 'https://'
    const pro2 = 'http://'

    if (inUrl.startsWith(protocol)) {
      inUrl = inUrl.substring(protocol.length)
    } else if (inUrl.startsWith(pro2)) {
      inUrl = inUrl.substring(pro2.length)
    }

    const web = 'www.'

    if (inUrl.startsWith(web)) {
      inUrl = inUrl.substring(web.length)
    }

    if (inUrl.endsWith('/')) {
      inUrl = inUrl.substring(0, inUrl.length - 1)
    }

    return inUrl
  }

  trimURLEnd (link) {
    let count = 0
    if (link == null) {
      return ''
    }
    for (let i = 0; i < link.length; i++) {
      if (link.charAt(i) === '/') {
        count++
        if (count === 3) {
          return link.substring(0, i + 1)
        }
      }
    }
  }

  trimURLStart (link) {
    if (link == null) {
      return ''
    }
    let count = 0
    for (let i = 0; i < link.length; i++) {
      if (link.charAt(i) === '/') {
        count++
        if (count === 2) {
          link = link.substring(i + 1, link.length)
        }
      }
    }
    if (link.substring(0, 4) === 'www.') {
      link = link.substring(4, link.length)
    }
    return link
  }

  addDefaultSrc = e => {
    e.target.onerror = null
    e.target.src = DEFAULT_POST_IMAGE
  }

  render () {
    const { title, description, url, classes, caption } = this.props
    let faviconURL
    let faviconURLFallback

    if (url != null) {
      faviconURL =
        'https://api.faviconkit.com/' +
        this.trimURLStart(this.trimURLEnd(url)) +
        '64'
      faviconURLFallback = this.trimURLEnd(url) + 'favicon.ico'
    } else {
      faviconURL = null
      faviconURLFallback = null
    }

    return (
      <ErrorBoundary>
        <div className={classes.container}
          href={url}
          target='_blank'
        >
          <a
            className={classes.link}
            href={url}
            rel='noopener noreferrer'
            target='_blank'
          >
            <div className={classes.previewData}>
              <Grid alignItems='center'
                container
                direction='row'
                spacing={2}
              >
                <Grid item
                  xs={2}
                  sm={1}
                >
                  <Img
                    align='right'
                    href={url}
                    src={[faviconURL, faviconURLFallback]}
                    className={classes.linkImg}
                    target='_blank'
                  />
                </Grid>
                <Grid item
                  xs={10}
                  sm={11}
                >
                  <Typography variant='h4'>
                    <LinesEllipsis
                      basedOn='letters'
                      ellipsis='...'
                      maxLine='2'
                      text={title.split(/[|]|[—]+/g, 1)}
                      trimRight
                    />
                  </Typography>
                </Grid>
              </Grid>
              <Typography variant='body1'
                className={classes.description}
              >
                <LinesEllipsis
                  basedOn='letters'
                  ellipsis='...'
                  maxLine='6'
                  text={description || caption}
                  trimRight
                />
              </Typography>
              <Typography variant='body2'
                className={classes.url}
              >{url && this.cutUrl(url).split(/[/]+/g, 1)}</Typography>
            </div>
          </a>
        </div>
      </ErrorBoundary>
    )
  }
}

ArticlePreview.propTypes = {
  caption: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(ArticlePreview)