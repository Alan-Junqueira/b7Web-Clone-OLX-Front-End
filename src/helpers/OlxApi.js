import Cookies from 'js-cookie';
import qs from 'qs';

const BASEAPI = 'https://node-api-olx-production.up.railway.app';

const apiFetchFile = async (endpoint, body) => {
  if (!body.token) {
    let token = Cookies.get('token');
    if (token) {
      body.append('token', token);
    }
  }

  const res = await fetch(BASEAPI + endpoint, {
    method: 'POST',
    body
  });

  const json = await res.json();
  if (json.notallowed) {
    window.location.href = '/signin';
    return;
  }

  return json;
};

const apiFetchPost = async (endpoint, body) => {
  if (!body.token) {
    let token = Cookies.get('token');
    if (token) {
      body.token = token;
    }
  }

  const res = await fetch(BASEAPI + endpoint, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  });

  const json = await res.json();
  if (json.notallowed) {
    window.location.href = '/signin';
    return;
  }

  return json;
};

const apiFetchGet = async (endpoint, body = []) => {
  if (!body.token) {
    let token = Cookies.get('token');
    if (token) {
      body.token = token;
    }
  }

  const res = await fetch(`${BASEAPI + endpoint}?${qs.stringify(body)}`);

  const json = await res.json();
  if (json.notallowed) {
    window.location.href = '/signin';
    return;
  }

  return json;
};

const apiFetchPut = async (endpoint, body) => {
  if (!body.token) {
    let token = Cookies.get('token');
    if (token) {
      body.token = token;
    }
  }

  const res = await fetch(BASEAPI + endpoint, {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  });

  const json = await res.json();

  return json;
};

const OlxApi = {
  login: async (email, password) => {
    const json = await apiFetchPost('/user/signin', { email, password });
    return json;
  },

  register: async (name, email, password, stateLoc) => {
    const json = await apiFetchPost('/user/signup', {
      name,
      email,
      password,
      state: stateLoc
    });
    return json;
  },
  getUser: async () => {
    const json = await apiFetchGet('/user/me');
    return json;
  },

  updateUser: async (name, email, state, password) => {
    const json = await apiFetchPut('/user/me', {
      name,
      email,
      state,
      password
    });
    return json;
  },

  getStates: async () => {
    const json = await apiFetchGet('/states');
    return json.states;
  },

  getCategories: async () => {
    const json = await apiFetchGet('/categories');
    return json.categories;
  },

  getAds: async (options) => {
    const json = await apiFetchGet('/ad/list', options);
    return json;
  },

  getAd: async (id, other = false) => {
    const json = await apiFetchGet('/ad/item', { id, other });
    return json;
  },

  addAd: async (formData) => {
    const json = await apiFetchFile('/ad/add', formData);
    return json;
  }
};

export default () => OlxApi;
