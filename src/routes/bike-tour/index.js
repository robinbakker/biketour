import { h, Component } from 'preact';
import style from './style';
import {getDistanceFromLatLonInKm} from '../../utils/geolocation';
import { get, set } from '../../utils/idb-keyval';
import { Link } from 'preact-router';

export default class BikeTour extends Component {
	scrollTimer = null;
	state = {
		currentLocationIndex: 0,
		locationError: '',
		answers: {},
		locations: [{
				id:'loc01',
				lat: 52.725749,
				lon: 4.641993,
				isChecked: false
			},{
				id:'loc02',
				lat: 52.712090,
				lon: 4.641132,
				isChecked: false
			},{
				id:'loc03',
				lat: 52.701075,
				lon: 4.637669,
				isChecked: false
			},{
				id:'loc04',
				lat: 52.697475,
				lon: 4.638750,
				isChecked: false
			},{
				id:'loc05',
				lat: 52.69953111,
				lon: 4.642188,
				isChecked: false
			},{
				id:'loc06', //Kerf
				lat: 52.686718,
				lon: 4.644994,
				isChecked: false
			},{
				id:'loc07', // T
				lat: 52.681578,
				lon: 4.646415,
				isChecked: false
			},{
				id:'loc08', // ANWB
				lat: 52.682233,
				lon: 4.665733,
				isChecked: false
			},{
				id:'loc09', // Bankje
				lat: 52.682317,
				lon: 4.674060,
				isChecked: false
			},{
				id:'loc10', // Il primo
				lat: 52.679661,
				lon: 4.692098,
				isChecked: false
			},{
				id:'loc11', // Lovinkslaan
				lat: 52.682560,
				lon: 4.678517,
				isChecked: false
			},{
				id:'loc12', // ANWB
				lat: 52.682192,
				lon: 4.672303,
				isChecked: false
			},{
				id:'loc13', // Berenkuil
				lat: 52.697479, 
				lon: 4.669915,
				isChecked: false
			},{
				id:'loc14', // Berenkuil2
				lat: 52.698195,  
				lon: 4.670946,
				isChecked: false
			},{
				id:'loc15', // Buitencentrum
				lat: 52.705245,   
				lon: 4.688404,
				isChecked: false
			},{
				id:'loc16', // Kerkje
				lat: 52.720401,  
				lon: 4.668490,
				isChecked: false
			},{
				id:'loc17', // Fietspad
				lat: 52.723000,  
				lon: 4.659935,
				isChecked: false
			},{
				id:'loc18', // Finish
				lat: 52.726292, 
				lon: 4.643022,
				isChecked: false
			}
		]
	};
	componentDidMount() {
		if (document) {
			document.body.className = 'bike-tour';			
		}

		let self = this;
		get('answers').then(val => self.setState({
			answers: val
		}));

		if (window) {
			let self = this;
			let scrollContainer = document.getElementsByTagName('article')[0];
			if (scrollContainer) {
				scrollContainer.addEventListener('scroll', self.handleScroll);
				if (window.location.hash) {
					let locID = window.location.hash.substr(1);
					let locIndex = 0;
					document.querySelectorAll('article > div').forEach(function(item, i) { 
						if (item.id==locID) {
							locIndex = i;		
							self.setState({currentLocationIndex:locIndex});
						}
					});
					scrollContainer.scrollLeft = (locIndex * scrollContainer.offsetWidth) + 10;					
				}
			}			
		}
	}

	handleScroll = (ev) => {
		if (this.scrollTimer !== null) {
			clearTimeout(this.scrollTimer);        
		}
		let self = this;
		this.scrollTimer = setTimeout(function() {
			//determine locationIndex
			let locIndex = Math.round(ev.target.scrollLeft / ev.target.offsetWidth);
			self.setState({currentLocationIndex:locIndex});
		}, 150);
	}

	getMyLocation = () => {
		if (window && navigator && navigator.geolocation) {
			let self = this;
			navigator.geolocation.getCurrentPosition(function(pos) {
				// Geo success! Try to find the matching location card
				if (!pos || !pos.coords) {
					self.locationNotFoundError();
					return;
				}
				let foundLocation = null;
				self.state.locations.forEach(loc => {
					let curDist = getDistanceFromLatLonInKm(loc.lat, loc.lon, pos.coords.latitude, pos.coords.longitude);
					if (curDist <= .15) { // within 150 metres
						if(foundLocation==null || foundLocation.dist>curDist) {
							foundLocation = {
								dist: curDist,
								loc: loc
							};
						}
					}
				});
				if (foundLocation != null) {
					window.location.href = '#' + foundLocation.loc.id;
				} else {
					self.locationNotFoundError();
				}
			}, self.locationNotFoundError, {
				enableHighAccuracy: true,
				timeout: 5000,
				maximumAge: 0
			});
		}
	}

