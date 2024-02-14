const displayWineImage = () => {
    fetch('http://localhost:3000/wine')
        .then(response => response.json())
        .then(wines => {
            // console.log(wines[2].name)
            const menu = document.getElementById('bev-image');
            wines.forEach(wine => {
                const wineImage = document.createElement('img');
                wineImage.src = wine.image;
                wineImage.alt = wine.name;
                wineImage.classList.add('wine-image');
                console.log(wineImage)
                // wineImage.setAttribute('data-wine-id', wine.id);

                menu.appendChild(wineImage);

                wineImage.addEventListener('click', () => displayWineInfo(wine));
            });
        })
        .catch(error => console.error('Failed to fetch wine collection:', error));
};

const displayWineInfo = (wine) => {
    const wineDetail = document.getElementById('bev-details');
    wineDetail.innerHTML = '';
    const detailImage = document.createElement('img');
    detailImage.src = wine.image;
    // console.log(detailImage)
    detailImage.alt = wine.name;
    detailImage.classList.add('detail-image');

    const name = document.createElement('h2');
    name.textContent = `${wine.name}`;

    const vintage = document.createElement('h3');
    // console.log(vintage)
    vintage.textContent = `Vintage: ${wine.vintage}`;


    const purchasePrice = document.createElement('h5');
    purchasePrice.textContent = `Purchase Price: ${wine['purchasePrice']}`;

    const comment = document.createElement('h6');
    comment.textContent = `Comment: ${wine.comment}`;

    const varietal = document.createElement('h4');
    varietal.setAttribute('id', 'varietalHeader')
    varietal.textContent = `Grapes: `

    wineDetail.appendChild(detailImage);
    wineDetail.appendChild(name);
    wineDetail.appendChild(vintage);
    wineDetail.appendChild(varietal);
    wineDetail.appendChild(purchasePrice);
    wine.varietalIds.map((vId) => {
        index = wine.varietalIds.indexOf(vId)
        displayVarietalInfo(vId, index)
    })

    wineDetail.appendChild(comment);
};

const displayVarietalInfo = (poopoo, index) => {
    fetch(`http://localhost:3001/varietalInfo/${poopoo}`)
        .then(response => response.json())
        .then(varietalObj => {
            const varietalName = varietalObj.grapeName
            const varietalHeading = document.getElementById('varietalHeader')
            // console.log("VHEAD", varietalHeading.textContent)
            // console.log('textcontent1', varietalHeading.textContent)
            if (index == 0) {
                varietalHeading.textContent = varietalHeading.textContent.concat(`${varietalName}`)
            }
            else {
                varietalHeading.textContent = varietalHeading.textContent.concat(`, ${varietalName}`)
            }
        }
        )
}

const addWineToCellar = () => {
    const form = document.getElementById('new-bev');
    if (!form) {
        console.error('Form not found');
        return;
    }

    form.addEventListener('submit', event => {
        event.preventDefault();


        const formData = {
            name: document.getElementById('new-name').value,
            vintage: document.getElementById('new-vintage').value,
            image: document.getElementById('new-image').value,
            'purchase-price': document.getElementById('purchase-price').value,
            comment: document.getElementById('new-comment').value
        };


        fetch('http://localhost:3000/wine', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
        })
            .then(response => response.json())
            .then(newWine => {
                console.log('Added new wine to collection:', newWine);

                displayWineImage();
            })
            .catch(error => console.error('Failed to add wine to collection:', error));
    });
};
// Here lies the functions for your search buttons
// document.addEventListener('DOMContentLoaded', () => {
//     const wineSearchBtn = document.getElementById('wine-search-btn');
//     const grapeSearchBtn = document.getElementById('grape-search-btn');
//     const regionSearchBtn = document.getElementById('region-search-btn');
    // DOM Content loaded makes sure this runs after the page has been fully loaded (confirm this)
    // wineSearchBtn.addEventListener('click', () => searchWineData());
    // const query = searchInput.value;
    // searchWineData(query).then(data => {
    //     displayWineSearchResults(data, bev-details)
    // })

//     grapeSearchBtn.addEventListener('click', () => searchGrapes());
//     regionSearchBtn.addEventListener('click', () => searchRegions());
//     // These listeners call their respective search functions
// });

// function searchWineData() {
//     const query = document.querySelector('.collection-search-button .textbox').value;
//     fetchWineData('my-wine-collection.json', query, 'wine');
// }

// function searchGrapes() {
//     const query = document.querySelector('.grape-search-button .textbox').value;
//     fetchGrapeData('varietal-info-db.json', query, 'grape');
// }

// function searchRegions() {
//     const query = document.querySelector('.region-search-button .textbox').value;
//     fetchRegionData('wine-appellation-db.json.json', query, 'region');
// }

// function fetchWineData(fileName, query, type) {
//     fetch(`http://localhost:3000/wine/`)
//         .then(response => response.json())
//         .then(data => {
//             const results = data.filter(item => item.name.toLowerCase().includes(query.toLowerCase()));
//             displayResults(results, type);
//         })
//         .catch(error => console.error('Error fetching data:', error));

    // function fetchRegionData(fileName, query, type) {
        // figure out how to get json to watch the correct file
//         fetch(`http://localhost:3000/wine/`)
//             .then(response => response.json())
//             .then(data => {
//                 const results = data.filter(item => item.name.toLowerCase().includes(query.toLowerCase()));
//                 displayResults(results, type);
//             })
//             .catch(error => console.error('Error fetching data:', error));
//     }
// }

// function fetchGrapeData(fileName, query, type) {
//     fetch(`http://localhost:3001/varietalInfo/`)
//         .then(response => response.json())
//         .then(data => {
//             const results = data.filter(item => item.name.toLowerCase().includes(query.toLowerCase()));
//             displayResults(results, type);
//         })
//         .catch(error => console.error('Error fetching data:', error));
// }

// function displayDetails(data, detailsdiv) {
//     // Clears previous details
//     detailsdiv.innerHTML = '';
// }

const main = () => {
    displayWineImage();


};

main();
