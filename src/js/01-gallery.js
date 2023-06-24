import { galleryItems } from './gallery-items'; 
import SimpleLightbox from 'simplelightbox'; // Імпортуємо модуль SimpleLightbox
import 'simplelightbox/dist/simple-lightbox.min.css'; // Імпортуємо стилі для SimpleLightbox


const listImg = document.querySelector('.gallery');

function markup(items) {
  return items
    .map(
      item => `<li class="gallery__item">
    <a class="gallery__link" href="${item.original}">
       <img class="gallery__image" src="${item.preview}" alt="${item.description}" />
    </a>
 </li>`
    )
    .join('');
}

listImg.insertAdjacentHTML('beforeend', markup(galleryItems));

new SimpleLightbox('.gallery a', {
  captionDelay: 250, 
  captionsData: 'alt', 
  captionPosition: 'bottom', 
});

listImg.style.listStyle = 'none';


