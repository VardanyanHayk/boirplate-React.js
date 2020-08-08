import {
  LIBRARY_BOOKS,
  BIBLIOGRAPHY_BOOKS,
  ARCHIVES,
  FIND_LIBRARY_BOOKS_WEBSITE,
  FIND_BIBLIOGRAPHY_BOOKS_WEBSITE,
  FIND_ARCHIVES_WEBSITE,
} from 'store/actionTypes';
import generateCrud from './generateCrud';

export default {
  library: generateCrud({ actionType: LIBRARY_BOOKS }),
  bibliography: generateCrud({ actionType: BIBLIOGRAPHY_BOOKS }),
  archives: generateCrud({ actionType: ARCHIVES }),
  findBooksWebsite: (payload) => ({ type: FIND_LIBRARY_BOOKS_WEBSITE.WATCH, payload }),
  findBibliographyBooksWebsite: (payload) => ({ type: FIND_BIBLIOGRAPHY_BOOKS_WEBSITE.WATCH, payload }),
  findArchiveWebsite: (payload) => ({ type: FIND_ARCHIVES_WEBSITE.WATCH, payload }),
};
