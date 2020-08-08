import { ACTIVITY, FIND_ACTIVITIES_WEBSITE, FIND_ACTIVITIES_BY_YEAR } from 'store/actionTypes';
import generateCrud from './generateCrud';

export default {
  ...generateCrud({ actionType: ACTIVITY }),
  findGroups: (payload) => ({ type: ACTIVITY.FIND_GROUPS.WATCH, payload }),
  findWebsiteActivities: (payload) => ({ type: FIND_ACTIVITIES_WEBSITE.WATCH, payload }),
  findActivitiesByYear: (payload) => ({ type: FIND_ACTIVITIES_BY_YEAR.WATCH, payload }),
};
