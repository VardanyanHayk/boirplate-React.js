import { languages } from 'constants/localization';

export default (state) => ({
  selected: state.localization,
  notSelected: (() => {
    let notSelected = {};
    for (const code in languages) {
      if (state.localization.id !== languages[code].id) notSelected[code] = languages[code];
    }
    return notSelected;
  })(),
});
