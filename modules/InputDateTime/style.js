import { StyleSheet } from 'react-look'

var style = {
  textInput: {
    padding: '8px',
    paddingLeft: '16px',
    paddingRight: '16px',
    borderRadius: 5, // 4px
    border: '1px solid rgb(210, 210, 210)',
    boxSizing: 'border-box',
    backgroundColor: 'transparent',
    outline: 'none',
    color: '#4E4E4E',
    fontSize: 14,
    minHeight: 37,
    width: '100%',
    ':focus': {
      border: '1px solid #20C753', // F96331 6E00FF
      color: '#000000'
    }
  },
  inputError: {
    color: '#ff0000',
    border: '1px solid #ff0000',
    backgroundColor: 'rgba(255, 0, 0, 0.07)',
    ':focus': {
      border: '1px solid #ff0000', // F96331 6E00FF
      color: '#ff0000',
      backgroundColor: 'transparent'
    }
  },
  box: {
    display: 'flex',
    flexWrap: 'nowrap',
    justifyContent: 'space-between',
    marginBottom: 10
  },
  innerBox: {
    display: 'flex',
    flex: 2,
    maxHeight: 37
  },
  spaceBox: {
    display: 'flex',
    width: 10
  },
  labelBox: {
    display: 'flex',
    width: 60,
    paddingTop: 7
  }
}
export default StyleSheet.create(style)
