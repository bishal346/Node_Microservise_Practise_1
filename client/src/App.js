import logo from './logo.svg';
import './App.css';
import Posts from './Posts';
import PostsDisplay from './PostsDisplay';

function App() {
  return (
    <div className="App">
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
      <h1>Post App</h1>
      <Posts/>
      <PostsDisplay/>
    </div>
  );
}

export default App;
