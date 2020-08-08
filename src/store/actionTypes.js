// generate action types
const generateActionTypes = (action) => ({
  WATCH: `${action}__WATCH`,
  LOAD: `${action}__LOAD`,
  FAIL: `${action}__FAIL`,
  SUCCES: `${action}__SUCCESS`,
  RESET: `${action}__RESET`,
});

// -------------------------admin actions------------------- //

// authorization actions
export const LOGIN = generateActionTypes('LOGIN');
export const LOGOUT = generateActionTypes('LOGOUT');

//news crud actions
export const NEWS = {
  FIND: generateActionTypes('FIND_NEWS'),
  CREATE: generateActionTypes('CREATE_NEWS'),
  REMOVE: generateActionTypes('REMOVE_NEWS'),
  UPDATE: generateActionTypes('UPDATE_NEWS'),
  FIND_ONE: generateActionTypes('FIND_ONE_NEWS'),
};

//tags crud actions
export const TAGS = {
  FIND: generateActionTypes('FIND_TAGS'),
  CREATE: generateActionTypes('CREATE_TAG'),
  REMOVE: generateActionTypes('REMOVE_TAG'),
  UPDATE: generateActionTypes('UPDATE_TAG'),
  FIND_ONE: generateActionTypes('FIND_ONE_TAG'),
};

//activity crud actions
export const ACTIVITY = {
  FIND: generateActionTypes('FIND_ACTIVITY'),
  CREATE: generateActionTypes('CREATE_ACTIVITY'),
  REMOVE: generateActionTypes('REMOVE_ACTIVITY'),
  UPDATE: generateActionTypes('UPDATE_ACTIVITY'),
  FIND_ONE: generateActionTypes('FIND_ONE_ACTIVITY'),
  FIND_GROUPS: generateActionTypes('FIND_GROUPS'),
};

//rubrics crud actions
export const RUBRICS = {
  FIND: generateActionTypes('FIND_RUBRICS'),
  CREATE: generateActionTypes('CREATE_RUBRIC'),
  REMOVE: generateActionTypes('REMOVE_RUBRIC'),
  UPDATE: generateActionTypes('UPDATE_RUBRIC'),
  FIND_ONE: generateActionTypes('FIND_ONE_RUBRIC'),
};

//books crud actions
export const LIBRARY_BOOKS = {
  FIND: generateActionTypes('FIND_LIBRARY_BOOKS'),
  CREATE: generateActionTypes('CREATE_LIBRARY_BOOK'),
  REMOVE: generateActionTypes('REMOVE_LIBRARY_BOOK'),
  UPDATE: generateActionTypes('UPDATE_LIBRARY_BOOK'),
  FIND_ONE: generateActionTypes('FIND_ONE_LIBRARY_BOOK'),
};

//bibliography books crud actions
export const BIBLIOGRAPHY_BOOKS = {
  FIND: generateActionTypes('FIND_BIBLIOGRAPHY_BOOKS'),
  CREATE: generateActionTypes('CREATE_BIBLIOGRAPHY_BOOK'),
  REMOVE: generateActionTypes('REMOVE_BIBLIOGRAPHY_BOOK'),
  UPDATE: generateActionTypes('UPDATE_BIBLIOGRAPHY_BOOK'),
  FIND_ONE: generateActionTypes('FIND_ONE_BIBLIOGRAPHY_BOOK'),
};

//archives crud actions
export const ARCHIVES = {
  FIND: generateActionTypes('FIND_ARCHIVES'),
  CREATE: generateActionTypes('CREATE_ARCHIVE'),
  REMOVE: generateActionTypes('REMOVE_ARCHIVE'),
  UPDATE: generateActionTypes('UPDATE_ARCHIVE'),
  FIND_ONE: generateActionTypes('FIND_ONE_ARCHIVE'),
};

//articles crud actions
export const LIBRARY_ARTICLES = {
  FIND: generateActionTypes('FIND_LIBRARY_ARTICLES'),
  CREATE: generateActionTypes('CREATE_LIBRARY_ARTICLE'),
  REMOVE: generateActionTypes('REMOVE_LIBRARY_ARTICLE'),
  UPDATE: generateActionTypes('UPDATE_LIBRARY_ARTICLE'),
  FIND_ONE: generateActionTypes('FIND_ONE_LIBRARY_ARTICLE'),
};

//bibliography articles crud actions
export const BIBLIOGRAPHY_ARTICLES = {
  FIND: generateActionTypes('FIND_BIBLIOGRAPHY_ARTICLES'),
  CREATE: generateActionTypes('CREATE_BIBLIOGRAPHY_ARTICLE'),
  REMOVE: generateActionTypes('REMOVE_BIBLIOGRAPHY_ARTICLE'),
  UPDATE: generateActionTypes('UPDATE_BIBLIOGRAPHY_ARTICLE'),
  FIND_ONE: generateActionTypes('FIND_ONE_BIBLIOGRAPHY_ARTICLE'),
};

