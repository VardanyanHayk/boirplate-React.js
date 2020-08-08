import { takeLatest, put, call, all } from 'redux-saga/effects';
import services from '../services';
import {
  LIBRARY_ARTICLES,
  BIBLIOGRAPHY_ARTICLES,
  FIND_LIBRARY_ARTICLES_WEBSITE,
  FIND_BIBLIOGRAPHY_ARTICLES_WEBSITE,
  FIND_USEFUL_LINKS_WEBSITE,
  USEFUL_LINKS,
} from '../actionTypes';
import toast from 'utils/toast';
import utils from 'utils';
const { tranformToFormData } = utils;
// admin sagas

export function* findLibraryArticlesWatcher() {
  yield takeLatest(LIBRARY_ARTICLES.FIND.WATCH, findLibraryArticles);
}

export function* findBibliographyArticlesWatcher() {
  yield takeLatest(BIBLIOGRAPHY_ARTICLES.FIND.WATCH, findBibliographyArticles);
}

export function* findOneLibraryArticleWatcher() {
  yield takeLatest(LIBRARY_ARTICLES.FIND_ONE.WATCH, findOneLibraryArticle);
}

export function* findOneBibliographyArticleWatcher() {
  yield takeLatest(BIBLIOGRAPHY_ARTICLES.FIND_ONE.WATCH, findOneBibliographyArticle);
}

export function* findOneUsefulLinkWatcher() {
  yield takeLatest(USEFUL_LINKS.FIND_ONE.WATCH, findOneUsefulLinkWorker);
}

export function* findUsefulLinksWatcher() {
  yield takeLatest(USEFUL_LINKS.FIND.WATCH, findArchives);
}

// website sagas
export function* findArticlesWebSiteWatch() {
  yield takeLatest(FIND_LIBRARY_ARTICLES_WEBSITE.WATCH, findArticlesWebSite);
}

export function* findBibliographyArticlesWebSiteWatch() {
  yield takeLatest(FIND_BIBLIOGRAPHY_ARTICLES_WEBSITE.WATCH, findBibliographyArticlesWebSite);
}

export function* findUsefulLinksWebSiteWatch() {
  yield takeLatest(FIND_USEFUL_LINKS_WEBSITE.WATCH, findUsefulLinksWebSite);
}

export function* removeLibraryArticlesWatcher() {
  yield takeLatest(LIBRARY_ARTICLES.REMOVE.WATCH, removeLibraryArticlesWorker);
}

export function* removeBibliographyArticlesWatcher() {
  yield takeLatest(BIBLIOGRAPHY_ARTICLES.REMOVE.WATCH, removeBibliographyArticlessWorker);
}

export function* removeUsefulLinkWatcher() {
  yield takeLatest(USEFUL_LINKS.REMOVE.WATCH, removeUsefulLinkWorker);
}

export function* updateLibraryArticleWatcher() {
  yield takeLatest(LIBRARY_ARTICLES.UPDATE.WATCH, updateLibraryArticlesWorker);
}

export function* updateBibliographyArticleWatcher() {
  yield takeLatest(BIBLIOGRAPHY_ARTICLES.UPDATE.WATCH, updateBibliographyArticleWorker);
}

export function* updateUsefulLinkWatcher() {
  yield takeLatest(USEFUL_LINKS.UPDATE.WATCH, updateUsefulLinkWorker);
}

export function* createLibraryArticleWatcher() {
  yield takeLatest(LIBRARY_ARTICLES.CREATE.WATCH, createLibraryArticleWorker);
}

export function* createBibliographyArticleWatcher() {
  yield takeLatest(BIBLIOGRAPHY_ARTICLES.CREATE.WATCH, createBibliographyArticleWorker);
}
export function* createUsefulLinkWatcher() {
  yield takeLatest(USEFUL_LINKS.CREATE.WATCH, createUsefulLinkeWorker);
}

function* createLibraryArticleWorker({ payload }) {
  try {
    const { body, cb, extra } = payload;
    console.log('payload', payload);
    yield put({ type: LIBRARY_ARTICLES.CREATE.LOAD });
    //first create request json
    const response = yield call(services.articles.post, body);

    // if there is images upload
    if (response.success && extra.image && extra.image.length)
      yield call(services.articles.put, {
        body: tranformToFormData({ data: { image: extra.image } }),
        id: response.data._id,
      });

    // if there is docs, upload
    if (response.success && extra.docs && extra.docs.length)
      yield call(services.docs.post, {
        body: tranformToFormData({
          data: { docs: extra.docs, tableId: response.data._id, tableName: 'articles', type: 'doc', name: extra.docs[0]?.name },
        }),
      });

    yield put({ type: LIBRARY_ARTICLES.CREATE.SUCCES, payload: response.data.result });
    toast.success();
    cb && cb();
  } catch (err) {
    toast.error(err);
    yield put({ type: LIBRARY_ARTICLES.CREATE.FAIL, err });
  }
}