	locationNotFoundError = () => {
		let self=this;
		this.setState({locationError: 'Sorry, geen locatie gevonden... :('});
		setTimeout(function() {
			self.setState({locationError: ''});
		}, 5000)
	}

	goNext = () => {
		if (this.state.currentLocationIndex+1 < this.state.locations.length) {
			let newIndex = this.state.currentLocationIndex + 1;
			this.setState({currentLocationIndex:newIndex});
			if (window) {
				window.location.href = '#'+this.state.locations[newIndex].id;
			}
		}
	}

	goPrev = () => {
		if (this.state.currentLocationIndex > 0) {
			let newIndex = this.state.currentLocationIndex - 1;
			this.setState({currentLocationIndex:newIndex});
			if (window) {
				window.location.href = '#'+this.state.locations[newIndex].id;
			}
		}
	}

	render() {
		return (
			<div class={style.biketour}>
				{this.state.locationError ? 
					<div id={style.locationerrormessage}><div>{this.state.locationError}</div></div>
					: null
				}
				<div id={style.footernav} class={'js-footer-nav'}>
					<button id={style.buttonprev} class={style['loc' + this.state.currentLocationIndex]} onClick={this.goPrev}>Vorige</button>
					<button id={style.buttonloc} onClick={this.getMyLocation} title="Mijn locatie"></button>
					<button id={style.buttonnext} class={style['loc' + this.state.currentLocationIndex]} onClick={this.goNext}>Volgende</button>
				</div>
				<h2 class={style.pagecaption + ' page-title icon icon--bike-tour'}>Fietspuzzeltocht</h2>
				<article class={style.touritemwrapper + ' page-content'}>
					<div id={'loc01'} class={style.navitem}>
				    <div class={style.card}>
							<h3 class={style.kmtitle}><span class={style.pointer}></span>0 KM</h3>
							<img src={'./assets/fietsbordje-20.svg'} class={style.sign} alt={'Knooppunt 20'} />
							<p>Fietsknooppunt 20 volgen.<br /><strong>Let op:</strong> gevaarlijke oversteek.</p>
							<div class={style.clear}></div>
							<img src={'./assets/fietsbordje-46.svg'} class={style.sign} alt={'Knooppunt 46'} />
							<p>Bij knooppunt 20: volg de route naar knooppunt 46.</p>
							<div class={style.clear}></div>
							{this.getQuestion(1, 'Hoe heet deze weg?')}
						</div>
					</div>
					<div id={'loc02'} class={style.navitem}>
						<div class={style.card}>
							<h3 class={style.kmtitle}><span class={style.pointer}></span>2,6 KM</h3>
							<p>Je nadert nu een hoge mast.</p>
							{this.getQuestion(2, 'Welk telefoonnummer moet je bellen bij een calamiteit?', '', false, true)}
							{this.getBonusQuestion(1, 'Wat is de zonecode van de grote parkeerplaats?', 'padding-bottom', false, true)}
							{this.getBonusQuestion(2, 'Benaderingsvraag: hoeveel auto’s kunnen hier (normaal) parkeren?', 'margin-bottom', false, true)}
							<img src={'./assets/fietsbordje-46.svg'} class={style.sign} alt={'Knooppunt 46'} />
							<p>Blijf knooppunt 46 volgen</p>
							<div class={style.clear}></div>
						</div>
					</div>
					<div id={'loc03'} class={style.navitem}>
						<div class={style.card}>
							<h3 class={style.kmtitle}><span class={style.pointer}></span>4,0 KM</h3>
							<p>Je komt nu langs strandslag 21. Ga even het strand op!</p>
							{this.getQuestion(3, 'Wat is het nummer van de aanwezige strandpaal?', 'padding-bottom', true)}
							{this.getBonusQuestion(3, 'Waar staat paal 1 overigens?', 'padding-bottom')}
							{this.getBonusQuestion(4, 'Waar staan de letters HHNK voor?')}
							<p>Vervolg daarna je weg.<br />Je passeert nu strandslag 22. Deze laat je rechts liggen.</p>
						</div>
					</div>
					<div id={'loc04'} class={style.navitem}>
						<div class={style.card}>
							<h3 class={style.kmtitle}><span class={style.pointer}></span>4,6 KM</h3>					
							<p>Je gaat nu over een wildrooster en komt in een begrazingsgebied. De kans bestaat nu dat je Schotse Hooglanders tegenkomt. Nee, dat zijn geen mannen in kilt.</p>
							{this.getQuestion(4, 'Hoeveel spijlen heeft dit wildrooster?', '', true)}
						</div>
					</div>
					<div id={'loc05'} class={style.navitem}>
						<div class={style.card}>
							<h3 class={style.kmtitle}><span class={style.pointer}></span>5,0 KM</h3>
							<img src={'./assets/fietsbordje-08.svg'} class={style.sign} alt={'Knooppunt 08'} />
							<p>Ga rechtsaf richting knooppunt 08.<br />Je rijdt nu door een gebied waar jaren terug drie grote branden veel natuur heeft verwoest. Kale boomstammen herinneren hier nog aan.</p>
							<div class={style.clear}></div>
						</div>
					</div>
					<div id={'loc06'} class={style.navitem}>
						<div class={style.card}>
							<h3 class={style.kmtitle}><span class={style.pointer}></span>6,7 KM</h3>
							<p>Je gaat nu weer over een wildrooster. Je bent weer veilig.<br />Meteen rechts passeer je “De Kerf”. Stop hier en fiets een stukje het pad af. Je komt nu bij een uitzichtpunt.</p>
							{this.getQuestion(5, 'Hoeveel treden is het naar boven?', 'padding-bottom', true)}
							{this.getBonusQuestion(5, 'Boven gekomen tref je een plateau met een verrekijker. Wat is hier welkom?', 'padding-bottom')}
							{this.getBonusQuestion(6, 'Maak een foto van tenminste 3 personen uit je eigen groep. Elk persoon meer uit je eigen groep is een bonuspunt extra.', '', true, false, true)}
							<p>Ga terug naar het fietspad en vervolg je weg.</p>
						</div>
					</div>
					<div id={'loc07'} class={style.navitem}>
						<div class={style.card}>
							<h3 class={style.kmtitle}><span class={style.pointer}></span>7,3 KM</h3>
							<p>Bij T-splitsing linksaf.</p>
						</div>
					</div>
					<div id={'loc08'} class={style.navitem}>
						<div class={style.card}>
							<h3 class={style.kmtitle}><span class={style.pointer}></span>8,7 KM</h3>
							<p>Stop bij ANWB-paddenstoel 20641/001.</p>
							{this.getQuestion(6, 'Als je van hieruit naar elke plaats heen en weer zou moeten rijden, hoeveel bedraagt dan het aantal afgelegde kilometers?')}
							<p>Je vervolgt de weg richting Bergen (Blijdesteinweg).</p>
						</div>
					</div>
					<div id={'loc09'} class={style.navitem}>
						<div class={style.card}>
							<h3 class={style.kmtitle}><span class={style.pointer}></span>10,1 KM</h3>
							<p>Onderweg aan de linkerzijde passeer je een bankje.</p>
							{this.getQuestion(7, 'Welk nummer heeft dit bankje en door wie is dit bankje aangeboden?', 'padding-bottom')}
							{this.getBonusQuestion(7, 'Maak een foto van jullie eigen groep, gezeten op dit bankje.', 'margin-bottom', true, false, true)}
							<img src={'./assets/fietsbordje-48.svg'} class={style.sign} alt={'Knooppunt 48'} />
							<p>Verderop linksaf knooppunt 48 blijven volgen.</p>
							<div class={style.clear}></div>
						</div>
					</div>
					<div id={'loc10'} class={style.navitem}>
						<div class={style.card}>
							<h3 class={style.kmtitle}><span class={style.pointer}></span>11,1 KM</h3>
							<p>Je nadert nu Bergen. Bij bergen hoort wintersport, maar Bergen is ook een kunstenaarsdorp. Aan de linkerzijde kom je straks bij een kunstskibaan.</p>
							{this.getQuestion(8, 'Hoe heet deze wintersportlocatie?', 'padding-bottom')}
							{this.getBonusQuestion(8, 'Er wordt hier ook getraind door een schaatstrainingsgroep. Wat is hiervan de naam?', 'margin-bottom')}
							<p class={style.returnarrow}><strong>Omkeren</strong><br />Om veiligheidsredenen gaan we dezelfde weg terug richting Schoorl aan Zee.</p>
						</div>
					</div>
					<div id={'loc11'} class={style.navitem}>
						<div class={style.card}>
							<h3 class={style.kmtitle}><span class={style.pointer}></span>12,6 KM</h3>
							<p>1e Weg rechtsaf richting Schoorl aan Zee (Lovinkslaan). Dus <strong>niet</strong> knooppunt 47 volgen. Je komt nu langs twee boshuisjes.</p>
							{this.getQuestion(9, 'Wat zijn de namen van deze twee huisjes respectievelijk?')}
						</div>
					</div>
					<div id={'loc12'} class={style.navitem}>
						<div class={style.card}>
							<h3 class={style.kmtitle}><span class={style.pointer}></span>13,7 KM</h3>
							<p>Bij ANWB-paddenstoel 22915/001 rechtsaf richting Schoorl aan Zee.</p>
							<img src={'./assets/fietsbordje-47.svg'} class={style.sign} alt={'Knooppunt 47'} />
							<p>Je volgt nu weer knooppunt 47.</p>
							<div class={style.clear}></div>
						</div>
					</div>
					<div id={'loc13'} class={style.navitem}>
						<div class={style.card}>
							<h3 class={style.kmtitle}><span class={style.pointer}></span>14,2 KM</h3>
							<p>Rechtsaf knooppunt 47 richting Schoorl. Je komt nu weer langs een boshuisje.</p>
							{this.getQuestion(10, 'Wat is de naam van dit huisje?')}
							<p>Aan het eind van de weg ligt links “De Berenkuil”.</p>
						</div>
					</div>
					<div id={'loc14'} class={style.navitem}>
						<div class={style.card}>
							<h3 class={style.kmtitle}><span class={style.pointer}></span>16,0 KM</h3>
							<img src={'./assets/fietsbordje-45.svg'} class={style.sign} alt={'Knooppunt 45'} />
							<p>Ga nu rechtsaf naar knooppunt 45 richting Schoorl, “Buitencentrum Schoorlse Duinen”.</p>
							<div class={style.clear}></div>
							<img src={'./assets/fietsbordje-21.svg'} class={style.sign} alt={'Knooppunt 21'} />
							<p>Ga bij knooppunt 45 linksaf richting knooppunt 21.</p>
							<div class={style.clear}></div>
						</div>
					</div>
					<div id={'loc15'} class={style.navitem}>
						<div class={style.card}>
							<h3 class={style.kmtitle}><span class={style.pointer}></span>18,0 KM</h3>
							<p>Na 150 meter aan de linkerzijde bevindt zich “Buitencentrum  Schoorlse Duinen”. Hier kan je als je tijd hebt binnen even een kijkje nemen. Je kunt hier ook naar het toilet.</p>
							<img src={'./assets/fietsbordje-21.svg'} class={style.sign} alt={'Knooppunt 21'} />
							<p>Na het bezoekerscentrum de weg vervolgen richting knooppunt 21.</p>
							<div class={style.clear}></div>
						</div>
					</div>
					<div id={'loc16'} class={style.navitem}>
						<div class={style.card}>
							<h3 class={style.kmtitle}><span class={style.pointer}></span>20,2 KM</h3>
							<p>Na enige tijd kom je in Groet langs een kerkje.</p>
							{this.getQuestion(11, 'Hoe heet dit kerkje?', 'padding-bottom')}
							{this.getBonusQuestion(9, 'Uit welk jaar dateert het?', 'padding-bottom')}
							{this.getBonusQuestion(10, 'Welk beeld staat er op het grasveld voor deze kerk?')}
							<p>Vervolg de weg.</p>
							<img src={'./assets/fietsbordje-73.svg'} class={style.sign} alt={'Knooppunt 73'} />
							<p>Aan het einde rechtsaf richting knooppunt 73.</p>
							<div class={style.signcross}>
								<img src={'./assets/fietsbordje-73.svg'} class={style.sign} alt={'Knooppunt 73'} />
							</div>
							<p><strong>Let op:</strong> gevaarlijke oversteek!</p>
							<p>Linksaf richting Camperduin (dus niet meer het knooppunt 73 volgen).</p>
							<div class={style.clear}></div>
						</div>
					</div>
					<div id={'loc17'} class={style.navitem}>
						<div class={style.card}>
							<h3 class={style.kmtitle}><span class={style.pointer}></span>21,4 KM</h3>
							<p>Rechtsaf fietspad naar Camperduin volgen. Recht voor je zie je een stolpboerderij.</p>
							{this.getQuestion(12, 'Wat is de kleur van het dak?', '', true)}
							<p>Vervolg het fietspad naar Camperduin. Ga rechtdoor over de rotonde.</p>
						</div>
					</div>
					<div id={'loc18'} class={style.navitem}>
						<div class={style.card}>
							<h3 class={style.kmtitle}><span class={style.pointer}></span>23 KM</h3>
							<p>Je komt weer aan in Camperduin.</p>
							<hr class={style.line + ' ' + style.finishline} />
							{this.state.answers ? 
							<div class={'align-center'}><Link href={'/vragenlijst'} class={'btn btn--secondary'}>Vragenoverzicht</Link></div>
							: null}
							<p>Deze puzzeltocht is met zorg samengesteld. Over de uitslag van deze puzzeltocht kan niet worden gediscussieerd. 😄</p>
						</div>
					</div>
				</article>
			</div>
		);
	}

