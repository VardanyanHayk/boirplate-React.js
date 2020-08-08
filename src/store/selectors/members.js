const key = 'members';

export default (state) => ({
  // state selectors
  loaded: state[key].loaded,
  failed: state[key].failed,
  rows: state[key].data && state[key].data.rows,
  count: state[key].data && state[key].data.count,
  byOrgId: (id) => state[key].data && state[key].data.rows.filter((m) => m.organization === id),
});
