import { takeLatest, put, call, all } from 'redux-saga/effects';
import services from '../services';
import {
  LIBRARY_BOOKS,
  BIBLIOGRAPHY_BOOKS,
  ARCHIVES,
  FIND_LIBRARY_BOOKS_WEBSITE,
  FIND_BIBLIOGRAPHY_BOOKS_WEBSITE,
  FIND_ARCHIVES_WEBSITE,
} from '../actionTypes';
import toast from 'utils/toast';
import utils from 'utils';
const { tranformToFormData } = utils;

export function* findLibraryBooksWatcher() {
  yield takeLatest(LIBRARY_BOOKS.FIND.WATCH, findLibraryBooks);
}

export function* findBibliographyBooksWatcher() {
  yield takeLatest(BIBLIOGRAPHY_BOOKS.FIND.WATCH, findBibliographyBooks);
}

export function* findArchivesWatcher() {
  yield takeLatest(ARCHIVES.FIND.WATCH, findArchives);
}

export function* findOneLibraryBookWatcher() {
  yield takeLatest(LIBRARY_BOOKS.FIND_ONE.WATCH, findOneLibraryBook);
}

export function* findOneBibliographyBookWatcher() {
  yield takeLatest(BIBLIOGRAPHY_BOOKS.FIND_ONE.WATCH, findOneBibliographyBook);
}

export function* findOneArchiveWatcher() {
  yield takeLatest(ARCHIVES.FIND_ONE.WATCH, findOneArchive);
}
export function* findBooksWebSiteWatch() {
  yield takeLatest(FIND_LIBRARY_BOOKS_WEBSITE.WATCH, findBooksWebSite);
}

export function* findBibliographyBooksWebSiteWatch() {
  yield takeLatest(FIND_BIBLIOGRAPHY_BOOKS_WEBSITE.WATCH, findBibliographyBooksWebSite);
}

export function* findAnivArchivesWebSiteWatch() {
  yield takeLatest(FIND_ARCHIVES_WEBSITE.WATCH, findArchivesWebSite);
}

export function* removeLibraryBooksWatcher() {
  yield takeLatest(LIBRARY_BOOKS.REMOVE.WATCH, removeLibraryBooksWorker);
}

export function* removeBibliographyBooksWatcher() {
  yield takeLatest(BIBLIOGRAPHY_BOOKS.REMOVE.WATCH, removeBibliographyBooksWorker);
}

export function* removeArchiveWatcher() {
  yield takeLatest(ARCHIVES.REMOVE.WATCH, removeArchiveWorker);
}

export function* updateLibraryBookWatcher() {
  yield takeLatest(LIBRARY_BOOKS.UPDATE.WATCH, updateLibraryBooksWorker);
}

export function* updateBibliographyBookWatcher() {
  yield takeLatest(BIBLIOGRAPHY_BOOKS.UPDATE.WATCH, updateBibliographyBookWorker);
}

export function* updateArchiveWatcher() {
  yield takeLatest(ARCHIVES.UPDATE.WATCH, updateArchiveWorker);
}

export function* createLibraryBookWatcher() {
  yield takeLatest(LIBRARY_BOOKS.CREATE.WATCH, createLibraryBookWorker);
}

export function* createBibliographyBookWatcher() {
  yield takeLatest(BIBLIOGRAPHY_BOOKS.CREATE.WATCH, createBibliographyBookWorker);
}
export function* createArchiveBookWatcher() {
  yield takeLatest(ARCHIVES.CREATE.WATCH, createArchiveBookWorker);
}

