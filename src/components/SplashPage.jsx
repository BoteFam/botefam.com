import { useState, useCallback } from 'react';
import './SplashPage.css';
import TicketModal from './TicketModal';

import botefamPresentsImg from '../assets/botefam_presents.png';
import wordmarkImg from '../assets/beats_and_blends_word_logo.png';
import lineupImg from '../assets/lineup.png';
import mountainLeftImg from '../assets/mountain_left.png';
import mountainRightImg from '../assets/mountain_right.png';
import cupWithSteamImg from '../assets/cup_with_steam.png';

/* =========================================================
   Sub-components
   ========================================================= */

function MountainLeft() {
  return (
    <img
      className="mountain mountain--left"
      src={mountainLeftImg}
      alt="Mountain range on the left"
      width="961"
      height="756"
      loading="eager"
    />
  );
}

function MountainRight() {
  return (
    <img
      className="mountain mountain--right"
      src={mountainRightImg}
      alt="Mountain range on the right"
      width="924"
      height="738"
      loading="eager"
    />
  );
}

function CupWithSteam() {
  return (
    <img
      className="cup-with-steam"
      src={cupWithSteamImg}
      alt="A cup of coffee with steam rising — Beats &amp; Blends"
      width="696"
      height="1019"
      loading="eager"
    />
  );
}

function BotefamPresents() {
  return (
    <img
      className="botefam-presents"
      src={botefamPresentsImg}
      alt="Botefam Presents"
      width="428"
      height="28"
      loading="eager"
    />
  );
}

function HeroWordmark() {
  return (
    <img
      className="hero-wordmark"
      src={wordmarkImg}
      alt="Beats &amp; Blends — Denver"
      width="580"
      height="160"
      loading="eager"
      fetchPriority="high"
    />
  );
}

function CTAButton({ onClick }) {
  return (
    <button
      className="cta-button"
      onClick={onClick}
      type="button"
      aria-label="Buy tickets for Beats &amp; Blends"
    >
      BUY TICKETS
    </button>
  );
}

const SOCIALS = [
  {
    name: 'Facebook',
    url: 'https://www.facebook.com/botefam',
    icon: (
      <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor" aria-hidden="true">
        <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
      </svg>
    ),
  },
  {
    name: 'Instagram',
    url: 'https://www.instagram.com/botefam',
    icon: (
      <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor" aria-hidden="true">
        <path d="M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2zm0 1.5A4.25 4.25 0 0 0 3.5 7.75v8.5A4.25 4.25 0 0 0 7.75 20.5h8.5A4.25 4.25 0 0 0 20.5 16.25v-8.5A4.25 4.25 0 0 0 16.25 3.5h-8.5zM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10zm0 1.5a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7zm5.25-2.5a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
      </svg>
    ),
  },
  {
    name: 'TikTok',
    url: 'https://www.tiktok.com/@botefam',
    icon: (
      <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor" aria-hidden="true">
        <path d="M16.6 5.82A4.278 4.278 0 0 1 13.9 3h-3.07v12.4a2.592 2.592 0 0 1-2.59 2.37 2.592 2.592 0 0 1-2.59-2.6 2.592 2.592 0 0 1 2.59-2.59c.27 0 .53.04.78.11V9.56a5.78 5.78 0 0 0-.78-.05 5.77 5.77 0 0 0-5.77 5.78 5.77 5.77 0 0 0 5.77 5.77 5.77 5.77 0 0 0 5.77-5.77V9.01a7.34 7.34 0 0 0 4.29 1.38V7.32a4.278 4.278 0 0 1-1.7-.5z" />
      </svg>
    ),
  },
];

function SocialLinks() {
  return (
    <div className="social-links" aria-label="Follow BOTEFAM on social media">
      <p className="social-links__heading">Follow BOTEFAM</p>
      <div className="social-links__icons">
        {SOCIALS.map(({ name, url, icon }) => (
          <a
            key={name}
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="social-links__link"
            aria-label={`BOTEFAM on ${name}`}
          >
            {icon}
          </a>
        ))}
      </div>
    </div>
  );
}

function LineupGraphic() {
  return (
    <img
      className="lineup-graphic"
      src={lineupImg}
      alt="Event lineup: 10AM–11AM Stemmily, 11AM–12PM JBLU, 12PM–1PM Macefacekilla, 1PM–2PM Hyphy Wifey"
      width="711"
      height="172"
      loading="eager"
    />
  );
}

/* =========================================================
   SplashPage — root component
   ========================================================= */

export default function SplashPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const openModal = useCallback(() => setModalOpen(true), []);
  const closeModal = useCallback(() => setModalOpen(false), []);

  return (
    <div className="splash-root">
      {/* Background mountains — z-index 1 */}
      <MountainLeft />
      <MountainRight />

      {/* Cup with steam — z-index 2 */}
      <CupWithSteam />

      {/* Main content — z-index 10 */}
      <div className="content-layer">
        <BotefamPresents />
        <HeroWordmark />
        <CTAButton onClick={openModal} />
        <LineupGraphic />
        <SocialLinks />
      </div>

      {/* Ticket modal — rendered only when open */}
      {modalOpen && <TicketModal onClose={closeModal} />}
    </div>
  );
}
