import React from 'react'
import Chart from 'react-apexcharts'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import { Card, Grid } from '@material-ui/core'
import CircleLoader from 'react-spinners/CircleLoader'

const styles = theme => ({
    avatarImage: {
      width: 100 - theme.spacing(),
      height: 100 - theme.spacing(),
      minHeight: 100 - theme.spacing(),
      minWidth: 100 - theme.spacing(),
      fontSize: '70px',
      marginTop: '0px',
      marginBottom: '-4px',
      borderRadius: '100%',
      border: 'solid 3px #DADADA',
      position: 'absolute',
      [theme.breakpoints.down('xs')]: {
        fontSize: '50px',
        marginLeft: '25px',
        marginBottom: '6vw',
        borderRadius: '100%',
        width: '70px',
        height: '70px',
        minHeight: '70px',
        minWidth: '70px'
      }
    },
    card: {
      paddingTop: theme.spacing(-10),
      paddingBottom: theme.spacing(-10),
      background: 'transparent',
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
      margin: '0 0 3rem 0'
    },
    chartheader: {
      padding: '20px 2rem 0rem 20px'
    },
    name: {
      color: 'contrastText'
    },
    text: {
      color: 'contrastText',
      marginTop: '6px'
    }
  })

const BarChart = ({ classes, chartData, chartTitle, color, unit }) => {
        if (chartData) {
            const chart = {
                series: [
                  {
                    name: 'Marine Sprite',
                    data: [chartData]
                  },

                  {
                    name: 'Marine Sprite',
                    data: [100 - chartData]
                  }
                  ],
                    chart: {
                      type: 'bar',
                      stacked: true,
                      stackType: '100%',
                      toolbar: {
                        show: false
                      },
                      zoom: {
                        enabled: false
                      },
                      sparkline: {
                        enabled: true
                      }
                    },
                    colors: [color, '#666666'],
                    plotOptions: {
                      bar: {
                    horizontal: true,
                    borderRadius: 5,
                    barHeight: '25%'
                      }
                    },
                    grid: {
                      show: false,
                    padding: {
                      left: 20,
                      right: 20
                    } },
                    stroke: {
                      width: 0,
                      colors: ['#fff']
                    },

                    fill: {
                      opacity: 1

                    },
                    legend: {
                      show: false
                    },
                    dataLabels: {
                      enabled: false
                    },
                    tooltip: {
                      enabled: false
                    }

                }

 return (
   <Card className={`${classes.card}`}>
     <div className='mixed-chart'>
       <div className={classes.chartheader}
         style={{ display: 'flex', justifyContent: 'left' }}
       >
         <Typography align='left'
           className={classes.chart}
           style={{ color: color }}
           variant='h4'
         >
           {chartData.toFixed(0) + (unit || '')}
         </Typography>
         <Typography align='left'
           className={classes.text}
           style={{ paddingLeft: '5px' }}
           variant='subtitle2'
         >
           {chartTitle}
         </Typography>

       </div>
       <Chart
         className={classes.chart}
         options={chart}
         series={chart.series}
         type='bar'
         width='100%'
         height='40'
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
            variant='h4'
          >
            {chartTitle}
          </Typography>
        </div>
        <Grid container
          justify='center'
          style={{ margin: '10px 0 20px 0' }}
        >
          <CircleLoader loading
            color={color}
          />
        </Grid>
      </div>
    </Card>)
  }
}

BarChart.propTypes = {
    classes: PropTypes.object.isRequired,
    chartData: PropTypes.array.isRequired,
    chartTitle: PropTypes.string.isRequired,
    unit: PropTypes.string,
    color: PropTypes.string
  }
export default withStyles(styles)(BarChart)
