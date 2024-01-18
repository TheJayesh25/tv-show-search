const form = document.querySelector('#searchForm');

form.addEventListener('submit', function(e){
    e.preventDefault();
    const query = document.getElementById('search').value;
    makeARequest(query, function(imageUrl) {
        const img = document.createElement('img');
        img.setAttribute('src', imageUrl);
        console.log(img.getAttribute('src'));
        document.body.append(img);
    });
});

const makeARequest = (query, callback) => {
    const req = new XMLHttpRequest();
    req.open("GET", `https://api.tvmaze.com/search/shows?q=${query}`);
    req.onload = () => {
        const response = JSON.parse(req.responseText);
        const imageUrl = response[0]['show']['image']['original'];
        callback(imageUrl);
    };
    req.onerror = () => {
        console.log('ERROR');
    };
    req.send();
};
