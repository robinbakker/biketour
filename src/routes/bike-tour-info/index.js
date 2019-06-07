import { h, Component } from 'preact';
import style from './style';
import { Link } from 'preact-router/match';

export default class BikeTourInfo extends Component {
	componentDidMount() {
		if (document) {
			document.body.className = 'bike-tour-info';
		}
	}

	render() {
		return (
			<div class={style.biketour}>
				<h2 class={style.pagecaption + ' page-title'}>Fietspuzzeltocht</h2>
				<img src={'./assets/biketour-header.jpg'} loading={'lazy'} class={'fullwidth'} alt="Duinfoto" />
				<article class={style.article}>
					<h2 class={style.infotitle}>Info</h2>
					<div class={style.articlecontent}>
						<p>Dit is een fietspuzzeltocht door Camperduin/Groet/Schoorl.<br/>
						De tocht begint links van de keerlus voor de strandopgang van Camperduin, op het fietspad bij het bord “Welkom in de Schoorlse Duinen” (<a href={'https://www.google.com/maps/place/Heereweg,+1871+GL+Schoorl/@52.7256783,4.6407209,18z/data=!3m1!4b1!4m5!3m4!1s0x47cf5bbc1556638b:0x5d508fc020d173d4!8m2!3d52.7258434!4d4.6416425'} target={'_blank'} rel={'noopener'}>zie hier</a>).</p>
						<div class={'align-center'}>
							<Link href='/gatochfietsen' class={'btn btn--primary btn-margin icon icon--bike btn-icon'}>Start fietstocht</Link>
						</div>
						<p>De fietstocht gaat voor het grootste deel over fietspaden door het natuurgebied “De Schoorlse Duinen” en heeft een lengte van 23 km. Wegen met overig verkeer hebben wij zoveel als mogelijk gemeden. Wij verwachten dat eenieder zich aan de regels houdt, de natuur met respect behandelt en niet onnodig van fiets- en wandelpaden afwijkt. Let op met zand vol gewaaide fietspaden (de zgn. “wandelende duinen”). Dat kan voor onaangename verrassingen zorgen. Ze worden met regelmaat schoongeveegd. Maar je zult het maar net zien als er pas een storm is geweest.</p>
						<p>De antwoorden op de vragen zijn te vinden op, langs of zeer nabij de route.<br/>Let dus goed op!</p>
						<p class={'p-icon p-icon--star'}>Voor enkele vragen zijn bonuspunten te verdienen.</p>
						<p>Aan het eind kan je zelf je antwoorden controleren/nakijken. 😉</p>
						<p>Het kan natuurlijk goed zijn dat in de loop van tijd wijzigingen op de route zijn (ontbrekende bordjes of verlegde paden), dus houdt dat in het achterhoofd.</p>
						<h3 class={style.subtitle}>Privacy / cookies</h3>
						<p>De antwoorden die je invult worden alleen op je eigen apparaat opgeslagen en er worden hiervoor verder geen gegevens gedeeld of cookies geplaatst. Deze website gebruikt Google Analytics (<a href={'https://www.autoriteitpersoonsgegevens.nl/nl/onderwerpen/internet-telefoon-tv-en-post/cookies#hoe-kan-ik-bij-google-analytics-de-privacy-van-mijn-websitebezoekers-beschermen-4898'} rel={'noopener'} target={'_blank'}>privacyvriendelijk ingesteld</a>).</p>
					</div>					
				</article>
				<span class={style.footerinfo}>Source and more information: <a href={'https://github.com/robinbakker/biketour'} rel={'noopener'} target={'_blank'}>https://github.com/robinbakker/biketour</a></span>
			</div>
		);
	}
}