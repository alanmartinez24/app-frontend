import React from 'react'
import Chart from 'react-apexcharts'
import PropTypes from 'prop-types'
import { withStyles, useTheme } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import ChartLoader from './ChartLoader'
import { Card, Grid } from '@material-ui/core'

const styles = theme => ({
    card: {
      paddingTop: theme.spacing(-10),
      paddingBottom: theme.spacing(-10),
      backgroundSize: 'cover',
      margin: 'auto',
      marginBottom: '20px',
      marginLeft: '1rem',
      maxWidth: '100%',
      position: 'relative',
      borderRadius: '0.5rem',
      border: '0px solid #ffffff',
      boxShadow: `20px 20px 20px 0px ${theme.palette.common.first}04, -2px -2px 20px  ${theme.palette.alt.first}06, inset 12px 3px 20px 0px ${theme.palette.common.first}04, inset -3px -7px 17px 0px ${theme.palette.alt.second}4a, 5px 5px 9px 0px ${theme.palette.common.first}24, -20px -20px 12px ${theme.palette.alt.first}06, inset 1px 1px 6px 0px ${theme.palette.common.first}05, inset -1px -1px 2px 0px ${theme.palette.alt.second}0f`,
      [theme.breakpoints.down('xs')]: {
        marginTop: theme.spacing(2),
        marginLeft: '0px',
        marginBottom: '0px',
        width: '100%'
      }
    },
    chart: {
      marginBottom: '10px',
      color: theme.palette.common.first
    },
    chartheader: {
      padding: '2rem'
    },
    text: {
      color: theme.palette.common.third
    }
  })

const RadialChart = ({ classes, chartData, chartTitle, colors }) => {
  const { palette } = useTheme()

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
            color: palette.common.first,
            formatter: function (w) {
                        // By default this function returns the average of all series. The below is just an example to show the use of custom formatter function
                        return Number(w).toFixed(2) + `%(${Math.round(chartData.total * w / 100)})`
                      }
                    },
          total: {
            show: true,
            label: 'Total Votes',
            color: palette.common.first,
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
            variant='subtitle2'
          >
            {chartTitle}
          </Typography>
        </div>
        <Grid container
          justify='center'
          style={{ margin: '0 0 50px 0' }}
        >
          <ChartLoader />
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
