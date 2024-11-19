# Subscription Renewal Flow Simulation

This project simulates a subscription renewal process using React. It includes a dynamic flow visualizer, a log viewer for real-time updates, and a user inbox for managing subscription reminders and responses.

## Features

* **Flow Simulation**: Simulates subscription renewal with step-by-step reminders.
* **Dynamic Logs**: Real-time log updates during the flow.
* **User Inbox**: Allows manual responses for renewal or decline prompts.
* **Interactive UI**: Intuitive and responsive design using Tailwind CSS.
* **Log Storage**: Logs are stored on the backend upon flow completion.

## Technologies Used

* **Frontend**: React, Axios, Tailwind CSS
* **Backend**: Node.js, Express (assumed for API support)
* **State Management**: React Hooks (`useState`, `useEffect`)

## Setup

### Prerequisites

Ensure you have the following installed:

* Node.js (v14 or higher)
* npm or Yarn
* A running backend server (e.g., `http://localhost:5000`)

### Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/your-username/subscription-renewal-flow.git
    cd subscription-renewal-flow
    ```

2. Install dependencies:

    ```bash
    npm install
    ```

3. Start the application:

    ```bash
    npm run dev
    ```

By default, the app will run at `http://localhost:3000`.

## File Structure

```plaintext
src/
├── components/
│   ├── FlowVisualization.js # Displays the current step in the flow
│   ├── LogViewer.js # Displays real-time logs
│   ├── UserInbox.js # Simulates user inbox for reminders
│   ├── RenewalAlert.js # Handles renewal prompts
│   └── ui/
│       ├── Button.js # Reusable button component
│       ├── Card.js # Reusable card component
│       └── Alert.js # Reusable alert component
├── App.js # Entry point for the app
├── FlowSimulation.js # Main component managing the flow
└── index.css # Tailwind CSS styles

