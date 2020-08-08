export default ({ actionType }) => {
  const { FIND, CREATE, REMOVE, UPDATE, FIND_ONE } = actionType;
  return {
    // generate crud actions
    find: (payload) => ({ type: FIND.WATCH, payload }),
    create: (payload) => ({ type: CREATE.WATCH, payload }),
    update: (payload) => ({ type: UPDATE.WATCH, payload }),
    remove: (payload) => ({ type: REMOVE.WATCH, payload }),
    resetList: (payload) => ({ type: FIND.RESET, payload }),
    //generate one item actions
    findOne: (payload) => ({ type: FIND_ONE.WATCH, payload }),
    resetOne: (payload) => ({ type: FIND_ONE.RESET, payload }),
  };
};
