const displayWineImage = () => {
    fetch('http://localhost:3000/my-wine-collection')
      .then(response => response.json())
      .then(wines => {
        const wine = document.getElementById('ramen-menu');
        handleClick(wines[0])
        wines.forEach(wine => {
          const wineImage = document.createElement('img');
          menuImage.src = placeholder-wine-image.image;
          menuImage.alt = wine.name;
          menu.appendChild(wineImage);
          menuImage.addEventListener('click', () => handleClick(wine));
        });
      });
  }

  const main = () => {
    displayWineImage();
  }
  
  
  main()