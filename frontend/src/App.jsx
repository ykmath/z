import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import {useState, useEffect} from 'react';

import Home from './pages/Home';
import Container from './components/Container';
import PostInfo from './pages/PostInfo';
import Login from './pages/Login';
import Layout from './components/layout/Layout';
import NewPost from './pages/NewPost';

import './App.css'

function App() {
  const [user, setUser] = useState(null);

  const location = window.location.hostname;

  function logUser(name) {
    setUser(name);
    sessionStorage.setItem("nome", name);
    fetch(`http://${location}:3050/api/user/${name}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      }
    })
  }

  useEffect(() => {
    const logged = sessionStorage.getItem("nome");

    if (logged) {
      setUser(logged);
    }
  }, [])

  return (
    <Router>
      
      <Container>
        <Routes>
          <Route path="/login" element={<Login logUser={logUser} />} />
          <Route element={<Layout user={user} />}>
            <Route path="/" element={<Home />} />
            <Route path="/post/:id" element={<PostInfo self={user} />} />
            <Route path="/newpost" element={<NewPost user={user} />} />
          </Route>
        </Routes>
      </Container>
    </Router>
  )
}

export default App
