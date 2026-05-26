import { eras } from './data/eras.js';
import { products } from './data/products.js';
import { pieces } from './data/pieces.js';
import { initCursor } from './ui/cursor.js';
import { initNavigation } from './ui/navigation.js';
import { initAboutVideo } from './ui/video.js';
import { initRevealAnimations } from './ui/reveal.js';
import { renderEras, renderProducts } from './ui/render.js';
import { createModalController } from './ui/modal.js';
import { initInquiryForm } from './ui/inquiry.js';

const ENQUIRY_ENDPOINT = 'https://script.google.com/macros/s/AKfycbzi3cAAMPTzoDtEjYd3NY9ylXV9wTzpQrMOjPUwrkd4JqAPhxWA8nAPhKdeT7H7_rhUNA/exec';

initCursor();
initNavigation();
initAboutVideo();

const modalController = createModalController(pieces);
renderEras(eras);
renderProducts(products, modalController.openModal);
initRevealAnimations();
initInquiryForm(ENQUIRY_ENDPOINT);