function* createBibliographyArticleWorker({ payload }) {
  try {
    const { body, cb, extra } = payload;
    console.log('payload', payload);
    yield put({ type: BIBLIOGRAPHY_ARTICLES.CREATE.LOAD });
    //first create request json
    const response = yield call(services.articles.post, body);

    // second update image after create success
    const fileResponse =
      response.success && extra.image && extra.image.length
        ? yield call(services.articles.put, {
            body: tranformToFormData({ data: { image: extra.image } }),
            id: response.data._id,
          })
        : null;

    // if there is docs, upload
    if (response.success && extra.docs && extra.docs.length)
      yield call(services.docs.post, {
        body: tranformToFormData({
          data: { docs: extra.docs, tableId: response.data._id, tableName: 'articles', type: 'doc', name: extra.docs[0]?.name },
        }),
      });

    yield put({ type: BIBLIOGRAPHY_ARTICLES.CREATE.SUCCES, payload: response.data.result });
    toast.success();
    cb && cb();
  } catch (err) {
    toast.error(err);
    yield put({ type: BIBLIOGRAPHY_ARTICLES.CREATE.FAIL, err });
  }
}
function* createUsefulLinkeWorker({ payload }) {
  try {
    const { body, cb, extra } = payload;
    console.log('payload', payload);
    yield put({ type: USEFUL_LINKS.CREATE.LOAD });
    //first create request json
    const response = yield call(services.articles.post, body);

    // second update image after create success
    const fileResponse =
      response.success && extra.image && extra.image.length
        ? yield call(services.articles.put, {
            body: tranformToFormData({ data: { image: extra.image } }),
            id: response.data._id,
          })
        : null;

    // if there is docs, upload
    if (response.success && extra.docs && extra.docs.length)
      yield call(services.articles.put, {
        body: tranformToFormData({ data: { docs: extra.docs } }),
        id: response.data._id,
      });

    yield put({ type: USEFUL_LINKS.CREATE.SUCCES, payload: response.data.result });
    toast.success();
    cb && cb();
  } catch (err) {
    toast.error(err);
    yield put({ type: USEFUL_LINKS.CREATE.FAIL, err });
  }
}

function* updateLibraryArticlesWorker({ payload }) {
  try {
    const { cb, id, extra, meta, body } = payload;
    console.log('payload', payload);
    yield put({ type: LIBRARY_ARTICLES.UPDATE.LOAD });
    const response = yield call(services.articles.put, { body, id });

    // second update image after create success
    const fileResponse =
      response.success && extra.image && extra.image.length && !extra.image[0].uploaded
        ? yield call(services.articles.put, {
            body: tranformToFormData({ data: { image: extra.image } }),
            id,
          })
        : null;

    const filesDeleted =
      response.success && meta.imageDeleted
        ? yield call(services.articles.put, {
            body: tranformToFormData({ data: { image: '' } }),
            id,
          })
        : null;

    // if there is docs, upload
    if (response.success && extra.docs && extra.docs.length && !extra.docs[0].uploaded) {
      if (meta.prevDocs?.length)
        yield call(services.docs.put, {
          body: tranformToFormData({
            data: { docs: extra.docs, tableName: 'articles', type: 'doc', name: extra.docs[0]?.name },
          }),
          id: meta.prevDocs[0]._id,
        });
      else
        yield call(services.docs.post, {
          body: tranformToFormData({
            data: { docs: extra.docs, tableId: id, tableName: 'articles', type: 'doc', name: extra.docs[0]?.name },
          }),
        });
    }

    // if doc remove,send remove request
    if (response.success && meta.docDeleted && meta.prevDocs?.length)
      yield call(services.docs.delete, { id: meta.prevDocs[0]._id });

    yield put({ type: LIBRARY_ARTICLES.UPDATE.SUCCES, payload: response.data.result });
    toast.success();
    cb && cb();
  } catch (err) {
    toast.error(err);
    yield put({ type: LIBRARY_ARTICLES.UPDATE.FAIL, err });
  }
}

