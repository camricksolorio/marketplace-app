import logo from './logo.svg';
import './App.css';
import UploadForm from './UploadForm';
import ItemList from './ItemList';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit hellooo <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <UploadForm />
        <ItemList />
      </header>
    </div>
  );
}

export default App;
