const YOU_TUBE_SEARCH_URL = 'https://www.googleapis.com/youtube/v3/search';

function getDataFromApi(searchTerm, callback) {
  const query = {
    type: 'GET',
    url: YOU_TUBE_SEARCH_URL,
    success: callback,
    data: {
      maxResults: '25',
      part: 'snippet',
      q: `${searchTerm}`,
      key: 'AIzaSyA3Ro1p7T4iSmzi9AzC_Wfxq9awF4QYyTA',
      type: 'video'
    },
  };
  $.ajax(query);
  // $.getJSON(YOU_TUBE_SEARCH_URL, query, callback);
}

function renderResult(result) {
  return `
  <div>
    <h2>
    <a class="js-result-name">${result.snippet.title}</a></h2>
    <p>Description: <span class="js-watchers-count">${result.snippet.description}</span></p>
    <p>Channel Title: <span class="js-issues-count">${result.snippet['channelTitle']}</span></p>
  </div>
`;
}

function displayYouTubeSearchData(data) {
  console.log(data);
  const results = data.items.map((item, index) => renderResult(item));

  $('.js-search-results').html(results);
}

function watchSubmit() {
  $('.js-search-form').submit(event => {
    event.preventDefault();
    const queryTarget = $(event.currentTarget).find('.js-query');
    const query = queryTarget.val();
    // clear out the input
    queryTarget.val('');
    getDataFromApi(query, displayYouTubeSearchData);
  });
}

$(watchSubmit);