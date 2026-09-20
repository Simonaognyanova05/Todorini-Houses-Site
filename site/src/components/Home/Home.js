import { useState } from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const slides = [
    { image: '/img/bigfotos3.jpg', alt: 'Традиционните къщи и дворът на хотела', title: <>Място, в което<br />времето е Ваше.</>, label: 'Семеен хотел · Копривщица' },
    { image: '/img/bigfotos23.jpg', alt: 'Камината в механа Под старата круша', title: <>Вкусът на<br />гостоприемството.</>, label: 'Механа „Под старата круша“' },
    { image: '/img/bigfotos8.jpg', alt: 'Цветните фасади на Тодорини къщи', title: <>Близо до традицията.<br />Далеч от бързането.</>, label: 'Тодорини къщи · Копривщица' },
    { image: '/img/header-picture.jpg', alt: 'Тодорини къщи и Под старата круша', title: <>Две къщи.<br />Едно топло посрещане.</>, label: 'Хотел и механа' },
];

export default function Home() {
    const [active, setActive] = useState(0);
    return (
        <>
            <section className="hotel-hero" aria-label="Добре дошли в Тодорини къщи" aria-roledescription="слайдшоу">
                {slides.map((slide, index) => (
                    <div className={`hotel-hero-slide ${active === index ? 'is-active' : ''}`} key={slide.image} aria-hidden={active !== index}>
                        <img src={slide.image} alt={slide.alt} fetchPriority={index === 0 ? 'high' : 'auto'} />
                    </div>
                ))}
                <div className="hero-shade" />
                <div className="hero-copy" aria-live="polite">
                    <span className="eyebrow">{slides[active].label}</span>
                    <h1>{slides[active].title}</h1>
                    <p>Уютът на българския дом, в сърцето на Копривщица.</p>
                    <Link className="hotel-button" to="/booking">Вашият престой <span aria-hidden="true">↗</span></Link>
                </div>
                <div className="hero-bottom">
                    <a href="#welcome" className="hero-discover">Опознайте нашия свят <span aria-hidden="true">↓</span></a>
                    <div className="hero-controls" aria-label="Избор на снимка">
                        {slides.map((slide, index) => <button key={slide.image} type="button" className={index === active ? 'is-active' : ''} aria-label={`Снимка ${index + 1}: ${slide.alt}`} aria-pressed={index === active} onClick={() => setActive(index)}>0{index + 1}</button>)}
                    </div>
                </div>
            </section>
            <section id="welcome" className="hotel-intro">
                <div className="hotel-intro-heading"><span className="eyebrow">Добре дошли в Тодорини къщи</span><h2>Копривщица отвън.<br /><em>Уют отвътре.</em></h2></div>
                <div className="hotel-intro-copy"><p>Две традиционни копривщенски къщи, една до друга, в самия център на града. Дървени чардаци, цветен двор и онова спокойно усещане, че сте на своето място.</p><p>Настанете се удобно. Останалото може да почака.</p><Link className="text-link" to="/about">Историята на нашето място <span aria-hidden="true">↗</span></Link></div>
            </section>
            <section className="hotel-experiences" aria-labelledby="experiences-title">
                <div className="experience-heading"><span className="eyebrow">За хубавите дни</span><h2 id="experiences-title">Вашият ритъм. Вашето място.</h2></div>
                <div className="experience-grid">
                    <Link to="/room" className="experience"><div className="experience-photo"><img src="/img/bigfotos8.jpg" alt="Къщите, в които посрещаме нашите гости" loading="lazy" /></div><span className="experience-index">01 / Настаняване</span><h3>Почивка с характер <span aria-hidden="true">↗</span></h3><p>Стаи за двама и трима и апартамент — за Вашето време заедно.</p></Link>
                    <Link to="/mehana" className="experience"><div className="experience-photo"><img src="/img/bigfotos23.jpg" alt="Традиционна обстановка и камина в механата" loading="lazy" /></div><span className="experience-index">02 / Механа</span><h3>Под старата круша <span aria-hidden="true">↗</span></h3><p>Българска кухня, топла атмосфера и още малко време около масата.</p></Link>
                    <Link to="/spa" className="experience"><div className="experience-photo"><img src="/img/gallery/spa/img1.JPG" alt="Релакс центърът на хотела" loading="lazy" /></div><span className="experience-index">03 / Релакс</span><h3>Миг само за Вас <span aria-hidden="true">↗</span></h3><p>Вътрешен басейн, джакузи и инфрачервена сауна. Просто отпуснете рамене.</p></Link>
                </div>
            </section>
            <section className="hotel-invitation"><span className="eyebrow">Очакваме Ви в Копривщица</span><h2>Подарете си няколко<br /><em>по-бавни дни.</em></h2><Link className="hotel-button" to="/booking">Планирайте Вашия престой <span aria-hidden="true">↗</span></Link><a className="invitation-phone" href="tel:+359887349901">или ни се обадете · 0887 349 901</a></section>
        </>
    );
}
