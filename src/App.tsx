import './App.css';
import { Route, Routes } from 'react-router-dom';
import ListPage from './pages/ListPage';
import DetailPage from './pages/DetailPage';
function App() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<ListPage />} />
        <Route path='/detail' element={<DetailPage />} />
      </Routes>
    </div>
  );
}

export default App;
