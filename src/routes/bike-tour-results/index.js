import { h, Component } from 'preact';
import style from './style';
import { get } from '../../utils/idb-keyval';

export default class BikeTourResults extends Component {
	
	componentDidMount() {
		if (document) {
			document.body.className = 'bike-tour-results';
		}

		let self = this;
		get('answers').then(val => self.setState({
			answers: val
		}));
	}

	render() {
		return (
			<div class={style.biketourresults}>
				<article>
				<h2 class={'page-title'}>Vragenlijst</h2>
					<label for={style.showrealanswers} class={'btn btn--secondary'}>Bekijk oplossingen</label>
					<input id={style.showrealanswers} aria-hidden={'true'} type={'checkbox'} />
					{this.state.answers ? 
						<ol>
							{this.getQuestion(1, 'Hoe heet deze weg?', 'Harger Zeeweg')}
							{this.getQuestion(2, 'Welk telefoonnummer moet je bellen bij een calamiteit?', '088-6620301')}
							{this.getBonusQuestion(1, 'Wat is de zonecode van de grote parkeerplaats?', '50600')}
							{this.getBonusQuestion(2, 'Benaderingsvraag: hoeveel auto’s kunnen hier (normaal) parkeren?', '1500 (zie ook het bord bij de rotonde)')}
							{this.getQuestion(3, 'Wat is het nummer van de aanwezige strandpaal?', '20 750')}
							{this.getBonusQuestion(3, 'Waar staat paal 1 overigens?', 'Huisduinen (Den Helder)')}
							{this.getBonusQuestion(4, 'Waar staan de letters HHNK voor?', 'Hoogheemraadschap Hollands Noorderkwartier')}
							{this.getQuestion(4, 'Hoeveel spijlen heeft dit wildrooster?', '18', true)}
							{this.getQuestion(5, 'Hoeveel treden is het naar boven?', '49')}
							{this.getBonusQuestion(5, 'Boven gekomen tref je een plateau met een verrekijker. Wat is hier welkom?', 'Zeewater')}
							{this.getBonusQuestion(6, 'Maak een foto van tenminste 3 personen uit je eigen groep. Elk persoon meer uit je eigen groep is een bonuspunt extra.', '')}
							{this.getQuestion(6, 'Als je van hieruit naar elke plaats heen en weer zou moeten rijden, hoeveel bedraagt dan het aantal afgelegde kilometers?','55,4 km')}
							{this.getQuestion(7, 'Welk nummer heeft dit bankje en door wie is dit bankje aangeboden?', 'SC91 en Rotary Langedijk/Geestmerambacht')}
							{this.getBonusQuestion(7, 'Maak een foto van jullie eigen groep, gezeten op dit bankje.', '')}
							{this.getQuestion(8, 'Hoe heet deze wintersportlocatie?', 'Il Primo')}
							{this.getBonusQuestion(8, 'Er wordt hier ook getraind door een schaatstrainingsgroep. Wat is hiervan de naam?', 'Chronos')}
							{this.getQuestion(9, 'Wat zijn de namen van deze twee huisjes respectievelijk?', '\'t Boshuis, Sylvestris')}
							{this.getQuestion(10, 'Wat is de naam van dit huisje?', 'De blauwe reiger')}
							{this.getQuestion(11, 'Hoe heet dit kerkje?', 'Het witte kerkje')}
							{this.getBonusQuestion(9, 'Uit welk jaar dateert het?', '1575')}
							{this.getBonusQuestion(10, 'Welk beeld staat er op het grasveld voor deze kerk?', 'De wasvrouwen')}
							{this.getQuestion(12, 'Wat is de kleur van het dak?', 'Oranje', true)}
						</ol>
						: null
					}			
				</article>
			</div>
		);
	}

	getQuestion = (ANumber, AQuestion, ARealAnswer) => {
		let answerValue = this.state.answers ? this.state.answers['txtQ' + ANumber] : null;
		answerValue = answerValue ? answerValue : '';
		return (<li class={style.listitem} value={ANumber}>
			<span class={style.question}>{AQuestion}</span>
			<span class={style.answer}>{answerValue ? answerValue : '[geen antwoord ingevuld]'}</span>
			<span class={style.realanswer}>{ARealAnswer}</span>
		</li>);
	}
	getBonusQuestion = (ANumber, AQuestion, ARealAnswer) => {
		let answerValue = this.state.answers ? this.state.answers['txtQB' + ANumber] : null;
		let answerPhoto = this.state.answers ? this.state.answers['uploadedImage' + ANumber] : null;
		answerValue = answerValue ? answerValue : '';
		return (<li class={style.listitem + ' ' + style['listitem--bonus']} value={ANumber}>
			<span class={style.question}>{AQuestion}</span>
			<span class={style.answer}>{answerValue ? answerValue : answerPhoto ? '' : '[geen antwoord ingevuld]'}</span>
			{answerPhoto ?
				<img src={answerPhoto} class={style.answerphoto} alt={'Foto'} />
				: null}
			<span class={style.realanswer}>{ARealAnswer}</span>
		</li>);
	}
}