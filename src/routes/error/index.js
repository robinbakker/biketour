import { h, Component } from 'preact';
import style from './style';

export default class Error extends Component {
	render() {
		return (
			<div class={style.error}>
				<h1>Oeps</h1>
				<p>Deze pagina is er stiekem toch niet...</p>
				<a href="/">&laquo; Weg hier</a>
			</div>
		);
	}
}