import { all, fork } from 'redux-saga/effects';
import * as admin from './admin';
import * as news from './news';
import * as tags from './tags';
import * as activity from './activity';
import * as rubrics from './rubrics';
import * as books from './books';
import * as articles from './articles';
import * as search from './search';
import * as organizations from './organizations';
import * as members from './members';
import * as countries from './countries';
import * as about from './about';
import * as partners from './partners';
import * as subscribe from './subscribe';
import * as vacancies from './vacancies';
import * as currentItemDescription from './currentItemDescriprion';

const combinedSagas = {
  ...admin,
  ...news,
  ...tags,
  ...rubrics,
  ...books,
  ...articles,
  ...search,
  ...organizations,
  ...members,
  ...countries,
  ...about,
  ...partners,
  ...subscribe,
  ...vacancies,
  ...activity,
  ...currentItemDescription,
};

export default function* rootSaga() {
  yield all(Object.values(combinedSagas).map((saga) => fork(saga)));
}
