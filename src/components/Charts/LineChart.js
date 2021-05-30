import React from 'react'
import Chart from 'react-apexcharts'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import { Card, Grid, Typography } from '@material-ui/core'
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
      boxShadow: '20px 20px 20px 0px rgb(255 255 255 / 2%), -2px -2px 20px rgb(0 0 0 / 3%), inset 12px 3px 20px 0px rgb(255 255 255 / 3%), inset -3px -7px 17px 0px #0404044a, 5px 5px 9px 0px rgb(255 255 255 / 5%), -20px -20px 12px rgb(0 0 0 / 3%), inset 1px 1px 6px 0px rgb(255 255 255 / 2%), inset -1px -1px 2px 0px #0404040f',
      backgroundColor: '#1b1b1ba1',
      [theme.breakpoints.down('xs')]: {
        marginTop: theme.spacing(2),
        marginLeft: '0px',
        marginBottom: '0px',
        width: '100vw'
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

const LineChart = (props) => {
  const color = '#00EAB7'
  const { classes, chartData, chartTitle, headerNumber } = props
        if (chartData && chartData.data && headerNumber) {
          const chart = {
              series: [
                  chartData
                ],
                chart: {
                  redrawOnWindowResize: true,
                dropShadow: {
                  enabled: true,
                  enabledOnSeries: undefined,
                  top: 5,
                  left: 0,
                  blur: 3,
                  opacity: 0.3,
                  color: color
                },
                  type: 'area',
                  height: 150,
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
                plotOptions: {},
                legend: {
                  show: false
                },
                dataLabels: {
                  enabled: false
                },
                fill: {
                  colors: [color]
                },
                stroke: {
                  colors: [color],
                  curve: 'smooth',
                  show: true,
                  width: 3
                },
                xaxis: {
                  type: 'datetime',
                  axisBorder: {
                    show: false
                  },
                  axisTicks: {
                    show: false
                  },
                  labels: {
                    show: false,
                    style: {
                      fontSize: '12px'
                    }
                  },
                  crosshairs: {
                    show: false,
                    position: 'front',
                    stroke: {
                      width: 1,
                      dashArray: 3
                    }
                  }
                },
                yaxis: {
                  labels: {
                    show: false,
                    style: {
                      fontSize: '12px'
                    }
                  }
                },
                states: {
                  normal: {
                    filter: {
                      type: 'none',
                      value: 0
                    }
                  },
                  hover: {
                    filter: {
                      type: 'none',
                      value: 0
                    }
                  },
                  active: {
                    allowMultipleDataPointsSelection: false,
                    filter: {
                      type: 'none',
                      value: 0
                    }
                  }
                },
                tooltip: {
                  theme: 'dark',
                  style: {
                    fontSize: '12px'
                  },
                  marker: {
                    show: false
                },
                  fixed: {
                  enabled: true,
                  position: 'topRight' },
                  y: {
                    formatter: function (val) {
                      return val.toFixed(2) + ' YUP'
                    }
                  }
                },
                markers: {
                  strokeWidth: 3
                }
              }
 return (
   <Card className={`${classes.card}`}>
     <div className='mixed-chart'>
       <div className={classes.chartheader} >
         <div style={{ display: 'flex', justifyContent: 'space-between' }}>
           <Typography align='left'
             className={classes.chart}
             style={{ color: color }}
             variant='h4'
           >
             {headerNumber.toFixed(2)}
           </Typography>
           <Typography align='left'
             className={classes.text}
             color={color}
             variant='subtitle2'
           >
             YUP  {chartTitle}
           </Typography>
         </div>
       </div>
       <Chart
         options={chart}
         series={chart.series}
         type='area'
         width='100%'
         height='200'
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

LineChart.propTypes = {
    classes: PropTypes.object.isRequired,
    chartData: PropTypes.array.isRequired,
    chartTitle: PropTypes.string.isRequired,
    headerNumber: PropTypes.string.isRequired
  }
export default withStyles(styles)(LineChart)
