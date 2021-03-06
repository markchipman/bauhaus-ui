import React, { PropTypes, Component } from 'react'
import Look, { StyleSheet } from 'react-look'
const c = StyleSheet.combineStyles
import { $ } from 'bauhaus-ui-module-utils'

class InputCheckbox extends Component {
  handleChange(event) {
    const {bauhaus, get, set} = this.props
    var value = event.target.checked
    set(bauhaus.props.path, value)
  }
  render() {
    const {bauhaus, get, set, isValid} = this.props
    var valid = isValid(bauhaus.props.path)
    var inputStyle = [styles.textInput]
    if (valid !== true) {
      inputStyle.push(styles.inputError)
    }
    return (
      <input className={ c(...inputStyle) } type="checkbox" checked={ get(bauhaus.props.path) } onChange={ this
                                                                                                       .handleChange
                                                                                                       .bind(this) }></input>
      )
  }
}

import styleSheet from './style.js'
var styles = StyleSheet.create(styleSheet)

export default Look(InputCheckbox)
