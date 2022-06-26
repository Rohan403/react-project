import Home from './component/Home';
import About from "./component/About";
import Search from "./component/Search";
import AddForm from './component/AddForm'
import { Route, Link, Routes, Outlet, NavLink } from 'react-router-dom';
import * as Icons from 'react-icons/fa';

const App = () => {
  return (
    <>
      <nav class="flex items-center fixed w-full justify-between flex-wrap bg-cyan-500 p-6">
        <div class="flex items-center flex-shrink-0 text-white mr-6">
          <span class="font-semibold text-xl tracking-tight">Trainee NTT</span>
        </div>
        <div class="block lg:hidden">
          <button class="flex items-center px-3 py-2 border rounded text-teal-200 border-teal-400 hover:text-white hover:border-white">
            <svg class="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Menu</title><path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" /></svg>
          </button>
        </div>
      </nav><br /><br /><br /><br /><br />
      <div class="space-x-4">
        <Routes>
          {/* <Route  path="/search" element={<Search />} > 
            <Route index element={<Home />} />
            <Route path="About" element={<About />} />
          </Route> */}
          <Route path='/search' element={<Search />} >
            <Route index element={<Home />} />
            <Route path="About" element={<About />} />
          </Route>
          <Route path="AddForm" element={<AddForm />} />
        </Routes>
        <NavLink to="/search" className=" fixed right-5 top-5 float-right text-4xl bg-blue-200  w-5-full" style={({ isActive }) =>
          ({ color: isActive ? 'black' : console.log('is active', isActive) })
        }><Icons.FaArrowLeft /></NavLink>
        <Outlet />
      </div>
      <div className="top-20 left-0 fixed bg-white-500 w-16 h-full"><br />
        {/* <button className="text-2xl px-2 bg-slate-300 w-12  h-12 transform motion-safe:hover:-translate-y-1 motion-safe:hover:scale-110 transition ease-in-out duration-300">

          <NavLink defaultChecked to={"/search"} style={({ isActive }) =>

            ({ color: isActive ? 'green' : console.log('is active', isActive) })
          }><Icons.FaSearch /></NavLink>

        </button><br /><br /> */}
        <button className="text-2xl px-2 bg-slate-300 w-12  h-12 transform motion-safe:hover:-translate-y-1 motion-safe:hover:scale-110 transition ease-in-out duration-300">

          <NavLink defaultChecked to={"/search"} style={({ isActive }) =>

            ({ color: isActive ? 'green' : console.log('is active', isActive) })
          }><Icons.FaSearch /></NavLink>

        </button><br /><br />
        <button className="text-2xl px-2 bg-slate-300 w-12  h-12 transform motion-safe:hover:-translate-y-1 motion-safe:hover:scale-110 transition ease-in-out duration-300">
          <NavLink to={"/AddForm"} style={({ isActive }) =>
            ({ color: isActive ? 'green' : console.log('upload', isActive) })
          }><Icons.FaCloudUploadAlt /></NavLink>
        </button>
      </div>
    </>
  )
}
export default App;