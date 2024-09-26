import './assets/scss/global.scss';

import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import { Home } from './pages/Home';
import { Main } from './pages/Main';
import { About } from 'pages/About';
import { Signup } from './pages/Signup';
import { getLoggedinUser } from './store/actions/userActions';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import PrivateRoute from './components/PrivateRoute';

const App: React.FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getLoggedinUser());
  }, [dispatch]);

  return (
    <Router>
      <div className="app">
        <main>
          <Routes>
            <Route path="/main" element={<PrivateRoute component={Main} />} />
            <Route path="/about" element={<About />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/" element={<Home />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
