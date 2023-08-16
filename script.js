const clientId = 'C_vN5Yel76snHBhXFOqR1vgcEmZtBB4Y0XZmx4cAIwk';
const urlRandomPhoto = `https://api.unsplash.com/photos/random?client_id=${clientId}&count=12`;
const buttonSearch = document.querySelector('.fa-search');
buttonSearch.addEventListener('click', searchImages);
const input = document.querySelector("#input");
input.addEventListener('keydown', (event) => {
  if(event.key == 'Enter') {
      searchImages();
   }
});

function searchImages () {
  galleryContainer.textContent = "";
  let urlSearchImages = `https://api.unsplash.com/search/photos?query=${input.value}&per_page=9&client_id=${clientId}`;
  fetch(urlSearchImages)
  .then(res => res.json())
  .then(data => {
    allImages = data.results;
    makeImages(allImages);
  });
}

const galleryContainer = document.querySelector('.galleryContainer');
const DownloadButton = document.querySelector('.btnDownload');
const CloseButton = document.querySelector('.btnClose');
const ImageBig = document.querySelector('.bigImage');
const buttonPrevious = document.querySelector('.btnPrevious');
const buttonNext = document.querySelector('.btnNext');

let imageFull = document.querySelector('.imageFull');

let allImages;
let currentImg = 0;
const getImages = () => {
  fetch(urlRandomPhoto)
  .then(res => res.json())
 .then(data => {
    allImages = data;
   makeImages(allImages);
  });
}



const makeImages = (data) => {
  data.forEach((item, index) => {
    //console.log(item);
    let img = document.createElement('img');
    img.src = item.urls.regular;
    img.className = 'gallery-img';
    galleryContainer.appendChild(img);
    img.addEventListener('click', () => {
      currentImg = index;
      showImageFull(item);
    })
  })
}
const showImageFull = (item) => {
  imageFull.classList.remove('hide');
  DownloadButton.href = item.links.html;
  ImageBig.src = item.urls.regular;
  CloseButton.addEventListener('click', () => {
    imageFull.classList.add('hide');
  })
}
getImages();
//if(input.value == '') {
// getImages(); 
//} else {
///  searchImages();
//}


buttonPrevious.addEventListener('click', () => {
  if(currentImg > 0){
    currentImg--;
    showImageFull(allImages[currentImg])
  }
})

buttonNext.addEventListener('click', () => {
  if(currentImg < allImages.length - 1){
    currentImg++;
    showImageFull(allImages[currentImg])
  }
})

