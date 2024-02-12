const displayWineImage = () => {
    fetch('http://localhost:3000/wine')
        .then(response => response.json())
        .then(wines => {
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
    name.textContent = `Name: ${wine.name}`;

    const vintage = document.createElement('h3');
    // console.log(vintage)
    vintage.textContent = `Vintage: ${wine.vintage}`;


    const purchasePrice = document.createElement('h5');
    purchasePrice.textContent = `Purchase Price: ${wine['purchasePrice']}`;

    const comment = document.createElement('h6');
    comment.textContent = `Comment: ${wine.comment}`;

    const varietal = document.createElement('h4');
    varietal.classList.add('varietalHeader')
    varietal.textContent = `Grapes: `

    wineDetail.appendChild(detailImage);
    wineDetail.appendChild(name);
    wineDetail.appendChild(vintage);
    wineDetail.appendChild(purchasePrice);
    wineDetail.appendChild(varietal);
    wine.varietalIds.map((vId)=>{
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
            const varietalHeading = document.getElementsByClassName('varietalHeader')[0]
            console.log("VHEAD", varietalHeading.textContent)
            console.log('textcontent1', varietalHeading.textContent)
            if(index == 0){
                varietalHeading.textContent = varietalHeading.textContent.concat(`${varietalName}`)
            }
            else{
                varietalHeading.textContent = varietalHeading.textContent.concat(`, ${varietalName}`)
            }
        }
    )
}



// getTheThing(4)
// function getTheThing(identifierOftheThingIWant){
//     wine.get(identifierOftheThingIWant)
// }


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


        fetch('http://localhost:3000/my-wine-collection', {
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

const main = () => {
    displayWineImage();

};

main();