	focusField = () => {
		document.getElementsByClassName('js-footer-nav')[0].classList.add('is-hidden');
	}
	saveData = (AEvent) => {
		let thisElm = AEvent.target;
		let tempAnswers = this.jsonCopy(this.state.answers);
		let answer = tempAnswers[thisElm.id];
		if (thisElm) {
			if ((!answer && thisElm.value) || (answer && answer!=thisElm.value)) {
				tempAnswers[thisElm.id] = thisElm.value;
				this.setState({answers: tempAnswers});
				set('answers', tempAnswers);
			}
		}
		document.getElementsByClassName('js-footer-nav')[0].classList.remove('is-hidden');		
	}
	saveImage = (AItemID, AUrl) => {
		let tempAnswers = this.jsonCopy(this.state.answers);
		let answer = tempAnswers[AItemID];
		if ((!answer && AUrl) || (answer && answer!=AUrl)) {
			tempAnswers[AItemID] = AUrl;
			this.setState({answers: tempAnswers});
			set('answers', tempAnswers);
			this.saveNewPhoto(AItemID, AUrl);
		}
	}

	saveNewPhoto = (AItemID, AUrl) => {
		let photoData = {
			itemid: AItemID,
			url: AUrl
		};
		let newPostKey = firebase.database().ref().child('cGhvdG9z').push().key;
	
		let updates = {};
		updates['/cGhvdG9z/' + newPostKey] = photoData;
	
		return firebase.database().ref().update(updates);
	}