function* createLibraryBookWorker({ payload }) {
  try {
    const { body, cb, extra } = payload;
    console.log('payload', payload);
    yield put({ type: LIBRARY_BOOKS.CREATE.LOAD });
    //first create request json
    const response = yield call(services.books.post, body);

    // if there is images upload
    const fileResponseImage =
      response.success && extra.image && extra.image.length && !extra.image[0].uploaded
        ? yield call(services.books.put, {
            body: tranformToFormData({ data: { image: extra.image } }),
            id: response.data._id,
          })
        : null;
    const fileResponseCover =
      response.success && extra.cover && extra.cover.length && !extra.cover[0].uploaded
        ? yield call(services.books.put, {
            body: tranformToFormData({ data: { cover: extra.cover } }),
            id: response.data._id,
          })
        : null;

    // if there is docs, upload
    if (response.success && extra.docs && extra.docs.length)
      yield call(services.docs.post, {
        body: tranformToFormData({
          data: { docs: extra.docs, tableId: response.data._id, tableName: 'books', type: 'doc', name: extra.docs[0]?.name },
        }),
      });

    yield put({ type: LIBRARY_BOOKS.CREATE.SUCCES, payload: response.data.result });
    toast.success();
    cb && cb();
  } catch (err) {
    toast.error(err);
    yield put({ type: LIBRARY_BOOKS.CREATE.FAIL, err });
  }
}

function* createBibliographyBookWorker({ payload }) {
  try {
    const { body, cb, extra } = payload;
    console.log('payload', payload);
    yield put({ type: BIBLIOGRAPHY_BOOKS.CREATE.LOAD });
    //first create request json
    const response = yield call(services.books.post, body);

    // second update image after create success
    const fileResponseImage =
      response.success && extra.image && extra.image.length && !extra.image[0].uploaded
        ? yield call(services.books.put, {
            body: tranformToFormData({ data: { image: extra.image } }),
            id: response.data._id,
          })
        : null;
    const fileResponseCover =
      response.success && extra.cover && extra.cover.length && !extra.cover[0].uploaded
        ? yield call(services.books.put, {
            body: tranformToFormData({ data: { cover: extra.cover } }),
            id: response.data._id,
          })
        : null;

    // if there is docs, upload
    if (response.success && extra.docs && extra.docs.length)
      yield call(services.docs.post, {
        body: tranformToFormData({
          data: { docs: extra.docs, tableId: response.data._id, tableName: 'books', type: 'doc', name: extra.docs[0]?.name },
        }),
      });

    yield put({ type: BIBLIOGRAPHY_BOOKS.CREATE.SUCCES, payload: response.data.result });
    toast.success();
    cb && cb();
  } catch (err) {
    toast.error(err);
    yield put({ type: BIBLIOGRAPHY_BOOKS.CREATE.FAIL, err });
  }
}

function* createArchiveBookWorker({ payload }) {
  try {
    const { body, cb, extra } = payload;
    console.log('payload', payload);
    yield put({ type: ARCHIVES.CREATE.LOAD });
    //first create request json
    const response = yield call(services.books.post, body);

    // second update image after create success
    const fileResponse =
      response.success && extra.cover && extra.cover.length
        ? yield call(services.books.put, {
            body: tranformToFormData({ data: { cover: extra.cover } }),
            id: response.data._id,
          })
        : null;

    // if there is docs, upload
    if (response.success && extra.docs && extra.docs.length)
      yield call(services.docs.post, {
        body: tranformToFormData({
          data: { docs: extra.docs, tableId: response.data._id, tableName: 'books', type: 'doc', name: extra.docs[0]?.name },
        }),
      });

    yield put({ type: ARCHIVES.CREATE.SUCCES, payload: response.data.result });
    toast.success();
    cb && cb();
  } catch (err) {
    toast.error(err);
    yield put({ type: ARCHIVES.CREATE.FAIL, err });
  }
}

