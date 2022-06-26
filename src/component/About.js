import axios from 'axios';
import React, { useState, useEffect } from 'react'
import { EditText, EditTextarea } from 'react-edit-text';
import 'react-edit-text/dist/index.css';
import { Dialog, Transition } from '@headlessui/react'
import { Fragment } from 'react'
import { Link } from 'react-router-dom';
import * as Icons from 'react-icons/fa';
let index = 0;
let common = 0;
let postIndex = 0;

const About = () => {
  const [name, setName] = useState([]);
  const [website, setWebsite] = useState([]);
  const [email, setEmail] = useState([]);
  const [city, setCity] = useState([]);
  const [street, setStreet] = useState([]);
  const [zipcode, setZipcode] = useState([]);
  const [user, setUser] = useState([]);
  const [post, setPost] = useState([]);
  const [photo, setPhoto] = useState([]);
  const [allData, setAllData] = useState([]);
  const [showImgModal, setImgModal] = useState(false);
  const [imgId, setimgId] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showData, setShowData] = useState([]);
  const [styleModal, setStyleModal] = useState(["common", "closeBlock"]);
  const [postModal, setPostModal] = useState(["common", "closeBlock"]);
  const [postEditModal, setPostEditModal] = useState(["common", "closeBlock"]);
  const [pId, setpostId] = useState("");
  const [pTitle, setPTitle] = useState("");
  const [pBody, setPBody] = useState("");
  const [createPModal, setCreatePModal] = useState(["common", "closeBlock"]);
  const [show, setShow] = useState(false);
  const [search, setSearch] = useState("");
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [isOpen, setIsOpen] = useState(true)
  function closeModal() {
    setIsOpen(false)
  }

  function openModal() {
    setIsOpen(true)
  }
  function manage(user1, photos1, post1) {
    console.log(user1, photos1, post1, "all");
    let arr = [];
    user1.map((val, i) => {
      let l = post1.filter((val1, i) => val.id === val1.userId);
      let users = {
        id: i + 1,
        thumbnailUrl: photos1[val.id].thumbnailUrl,
        url: photos1[val.id].url,
        name: val.name,
        email: val.name,
        website: val.website,
        address: {
          city: val.address.city,
          street: val.address.street,
          zipcode: val.address.zipcode,
        },
        phone: val.phone,
        post: l,
      };
      arr.push(users);
    });
    setAllData(arr);
    setShowData(arr);
    setUser(user1);
    setPhoto(photos1);
    setPost(post1);
    localStorage.setItem("value", JSON.stringify(arr));
  }
  const myData = async () => {
    let user1 = await axios
      .get("https://jsonplaceholder.typicode.com/users")
      .then((response) => {
        return response.data;
      });
    let post1 = await axios
      .get("https://jsonplaceholder.typicode.com/posts")
      .then((response) => {
        return response.data;
      });
    let photos1 = await axios
      .get("https://jsonplaceholder.typicode.com/photos")
      .then((response) => {
        return response.data;
      });

    if (user1 && photos1 && post1) {
      manage(user1, photos1, post1);
    }
    setLoading(true);
  };
  useEffect(() => {
    let userdetails = localStorage.getItem("value");
    if (userdetails) {
      setAllData(JSON.parse(userdetails));
      setShowData(JSON.parse(userdetails));
      setLoading(true);
    } else {
      myData();
    }
  }, []);
  const cleaInput = () => {
    setName("");
    setEmail("");
    setStreet("");
    setZipcode("");
    setCity("");
    setWebsite("");
  };
  function addCard() {
    let len = allData.length;
    let userdata = {
      name: name,
      email: email,
      address: {
        city: city,
        street: street,
        zipcode: zipcode,
      },
      website: website,
      post: [],
    };
  }
  function cardDelete(id) {
    let item = [...allData];
    item.splice(id, 1);
    setAllData(item);
    setShowData(item);
    localStorage.setItem("value", JSON.stringify(item));
  }
  function cardEdit(id) {
    index = id;

    setName(allData[index].name);
    setEmail(allData[index].email);
    setStreet(allData[index].address.street);
    setCity(allData[index].address.city);
    setZipcode(allData[index].address.zipcode);
    setWebsite(allData[index].website);
  }
  const updateCard = () => {
    let cardobj = allData[index];
    cardobj.name = name;
    cardobj.email = email;
    cardobj.address.city = city;
    cardobj.address.street = street;
    cardobj.address.zipcode = zipcode;
    cardobj.website = website;

    localStorage.setItem("value", JSON.stringify(allData));
    window.location.reload(false)
    cleaInput();
  };
  const mySearch = (event) => {
    let data = event.target.value;
    setSearch(data);
    let item = [];
    allData.filter((val) => {
      if (val.name.toLowerCase().includes(data.toLowerCase())) {
        item = [...item, val];
      }
    });
    setShowData(item);
  };
  const createPost = () => {
    let obj = {
      id: parseInt(pId),
      title: pTitle,
      body: pBody,
    };
    allData[common].post.splice(0, 0, obj);
    localStorage.setItem("value", JSON.stringify(allData));
    let temp = [...createPModal];
    temp.splice(1, 1, "openBlock");
    setCreatePModal(temp);
    console.log(createPModal, "cpm");
    window.location.reload()
  };
  const deletePost = (i) => {
    let temp = [...allData];
    temp[common].post.splice(i, 1);
    console.log(allData[common].post, "allpost");
    setAllData(temp);
    localStorage.setItem("value", JSON.stringify(allData));
    window.location.reload()
  };
  const EditCard = () =>{

  }
  return (
    <>
      <p className='px-12 -mt-3  text-2xl  underline decoration-sky-500'>View Post</p>
      <Link to="/About" onClick={openModal} className=" decoration-sky-500 text-blue-500 font-bold ... text-6xl float-right  mt-11"><Icons.FaPlusCircle /></Link>
      <center><input type="text" placeholder="Search Here..." class="shadow appearance-none border rounded w-50 py-2  text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        value={search}
        onChange={mySearch} /></center>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto"
          onClose={closeModal}
        >
          <div className="min-h-screen px-4 text-center h-96 ...">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 bg-black opacity-90" />
            </Transition.Child>

            {/* This element is to trick the browser into centering the modal contents. */}
            <span
              className="inline-block h-screen align-middle"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900"
                >
                  <input type="text" placeholder="Enter any Id number" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    value={pId}
                    onChange={(e) => setpostId(e.target.value)} />
                  <input type="text" placeholder="Enter text" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    value={pTitle}
                    onChange={(e) => setPTitle(e.target.value)} />
                  <input type="text" placeholder="Enter body" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    value={pBody}
                    onChange={(e) => setPBody(e.target.value)} />
                </Dialog.Title>
                <div className="mt-4">
                  <button
                    type="button"
                    className="inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                    onClick={closeModal}
                  >
                    Close
                  </button>
                  <button onClick={createPost} className='inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500'>Add Something</button>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
      <div id="pModal" className={postModal.join(" ")}>
        {showData[common]?.post?.map((val, i) => (
          <div className="postContent" class="p-10 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 xl:grid-cols-3 ml-9">
            <div className="postData">
              <strong><label className="mr-2">ID:-</label></strong>
              <EditText defaultValue={val.id} inline readonly /><br />
              {localStorage.setItem("value", JSON.stringify(allData))}
              <strong><label className="mr-2">Title:-</label></strong>
              <EditText defaultValue={val.title} inline /><br />
              {localStorage.setItem("value", JSON.stringify(allData))}
              <strong><label className="mr-2">Body:-</label></strong>
              <EditTextarea defaultValue={val.body} rows={8} />
              {localStorage.setItem("value", JSON.stringify(allData))}
              <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" type="button" onClick={() => deletePost(i)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </>
  );

}
export default About;