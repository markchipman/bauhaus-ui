var style = {
  section: {
    paddingTop: 24,
    paddingBottom: 0,
    fontSize: 24,
    fontWeight: 300,
    cursor: 'pointer'
  },
  sectionHr: {
    border: 'none',
    height: '1px',
    backgroundColor: 'rgba(0, 0, 0, 0.15)',
    marginLeft: '-10px',
    width: 'calc(100% + 20px)'
  },
  sectionEnd: {
    height: 30
  },
  content: {
    //overflow: 'hidden',
    display: (props, state) => {
      if (state.folded === true) {
        return 'none'
      }
      return 'initial'
    }
  }
/*
overflow: hidden
max-height: 72px
transition: ease 0.3s
transform: scaleY(0)
transform: scaleY(1)
transform-origin: top

*/
}
export default style