function* updateBibliographyArticleWorker({ payload }) {
  try {
    const { cb, id, extra, meta, body } = payload;
    console.log('payload', payload);
    yield put({ type: BIBLIOGRAPHY_ARTICLES.UPDATE.LOAD });
    const response = yield call(services.articles.put, { body, id });

    // second update image after create success
    const fileResponse =
      response.success && extra.image && extra.image.length && !extra.image[0].uploaded
        ? yield call(services.articles.put, {
            body: tranformToFormData({ data: { image: extra.image } }),
            id,
          })
        : null;
    const filesDeleted =
      response.success && meta.imageDeleted
        ? yield call(services.articles.put, {
            body: tranformToFormData({ data: { image: '' } }),
            id,
          })
        : null;

    // if there is docs, upload
    if (response.success && extra.docs && extra.docs.length && !extra.docs[0].uploaded) {
      if (meta.prevDocs?.length)
        yield call(services.docs.put, {
          body: tranformToFormData({
            data: { docs: extra.docs, tableName: 'articles', type: 'doc', name: extra.docs[0]?.name },
          }),
          id: meta.prevDocs[0]._id,
        });
      else
        yield call(services.docs.post, {
          body: tranformToFormData({
            data: { docs: extra.docs, tableId: id, tableName: 'articles', type: 'doc', name: extra.docs[0]?.name },
          }),
        });
    }
    // if doc remove,send remove request
    if (response.success && meta.docDeleted && meta.prevDocs?.length)
      yield call(services.docs.delete, { id: meta.prevDocs[0]._id });

    yield put({ type: BIBLIOGRAPHY_ARTICLES.UPDATE.SUCCES, payload: response.data.result });
    toast.success();
    cb && cb();
  } catch (err) {
    console.log('err', err);
    toast.error(err);
    yield put({ type: BIBLIOGRAPHY_ARTICLES.UPDATE.FAIL, err });
  }
}

function* updateUsefulLinkWorker({ payload }) {
  try {
    const { cb, id, extra, meta, body } = payload;
    console.log('payload', payload);
    yield put({ type: USEFUL_LINKS.UPDATE.LOAD });
    const response = yield call(services.articles.put, { body, id });

    // second update image after create success
    const fileResponse =
      response.success && extra.image && extra.image.length && !extra.image[0].uploaded
        ? yield call(services.articles.put, {
            body: tranformToFormData({ data: { image: extra.image } }),
            id,
          })
        : null;
    const filesDeleted =
      response.success && meta.imageDeleted
        ? yield call(services.articles.put, {
            body: tranformToFormData({ data: { image: '' } }),
            id,
          })
        : null;

    yield put({ type: USEFUL_LINKS.UPDATE.SUCCES, payload: response.data.result });
    toast.success();
    cb && cb();
  } catch (err) {
    toast.error(err);
    yield put({ type: USEFUL_LINKS.UPDATE.FAIL, err });
  }
}

function* findLibraryArticles({ payload }) {
  try {
    yield put({ type: LIBRARY_ARTICLES.FIND.LOAD });
    const response = yield call(services.articles.findArticles, payload);
    yield put({ type: LIBRARY_ARTICLES.FIND.SUCCES, payload: { rows: response.data, count: response.count } });
  } catch (err) {
    toast.error(err);
    yield put({ type: LIBRARY_ARTICLES.FIND.FAIL, err });
  }
}

function* findBibliographyArticles({ payload }) {
  try {
    yield put({ type: BIBLIOGRAPHY_ARTICLES.FIND.LOAD });
    const response = yield call(services.articles.findBibliographyArticles, payload);
    yield put({ type: BIBLIOGRAPHY_ARTICLES.FIND.SUCCES, payload: { rows: response.data, count: response.count } });
  } catch (err) {
    toast.error(err);
    yield put({ type: BIBLIOGRAPHY_ARTICLES.FIND.FAIL, err });
  }
}

function* findOneLibraryArticle({ payload }) {
  try {
    yield put({ type: LIBRARY_ARTICLES.FIND_ONE.LOAD });
    const response = yield call(services.articles.findOne, payload);
    yield put({ type: LIBRARY_ARTICLES.FIND_ONE.SUCCES, payload: response.data });
  } catch (err) {
    toast.error(err);
    yield put({ type: LIBRARY_ARTICLES.FIND_ONE.FAIL, err });
  }
}

