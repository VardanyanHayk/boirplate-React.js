const key = 'countries';

export default (state) => ({
  // state selectors
  loaded: state[key].loaded,
  failed: state[key].failed,
  data: state[key].data,
});
