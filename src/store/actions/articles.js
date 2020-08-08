import {
  LIBRARY_ARTICLES,
  BIBLIOGRAPHY_ARTICLES,
  USEFUL_LINKS,
  FIND_LIBRARY_ARTICLES_WEBSITE,
  FIND_BIBLIOGRAPHY_ARTICLES_WEBSITE,
  FIND_USEFUL_LINKS_WEBSITE,
} from 'store/actionTypes';
import generateCrud from './generateCrud';

export default {
  library: generateCrud({ actionType: LIBRARY_ARTICLES }),
  bibliography: generateCrud({ actionType: BIBLIOGRAPHY_ARTICLES }),
  usefulLinks: generateCrud({ actionType: USEFUL_LINKS }),
  findArticlesWebsite: (payload) => ({ type: FIND_LIBRARY_ARTICLES_WEBSITE.WATCH, payload }),
  findBibliographyArticlesWebsite: (payload) => ({ type: FIND_BIBLIOGRAPHY_ARTICLES_WEBSITE.WATCH, payload }),
  findUsefulLinksWebsite: (payload) => ({ type: FIND_USEFUL_LINKS_WEBSITE.WATCH, payload }),
};
