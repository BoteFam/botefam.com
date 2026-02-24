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
      </div>

      {/* Ticket modal — rendered only when open */}
      {modalOpen && <TicketModal onClose={closeModal} />}
    </div>
  );
}
