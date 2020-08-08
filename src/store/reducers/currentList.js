import {
  NEWS,
  ACTIVITY,
  RUBRICS,
  TAGS,
  ORGANIZATIONS,
  LIBRARY_BOOKS,
  BIBLIOGRAPHY_BOOKS,
  LIBRARY_ARTICLES,
  BIBLIOGRAPHY_ARTICLES,
  ARCHIVES
} from '../actionTypes';
import { initialState } from '.';

export default (state = initialState, action) => {
  const { type, payload } = action;
  switch (true) {
    case [
      NEWS.FIND.LOAD,
      NEWS.CREATE.LOAD,
      NEWS.REMOVE.LOAD,
      NEWS.UPDATE.LOAD,
      ACTIVITY.FIND.LOAD,
      ACTIVITY.CREATE.LOAD,
      ACTIVITY.REMOVE.LOAD,
      ACTIVITY.UPDATE.LOAD,
      RUBRICS.FIND.LOAD,
      RUBRICS.CREATE.LOAD,
      RUBRICS.REMOVE.LOAD,
      RUBRICS.UPDATE.LOAD,
      ACTIVITY.FIND_GROUPS.LOAD,
      ORGANIZATIONS.FIND.LOAD,
      ORGANIZATIONS.CREATE.LOAD,
      ORGANIZATIONS.REMOVE.LOAD,
      ORGANIZATIONS.UPDATE.LOAD,
      LIBRARY_BOOKS.FIND.LOAD,
      BIBLIOGRAPHY_BOOKS.FIND.LOAD,
      LIBRARY_ARTICLES.FIND.LOAD,
      BIBLIOGRAPHY_ARTICLES.FIND.LOAD,
      ARCHIVES.FIND.LOAD
    ].includes(type):
      return { ...state, loaded: false };
    case [
      NEWS.FIND.FAIL,
      NEWS.CREATE.FAIL,
      NEWS.REMOVE.FAIL,
      NEWS.UPDATE.FAIL,
      ACTIVITY.FIND.FAIL,
      ACTIVITY.CREATE.FAIL,
      ACTIVITY.REMOVE.FAIL,
      ACTIVITY.UPDATE.FAIL,
      RUBRICS.FIND.FAIL,
      RUBRICS.CREATE.FAIL,
      RUBRICS.REMOVE.FAIL,
      RUBRICS.UPDATE.FAIL,
      ACTIVITY.FIND_GROUPS.FAIL,
      LIBRARY_BOOKS.FIND.FAIL,
      BIBLIOGRAPHY_BOOKS.FIND.FAIL,
      LIBRARY_ARTICLES.FIND.FAIL,
      BIBLIOGRAPHY_ARTICLES.FIND.FAIL,
      ARCHIVES.FIND.FAIL
    ].includes(type):
      return { ...state, failed: true, loaded: true };
    case [
      NEWS.FIND.SUCCES,
      ACTIVITY.FIND.SUCCES,
      RUBRICS.FIND.SUCCES,
      LIBRARY_BOOKS.FIND.SUCCES,
      BIBLIOGRAPHY_BOOKS.FIND.SUCCES,
      LIBRARY_ARTICLES.FIND.SUCCES,
      BIBLIOGRAPHY_ARTICLES.FIND.SUCCES,
      ARCHIVES.FIND.SUCCES
    ].includes(type):
      return { ...state, data: payload, loaded: true };
    case [
      NEWS.REMOVE.SUCCES,
      ACTIVITY.REMOVE.SUCCES,
      RUBRICS.REMOVE.SUCCES,
    ].includes(type):
      return {
        ...state,
        data: {
          ...state.data,
          rows: state.data.rows.filter((it) => it._id !== payload),
          count: state.data.count - 1,
        },
        loaded: true,
      };
    case [ACTIVITY.FIND_GROUPS.SUCCES].includes(type):
      return {
        ...state,
        data: { rows: payload },
        loaded: true,
      };
    case [
      NEWS.FIND.RESET,
      ACTIVITY.FIND.RESET,
      TAGS.FIND.RESET, RUBRICS.FIND.RESET,
      LIBRARY_BOOKS.FIND.RESET,
      BIBLIOGRAPHY_BOOKS.FIND.RESET,
      LIBRARY_ARTICLES.FIND.RESET,
      BIBLIOGRAPHY_ARTICLES.FIND.RESET,
      ARCHIVES.FIND.RESET
    ].includes(type):
      return initialState;
    // create
    default:
      return state;
  }
};
