import React from 'react';

export const CardSkeleton = () => {
  return (
    <div className="project-card" style={{ opacity: 0.7 }}>
      <div className="skeleton" style={{ height: '24px', width: '40%', marginBottom: '1rem' }} />
      <div className="skeleton" style={{ height: '32px', width: '85%', marginBottom: '1rem' }} />
      <div className="skeleton" style={{ height: '60px', width: '100%', marginBottom: '1.5rem' }} />
      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem' }}>
        <div className="skeleton" style={{ height: '26px', width: '70px' }} />
        <div className="skeleton" style={{ height: '26px', width: '80px' }} />
        <div className="skeleton" style={{ height: '26px', width: '60px' }} />
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 'auto', paddingTop: '1rem' }}>
        <div className="skeleton" style={{ height: '32px', width: '90px' }} />
        <div className="skeleton" style={{ height: '32px', width: '110px' }} />
      </div>
    </div>
  );
};
