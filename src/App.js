import Gallery from './Components/Gallery';
import Header from './Components/Header';
import './Styles/App.css';

function App() {
  return ( 
    <div className="App flex justify-center" data-testid="app">
        <main className="w-full max-w-screen-xl mx-6">
          <Header/>
          <Gallery />
        </main>
    </div>
  );
}

export default App;
