import React, {PropTypes, Component} from 'react';
import Look, {StyleSheet} from 'react-look';
import {$} from '../../utils/i18n/index.js';
import _ from 'lodash';
import objectPath from 'object-path';
import superagent from 'superagent';
import superagentPlugin from '../../utils/helpers/superagentPlugin.js';

class JsonForm extends Component {
	/*constructor() {
		super();
		this.state = {
			savedData: {},
			data: {},
			loading: false,
			initialLoaded: false,
			changed: false,
			error: false
		}
	}*/
	getValue(path) {
		const {bauhaus} = this.props;
		return objectPath.get(bauhaus._state.data, path);
	}
	setValue(path, value) {
		const {bauhaus} = this.props;
		var state = Object.assign({}, bauhaus._state);
		if (state.initialLoaded === true && state.loading === false) {
			var data = state.data;
			objectPath.set(data, path, value);
			state.data = data;
			state.changed = (JSON.stringify(state.data) !== state.savedData);
		}
		bauhaus._setState(state);
	}
	loadData() {
		const {bauhaus} = this.props;
      var state = Object.assign({}, bauhaus._state);
		state.loading = true;
		bauhaus._setState(state);
		superagent
			.get(this.props.bauhaus.props.url)
			.accept('json')
			.use(superagentPlugin())
			.end((function(err, res) {
            var state = Object.assign({}, bauhaus._state);
				if (err != null || res == null || res.body == null || res.body.jsondata == null) {
					state.error = true;
					return bauhaus._setState(state);
				}
				state.data = res.body.jsondata;
				state.savedData = JSON.stringify(res.body.jsondata);
				state.initialLoaded = true;
				state.loading = false;
				state.changed = false;
				bauhaus._setState(state);
			}).bind(this));
	}
	saveData() {
		const {bauhaus} = this.props;
      var state = Object.assign({}, bauhaus._state);
		bauhaus._state.loading = true;
		bauhaus._setState(bauhaus._state);
		superagent
			.put(bauhaus.props.url)
         .send(bauhaus._state.data)
			.accept('json')
			.use(superagentPlugin())
			.end((function(err, res) {
				if (err != null) {
               var state = Object.assign({}, bauhaus._state);
					bauhaus._state.error = true;
					return bauhaus._setState(bauhaus._state);
				}
				this.loadData();
			}).bind(this));
	}
	delete() {
		const {bauhaus} = this.props;
      var state = Object.assign({}, bauhaus._state);
		bauhaus._state.loading = true;
		bauhaus._setState(bauhaus._state);
		superagent
			.delete(bauhaus.props.url)
			.accept('json')
			.use(superagentPlugin())
			.end((function(err, res) {
				if (err != null) {
               var state = Object.assign({}, bauhaus._state);
					bauhaus._state.error = true;
					return bauhaus._setState(bauhaus._state);
				}
				this.loadData();
			}).bind(this));
	}
	componentWillMount() {
		const {bauhaus} = this.props;
		bauhaus._setState({
			savedData: {},
			data: {},
			loading: false,
			initialLoaded: false,
			changed: false,
			error: false
		});
	}
	componentDidMount() {
		this.loadData();
	}
	reset() {
		this.loadData();
	}
	render() {
		const {bauhaus} = this.props;
		if (bauhaus._state.error === true) {
			return (
				<div look={styles.center}><br/>{$('$core.content.error')}</div>
			);
		}
		if (bauhaus._state.loading === true || bauhaus._state.initialLoaded === false) {
			return (
				<div look={styles.center}><br/><img src="media/loader.gif"/></div>
			);
		}
		var saveColor = styles.gray;
		if (bauhaus._state.changed === true) {
			saveColor = styles.green;
		}
		return (
			<div>
				<span look={styles.contentHeadline}>{bauhaus.props.title}</span><hr look={styles.contentHr}/>
				<input look={[styles.button, saveColor,]} type="button" value="Save" onClick={this
					.saveData
					.bind(this)} key="b1"/>
				<input look={[styles.button, styles.gray,]} type="button" value="Reset" onClick={this
					.reset
					.bind(this)} key="b2"/>
				<input look={[styles.button, styles.gray, styles.hoverRed,]} type="button" value="Delete" onClick={this
					.delete
					.bind(this)} key="b3"/>
				<br/><br/>
				{_
					.map(bauhaus._childrenGenerators, function(component, key) {
						return component({
							get: this
								.getValue
								.bind(this),
							set: this
								.setValue
								.bind(this),
							key: key,
						})
					}.bind(this))}
			</div>
		);
	}
}

import styleSheet from './style.js';
var styles = StyleSheet.create(JsonForm, styleSheet);

export default Look(JsonForm);