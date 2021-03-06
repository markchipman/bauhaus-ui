import React, { Component } from 'react'
import Look, { StyleSheet } from 'react-look'
const c = StyleSheet.combineStyles
import Scribe from 'scribe-editor'
import scribePluginToolbar from 'scribe-plugin-toolbar'
import scribePluginHeadingCommand from 'scribe-plugin-heading-command'
import scribePluginLinkPromptCommand from 'scribe-plugin-link-prompt-command'
import scribePluginBlockquoteCommand from 'scribe-plugin-blockquote-command'
import scribePluginImagePromptCommand from './plugins/image.js'
import scribePluginInsertHTMLPromptCommand from './plugins/html.js'
//import Icon from 'babel!svg-react!./icons/bin.svg?name=Icon'  <iframe width="560" height="315" src="https://www.youtube.com/embed/eGjO_NCbouk" frameborder="0" allowfullscreen></iframe>
import icons from './icons.js'

const componentScope = 'scribe-editor-bauhaus-ui-input-scope'

StyleSheet.addCSS({
  '.active': {
    fill: '#20C753',
    color: '#20C753'
  }
}, '.' + componentScope)

class ScribeEditor extends Component {
  constructor() {
    super()
    this.refis = {}
    this.scribe = null
    this.newValue = null
    this.updatedValue = null
    this.timeout = null
  }
  setRef(name) {
    return function(elem) {
      this.refis[name] = elem
    }
  }
  componentDidMount() {
    var scribe = new Scribe(this.refis.main)
    scribe.use(scribePluginToolbar(this.refis.toolbar))
    scribe.use(scribePluginHeadingCommand(1))
    scribe.use(scribePluginHeadingCommand(2))
    scribe.use(scribePluginHeadingCommand(3))
    scribe.use(scribePluginLinkPromptCommand())
    scribe.use(scribePluginImagePromptCommand())
    scribe.use(scribePluginInsertHTMLPromptCommand())
    scribe.setContent(this.props.value)

    function updateHtml() {
      if (this.timeout != null) {
        clearTimeout(this.timeout)
        this.timeout = null
      }
      this.timeout = setTimeout(function() {
        var value = scribe.getHTML()
        if (value !== this.props.value && value !== this.newValue) {
          this.updatedValue = value
          this.props.onChange(value)
        }
      }.bind(this), 100)
    }

    scribe.on('content-changed', updateHtml.bind(this))
    this.scribe = scribe
  }
  componentWillUnmount() {
  }
  componentWillReceiveProps(newProps) {
    if (newProps.value !== this.props.value && this.updatedValue !== newProps.value) {
      this.newValue = newProps.value
      this.scribe.setContent(newProps.value)
    }
  }
  shouldComponentUpdate(newProps) {
    if ((newProps.value !== this.props.value && this.updatedValue !== newProps.value) || this.props.valid !== newProps.valid) {
      return true
    }
    return false
  }
  render() {
    const {valid} = this.props
    var inputStyle = [styles.textInput]
    if (valid !== true) {
      inputStyle.push(styles.inputError)
    }
    return (
      <div className={ styles.wrapper }>
        <div className={ c(componentScope) } ref={ this
                                                     .setRef('toolbar')
                                                     .bind(this) }>
          <button className={ styles.button } data-command-name="h1">
            <span className={ styles.buttonText }>H1</span>
          </button>
          <button className={ styles.button } data-command-name="h2">
            <span className={ styles.buttonText }>H2</span>
          </button>
          <button className={ styles.button } data-command-name="h3">
            <span className={ styles.buttonText }>H3</span>
          </button>
          <button className={ styles.button } data-command-name="bold">
            <icons.bold className={ styles.icon } />
          </button>
          <button className={ styles.button } data-command-name="italic">
            <icons.italic className={ styles.icon } />
          </button>
          <button className={ styles.button } data-command-name="underline">
            <icons.underline className={ styles.icon } />
          </button>
          <button className={ styles.button } data-command-name="strikeThrough">
            <icons.strikethrough className={ styles.icon } />
          </button>
          <button className={ styles.button } data-command-name="indent">
            <icons.indent className={ styles.icon } />
          </button>
          <button className={ styles.button } data-command-name="outdent">
            <icons.outdent className={ styles.icon } />
          </button>
          <button className={ styles.button } data-command-name="undo">
            <icons.undo className={ styles.icon } />
          </button>
          <button className={ styles.button } data-command-name="redo">
            <icons.redo className={ styles.icon } />
          </button>
          <button className={ styles.button } data-command-name="subscript">
            <icons.subscript className={ styles.icon } />
          </button>
          <button className={ styles.button } data-command-name="superscript">
            <icons.superscript className={ styles.icon } />
          </button>
          <button className={ styles.button } data-command-name="insertOrderedList">
            <icons.listNumbered className={ styles.icon } />
          </button>
          <button className={ styles.button } data-command-name="insertUnorderedList">
            <icons.list className={ styles.icon } />
          </button>
          <button className={ styles.button } data-command-name="linkPrompt">
            <icons.link className={ styles.icon } />
          </button>
          <button className={ styles.button } data-command-name="imagePrompt">
            <icons.image className={ styles.icon } />
          </button>
          <button className={ styles.button } data-command-name="htmlPrompt">
            <icons.html className={ styles.icon } />
          </button>
        </div>
        <div className={ c(...inputStyle) } ref={ this
                                                    .setRef('main')
                                                    .bind(this) }></div>
      </div>
    )
  }
}

import styleSheet from './style.js'
var styles = StyleSheet.create(styleSheet)

export default Look(ScribeEditor)
