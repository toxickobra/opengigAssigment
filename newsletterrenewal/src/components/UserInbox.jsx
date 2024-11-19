import React from 'react';
import RenewalAlert from './RenewalAlert';
import { Alert, AlertDescription, AlertTitle } from './ui/alert';

const UserInbox = ({
  showRenewalPrompt,
  handleRenewal,
  handleDecline,
  renewalAttempt,
  waitingForAutoCheck,
}) => (
  <div className="space-y-4">
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
