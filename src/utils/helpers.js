import moment from 'moment';
const { REACT_APP_API_ROOT } = process.env;

export const tranformToFormData = ({ data, toStringify = [] }) => {
  try {
    const formData = new FormData();
    data &&
      Object.keys(data).map((key) => {
        const value = data[key];

        switch (true) {
          //keys to stringify
          case toStringify.includes(key):
            value && value.length && formData.append(key, JSON.stringify(value));
            break;

          // handle single file
          case value && typeof value === 'object' && value instanceof File:
            formData.append(key, value);
            break;

          // handle arrays
          case typeof value === 'object' && Array.isArray(value):
            // handle file arrays
            if (['docs', 'image', 'cover'].includes(key)) {
              console.log('its file', value);
              value.map((item) => formData.append(key, item.originFileObj));
            } else {
              // handle simple arrays
              value.map((item) => formData.append(key, item));
            }

            break;

          // handle plain objects
          case typeof value === 'object':
            console.log('plain object', key);
            // handle object
            Object.keys(value).map((item) => value[item] && formData.append(`${key}[${item}]`, value[item]));
            break;

          default:
            formData.append(key, value);
        }
      });
    return formData;
  } catch (err) {
    console.log(err);
  }
};

export const getBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
};

export const toFileList = (file, id) => ({
  id,
  uid: `-${file}.${id || 'key'}`,
  name: `${file}`,
  status: 'done',
  relativeUrl: file,
  url: file && `${REACT_APP_API_ROOT}/${file}`,
  uploaded: true,
});

export const dummyrequest = ({ file, onSuccess }) => {
  setTimeout(() => {
    onSuccess('ok');
  }, 50);
};

export const normFile = (e) => {
  if (Array.isArray(e)) {
    return e;
  }
  return e && e.fileList;
};

export const isValidUrl = (string) => {
  try {
    new URL(string);
  } catch (_) {
    return false;
  }
  return true;
};

export const getLocalState = () => {
  try {
    const localState = localStorage.getItem('user');
    const localStateJSON = localState ? JSON.parse(localState) : null;
    return localStateJSON;
  } catch (e) {
    return null;
  }
};

export const getToken = (type = 'accessToken') => {
  try {
    const localState = getLocalState() ? JSON.parse(getLocalState().admin).data : null;
    return localState && localState.tokens && localState.tokens[type];
  } catch (err) {
    return null;
  }
};

export const getLocalization = () => {
  try {
    const localState = getLocalState() ? JSON.parse(getLocalState().localization) : null;
    return localState ? localState.code : null;
  } catch (err) {
    return null;
  }
};
console.log('local', getLocalization());

export const handlePreview = async (file, setPreviewImage) => {
  if (!file.url && !file.preview) {
    file.preview = await getBase64(file.originFileObj);
  }
  setPreviewImage(file.url || file.preview);
};

const isEmpty = (val) => {
  if (typeof val === 'string' && !val.trim().length) return true;
  if (val && typeof val === 'object' && !Object.keys(val).length) return true;
  return !!!val;
};

export const normalize = ({ data, exclude = [], singleFile = [], mode }) => {
  try {
    let body = {};
    for (const key in data) {
      const value = data[key];

      switch (true) {
        // exludedKeys - keys to not modify
        case exclude.includes(key) ||
          typeof value === 'undefined' ||
          (value && typeof value === 'object ' && !Object.keys(value).length):
          console.log('exclude no value or undefined -- ', key);
          break;

        // handle simple date object
        case key === 'date' && typeof value === 'object' && !Array.isArray(value):
          body.date = value?._d;
          break;

        // handle  date range object
        case key === 'date' && Array.isArray(value):
          body['start_time'] = value[0]?._d;
          if (mode === 'create') {
            body['end_time'] = value[1]?._d || undefined;
          } else {
            body['end_time'] = !value[1]?._d ? null : value[1]._d;
          }

          break;
        // handle single uploaded file
        case singleFile.includes(key):
          const file = value && value[0];
          if (file && file.uploaded) break;
          if (file && !file.uploaded && file.originFileObj instanceof File) {
            body[key] = file.originFileObj;
          }
          break;

        case value && typeof value === 'object' && Array.isArray(value):
          //handle date range
          body[key] = value;
          break;

        case key === 'source':
          console.log('mode', mode);
          if (mode === 'create') {
            if (value?.link) return null;
          } else {
            body[key] = value;
          }

          break;

        case value && typeof value === 'object' && !Array.isArray(value):
        // let hasKeys = false;
        // body[key] = {};
        // const obj1 = value;
        // for (const key1 in obj1) {
        //   if (typeof obj1[key1] === 'object') {
        //     let hasKeys2 = false;
        //     body[key][key1] = {};
        //     for (const key2 in obj1[key1]) {
        //       if (!isEmpty(obj1[key1][key2])) {
        //         hasKeys2 = true;
        //         body[key][key1][key2] = obj1[key1][key2];
        //       }
        //     }
        //     if (!hasKeys2) delete body[key][key1];
        //   } else if (!isEmpty(obj1[key1])) {
        //     hasKeys = true;
        //     body[key][key1] = obj1[key1];
        //   }
        // }
        // if (!hasKeys) delete body[key];
        // break;

        default:
          body[key] = value;
      }
    }
    return body;
  } catch (err) {
    console.log('err', err);
  }
};

export const formatDate = (date) => moment(date).format('YYYY-MM-DD');

export const isObjectId = (id) => {
  const objectIdRegExp = new RegExp('^[0-9a-fA-F]{24}$');
  return objectIdRegExp.test(id);
};

export const getTranslation = (data, i18n) => data[i18n.language] || data.ru;
