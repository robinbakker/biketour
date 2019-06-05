import { h, Component } from 'preact';
import { Link } from 'preact-router/match';
import style from './style';

export default class Header extends Component {
	render({ishome}) {
		return(
			<header class={style.header}>
			{ishome 
				? <Link class={style.start + ' icon icon--bike'} href="/gatochfietsen" title={'Start fietstocht'}>Go</Link>
				: <Link class={style.info} href="/" title={'info'}>i</Link> 
			}
			</header>
		);
	}
}