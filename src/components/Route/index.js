import Loader from '../Loader'
import React, { PropTypes, Component } from 'react'
import look, { StyleSheet } from 'react-look'
import { $ } from '../../utils/i18n/index.js'

class Route extends Component {
  componentDidMount() {
    const {state, actions} = this.props
    actions
      .content
      .loadCurrentRoute()
  }
  componentWillReceiveProps(nextProps) {
    const {state, actions} = this.props
    const nextState = nextProps.state
    if (state.router.location.key !== nextState.router.location.key) {
      actions.content.loadCurrentRoute()
    }
  }
  render() {
    const {state, actions} = this.props
    if (state.router.error === true) {
      return (
        <div className={ styles.center }>
          <br/>
          { $('$core.content.error') }
        </div>
      )
    }
    if (state.content.loading === true) {
      return (
        <div className={ styles.center }>
          <br/><img src="media/loader.gif" /></div>
      )
    }
    if (state.content.data === false) {
      return (
        <div className={ styles.center }>
          <br/>
          { $('$core.router.routeNotFound') }
        </div>
      )
    }
    var data = Object.assign({}, state.content.data, {
      _path: 'root',
      _contentState: state.router.contentState,
      _actions: actions
    })
    return (
      <Loader bauhaus={ data }></Loader>
    )
  }
}

import styleSheet from './style.js'
var styles = StyleSheet.create(styleSheet)

export default look(Route)
