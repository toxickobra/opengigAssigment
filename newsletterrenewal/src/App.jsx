import React, { useEffect, useState } from 'react';
import FlowVisualization from './components/FlowVisualization';
import LogViewer from './components/LogViewer';
import { Button } from './components/ui/button';
import Card from './components/ui/card';
import UserInbox from './components/UserInbox';

const SIMULATION_STEP_TIME = 1000; // Reduced to 1 second per step (was 10 seconds)
const WAITING_TIME = 1000; // Reduced to 1 second for waiting after reminder

const FlowSimulation = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [logs, setLogs] = useState([]);
  const [flowComplete, setFlowComplete] = useState(false);
  const [renewed, setRenewed] = useState(false);  // Track renewal status
  const [showRenewalPrompt, setShowRenewalPrompt] = useState(false);
  const [renewalAttempt, setRenewalAttempt] = useState(0);
  const [userEmails, setUserEmails] = useState([]);
  const [waitingForAutoCheck, setWaitingForAutoCheck] = useState(false);
  const [timeoutId, setTimeoutId] = useState(null);

  const addLog = (message) => {
    setLogs(prev => [...prev, { timestamp: new Date().toLocaleTimeString(), message }]);
  };

  const addEmail = (type) => {
    setUserEmails(prev => [...prev, { id: Date.now(), type, timestamp: new Date().toLocaleTimeString() }]);
  };

  const handleRenewal = () => {
    if (timeoutId) {
      clearTimeout(timeoutId);
      setTimeoutId(null);
    }
    setShowRenewalPrompt(false);
    setRenewed(true); // Mark as renewed
    addLog("User manually renewed subscription!");
    
    // Log Thank You when renewal is successful
    addLog("Thank you for renewing!");

    // Instead of ending the flow, move to the next step
    if (currentStep === 0 || currentStep === 1) {
      setCurrentStep(2); // Move to second reminder step
    } else {
      setFlowComplete(true); // End the flow if needed
    }

    setWaitingForAutoCheck(false);
  };

  const handleDecline = () => {
    setShowRenewalPrompt(false);
    if (renewalAttempt === 0) {
      addLog("User declined first reminder");
      setCurrentStep(2);
    } else {
      addLog("User declined second reminder. Flow completed.");
      setFlowComplete(true);
    }
  };

  const startWaitingTimer = () => {
    setWaitingForAutoCheck(true);
    const newTimeoutId = setTimeout(() => {
      // Assume renewal is declined after waiting
      if (renewalAttempt === 0) {
        addLog("No response after first reminder, assuming decline.");
        setCurrentStep(2);
      } else {
        addLog("No response after second reminder, assuming decline. Flow completed.");
        setFlowComplete(true);
      }
      setWaitingForAutoCheck(false);
    }, WAITING_TIME); // Reduced waiting time
    setTimeoutId(newTimeoutId);
  };

  const resetFlow = () => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    setCurrentStep(0);
    setLogs([]);
    setFlowComplete(false);
    setRenewed(false); // Reset renewal status
    setIsRunning(false);
    setShowRenewalPrompt(false);
    setRenewalAttempt(0);
    setUserEmails([]);
    setWaitingForAutoCheck(false);
    setTimeoutId(null);
  };

  useEffect(() => {
    let timer;
    if (isRunning && !flowComplete) {
      timer = setTimeout(() => {
        switch (currentStep) {
          case 0: // Initial reminder
            addLog("Sending initial renewal reminder email...");
            addEmail('first');
            setShowRenewalPrompt(true);
            setRenewalAttempt(0);
            setCurrentStep(1);
            startWaitingTimer(); // Start the shorter waiting timer
            break;
          case 2: // Second reminder
            addLog("Sending second reminder email...");
            addEmail('second');
            setShowRenewalPrompt(true);
            setRenewalAttempt(1);
            setCurrentStep(3);
            startWaitingTimer(); // Start the shorter waiting timer
            break;
        }
      }, SIMULATION_STEP_TIME); // Reduced step time
    }

    return () => {
      clearTimeout(timer);
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [currentStep, isRunning, flowComplete]);

  return (
    <div>
      <Card>
        <Card.Header>
          <Card.Title>Subscription Renewal Flow</Card.Title>
        </Card.Header>
        <Card.Content>
          <FlowVisualization currentStep={currentStep} />
          <UserInbox
            userEmails={userEmails}
            showRenewalPrompt={showRenewalPrompt}
            handleRenewal={handleRenewal}
            handleDecline={handleDecline}
            renewalAttempt={renewalAttempt}
            waitingForAutoCheck={waitingForAutoCheck}
          />
          <LogViewer logs={logs} />
          <div className="mt-4 flex gap-4">
            <Button
              onClick={() => setIsRunning(!isRunning)}
              className={isRunning ? 'bg-red-600' : 'bg-blue-600'}
            >
              {renewed ? 'Stop Simulation' : isRunning ? 'Pause Simulation' : 'Start Simulation'}
            </Button>
            {flowComplete && (
              <Button variant="outline" onClick={resetFlow}>
                Reset
              </Button>
            )}
          </div>
        </Card.Content>
      </Card>
    </div>
  );
};

export default FlowSimulation;
