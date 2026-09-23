import React, { useState, useEffect } from 'react';
import { X, FolderGit2, Loader2 } from 'lucide-react';

export const ProjectModal = ({ isOpen, onClose, onSubmit, initialData = null, isSubmitting = false }) => {
  const [formData, setFormData] = useState({
    projectName: '',
    shortDescription: '',
    techStack: '',
    keyFeatures: '',
    projectYear: '',
    githubUrl: '',
    liveWebsiteUrl: ''
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        projectName: initialData.projectName || '',
        shortDescription: initialData.shortDescription || '',
        techStack: Array.isArray(initialData.techStack) ? initialData.techStack.join(', ') : (initialData.techStack || ''),
        keyFeatures: Array.isArray(initialData.keyFeatures) ? initialData.keyFeatures.join('\n') : (initialData.keyFeatures || ''),
        projectYear: initialData.projectYear || '',
        githubUrl: initialData.githubUrl || '',
        liveWebsiteUrl: initialData.liveWebsiteUrl || ''
      });
    } else {
      setFormData({
        projectName: '',
        shortDescription: '',
        techStack: '',
        keyFeatures: '',
        projectYear: new Date().getFullYear().toString(),
        githubUrl: '',
        liveWebsiteUrl: ''
      });
    }
  }, [initialData, isOpen]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.projectName.trim() || !formData.shortDescription.trim() || !formData.techStack.trim()) {
      return;
    }

    const payload = {
      ...formData,
      techStack: formData.techStack.split(',').map((t) => t.trim()).filter(Boolean),
      keyFeatures: formData.keyFeatures.split('\n').map((f) => f.trim()).filter(Boolean)
    };

    onSubmit(payload);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3 className="modal-title">
            <FolderGit2 size={20} color="var(--accent-primary)" />
            {initialData ? 'Edit Project' : 'Add New Project'}
          </h3>
          <button className="modal-close-btn" onClick={onClose} aria-label="Close modal">
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="modal-body">
            <div className="form-group">
              <label className="form-label" htmlFor="projectName">
                Project Name <span style={{ color: '#ef4444' }}>*</span>
              </label>
              <input
                id="projectName"
                name="projectName"
                type="text"
                className="form-control"
                placeholder="e.g. Food Munch – Responsive Food Ordering Website"
                value={formData.projectName}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="shortDescription">
                Short Description <span style={{ color: '#ef4444' }}>*</span>
              </label>
              <textarea
                id="shortDescription"
                name="shortDescription"
                className="form-control"
                placeholder="Briefly describe the project purpose, architecture, and what it does..."
                value={formData.shortDescription}
                onChange={handleChange}
                required
                rows={3}
              />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="techStack">
                Technologies / Tech Stack <span style={{ color: '#ef4444' }}>*</span>
                <span className="form-label-optional">(comma separated)</span>
              </label>
              <input
                id="techStack"
                name="techStack"
                type="text"
                className="form-control"
                placeholder="e.g. React.js, Node.js, Express.js, MongoDB"
                value={formData.techStack}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="keyFeatures">
                Key Features <span className="form-label-optional">(Optional, one per line)</span>
              </label>
              <textarea
                id="keyFeatures"
                name="keyFeatures"
                className="form-control"
                placeholder="Feature 1&#10;Feature 2&#10;Feature 3"
                value={formData.keyFeatures}
                onChange={handleChange}
                rows={3}
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div className="form-group">
                <label className="form-label" htmlFor="projectYear">
                  Project Year <span className="form-label-optional">(Optional)</span>
                </label>
                <input
                  id="projectYear"
                  name="projectYear"
                  type="text"
                  className="form-control"
                  placeholder="e.g. 2024"
                  value={formData.projectYear}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="githubUrl">
                  GitHub URL <span className="form-label-optional">(Optional)</span>
                </label>
                <input
                  id="githubUrl"
                  name="githubUrl"
                  type="url"
                  className="form-control"
                  placeholder="https://github.com/..."
                  value={formData.githubUrl}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="liveWebsiteUrl">
                Live Website URL <span className="form-label-optional">(Optional)</span>
              </label>
              <input
                id="liveWebsiteUrl"
                name="liveWebsiteUrl"
                type="url"
                className="form-control"
                placeholder="https://..."
                value={formData.liveWebsiteUrl}
                onChange={handleChange}
              />
            </div>
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
                initialData ? 'Save Changes' : 'Add Project'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
