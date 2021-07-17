import React from 'react'
import Chart from 'react-apexcharts'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Card, Grid, Typography } from '@material-ui/core'
import CircleLoader from 'react-spinners/CircleLoader'

const styles = theme => ({

    card: {
      paddingTop: theme.spacing(-10),
      paddingBottom: theme.spacing(-10),
      background: 'white',
      backgroundSize: 'cover',
      margin: 'auto',
      marginBottom: '20px',
      marginLeft: '2rem',
      maxWidth: '100%',
      position: 'relative',
      borderRadius: '0.5rem',
      border: '0px solid #ffffff',
      boxShadow: `20px 20px 20px 0px ${theme.palette.common.first}04, -2px -2px 20px  ${theme.palette.alt.first}06, inset 12px 3px 20px 0px ${theme.palette.common.first}04, inset -3px -7px 17px 0px ${theme.palette.alt.second}4a, 5px 5px 9px 0px ${theme.palette.common.first}24, -20px -20px 12px ${theme.palette.alt.first}06, inset 1px 1px 6px 0px ${theme.palette.common.first}05, inset -1px -1px 2px 0px ${theme.palette.alt.second}0f`,
      [theme.breakpoints.down('xs')]: {
        marginTop: theme.spacing(10),
        marginBottom: '0px',
        width: '100%'
      }
    },

    name: {
      color: '#ffffff',
      fontSize: '28px',
      fontWeight: '500',
      padding: '0px',
      fontFamily: 'Gilroy',
      [theme.breakpoints.down('xs')]: {
        fontSize: '20px'
      }
    },

    chart: {
      marginBottom: '10px'
    },
    text: {
      color: '#ffffff',
      fontSize: '12px',
      padding: '0px',
      fontFamily: 'Gilroy',
      fontWeight: '100',
      [theme.breakpoints.down('xs')]: {
        fontSize: '12px'
      }
    }

  })

const DonutChart = (props) => {
  const color = '#00EAB7'
  const { classes, chartData, chartTitle } = props

  if (chartData && chartData.data) {
    const chart = {
      series: [Number(chartData.twitter.toFixed(2)), Number(chartData.youtube.toFixed(2)), Number(chartData.reddit.toFixed(2)), Number(chartData.general.toFixed(2))],
      dataLabels: {
        enabled: false },
      plotOptions: {
        pie: {
          donut: {
            size: '55%'
          }
        }
      },
      fill: {
        type: 'gradient'
      },
      stroke: {
        colors: undefined
      },
      yaxis: {
        show: false
      },
      labels: ['Twitter', 'Youtube', 'Reddit', 'General'],
      legend: {
        position: 'bottom'
      }
    }
 return (
   <Card className={`${classes.card}`}>
     <div className='mixed-chart'
       style={{ marginBottom: '90px' }}
     >
       <div className={classes.chartheader} >
         <Typography align='left'
           className={classes.chart}
           style={{ color: 'white' }}
         >
           {chartTitle}
         </Typography>
       </div>
       <Chart
         options={chart}
         series={chart.series}
         type='donut'
         width='100%'
       />
     </div>
     <FontAwesomeIcon icon='coffee' />
   </Card>)
} else {
    return (<Card className={`${classes.card}`}>

      <div className='mixed-chart'>
        <div className={classes.chartheader} >
          <Typography align='left'
            className={classes.chart}
            style={{ color: 'white' }}
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

DonutChart.propTypes = {
    classes: PropTypes.object.isRequired,
    chartData: PropTypes.array.isRequired,
    chartTitle: PropTypes.string.isRequired
  }
export default withStyles(styles)(DonutChart)
