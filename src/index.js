import HomePage from './pages/home';
import ArtistsCategories from './pages/artists-categories';
import PicturesCategories from './pages/pictures-categories';
import { setDefaultDataLS } from './helpers';
import ResultsPage from './pages/results';
import SettingsPage from './pages/settings';

setDefaultDataLS();
new HomePage().render();

function getPage(e){
  switch (e.target.id) {
    case 'home':
      new HomePage().render();
      break;
    case 'artists-categories':
      new ArtistsCategories().render();
      break;
    case 'pictures-categories':
      new PicturesCategories().render();
      break;
    case 'settings':
      alert('Здесь должна быть страница с настройками, но её пока что нет :)')
      break;
  
    default:
      "Art Quiz"
      break;
  }
}

document.addEventListener('click', e => getPage(e))
console.log(`
  1. Стартовая страница и навигация +20
  2. Настройки -40
  3. Страница категорий +30
  4. Страница с вопросами +50
  5. Страница с результатами +50
  6. Плавная смена изображений +10
  7. Реализована анимация отдельных деталей интерфейса:
    -плавное появление и исчезновение модального окна в вопросах +5
    -подсветка вариантов ответа в викторине по картинам и такая же подсветка при наведении на кнопки с результатами раунда +5
    -при наведении вращается иконка настроек +5
  8. Дополнительный функционал на выбор -20`);
