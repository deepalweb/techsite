import AOS from 'aos';
import 'aos/dist/aos.css';
import './style.css';

// Initialize AOS (Animate On Scroll)
AOS.init({
    duration: 800,
    easing: 'ease-out-cubic',
    once: true,
    offset: 50,
});

console.log('Techsite Modern loaded');
