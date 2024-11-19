import React from 'react';

const LogViewer = ({ logs }) => {
  return (
    <div className="bg-gray-50 rounded-lg p-4 h-48 overflow-y-auto">
      {logs.length > 0 ? (
        logs.map((log, index) => (
          <div key={index} className="text-sm mb-1">
            <span className="text-gray-500">[{log.timestamp}]</span>{' '}
            {log.message}
          </div>
        ))
      ) : (
        <div className="text-gray-400 text-sm">No logs available</div>
      )}
    </div>
  );
};

export default LogViewer;
