import { Mail } from 'lucide-react';
import React from 'react';
import { Alert, AlertDescription, AlertTitle } from '../components/ui/alert';
import { Button } from '../components/ui/button'; // Correct named import

const RenewalAlert = ({ onRenew, onDecline, type }) => (
  <Alert className="relative">
    <Mail className="h-4 w-4" />
    <AlertTitle>Newsletter Subscription Renewal</AlertTitle>
    <AlertDescription className="mt-2">
      <div className="mb-4">
        {type === 'first'
          ? 'Your newsletter subscription is about to expire. Would you like to renew?'
          : 'Final reminder: Don\'t miss out on our newsletter. Renew now!'}
      </div>
      <div className="flex gap-4">
        <Button onClick={onRenew} className="bg-green-600 hover:bg-green-700">
          Renew Now
        </Button>
        <Button variant="outline" onClick={onDecline}>
          Maybe Later
        </Button>
      </div>
    </AlertDescription>
  </Alert>
);

export default RenewalAlert;