	jsonCopy = (ASrc) => {
		return ASrc ? JSON.parse(JSON.stringify(ASrc)) : {};
	}

	getQuestion = (ANumber, AQuestion, ACssClass, ANrKeyboard, AIsTel) => {
		let answerValue = this.state.answers ? this.state.answers['txtQ' + ANumber] : null;
		answerValue = answerValue ? answerValue : '';
		return (<fieldset class={style.fieldset + (ACssClass ? ' ' + style[ACssClass] : '')}>
			<label for={'txtQ' + ANumber} class={style.question}>{ANumber}. {AQuestion}</label>
			<input id={'txtQ' + ANumber} type={AIsTel ? 'tel' : 'text'} value={answerValue} inputmode={ANrKeyboard ? 'numeric' : (AIsTel ? 'tel':'text')} pattern={ANrKeyboard ? '[0-9]*' : ''} onFocus={this.focusField.bind(this)} onBlur={this.saveData.bind(this)} autocomplete={'off'} class={style.text} />
		</fieldset>);
	}
	getBonusQuestion = (ANumber, AQuestion, ACssClass, AHideField, ANrKeyboard, AUploadButton) => {
		let answerValue = this.state.answers ? this.state.answers['txtQB' + ANumber] : null;
		let answerPhoto = this.state.answers ? this.state.answers['uploadedImage' + ANumber] : null;
		answerValue = answerValue ? answerValue : '';
		return (<fieldset class={style.fieldset + ' ' + style.fieldsetbonus + (ACssClass ? ' ' + style[ACssClass] : '')}>
			<label for={'txtQB' + ANumber} class={style.question}>{AQuestion}</label>
			{AHideField ? null : <input id={'txtQB' + ANumber} type={'text'} value={answerValue} inputmode={ANrKeyboard ? 'numeric' : 'text'} pattern={ANrKeyboard ? '[0-9]*' : ''} onFocus={this.focusField.bind(this)} onBlur={this.saveData.bind(this)} autocomplete={'off'} class={style.text} />}
			{AUploadButton ? 
				<div class={'uploadbutton'}><input type={'hidden'} role={'uploadcare-uploader'} id={'uploadedImage' + ANumber} data-public-key={'eb1e8c95296b78b5c18d'} data-locale={'nl'} data-preview-step={'false'} data-tabs={'camera file url'} data-images-only /></div>
				: null}
				{answerPhoto ?
				<img src={answerPhoto} class={style.answerphoto} alt={'Foto'} />
				: null}
		</fieldset>);
	}
}