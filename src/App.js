import Gallery from 'Features/Gallery';
import { MEDIA_FILES } from 'Services/Constants';
import './App.css';

function App() {
  return (
    <div className="App">
      <Gallery
        data={MEDIA_FILES}
        visibleItems={2}
        auto={true}
      />
    </div>
  );
};

export default App;