//useful_links crud actions
export const USEFUL_LINKS = {
  FIND: generateActionTypes('FIND_USEFUL_LINKS'),
  CREATE: generateActionTypes('CREATE_USEFUL_LINK'),
  REMOVE: generateActionTypes('REMOVE_USEFUL_LINK'),
  UPDATE: generateActionTypes('UPDATE_USEFUL_LINK'),
  FIND_ONE: generateActionTypes('FIND_ONE_USEFUL_LINK'),
};

//organizations crud actions
export const ORGANIZATIONS = {
  FIND: generateActionTypes('FIND_ORGANIZATIONS'),
  CREATE: generateActionTypes('CREATE_ORGANIZATION'),
  REMOVE: generateActionTypes('REMOVE_ORGANIZATION'),
  UPDATE: generateActionTypes('UPDATE_ORGANIZATION'),
  FIND_ONE: generateActionTypes('FIND_ONE_ORGANIZATION'),
};

//vacancies crud actions
export const VACANCIES = {
  FIND: generateActionTypes('FIND_VACANCIES'),
  CREATE: generateActionTypes('CREATE_VACANCY'),
  REMOVE: generateActionTypes('REMOVE_VACANCY'),
  UPDATE: generateActionTypes('UPDATE_VACANCY'),
  FIND_ONE: generateActionTypes('FIND_ONE_VACANCY'),
};

// organization members crud actions
export const MEMBERS = {
  FIND: generateActionTypes('FIND_MEMBERS'),
  CREATE: generateActionTypes('CREATE_MEMBER'),
  REMOVE: generateActionTypes('REMOVE_MEMBER'),
  UPDATE: generateActionTypes('UPDATE_MEMBER'),
  FIND_ONE: generateActionTypes('FIND_ONE_MEMBER'),
};

export const FIND_COUNTRIES = generateActionTypes('FIND_COUNTRIES');

// partners
export const PARTNERS = {
  FIND: generateActionTypes('FIND_PARTNERS'),
  CREATE: generateActionTypes('CREATE_PARTNER'),
  REMOVE: generateActionTypes('REMOVE_PARTNER'),
  UPDATE: generateActionTypes('UPDATE_PARTNER'),
  FIND_ONE: generateActionTypes('FIND_ONE_PARTNER'),
};

// -------------------------website actions------------------- //
export const CHANGE_LANGUAGE = 'CHANGE_LANGUAGE';
// todo: add website  in the end of action name

export const FIND_NEWS_WEBSITE = generateActionTypes('FIND_NEWS_WEBSITE');
export const FIND_ACTIVITIES_WEBSITE = generateActionTypes('FIND_ACTIVITIES_WEBSITE');
export const FIND_ACTIVITIES_BY_YEAR = generateActionTypes('FIND_ACTIVITIES_BY_YEAR');
export const FIND_RUBRICS_WEBSITE = generateActionTypes('FIND_RUBRICS_WEBSITE');
export const FIND_LIBRARY_BOOKS_WEBSITE = generateActionTypes('FIND_LIBRARY_ARTICLES_WEBSITE');
export const FIND_LIBRARY_ARTICLES_WEBSITE = generateActionTypes('FIND_ARTICLES_WEBSITE');
export const FIND_BIBLIOGRAPHY_BOOKS_WEBSITE = generateActionTypes('FIND_BIBLIOGRAPHY_BOOKS_WEBSITE');
export const FIND_BIBLIOGRAPHY_ARTICLES_WEBSITE = generateActionTypes('FIND_BIBLIOGRAPHY_ARTICLES_WEBSITE');
export const FIND_USEFUL_LINKS_WEBSITE = generateActionTypes('FIND_USEFUL_LINKS_WEBSITE');
export const FIND_ARCHIVES_WEBSITE = generateActionTypes('FIND_ARCHIVES_WEBSITE');
export const FIND_VACANCIES_WEBSITE = generateActionTypes('FIND_VACANCIES_WEBSITE');
export const SEARCH = generateActionTypes('SEARCH');
export const SEARCH_BY_TAGS = generateActionTypes('SEARCH_BY_TAGS');
export const FIND_ABOUT_DATA = generateActionTypes('FIND_ABOUT_DATA');
export const SUBSCRIBE = generateActionTypes('SUBSCRIBE');
export const SEND_VACANCY = generateActionTypes('SEND_VACANCY');
export const SEND_CONTACT = generateActionTypes('SEND_CONTACT');
// about
export const FIND_CURRENT_ITEM_DESCRIPTION = generateActionTypes('FIND_CURRENT_ITEM_DESCRIPTION');
