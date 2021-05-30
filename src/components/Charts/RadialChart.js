import React from 'react'
import Chart from 'react-apexcharts'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import CircleLoader from 'react-spinners/CircleLoader'
import { Card, Grid } from '@material-ui/core'

const styles = theme => ({

    card: {
      paddingTop: theme.spacing(-10),
      paddingBottom: theme.spacing(-10),
      background: 'white',
      backgroundSize: 'cover',
      margin: 'auto',
      marginBottom: '20px',
      marginLeft: '1rem',
      maxWidth: '100%',
      position: 'relative',
      borderRadius: '0.5rem',
      border: '0px solid #ffffff',
      boxShadow: '20px 20px 20px 0px rgb(255 255 255 / 2%), -2px -2px 20px rgb(0 0 0 / 3%), inset 12px 3px 20px 0px rgb(255 255 255 / 3%), inset -3px -7px 17px 0px #0404044a, 5px 5px 9px 0px rgb(255 255 255 / 5%), -20px -20px 12px rgb(0 0 0 / 3%), inset 1px 1px 6px 0px rgb(255 255 255 / 2%), inset -1px -1px 2px 0px #0404040f',
      backgroundColor: '#1b1b1ba1',
      [theme.breakpoints.down('xs')]: {
        marginTop: theme.spacing(2),
        marginLeft: '0px',
        marginBottom: '0px',
        width: '100%'
      }
    },

    chart: {
      marginBottom: '10px'
    },
    chartheader: {
      padding: '2rem'
    },
    text: {
      color: '#ffffff'
    }
  })

const RadialChart = (props) => {
  const color = '#00EAB7'
  const { classes, chartData, chartTitle, colors } = props

  if (chartData) {
    let series = []
    let labels = []
    Object.values(chartData).forEach((val, i) => {
      if (Object.keys(chartData)[i] !== 'total' && val !== 0)series.push(Number(val))
    })
    Object.keys(chartData).forEach((val, i) => {
      if (val !== 'total' && Object.values(chartData)[i] !== 0) { labels.push(val.charAt(0).toUpperCase() + val.slice(1)) }
    })
    const chart = {
      series: series,
      chart: {
      height: 350,
      type: 'radialBar'
    },
    colors: colors,
    plotOptions: {
      radialBar: {
        track: {
          background: '#2b2b2b'
        },
          hollow: {
            size: '45%'
          },
        dataLabels: {
          name: {
            fontSize: '22px'
          },
          value: {
            fontSize: '15px',
            color: 'white',
            formatter: function (w) {
                        // By default this function returns the average of all series. The below is just an example to show the use of custom formatter function
                        return Number(w).toFixed(2) + `%(${chartData.total * w / 100})`
                      }
                    },
          total: {
            show: true,
            label: 'Total Votes',
            color: 'white',
            formatter: function (w) {
              // By default this function returns the average of all series. The below is just an example to show the use of custom formatter function
              return chartData.total
            }
          }
        }
      }
    },
    stroke: {
  lineCap: 'round'
    },
    labels: labels
    }
 return (
   <Card className={`${classes.card}`}>
     <div className='mixed-chart'>
       <div className={classes.chartheader} >
         <Typography align='left'
           className={classes.chart}
           style={{ color: 'white' }}
           variant='subtitle2'
         >
           {chartTitle}
         </Typography>
       </div>
       <Chart
         options={chart}
         series={chart.series}
         type='radialBar'
         width='100%'
       />
     </div>
   </Card>)
} else {
    return (<Card className={`${classes.card}`}>

      <div className='mixed-chart'>
        <div className={classes.chartheader} >
          <Typography align='left'
            className={classes.chart}
            style={{ color: 'white' }}
            variant='subtitle2'
          >
            {chartTitle}
          </Typography>
        </div>
        <Grid container
          justify='center'
          style={{ margin: '70px 0 110px 0' }}
        >
          <CircleLoader loading
            color={color}
          />
        </Grid>
      </div>
    </Card>)
  }
}

RadialChart.propTypes = {
    classes: PropTypes.object.isRequired,
    chartData: PropTypes.object.isRequired,
    chartTitle: PropTypes.string.isRequired,
    colors: PropTypes.array
  }
export default withStyles(styles)(RadialChart)
