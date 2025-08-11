import './App.css';
import { ErrorBoundary } from './servises/ErrorBoundary';

function App() {
  return (
    <ErrorBoundary>
      <div className="App">
        <h1>Welcome to the App</h1>
        {/* Other components can be added here */}
      </div>
    </ErrorBoundary>
  );
}

export default App;
