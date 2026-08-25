export const defaultObj = {
  method: {},
  initData: [],
};

export const currencyFormatter = new Intl.NumberFormat(navigator.language, {
  style: 'currency',
  currency: 'PHP',
});

export const sendHttpRequest = async function (url, config = {}) {
  const response = await fetch(url, config);
  const resData = await response.json();
  if (!response.ok) {
    throw new Error(`${response.status} - Request failed, please try again...`);
  }
  return resData;
};
