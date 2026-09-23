import React, { useState, useEffect } from 'react';
import { Plus, Award, FileText, Eye, Edit3, Trash2, Calendar, Building2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { fetchCertificates, createCertificate, updateCertificate, deleteCertificate, getFileUrl } from '../services/api';
import { CertificateModal } from './modals/CertificateModal';
import { CertificateViewer } from './modals/CertificateViewer';
import { ConfirmDeleteModal } from './modals/ConfirmDeleteModal';
import { CardSkeleton } from './ui/Skeleton';
import { PdfThumbnail } from './PdfThumbnail';

export const Certifications = ({ addToast }) => {
  const { requireAuth } = useAuth();
  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingCert, setEditingCert] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [authToken, setAuthToken] = useState(null);

  // Viewer Modal state
  const [viewerOpen, setViewerOpen] = useState(false);
  const [viewingCert, setViewingCert] = useState(null);

  // Delete modal state
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [certToDelete, setCertToDelete] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const loadCertificates = async () => {
    try {
      setLoading(true);
      const res = await fetchCertificates();
      if (res.success) {
        setCertificates(res.data);
      }
    } catch (err) {
      addToast('Unable to load certificates from server.', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCertificates();
  }, []);

  const handleAddClick = () => {
    requireAuth((token) => {
      setAuthToken(token);
      setEditingCert(null);
      setModalOpen(true);
    });
  };

  const handleEditClick = (cert) => {
    requireAuth((token) => {
      setAuthToken(token);
      setEditingCert(cert);
      setModalOpen(true);
    });
  };

  const handleDeleteClick = (cert) => {
    setCertToDelete(cert);
    setDeleteModalOpen(true);
  };

  const handleViewClick = (cert) => {
    setViewingCert(cert);
    setViewerOpen(true);
  };

  const handleFormSubmit = async (formData) => {
    const executeSave = async (token) => {
      setIsSubmitting(true);
      try {
        if (editingCert) {
          const res = await updateCertificate(editingCert._id, formData, token);
          if (res.success) {
            addToast('Certificate updated successfully!', 'success');
            setModalOpen(false);
            setEditingCert(null);
            setAuthToken(null);
            loadCertificates();
          }
        } else {
          const res = await createCertificate(formData, token);
          if (res.success) {
            addToast('Certificate added successfully!', 'success');
            setModalOpen(false);
            setAuthToken(null);
            loadCertificates();
          }
        }
      } catch (err) {
        addToast(err.message || 'Unable to upload certificate.', 'error');
      } finally {
        setIsSubmitting(false);
      }
    };

    if (authToken) {
      await executeSave(authToken);
    } else {
      requireAuth(executeSave);
    }
  };

  const handleConfirmDelete = async () => {
    if (!certToDelete) return;
    requireAuth(async (token) => {
      setIsDeleting(true);
      try {
        const res = await deleteCertificate(certToDelete._id, token);
        if (res.success) {
          addToast('Certificate deleted successfully.', 'success');
          setDeleteModalOpen(false);
          setCertToDelete(null);
          loadCertificates();
        }
      } catch (err) {
        addToast(err.message || 'Unable to delete certificate.', 'error');
      } finally {
        setIsDeleting(false);
      }
    });
  };

  return (
    <section id="certifications" className="section">
      <div className="container">
        <div className="section-header">
          <div className="section-title-wrap">
            <div>
              <span className="section-tag">Verified Credentials</span>
              <h2 className="section-title">Certifications</h2>
            </div>
            <button
              onClick={handleAddClick}
              className="section-btn-add"
              title="Add New Certificate"
              aria-label="Add New Certificate"
            >
              <Plus size={20} />
            </button>
          </div>
        </div>

        {loading ? (
          <div className="certificates-grid">
            <CardSkeleton />
            <CardSkeleton />
          </div>
        ) : certificates.length === 0 ? (
          <div className="empty-state">
            <Award size={44} style={{ marginBottom: '1rem', color: 'var(--text-muted)' }} />
            <h3>No certificates added yet.</h3>
            <p style={{ marginTop: '0.5rem', fontSize: '0.9rem' }}>
              Click the <Plus size={14} style={{ display: 'inline' }} /> button above to add a certificate.
            </p>
          </div>
        ) : (
          <div className="certificates-grid">
            {certificates.map((cert) => (
              <div key={cert._id} className="certificate-card">
                {/* Image Preview Box */}
                <div className="certificate-preview-box" onClick={() => handleViewClick(cert)}>
                  {cert.imageUrl ? (
                    <img
                      src={getFileUrl(cert.imageUrl)}
                      alt={cert.certificateTitle}
                      className="certificate-preview-img"
                    />
                  ) : cert.pdfUrl ? (
                    <PdfThumbnail
                      pdfUrl={getFileUrl(cert.pdfUrl)}
                      alt={cert.certificateTitle}
                      className="certificate-preview-img"
                    />
                  ) : (
                    <div className="certificate-fallback-box">
                      <FileText size={48} color="var(--accent-primary)" />
                      <span style={{ fontSize: '0.85rem' }}>PDF Certificate</span>
                    </div>
                  )}
                </div>

                <div className="certificate-body">
                  <span className="cert-org-badge">{cert.organization}</span>
                  <h3 className="cert-title">{cert.certificateTitle}</h3>

                  <div className="cert-date" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <Calendar size={14} color="var(--text-muted)" />
                    <span>Issued: {cert.date}</span>
                  </div>

                  <div className="cert-footer">
                    <button
                      className="btn btn-secondary btn-sm"
                      onClick={() => handleViewClick(cert)}
                    >
                      <Eye size={14} />
                      <span>View Certificate</span>
                    </button>

                    <div className="item-admin-actions">
                      <button
                        onClick={() => handleEditClick(cert)}
                        className="admin-icon-btn"
                        title="Edit Certificate"
                        aria-label="Edit Certificate"
                      >
                        <Edit3 size={14} />
                      </button>
                      <button
                        onClick={() => handleDeleteClick(cert)}
                        className="admin-icon-btn btn-delete"
                        title="Delete Certificate"
                        aria-label="Delete Certificate"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Certificate Form Modal */}
        <CertificateModal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          onSubmit={handleFormSubmit}
          initialData={editingCert}
          isSubmitting={isSubmitting}
        />

        {/* Certificate Viewer Modal */}
        <CertificateViewer
          certificate={viewingCert}
          isOpen={viewerOpen}
          onClose={() => setViewerOpen(false)}
        />

        {/* Delete Confirmation Modal */}
        <ConfirmDeleteModal
          isOpen={deleteModalOpen}
          onClose={() => setDeleteModalOpen(false)}
          onConfirm={handleConfirmDelete}
          itemName={certToDelete?.certificateTitle}
          isDeleting={isDeleting}
        />
      </div>
    </section>
  );
};
