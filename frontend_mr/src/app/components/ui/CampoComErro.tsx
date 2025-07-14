import React from 'react';

interface CampoComErroProps {
  children: React.ReactNode;
  error?: string;
}

export const CampoComErro: React.FC<CampoComErroProps> = ({ children, error }) => (
  <div className="mb-4">
    {children}
    {error && (
      <div className="flex items-center gap-2 mt-2 text-red-600 text-sm">
        <span>⚠️</span>
        {error}
      </div>
    )}
  </div>
);