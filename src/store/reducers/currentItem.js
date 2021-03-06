import {
  NEWS,
  TAGS,
  ACTIVITY,
  RUBRICS,
  ORGANIZATIONS,
  MEMBERS,
  PARTNERS,
  LIBRARY_BOOKS,
  BIBLIOGRAPHY_BOOKS,
  LIBRARY_ARTICLES,
  BIBLIOGRAPHY_ARTICLES,
  ARCHIVES,
  USEFUL_LINKS,
  VACANCIES,
} from '../actionTypes';
import { initialState } from '.';

export default (state = initialState, action) => {
  const { type, payload } = action;
  switch (true) {
    // find
    case [
      NEWS.FIND_ONE.LOAD,
      NEWS.UPDATE.LOAD,
      TAGS.FIND_ONE.LOAD,
      TAGS.UPDATE.LOAD,
      ACTIVITY.FIND_ONE.LOAD,
      ACTIVITY.UPDATE.LOAD,
      RUBRICS.UPDATE.LOAD,
      RUBRICS.FIND_ONE.LOAD,
      ORGANIZATIONS.FIND_ONE.LOAD,
      MEMBERS.FIND_ONE.LOAD,
      PARTNERS.FIND_ONE.LOAD,
      LIBRARY_BOOKS.FIND_ONE.LOAD,
      BIBLIOGRAPHY_BOOKS.FIND_ONE.LOAD,
      LIBRARY_ARTICLES.FIND_ONE.LOAD,
      BIBLIOGRAPHY_ARTICLES.FIND_ONE.LOAD,
      ARCHIVES.FIND_ONE.LOAD,
      USEFUL_LINKS.FIND_ONE.LOAD,
      VACANCIES.FIND_ONE.LOAD,
    ].includes(type):
      return { ...state, loaded: false };
    case [
      NEWS.FIND_ONE.FAIL,
      NEWS.UPDATE.FAIL,
      TAGS.FIND_ONE.FAIL,
      TAGS.UPDATE.FAIL,
      ACTIVITY.FIND_ONE.FAIL,
      ACTIVITY.UPDATE.FAIL,
      RUBRICS.UPDATE.FAIL,
      RUBRICS.FIND_ONE.FAIL,
      ORGANIZATIONS.FIND_ONE.FAIL,
      MEMBERS.FIND_ONE.FAIL,
      PARTNERS.FIND_ONE.FAIL,
      LIBRARY_BOOKS.FIND_ONE.FAIL,
      BIBLIOGRAPHY_BOOKS.FIND_ONE.FAIL,
      LIBRARY_ARTICLES.FIND_ONE.FAIL,
      BIBLIOGRAPHY_ARTICLES.FIND_ONE.FAIL,
      ARCHIVES.FIND_ONE.FAIL,
      USEFUL_LINKS.FIND_ONE.FAIL,
      VACANCIES.FIND_ONE.FAIL,
    ].includes(type):
      return { ...state, failed: true, loaded: true };
    case [
      NEWS.FIND_ONE.SUCCES,
      NEWS.UPDATE.SUCCES,
      TAGS.FIND_ONE.SUCCES,
      TAGS.UPDATE.SUCCES,
      ACTIVITY.FIND_ONE.SUCCES,
      ACTIVITY.UPDATE.SUCCES,
      RUBRICS.UPDATE.SUCCES,
      RUBRICS.FIND_ONE.SUCCES,
      ORGANIZATIONS.FIND_ONE.SUCCES,
      MEMBERS.FIND_ONE.SUCCES,
      PARTNERS.FIND_ONE.SUCCES,
      LIBRARY_BOOKS.FIND_ONE.SUCCES,
      BIBLIOGRAPHY_BOOKS.FIND_ONE.SUCCES,
      LIBRARY_ARTICLES.FIND_ONE.SUCCES,
      BIBLIOGRAPHY_ARTICLES.FIND_ONE.SUCCES,
      ARCHIVES.FIND_ONE.SUCCES,
      USEFUL_LINKS.FIND_ONE.SUCCES,
      VACANCIES.FIND_ONE.SUCCES,
    ].includes(type):
      return { ...state, data: payload, loaded: true };
    case [
      NEWS.FIND_ONE.RESET,
      TAGS.FIND_ONE.RESET,
      ACTIVITY.FIND_ONE.RESET,
      RUBRICS.FIND_ONE.RESET,
      ORGANIZATIONS.FIND_ONE.RESET,
      MEMBERS.FIND_ONE.RESET,
      PARTNERS.FIND_ONE.RESET,
      LIBRARY_BOOKS.FIND_ONE.RESET,
      BIBLIOGRAPHY_BOOKS.FIND_ONE.RESET,
      LIBRARY_ARTICLES.FIND_ONE.RESET,
      BIBLIOGRAPHY_ARTICLES.FIND_ONE.RESET,
      ARCHIVES.FIND_ONE.RESET,
      USEFUL_LINKS.FIND_ONE.RESET,
      VACANCIES.FIND_ONE.RESET,
    ].includes(type):
      return initialState;
    default:
      return state;
  }
};
