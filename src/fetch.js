function status(response) {
  if (response.status >= 200 && response.status < 300) { return response; }
  throw new Error(response.statusText);
}
 
function json(response) {
  return response.json()
}

function fetchBasic(url, options, noResponse) {
  return fetch(url, options).then(status).then(function(response) { 
    return noResponse ? {} : json(response); 
  }).catch(function(err) {
    return false;
    // console.log(err);
    // throw new Error(err);
  });
}

function fetchOptions(method, data) {
  var options = { method: method };
  if (data) {
    options.headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    };
    options.body = JSON.stringify(data);
  }
  return options;
}

var Fetch = {

  request: function(options) {
    var url = options.url;
    options.url = undefined;
    return fetchBasic(url, options);
  },

  get: function(url) {
    return fetchBasic(url);
  },

  put: function(url, data) {
    var options = fetchOptions('put', data || {});
    return fetchBasic(url, options);
  },

  post: function(url, data) {
    var options = fetchOptions('post', data || {});
    return fetchBasic(url, options);
  },

  delete: function(url) {
    var options = fetchOptions('delete');
    return fetchBasic(url, options, true);
  },

};

export default Fetch
