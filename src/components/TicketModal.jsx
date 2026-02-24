import { useEffect, useRef, useState, useCallback } from 'react';

/**
 * TicketModal
 *
 * Opens a ticket-purchase iframe in a modal overlay.
 * - Body scroll is locked while open.
 * - Iframe is only mounted when the modal opens (not pre-rendered).
 * - Closing uses a short CSS animation before unmounting.
 * - Keyboard: Escape key closes the modal.
 */
const TICKET_URL = 'https://app.rfidify.com/event/beats-n-blends-ace';
const CLOSE_ANIMATION_MS = 150;

export default function TicketModal({ onClose }) {
  const [isClosing, setIsClosing] = useState(false);
  const backdropRef = useRef(null);

  /* Lock body scroll on mount, restore on unmount */
  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  /* Trigger close animation, then call parent onClose */
  const handleClose = useCallback(() => {
    if (isClosing) return;
    setIsClosing(true);
    setTimeout(() => {
      onClose();
    }, CLOSE_ANIMATION_MS);
  }, [isClosing, onClose]);

  /* Close on Escape */
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') handleClose();
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [handleClose]);

  /* Close on backdrop click (not container click) */
  const handleBackdropClick = (e) => {
    if (e.target === backdropRef.current) handleClose();
  };

  const closingClass = isClosing ? ' modal-backdrop--closing' : '';
  const containerClosingClass = isClosing ? ' modal-container--closing' : '';

  return (
    <div
      ref={backdropRef}
      className={`modal-backdrop${closingClass}`}
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-label="Buy tickets for Beats &amp; Blends"
    >
      <div className={`modal-container${containerClosingClass}`}>
        <button
          className="modal-close-btn"
          onClick={handleClose}
          aria-label="Close ticket modal"
          type="button"
        >
          &#10005;
        </button>

        {/* Iframe only mounts when modal is open */}
        <iframe
          className="modal-iframe"
          src={TICKET_URL}
          title="Beats &amp; Blends ticket purchase"
          allow="payment"
        />
      </div>
    </div>
  );
}
