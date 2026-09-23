import React from 'react';
import { X, ExternalLink, FileText } from 'lucide-react';

export const CertificateViewer = ({ certificate, isOpen, onClose }) => {
  if (!isOpen || !certificate) return null;

  const hasImage = Boolean(certificate.imageUrl);
  const hasPdf = Boolean(certificate.pdfUrl);

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-content"
        style={{ maxWidth: '820px', height: '85vh', display: 'flex', flexDirection: 'column' }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-header">
          <div>
            <h3 className="modal-title" style={{ fontSize: '1.2rem' }}>
              {certificate.certificateTitle}
            </h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
              {certificate.organization} • {certificate.date}
            </p>
          </div>
          <button className="modal-close-btn" onClick={onClose} aria-label="Close modal">
            <X size={18} />
          </button>
        </div>

        <div className="modal-body" style={{ flex: 1, padding: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
          {/* Automatically display image if uploaded as image (or both) */}
          {hasImage && (
            <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'auto' }}>
              <img
                src={certificate.imageUrl}
                alt={certificate.certificateTitle}
                style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain', borderRadius: 'var(--radius-md)' }}
              />
            </div>
          )}

          {/* Automatically display PDF if uploaded as PDF only */}
          {!hasImage && hasPdf && (
            <iframe
              src={certificate.pdfUrl}
              title={certificate.certificateTitle}
              style={{ width: '100%', height: '100%', border: 'none', borderRadius: 'var(--radius-md)', background: '#ffffff' }}
            />
          )}

          {/* Fallback if no file is available */}
          {!hasImage && !hasPdf && (
            <div className="empty-state" style={{ width: '100%' }}>
              <FileText size={40} style={{ marginBottom: '1rem', color: 'var(--text-muted)' }} />
              <p>No document attached for this certificate.</p>
            </div>
          )}
        </div>

        <div className="modal-footer">
          {hasImage && (
            <a
              href={certificate.imageUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-secondary btn-sm"
            >
              <ExternalLink size={14} /> Open Full Size
            </a>
          )}
          {!hasImage && hasPdf && (
            <a
              href={certificate.pdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-secondary btn-sm"
            >
              <ExternalLink size={14} /> Open PDF
            </a>
          )}
          {hasImage && hasPdf && (
            <a
              href={certificate.pdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-secondary btn-sm"
            >
              <ExternalLink size={14} /> Open PDF
            </a>
          )}
          <button type="button" className="btn btn-primary btn-sm" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
