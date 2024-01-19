const form = document.querySelector('#searchForm');

form.addEventListener('submit', function(e){
    e.preventDefault();
    const query = document.getElementById('search').value;
    makeARequest(query, function(src){
        const img = document.createElement('img');
        img.setAttribute('src', src);
        console.log(img.getAttribute('src'));
        document.body.append(img);
    });
});


const makeARequest = async (query, callback) => {
    const data = axios(`https://api.tvmaze.com/search/shows?q=${query}`)
        .then((data)=>{
            console.log("YAY RECEIVED DATA", data.data[0]['show']['image']['original']);
            callback(data.data[0]['show']['image']['original'])
        })
        .catch((error)=>{
            console.log('OOPS ERRORRR!!!', error);
        })
}

// axios('https://api.tvmaze.com/search/shows?q=messi')
//     .then((data)=>{
//         console.log("YAY RECEIVED DATA", data.data[0]['show']['image']['original']);
//         // return data.json();
//         // console.log(data1)
//     })


// fetch('https://api.tvmaze.com/search/shows?q=messi')
//     .then((data)=>{
//         console.log("YAY RECEIVED DATA", data);
//         return data.json();
//         // console.log(data1)
//     })
//     .then(res => {
//         console.log('CONVERTED TO JSON!', res)
//         // return res[0]['show']['image']['original'];
//     })
    // .catch((error)=>{
    //     console.log('OOPS ERRORRR!!!', error);
    // })