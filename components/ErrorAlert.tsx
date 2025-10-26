import React from 'react';
import { AlertTriangle } from './Icons';

interface ErrorAlertProps {
  message: string;
}

export const ErrorAlert: React.FC<ErrorAlertProps> = ({ message }) => {
  return (
    <div className="w-full max-w-4xl flex items-center gap-4 p-4 bg-red-900/50 border border-red-700 text-red-300 rounded-lg shadow-md">
      <AlertTriangle className="w-6 h-6 flex-shrink-0" />
      <div>
        <h4 className="font-bold">Error</h4>
        <p className="text-sm">{message}</p>
      </div>
    </div>
  );
};