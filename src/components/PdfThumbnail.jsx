import React, { useState, useEffect } from 'react';
import * as pdfjsLib from 'pdfjs-dist';
import pdfWorker from 'pdfjs-dist/build/pdf.worker.min.mjs?url';
import { FileText } from 'lucide-react';

// Configure the worker to use the local bundled worker
pdfjsLib.GlobalWorkerOptions.workerSrc = pdfWorker;

export const PdfThumbnail = ({ pdfUrl, alt, className }) => {
  const [thumbUrl, setThumbUrl] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    let isMounted = true;
    if (!pdfUrl) {
      setError(true);
      setLoading(false);
      return;
    }

    const loadPdfThumb = async () => {
      try {
        setLoading(true);
        setError(false);
        
        const loadingTask = pdfjsLib.getDocument({
          url: pdfUrl,
          cMapUrl: 'https://unpkg.com/pdfjs-dist@' + pdfjsLib.version + '/cmaps/',
          cMapPacked: true,
        });
        
        const pdf = await loadingTask.promise;
        const page = await pdf.getPage(1);

        // Scale to 2.0 for high resolution thumbnail
        const unscaledViewport = page.getViewport({ scale: 1 });
        const scale = Math.max(1.5, 600 / unscaledViewport.width);
        const viewport = page.getViewport({ scale });

        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        canvas.height = viewport.height;
        canvas.width = viewport.width;

        const renderContext = {
          canvasContext: context,
          viewport: viewport,
        };

        await page.render(renderContext).promise;

        if (isMounted) {
          const dataUrl = canvas.toDataURL('image/png');
          setThumbUrl(dataUrl);
          setLoading(false);
        }
      } catch (err) {
        console.error('Error rendering PDF thumbnail:', err);
        if (isMounted) {
          setError(true);
          setLoading(false);
        }
      }
    };

    loadPdfThumb();

    return () => {
      isMounted = false;
    };
  }, [pdfUrl]);

  if (loading) {
    return (
      <div className="certificate-fallback-box" style={{ opacity: 0.6 }}>
        <FileText size={36} color="var(--accent-primary)" />
        <span style={{ fontSize: '0.8rem' }}>Loading preview...</span>
      </div>
    );
  }

  if (error || !thumbUrl) {
    return (
      <div className="certificate-fallback-box">
        <FileText size={48} color="var(--accent-primary)" />
        <span style={{ fontSize: '0.85rem' }}>PDF Certificate</span>
      </div>
    );
  }

  return (
    <img
      src={thumbUrl}
      alt={alt || 'Certificate preview'}
      className={className || 'certificate-preview-img'}
      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
    />
  );
};
