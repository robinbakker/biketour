export function getDayNamePrefix(AIndex) {
  switch(AIndex) {
    case 0: return 'Zondag ';
    case 1: return 'Maandag ';
    case 2: return 'Dinsdag ';
    case 3: return 'Woensdag ';
    case 4: return 'Donderdag ';
    case 5: return 'Vrijdag ';
    case 6: return 'Zaterdag ';
    default: return '';
  }
}
export function getMonthNameSuffix(AIndex) {
  switch(AIndex) {
    case 0: return ' januari';
    case 1: return ' februari';
    case 2: return ' maart';
    case 3: return ' april';
    case 4: return ' mei';
    case 5: return ' juni';
    case 6: return ' juli';
    case 7: return ' augustus';
    case 8: return ' september';
    case 9: return ' oktober';
    case 10: return ' november';
    case 11: return ' december';
    default: return '';
  }
}
export function getTimeString(ADate) {
  let tempHours = ADate.getHours();
  let tempMins = ADate.getMinutes();
  return `${tempHours < 10 ? `0${tempHours}` : tempHours}:${tempMins < 10 ? `0${tempMins}` : tempMins}`;
}