function* updateLibraryBooksWorker({ payload }) {
  try {
    const { cb, id, extra, meta, body } = payload;

    console.log('payload', payload);
    yield put({ type: LIBRARY_BOOKS.UPDATE.LOAD });
    const response = yield call(services.books.put, { body, id });

    // second update image after create success
    const fileResponseImage =
      response.success && extra.image && extra.image.length && !extra.image[0].uploaded
        ? yield call(services.books.put, {
            body: tranformToFormData({ data: { image: extra.image } }),
            id,
          })
        : null;
    const fileResponseCover =
      response.success && extra.cover && extra.cover.length && !extra.cover[0].uploaded
        ? yield call(services.books.put, {
            body: tranformToFormData({ data: { cover: extra.cover } }),
            id,
          })
        : null;
    const filesDeletedImage =
      response.success && meta.imageDeleted
        ? yield call(services.books.put, {
            body: tranformToFormData({ data: { image: '' } }),
            id,
          })
        : null;
    const filesDeletedCover =
      response.success && meta.coverDeleted
        ? yield call(services.books.put, {
            body: tranformToFormData({ data: { cover: '' } }),
            id,
          })
        : null;

    // if there is docs, upload
    if (response.success && extra.docs && extra.docs.length && !extra.docs[0].uploaded) {
      if (meta.prevDocs?.length)
        yield call(services.docs.put, {
          body: tranformToFormData({
            data: { docs: extra.docs, tableName: 'books', type: 'doc', name: extra.docs[0]?.name },
          }),
          id: meta.prevDocs[0]._id,
        });
      else
        yield call(services.docs.post, {
          body: tranformToFormData({
            data: { docs: extra.docs, tableId: id, tableName: 'books', type: 'doc', name: extra.docs[0]?.name },
          }),
        });
    }

    // if doc remove,send remove request
    if (response.success && meta.docDeleted && meta.prevDocs?.length)
      yield call(services.docs.delete, { id: meta.prevDocs[0]._id });

    yield put({ type: LIBRARY_BOOKS.UPDATE.SUCCES, payload: response.data.result });
    toast.success();
    cb && cb();
  } catch (err) {
    toast.error(err);
    yield put({ type: LIBRARY_BOOKS.UPDATE.FAIL, err });
  }
}

function* updateBibliographyBookWorker({ payload }) {
  try {
    const { cb, id, extra, meta, body } = payload;
    console.log('payload', payload);
    yield put({ type: BIBLIOGRAPHY_BOOKS.UPDATE.LOAD });
    const response = yield call(services.books.put, { body, id });

    // second update image after create success
    const fileResponseImage =
      response.success && extra.image && extra.image.length && !extra.image[0].uploaded
        ? yield call(services.books.put, {
            body: tranformToFormData({ data: { image: extra.image } }),
            id,
          })
        : null;
    const fileResponseCover =
      response.success && extra.cover && extra.cover.length && !extra.cover[0].uploaded
        ? yield call(services.books.put, {
            body: tranformToFormData({ data: { cover: extra.cover } }),
            id,
          })
        : null;
    const filesDeletedImage =
      response.success && meta.imageDeleted
        ? yield call(services.books.put, {
            body: tranformToFormData({ data: { image: '' } }),
            id,
          })
        : null;
    const filesDeletedCover =
      response.success && meta.coverDeleted
        ? yield call(services.books.put, {
            body: tranformToFormData({ data: { cover: '' } }),
            id,
          })
        : null;

    // if there is docs, upload
    if (response.success && extra.docs && extra.docs.length && !extra.docs[0].uploaded) {
      if (meta.prevDocs?.length)
        yield call(services.docs.put, {
          body: tranformToFormData({
            data: { docs: extra.docs, tableName: 'books', type: 'doc', name: extra.docs[0]?.name },
          }),
          id: meta.prevDocs[0]._id,
        });
      else
        yield call(services.docs.post, {
          body: tranformToFormData({
            data: { docs: extra.docs, tableId: id, tableName: 'books', type: 'doc', name: extra.docs[0]?.name },
          }),
        });
    }

    // if doc remove,send remove request
    if (response.success && meta.docDeleted && meta.prevDocs?.length)
      yield call(services.docs.delete, { id: meta.prevDocs[0]._id });

    yield put({ type: BIBLIOGRAPHY_BOOKS.UPDATE.SUCCES, payload: response.data.result });
    toast.success();
    cb && cb();
  } catch (err) {
    toast.error(err);
    yield put({ type: BIBLIOGRAPHY_BOOKS.UPDATE.FAIL, err });
  }
}

