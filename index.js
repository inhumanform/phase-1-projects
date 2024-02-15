// const displayWineImage = () => {
//     fetch('http://localhost:3000/wine')
//         .then(response => response.json())
//         .then(wines => {
//             // console.log(wines[2].name)
//             const menu = document.getElementById('bevImage');
//             wines.forEach(wine => {
//                 const wineImage = document.createElement('img');
//                 wineImage.src = wine.image;
//                 wineImage.alt = wine.name;
//                 wineImage.classList.add('wine-image');
//                 console.log(wineImage)
//                 // wineImage.setAttribute('data-wine-id', wine.id);

//                 menu.appendChild(wineImage);

//                 wineImage.addEventListener('click', () => displayWineInfo(wine));
//             });
//         })
//         .catch(error => console.error('Failed to fetch wine collection:', error));
// };

const displayWineObject = (evt) => {
    console.log(evt)
    // fetch('http://localhost:3000/wine')
    //     .then(response => response.json())
    //     .then(wines => {
    //         // console.log(wines[2].name)
    //         const menu = document.getElementById('bevImage');
    //         wines.forEach(wine => {
    //             const wineImage = document.createElement('img');
    //             wineImage.src = wine.image;
    //             wineImage.alt = wine.name;
    //             wineImage.classList.add('wine-image');
    //             console.log(wineImage)
    //             // wineImage.setAttribute('data-wine-id', wine.id);

    //             menu.appendChild(wineImage);

    //             wineImage.addEventListener('click', () => displayWineInfo(wine));
    //         });
    //     })
    //     .catch(error => console.error('Failed to fetch wine collection:', error));
};

const displayWineInfo = (wine) => {
    const wineDetail = document.getElementById('bevDetails');
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
            const varietalName = varietalObj.name
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
    const form = document.getElementById('newBev');
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

function populateWines(){
    searchBlock = document.getElementById('wineSearch')
     fetch(`http://localhost:3000/wine`)
        .then(response => response.json())
        .then(results => {
            showOptions(searchBlock, results)})
        
    }
function populateVarietals(){
    searchBlock = document.getElementById('varietalSearch')
    fetch(`http://localhost:3001/varietalInfo`)
        .then(response => response.json())
        .then(results => {
            showOptions(searchBlock, results)

        })
}
function populateAppellations(){
    searchBlock = document.getElementById('appellationSearch')
    fetch(`http://localhost:3002/appellation`)
        .then(response => response.json())
        .then(results => {showOptions(searchBlock, results)})
}

function showOptions(searchBlock, wineStuff){
    searchBox = searchBlock.querySelector("input")
    dropdown = searchBlock.querySelector(".dropdown")
    // querySelectorAll always returns an array even when there is only one matching element
    if(searchBox.value.length > 2){
        dropdown.classList.remove('hidden')
        options = dropdown.querySelectorAll('span')
        populateDropDown(searchBlock, wineStuff)
        wineStuff.filter((wineResult) => {

        })

    }
}

function populateDropDown(searchBlock, wineStuff){
    dropdown = searchBlock.querySelector(".dropdown")
    dropdown.innerHTML=''
    // Use innerhtml because it clears this ho out. otherwise it will keep populating the same results over and over in the dropdown
    wineStuff.map((wineThing)=>{
        item = document.createElement('span')
        item.textContent = wineThing.name
        // item.addEventL
        dropdown.append(item)
    })

}


const main = () => {
    displayWineObject();

};

main();