function* findOneBibliographyArticle({ payload }) {
  try {
    yield put({ type: BIBLIOGRAPHY_ARTICLES.FIND_ONE.LOAD });
    const response = yield call(services.articles.findOne, payload);
    yield put({ type: BIBLIOGRAPHY_ARTICLES.FIND_ONE.SUCCES, payload: response.data });
  } catch (err) {
    toast.error(err);
    yield put({ type: BIBLIOGRAPHY_ARTICLES.FIND_ONE.FAIL, err });
  }
}

function* findOneUsefulLinkWorker({ payload }) {
  try {
    yield put({ type: USEFUL_LINKS.FIND_ONE.LOAD });
    const response = yield call(services.articles.findOne, payload);
    yield put({ type: USEFUL_LINKS.FIND_ONE.SUCCES, payload: response.data });
  } catch (err) {
    toast.error(err);
    yield put({ type: USEFUL_LINKS.FIND_ONE.FAIL, err });
  }
}

function* findArchives({ payload }) {
  try {
    yield put({ type: USEFUL_LINKS.FIND.LOAD });
    const response = yield call(services.articles.findUsefulLinks, payload);
    yield put({ type: USEFUL_LINKS.FIND.SUCCES, payload: { rows: response.data, count: response.count } });
  } catch (err) {
    toast.error(err);
    yield put({ type: USEFUL_LINKS.FIND.FAIL, err });
  }
}

function* removeBibliographyArticlessWorker({ payload }) {
  try {
    yield put({ type: BIBLIOGRAPHY_ARTICLES.REMOVE.LOAD });
    yield call(services.articles.delete, payload);
    yield put({ type: BIBLIOGRAPHY_ARTICLES.REMOVE.SUCCES, payload });
  } catch (err) {
    toast.error(err);
    yield put({ type: BIBLIOGRAPHY_ARTICLES.REMOVE.FAIL, err });
  }
}

function* removeLibraryArticlesWorker({ payload }) {
  try {
    yield put({ type: LIBRARY_ARTICLES.REMOVE.LOAD });
    yield call(services.articles.delete, payload);
    yield put({ type: LIBRARY_ARTICLES.REMOVE.SUCCES, payload });
  } catch (err) {
    toast.error(err);
    yield put({ type: LIBRARY_ARTICLES.REMOVE.FAIL, err });
  }
}

function* removeUsefulLinkWorker({ payload }) {
  try {
    yield put({ type: USEFUL_LINKS.REMOVE.LOAD });
    yield call(services.articles.delete, payload);
    yield put({ type: USEFUL_LINKS.REMOVE.SUCCES, payload });
  } catch (err) {
    toast.error(err);
    yield put({ type: USEFUL_LINKS.REMOVE.FAIL, err });
  }
}

function* findArticlesWebSite({ payload }) {
  try {
    yield put({ type: FIND_LIBRARY_ARTICLES_WEBSITE.LOAD });
    const response = yield call(services.articles.findArticles, payload);
    yield put({ type: FIND_LIBRARY_ARTICLES_WEBSITE.SUCCES, payload: { rows: response.data, count: response.count } });
  } catch (err) {
    toast.error(err);
    yield put({ type: FIND_LIBRARY_ARTICLES_WEBSITE.FAIL, err });
  }
}

function* findBibliographyArticlesWebSite({ payload }) {
  try {
    yield put({ type: FIND_BIBLIOGRAPHY_ARTICLES_WEBSITE.LOAD });
    const response = yield call(services.articles.findBibliographyArticles, payload);
    yield put({ type: FIND_BIBLIOGRAPHY_ARTICLES_WEBSITE.SUCCES, payload: { rows: response.data, count: response.count } });
  } catch (err) {
    toast.error(err);
    yield put({ type: FIND_BIBLIOGRAPHY_ARTICLES_WEBSITE.FAIL, err });
  }
}

function* findUsefulLinksWebSite({ payload }) {
  try {
    yield put({ type: FIND_USEFUL_LINKS_WEBSITE.LOAD });
    const response = yield call(services.articles.findUsefulLinks, payload);
    yield put({ type: FIND_USEFUL_LINKS_WEBSITE.SUCCES, payload: { rows: response.data, count: response.count } });
  } catch (err) {
    toast.error(err);
    yield put({ type: FIND_USEFUL_LINKS_WEBSITE.FAIL, err });
  }
}