function* updateArchiveWorker({ payload }) {
  try {
    const { cb, id, extra, meta, body } = payload;
    console.log('payload', payload);
    yield put({ type: ARCHIVES.UPDATE.LOAD });
    const response = yield call(services.books.put, { body, id });

    // second update image after create success
    const fileResponse =
      response.success && extra.cover && extra.cover.length && !extra.cover[0].uploaded
        ? yield call(services.books.put, {
            body: tranformToFormData({ data: { cover: extra.cover } }),
            id,
          })
        : null;

    const filesDeleted =
      response.success && meta.imageDeleted
        ? yield call(services.books.put, {
            body: tranformToFormData({ data: { cover: '' } }),
            id,
          })
        : null;

    // if there is docs, upload
    if (response.success && extra.docs && extra.docs.length && !extra.docs[0].uploaded) {
      if (meta.prevDocs?.length)
        yield call(services.docs.put, {
          body: tranformToFormData({
            data: { docs: extra.docs, tableName: 'books', type: 'doc', name: extra.docs[0]?.name },
          }),
          id: meta.prevDocs[0]._id,
        });
      else
        yield call(services.docs.post, {
          body: tranformToFormData({
            data: { docs: extra.docs, tableId: id, tableName: 'books', type: 'doc', name: extra.docs[0]?.name },
          }),
        });
    }

    // if doc remove,send remove request
    if (response.success && meta.docDeleted && meta.prevDocs?.length)
      yield call(services.docs.delete, { id: meta.prevDocs[0]._id });

    yield put({ type: ARCHIVES.UPDATE.SUCCES, payload: response.data.result });
    toast.success();
    cb && cb();
  } catch (err) {
    toast.error(err);
    yield put({ type: ARCHIVES.UPDATE.FAIL, err });
  }
}

//functions

function* findLibraryBooks({ payload }) {
  try {
    yield put({ type: LIBRARY_BOOKS.FIND.LOAD });
    const response = yield call(services.books.findBooks, payload);
    yield put({ type: LIBRARY_BOOKS.FIND.SUCCES, payload: { rows: response.data, count: response.count } });
  } catch (err) {
    toast.error(err);
    yield put({ type: LIBRARY_BOOKS.FIND.FAIL, err });
  }
}

function* findBibliographyBooks({ payload }) {
  try {
    yield put({ type: BIBLIOGRAPHY_BOOKS.FIND.LOAD });
    const response = yield call(services.books.findBibliographyBooks, payload);
    yield put({ type: BIBLIOGRAPHY_BOOKS.FIND.SUCCES, payload: { rows: response.data, count: response.count } });
  } catch (err) {
    toast.error(err);
    yield put({ type: BIBLIOGRAPHY_BOOKS.FIND.FAIL, err });
  }
}

function* findArchives({ payload }) {
  try {
    yield put({ type: ARCHIVES.FIND.LOAD });
    const response = yield call(services.books.findArchives, payload);
    yield put({ type: ARCHIVES.FIND.SUCCES, payload: { rows: response.data, count: response.count } });
  } catch (err) {
    toast.error(err);
    yield put({ type: ARCHIVES.FIND.FAIL, err });
  }
}

function* findOneLibraryBook({ payload }) {
  try {
    yield put({ type: LIBRARY_BOOKS.FIND_ONE.LOAD });
    const response = yield call(services.books.findOne, payload);
    yield put({ type: LIBRARY_BOOKS.FIND_ONE.SUCCES, payload: response.data });
  } catch (err) {
    toast.error(err);
    yield put({ type: LIBRARY_BOOKS.FIND_ONE.FAIL, err });
  }
}

