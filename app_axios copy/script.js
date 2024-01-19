const form = document.querySelector('#searchForm');

form.addEventListener('submit', function(e){
    e.preventDefault();
    const content = document.getElementById('content');
    if (content != null){
      // content.style.display = 'None';
      content.remove();
    }
    const query = document.getElementById('search').value;
    // console.log(query)
    if (isNaN(query)){
      makeARequest(query, function(src){
        // console.log(src, typeof src);

        // console.log('Name: ', src.name);
        // console.log('Type: ', src.type);
        // console.log('Premier date: ', src.premiered)
        // console.log('Where to watch: ', src.officialSite)
        const showsData = [
            { name: src.name, type: src.type, premierDate: src.premiered, whereToWatch: src.officialSite }    // Add more shows as needed
        ];
        createTable(showsData);
      });

    }
    
});


const makeARequest = (query, callback) => {
    const data = axios(`https://api.tvmaze.com/singlesearch/shows?q=${query}`)
        .then((data)=>{
            console.log("YAY RECEIVED DATA");
            console.log(data)
            callback(data.data);
        })
        .catch((error)=>{
            console.log('OOPS ERRORRR!!!', error);
        })
}

// const showsData = [
//     { name: 'Show 1', type: 'Drama', premierDate: '2022-01-01', whereToWatch: 'Netflix' }    // Add more shows as needed
// ];

function createTable(showsData) {
    // Get the body element to append the table
    const body = document.body;
    const div = document.createElement('div');
    div.setAttribute('id','content');

    // Create the table element
    const table = document.createElement('table');

    // Create the table header row
    const headerRow = table.insertRow();
    const headers = ['Name', 'Type', 'Premier Date', 'Where to Watch'];

    // Populate the header row with th elements
    headers.forEach(headerText => {
      const th = document.createElement('th');
      const text = document.createTextNode(headerText);
      th.appendChild(text);
      headerRow.appendChild(th);
    });

    // Create and populate the table rows with show data
    showsData.forEach(show => {
      const row = table.insertRow();
      const values = Object.values(show);

      // Populate the row with td elements
      values.forEach(value => {
        const cell = row.insertCell();
        const text = document.createTextNode(value);
        cell.appendChild(text);
      });
    });

    // Append the table to the body
    div.appendChild(table);
    body.appendChild(div);
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