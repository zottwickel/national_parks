
const apiKey = '2PJqiEkPKsGLcZkLDyPhkWH2WDggPRdP5pnnE3vu';
const url = 'https://developer.nps.gov/api/v1/parks';

function displayResults(responseJson) {
    $('section').empty();
    for (let i = 0; i < responseJson.data.length; i++) {
        $('section').append(
            `
                <div class="result">
                    <p>Name: ${responseJson.data[i].fullName}</p>
                    <p>Description: ${responseJson.data[i].description}</p>
                    <p>Website: <a href="${responseJson.data[i].url}">${responseJson.data[i].url}</a></p>
                </div>
            `
        );
    }
}

function formatParams(states, maxResults) {
    return url + `?api_key=${apiKey}&stateCode=${states}&limit=${maxResults}`
}

function submitQuery(states, maxResults) {
    fetch(formatParams(states, maxResults))
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error(response.statusText);
        })
        .then(responseJson => displayResults(responseJson))
        .catch(err => alert(`Something went wrong: ${err.message}`));
}

function init() {
    $('body').append(
        `
            <main>
                <h1>Search for your national park!</h1>
                <form id="form">
                    <p class="text">Enter state(s) to search with their two-letter state code, separated by a comma (i.e. UT,NV,CO)</p>
                    <input id="states" for="form" type="text" value="UT" required>
                    <p class="text">Enter the max number of results to display</p>
                    <input id="maxResults" for="form" type="number" value="10" min="1" max="50" required><br><br>
                    <input for="form" type="submit" value="Go!">
                </form>
                <section class="results">
                </section>
            </main>
        `
    );
}

function handleForm() {
    $('form').on('submit', function(event) {
        event.preventDefault();
        const states = $('#states').val().split(' ').join('').toUpperCase();
        const maxResults = $('#maxResults').val();
        submitQuery(states, maxResults);
    })
}

function main() {
    init();
    handleForm();
}

$(main);