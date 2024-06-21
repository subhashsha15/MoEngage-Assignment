import { Outlet, Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from "react-router-dom";
import { Provider } from 'react-redux';
import store from './Redux/Store.js';
import LoginPage from './pages/loginpage/LoginPage';
import SignupPage from './pages/signuppage/SignupPage';
import SearchPage from './pages/searchpage/SearchPage';
import BreweryPage from './pages/brewerypage/BreweryPage';

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<LoginPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/search" element={<SearchPage />} />
      <Route path="/brewery/:id" element={<BreweryPage />} />
    </>
  )
);

function App() {
  return (
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  );
}

export default App;
