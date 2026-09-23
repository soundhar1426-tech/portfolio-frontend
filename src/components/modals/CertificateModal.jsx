import React, { useState, useEffect } from 'react';
import { X, Award, FileText, Image as ImageIcon, Loader2 } from 'lucide-react';

export const CertificateModal = ({ isOpen, onClose, onSubmit, initialData = null, isSubmitting = false }) => {
  const [formData, setFormData] = useState({
    certificateTitle: '',
    organization: '',
    date: ''
  });
  const [pdfFile, setPdfFile] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [currentPdfUrl, setCurrentPdfUrl] = useState('');
  const [currentImageUrl, setCurrentImageUrl] = useState('');

  useEffect(() => {
    if (initialData) {
      setFormData({
        certificateTitle: initialData.certificateTitle || '',
        organization: initialData.organization || '',
        date: initialData.date || ''
      });
      setCurrentPdfUrl(initialData.pdfUrl || '');
      setCurrentImageUrl(initialData.imageUrl || '');
    } else {
      setFormData({
        certificateTitle: '',
        organization: '',
        date: ''
      });
      setCurrentPdfUrl('');
      setCurrentImageUrl('');
    }
    setPdfFile(null);
    setImageFile(null);
  }, [initialData, isOpen]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.certificateTitle.trim() || !formData.organization.trim() || !formData.date.trim()) {
      return;
    }

    const data = new FormData();
    data.append('certificateTitle', formData.certificateTitle.trim());
    data.append('organization', formData.organization.trim());
    data.append('date', formData.date.trim());

    if (pdfFile) {
      data.append('pdf', pdfFile);
    }
    if (imageFile) {
      data.append('image', imageFile);
    }

    onSubmit(data);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3 className="modal-title">
            <Award size={20} color="var(--accent-primary)" />
            {initialData ? 'Edit Certificate' : 'Add New Certificate'}
          </h3>
          <button className="modal-close-btn" onClick={onClose} aria-label="Close modal">
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="modal-body">
            <div className="form-group">
              <label className="form-label" htmlFor="certificateTitle">
                Certificate Title <span style={{ color: '#ef4444' }}>*</span>
              </label>
              <input
                id="certificateTitle"
                name="certificateTitle"
                type="text"
                className="form-control"
                placeholder="e.g. The Complete C Developer Course"
                value={formData.certificateTitle}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="organization">
                Issuing Organization <span style={{ color: '#ef4444' }}>*</span>
              </label>
              <input
                id="organization"
                name="organization"
                type="text"
                className="form-control"
                placeholder="e.g. Udemy, Coursera, HackerRank"
                value={formData.organization}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="date">
                Issue Date <span style={{ color: '#ef4444' }}>*</span>
              </label>
              <input
                id="date"
                name="date"
                type="text"
                className="form-control"
                placeholder="e.g. January 30, 2024"
                value={formData.date}
                onChange={handleChange}
                required
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div className="form-group">
                <label className="form-label" htmlFor="pdfUpload">
                  <FileText size={16} style={{ display: 'inline', verticalAlign: 'middle', marginRight: '4px' }} />
                  Upload PDF
                  <span className="form-label-optional">(Optional)</span>
                </label>
                <input
                  id="pdfUpload"
                  type="file"
                  accept=".pdf"
                  className="form-control"
                  style={{ fontSize: '0.82rem' }}
                  onChange={(e) => setPdfFile(e.target.files[0] || null)}
                />
                {currentPdfUrl && !pdfFile && (
                  <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '0.35rem' }}>
                    Current PDF attached
                  </p>
                )}
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="imageUpload">
                  <ImageIcon size={16} style={{ display: 'inline', verticalAlign: 'middle', marginRight: '4px' }} />
                  Upload Image
                  <span className="form-label-optional">(Optional)</span>
                </label>
                <input
                  id="imageUpload"
                  type="file"
                  accept=".jpg,.jpeg,.png,.webp"
                  className="form-control"
                  style={{ fontSize: '0.82rem' }}
                  onChange={(e) => setImageFile(e.target.files[0] || null)}
                />
                {currentImageUrl && !imageFile && (
                  <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '0.35rem' }}>
                    Current Image attached
                  </p>
                )}
              </div>
            </div>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              * Supports PDF only, Image only, or both simultaneously.
            </p>
          </div>

          <div className="modal-footer">
            <button type="button" className="btn btn-secondary btn-sm" onClick={onClose} disabled={isSubmitting}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary btn-sm" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  Saving...
                </>
              ) : (
                initialData ? 'Save Changes' : 'Add Certificate'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
