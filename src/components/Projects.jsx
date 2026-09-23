import React, { useState, useEffect } from 'react';
import { Plus, Github, ExternalLink, Edit3, Trash2, FolderGit2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { fetchProjects, createProject, updateProject, deleteProject } from '../services/api';
import { ProjectModal } from './modals/ProjectModal';
import { ConfirmDeleteModal } from './modals/ConfirmDeleteModal';
import { CardSkeleton } from './ui/Skeleton';

export const Projects = ({ addToast }) => {
  const { requireAuth } = useAuth();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [authToken, setAuthToken] = useState(null);

  // Delete modal state
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [projectToDelete, setProjectToDelete] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const loadProjects = async () => {
    try {
      setLoading(true);
      const res = await fetchProjects();
      if (res.success) {
        setProjects(res.data);
      }
    } catch (err) {
      addToast('Unable to load projects from server.', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProjects();
  }, []);

  const handleAddClick = () => {
    requireAuth((token) => {
      setAuthToken(token);
      setEditingProject(null);
      setModalOpen(true);
    });
  };

  const handleEditClick = (project) => {
    requireAuth((token) => {
      setAuthToken(token);
      setEditingProject(project);
      setModalOpen(true);
    });
  };

  const handleDeleteClick = (project) => {
    setProjectToDelete(project);
    setDeleteModalOpen(true);
  };

  const handleFormSubmit = async (formData) => {
    const executeSave = async (token) => {
      setIsSubmitting(true);
      try {
        if (editingProject) {
          const res = await updateProject(editingProject._id, formData, token);
          if (res.success) {
            addToast('Project updated successfully!', 'success');
            setModalOpen(false);
            setEditingProject(null);
            setAuthToken(null);
            loadProjects();
          }
        } else {
          const res = await createProject(formData, token);
          if (res.success) {
            addToast('Project added successfully!', 'success');
            setModalOpen(false);
            setAuthToken(null);
            loadProjects();
          }
        }
      } catch (err) {
        addToast(err.message || 'Unable to save project.', 'error');
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
    if (!projectToDelete) return;
    requireAuth(async (token) => {
      setIsDeleting(true);
      try {
        const res = await deleteProject(projectToDelete._id, token);
        if (res.success) {
          addToast('Project deleted successfully.', 'success');
          setDeleteModalOpen(false);
          setProjectToDelete(null);
          loadProjects();
        }
      } catch (err) {
        addToast(err.message || 'Unable to delete project.', 'error');
      } finally {
        setIsDeleting(false);
      }
    });
  };

  return (
    <section id="projects" className="section" style={{ background: 'var(--bg-secondary)' }}>
      <div className="container">
        <div className="section-header">
          <div className="section-title-wrap">
            <div>
              <span className="section-tag">Featured Work</span>
              <h2 className="section-title">Projects</h2>
            </div>
            <button
              onClick={handleAddClick}
              className="section-btn-add"
              title="Add New Project"
              aria-label="Add New Project"
            >
              <Plus size={20} />
            </button>
          </div>
        </div>

        {loading ? (
          <div className="projects-grid">
            <CardSkeleton />
            <CardSkeleton />
          </div>
        ) : projects.length === 0 ? (
          <div className="empty-state">
            <FolderGit2 size={44} style={{ marginBottom: '1rem', color: 'var(--text-muted)' }} />
            <h3>No projects added yet.</h3>
            <p style={{ marginTop: '0.5rem', fontSize: '0.9rem' }}>
              Click the <Plus size={14} style={{ display: 'inline' }} /> button above to add your first project.
            </p>
          </div>
        ) : (
          <div className="projects-grid">
            {projects.map((project) => (
              <div key={project._id} className="project-card">
                <div>
                  <div className="project-header">
                    <h3 className="project-title">{project.projectName}</h3>
                    {project.projectYear && (
                      <span className="project-year">{project.projectYear}</span>
                    )}
                  </div>

                  <p className="project-desc">{project.shortDescription}</p>

                  {/* Key Features Block (Only if features exist) */}
                  {Array.isArray(project.keyFeatures) && project.keyFeatures.length > 0 && (
                    <div className="project-features-block">
                      <div className="features-heading">Key Features</div>
                      <ul className="features-list">
                        {project.keyFeatures.map((feat, idx) => (
                          <li key={idx} className="feature-item">
                            <span>{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Tech Stack Tags */}
                  <div className="project-techs">
                    {Array.isArray(project.techStack) &&
                      project.techStack.map((tech, idx) => (
                        <span key={idx} className="tech-tag">
                          {tech}
                        </span>
                      ))}
                  </div>
                </div>

                <div className="project-footer">
                  <div className="project-links">
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="project-link-btn"
                        title="View Source on GitHub"
                      >
                        <Github size={14} />
                        <span>GitHub</span>
                        <ExternalLink size={12} />
                      </a>
                    )}
                    {project.liveWebsiteUrl && (
                      <a
                        href={project.liveWebsiteUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="project-link-btn"
                        title="Open Live Website"
                      >
                        <span>Live Website</span>
                        <ExternalLink size={12} />
                      </a>
                    )}
                  </div>

                  <div className="item-admin-actions">
                    <button
                      onClick={() => handleEditClick(project)}
                      className="admin-icon-btn"
                      title="Edit Project"
                      aria-label="Edit Project"
                    >
                      <Edit3 size={14} />
                    </button>
                    <button
                      onClick={() => handleDeleteClick(project)}
                      className="admin-icon-btn btn-delete"
                      title="Delete Project"
                      aria-label="Delete Project"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Project Form Modal */}
        <ProjectModal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          onSubmit={handleFormSubmit}
          initialData={editingProject}
          isSubmitting={isSubmitting}
        />

        {/* Delete Confirmation Modal */}
        <ConfirmDeleteModal
          isOpen={deleteModalOpen}
          onClose={() => setDeleteModalOpen(false)}
          onConfirm={handleConfirmDelete}
          itemName={projectToDelete?.projectName}
          isDeleting={isDeleting}
        />
      </div>
    </section>
  );
};
