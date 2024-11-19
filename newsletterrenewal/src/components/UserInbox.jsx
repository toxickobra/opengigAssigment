import React from 'react';
import RenewalAlert from './RenewalAlert';
import { Alert, AlertDescription, AlertTitle } from './ui/alert';

const UserInbox = ({
  userEmails,
  showRenewalPrompt,
  handleRenewal,
  handleDecline,
  renewalAttempt,
  waitingForAutoCheck,
}) => (
  <div className="space-y-4">
    {/* Email List */}
    <div className="bg-gray-50 rounded-lg p-4 h-48 overflow-y-auto mb-4">
      {userEmails.map((email) => (
        <div
          key={email.id}
          className="p-3 bg-white rounded-lg mb-2 shadow-sm"
        >
          <div className="flex items-center justify-between">
            <span className="font-medium">
              Newsletter Renewal{' '}
              {email.type === 'first' ? 'Reminder' : 'Final Notice'}
            </span>
            <span className="text-sm text-gray-500">{email.timestamp}</span>
          </div>
        </div>
      ))}
    </div>

    {/* Renewal Prompt */}
    {showRenewalPrompt && (
      <RenewalAlert
        onRenew={handleRenewal}
        onDecline={handleDecline}
        type={renewalAttempt === 0 ? 'first' : 'second'}
      />
    )}

    {/* Auto-check Indicator */}
    {waitingForAutoCheck && (
      <Alert>
        
        <AlertTitle>Automatic Check in Progress</AlertTitle>
        <AlertDescription>
          System will automatically check renewal status after the waiting
          period.
        </AlertDescription>
      </Alert>
    )}
  </div>
);

export default UserInbox;
