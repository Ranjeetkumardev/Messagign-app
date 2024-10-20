import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import { useDispatch } from 'react-redux';
import Register from './components/Register';
import Home from './components/Home';
import NotFound from './components/NotFound';
import Navbar from "./components/Navbar";
import Message from "./components/Message";
import Footer from "./components/Footer";
import Post from "./components/Post";
import { Toaster } from "sonner";
import PrivateRoute from "./components/PrivateRoute";
import EditProfile from "./components/EditProfile";
import CardDetail from "./components/CardDetail";
import { useGetAllUsersQuery, useGetUserByIdQuery } from "./features/apiSlice";
import Account from "./components/Acount";
 

function App() {
  return (
    <Router>
      <MainContent />
      <Toaster />
    </Router>
  );
}

const MainContent = () => {
  const location = useLocation();
  const isMessagesPage = location.pathname === '/messages';

  // Access userId from localStorage synchronously
  const userId = localStorage.getItem("userId");

  const { data: userData, isLoading, error } = useGetUserByIdQuery(userId, {
    skip: !userId,
  });
   const allUserData = ""
  const users = allUserData ? allUserData.users : [];
  console.log(allUserData);
  
  // if (isLoading) return <div>Loading...</div>;
  // if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar userData={userData} />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home users={users} />} />
          <Route path="/register" element={<Register />} />
          <Route path="/messages" element={<PrivateRoute element={<Message />} />} />
          <Route path="/editprofile" element={<PrivateRoute element={<EditProfile />} />} />
          <Route path="/account" element={<PrivateRoute element={<Account />} />} />
          <Route path="/post" element={<PrivateRoute element={<Post />} />} />
          <Route path="/user/:id" element={<CardDetail users={users} />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      {!isMessagesPage && <Footer />}
    </div>
  );
}

export default App;
