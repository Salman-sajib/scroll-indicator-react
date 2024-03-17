import './App.css';
import ScrollIndicator from './components/ScrollIndicator';

function App() {
  return (
    <div>
      <ScrollIndicator url={`https://dummyjson.com/products?limit=100`} />
    </div>
  );
}

export default App;
