const key = 'search';

export default (state) => ({
  // state selectors
  loaded: state[key].loaded,
  failed: state[key].failed,
  rows: state[key].data && state[key].data.rows,
  count: state[key].data && state[key].data.count,
  keyword: state[key].data && state[key].data.title,
});
