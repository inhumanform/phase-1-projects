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
    detailImage.alt = wine.name;
    detailImage.classList.add('detail-image');

    const name = document.createElement('h2');
    name.textContent = `Name: ${wine.name}`;

    const vintage = document.createElement('h3');
    vintage.textContent = `Vintage: ${wine.vintage}`;

    const varietal = document.createElement('h4');
    varietal.textContent = `Grape Varietal: ${wine.varietal-id}`;
    const purchasePrice = document.createElement('h5');
    purchasePrice.textContent = `Purchase Price: ${wine['purchase-price']}`;

    const comment = document.createElement('h6');
    comment.textContent = `Comment: ${wine.comment}`;

    wineDetail.appendChild(detailImage);
    wineDetail.appendChild(name);
    wineDetail.appendChild(vintage);
    wineDetail.appendChild(purchasePrice);
    wineDetail.appendChild(comment);
    wineDetail.appendChild(varietal);
};




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
