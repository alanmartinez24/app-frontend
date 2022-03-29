import { withStyles } from '@material-ui/core/styles'
import Rating from '@material-ui/lab/Rating'

const ratingStyles = ({ palette }) => ({
  iconFilled: {
    border: '3px',
    borderColor: palette.common.first,
    color: palette.alt.first
  },
  iconHover: {
    stroke: palette.common.first
  },
  iconEmpty: {
    color: palette.alt.first
  }
})

export default withStyles(ratingStyles)(Rating)
