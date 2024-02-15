const displayWineImage = () => {
    fetch('http://localhost:3000/wine')
        .then(response => response.json())
        .then(wines => {
            // console.log(wines[2].name)
            const menu = document.getElementById('bevImage');
            wines.forEach(wine => {
                const wineImage = document.createElement('img');
                wineImage.src = wine.image;
                wineImage.alt = wine.name;
                wineImage.classList.add('wine-image');
                console.log(wineImage)
                // wineImage.setAttribute('data-wine-id', wine.id);

                menu.appendChild(wineImage);

                wineImage.addEventListener('click', (event) => displayWineInfo(event, wine));
            });
        })
        .catch(error => console.error('Failed to fetch wine collection:', error));
};


const displayWineInfo = (event, wine) => {
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
const displayVarietalBlock = (event, varietal) => {
    const wineDetail = document.getElementById('bevDetails');
    console.log(event)
    console.log(varietal)
    wineDetail.innerHTML = '';
    const name = document.createElement('h2');
    name.textContent = `${varietal.name}`;

    const grapeColor = document.createElement('h3');
    // console.log(vintage)
    grapeColor.textContent = `Grape Color: ${varietal.grapeColor}`;


    const origin = document.createElement('h5');
    origin.textContent = `Origin: ${varietal['origin']}`;

    const description = document.createElement('h6');
    description.textContent = `Description: ${varietal.description}`;

    const growingRegions = document.createElement('h4');
    growingRegions.setAttribute('id', 'regionHeader')
    growingRegions.textContent = `Regions: `
    varietal.growingRegions.map((r) => {
        region = document.createElement('li')
        region.textContent = r
        growingRegions.append(region)
    })


    wineDetail.appendChild(name);
    wineDetail.appendChild(grapeColor);
    wineDetail.appendChild(origin);
    wineDetail.appendChild(description);
    wineDetail.appendChild(growingRegions);
    


};



const displayVarietalInfo = (varietalId, index) => {
    fetch(`http://localhost:3001/varietalInfo/${varietalId}`)
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

function addSubmit(){
    const form = document.getElementById('newBev')
    form.addEventListener("submit", addWineToCellar)
}

const addWineToCellar = (e) => {
    const form = document.getElementById('newBev')


    console.log(e)
    if(!form) {
        console.error('Form not found');
        return;
    }


        const formData = {
            name: document.getElementById('new-name').value,
            vintage: document.getElementById('new-vintage').value,
            image: document.getElementById('new-image').value,
            purchasePrice: document.getElementById('purchase-price').value,
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
    ;
};

function populateWines(){
    const searchBlock = document.getElementById('wine')
     fetch(`http://localhost:3000/wine`)
        .then(response => response.json())
        .then(results => {
            showOptions(searchBlock, results)})
        
    }
function populateVarietals(){
    const searchBlock = document.getElementById('varietal')
    fetch(`http://localhost:3001/varietalInfo`)
        .then(response => response.json())
        .then(results => {
            showOptions(searchBlock, results)
        })
}

function showOptions(searchBlock, wineStuff){
    const searchBox = searchBlock.querySelector("input")
    const dropdown = searchBlock.querySelector(".dropdown")
    // querySelectorAll always returns an array even when there is only one matching element
    if(searchBox.value.length > 2){
        dropdown.classList.remove('hidden')
        const options = dropdown.querySelectorAll('span')
        populateDropDown(searchBlock, wineStuff)
        console.log(wineStuff)
    }
}

function populateDropDown(searchBlock, wineStuff){
    const dropdown = searchBlock.querySelector(".dropdown")
    dropdown.innerHTML=''
    // Use innerhtml because it clears this ho out. otherwise it will keep populating the same results over and over in the dropdown
    wineStuff.map((wineThing)=>{
        const item = document.createElement('span')
        item.textContent = wineThing.name
        console.log(wineThing.name)
        if(wineThing.name){
            item.addEventListener("click", (event) => displayVarietalBlock(event, wineThing))
        }else if(wineThing.purchasePrice){
            item.addEventListener("click", (event) => displayWineInfo(event, wineThing))
        }
        dropdown.append(item)
    })

}



const main = () => {
    displayWineImage();
    addSubmit();
};

main();
