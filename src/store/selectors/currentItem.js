import currentList from './currentList';
const key = 'currentItem';

export default (state) => ({
  // state selectors
  loaded: state[key].loaded,
  failed: state[key].failed,
  data: state[key].data,

  // right part items in single item page
  relativeVertical:
    currentList(state).loaded && state[key].loaded ? currentList(state).rows?.filter((it, key) => key >= 6 && key <= 21) : [],
  // bottom part items in single item page
  relativeHorizontal: currentList(state).loaded && state[key].loaded ? currentList(state).rows.filter((it, key) => key < 6) : [],
});