function* findOneBibliographyBook({ payload }) {
  try {
    yield put({ type: BIBLIOGRAPHY_BOOKS.FIND_ONE.LOAD });
    const response = yield call(services.books.findOne, payload);
    yield put({ type: BIBLIOGRAPHY_BOOKS.FIND_ONE.SUCCES, payload: response.data });
  } catch (err) {
    toast.error(err);
    yield put({ type: BIBLIOGRAPHY_BOOKS.FIND_ONE.FAIL, err });
  }
}

function* findOneArchive({ payload }) {
  try {
    yield put({ type: ARCHIVES.FIND_ONE.LOAD });
    const response = yield call(services.books.findOne, payload);
    yield put({ type: ARCHIVES.FIND_ONE.SUCCES, payload: response.data });
  } catch (err) {
    toast.error(err);
    yield put({ type: ARCHIVES.FIND_ONE.FAIL, err });
  }
}

function* removeBibliographyBooksWorker({ payload }) {
  try {
    yield put({ type: BIBLIOGRAPHY_BOOKS.REMOVE.LOAD });
    yield call(services.books.delete, payload);
    yield put({ type: BIBLIOGRAPHY_BOOKS.REMOVE.SUCCES, payload });
  } catch (err) {
    toast.error(err);
    yield put({ type: BIBLIOGRAPHY_BOOKS.REMOVE.FAIL, err });
  }
}

function* removeLibraryBooksWorker({ payload }) {
  try {
    yield put({ type: LIBRARY_BOOKS.REMOVE.LOAD });
    yield call(services.books.delete, payload);
    yield put({ type: LIBRARY_BOOKS.REMOVE.SUCCES, payload });
  } catch (err) {
    toast.error(err);
    yield put({ type: LIBRARY_BOOKS.REMOVE.FAIL, err });
  }
}

function* removeArchiveWorker({ payload }) {
  try {
    yield put({ type: ARCHIVES.REMOVE.LOAD });
    yield call(services.books.delete, payload);
    yield put({ type: ARCHIVES.REMOVE.SUCCES, payload });
  } catch (err) {
    toast.error(err);
    yield put({ type: ARCHIVES.REMOVE.FAIL, err });
  }
}

function* findBooksWebSite({ payload }) {
  try {
    yield put({ type: FIND_LIBRARY_BOOKS_WEBSITE.LOAD });
    const response = yield call(services.books.findBooks, payload);
    yield put({ type: FIND_LIBRARY_BOOKS_WEBSITE.SUCCES, payload: { rows: response.data, count: response.count } });
  } catch (err) {
    toast.error(err);
    yield put({ type: FIND_LIBRARY_BOOKS_WEBSITE.FAIL, err });
  }
}

function* findBibliographyBooksWebSite({ payload }) {
  try {
    yield put({ type: FIND_BIBLIOGRAPHY_BOOKS_WEBSITE.LOAD });
    const response = yield call(services.books.findBibliographyBooks, payload);
    yield put({ type: FIND_BIBLIOGRAPHY_BOOKS_WEBSITE.SUCCES, payload: { rows: response.data, count: response.count } });
  } catch (err) {
    toast.error(err);
    yield put({ type: FIND_BIBLIOGRAPHY_BOOKS_WEBSITE.FAIL, err });
  }
}

function* findArchivesWebSite({ payload }) {
  try {
    yield put({ type: FIND_ARCHIVES_WEBSITE.LOAD });
    const response = yield call(services.books.findArchives, payload);
    yield put({ type: FIND_ARCHIVES_WEBSITE.SUCCES, payload: { rows: response.data, count: response.count } });
  } catch (err) {
    toast.error(err);
    yield put({ type: FIND_ARCHIVES_WEBSITE.FAIL, err });
  }
}
