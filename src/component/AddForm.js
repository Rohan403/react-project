import axios from 'axios';
import React, { useState, useEffect } from 'react';
let index = 0;
let common = 0;
let postIndex = 0;
const Add = () => {
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
    const [pId,setpostId] = useState("");
    const [pTitle, setPTitle] = useState("");
    const [pBody, setPBody] = useState("");
    const [createPModal, setCreatePModal] = useState(["common", "closeBlock"]);
    const [show, setShow] = useState(false);
    const [search, setSearch] = useState("");
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [isOpen, setIsOpen] = useState(true)
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
      //fetch data from api
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
        cleaInput();
        const temp = [...allData];
        temp.push(userdata);
        setAllData(temp);
        setShowData(temp);
        localStorage.setItem("value", JSON.stringify(temp));
      }
      //card delete
      function cardDelete(id) {
        let item = [...allData];
        item.splice(id, 1);
        setAllData(item);
        setShowData(item);
        localStorage.setItem("value", JSON.stringify(item));
      }
      //Edit and Update card value
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
      const sharePost = () => {
        console.log("share post");
        let obj = {
          title: pTitle,
          body: pBody,
        };
        allData[common].post.splice(0, 0, obj);
        localStorage.setItem("value", JSON.stringify(allData));
        let temp = [...createPModal];
        temp.splice(1, 1, "closeBlock");
        setCreatePModal(temp);
    
      };
      const createPost = () => {
        let obj = {
          id: parseInt(pId),
          title: pTitle,
          body:pBody,
        };
        allData[common].post.splice(0,0,obj);
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
      const editPost = (i) => {
        postIndex = i;
        let temp = [...postEditModal];
        // let temp = [...allData];
        temp.splice(1, 1, "openBlock");
        setPostEditModal(temp);
        //setPostEditModal('common')
        setPTitle(allData[common].post[i].title);
        setPBody(allData[common].post[i].body);
        console.log('edited')
        localStorage.setItem("value", JSON.stringify(allData));
      };
      return (
        <>
           <p className='px-12 -mt-3  text-2xl  underline decoration-sky-500'>Add User</p>
            <div class="bg-indigo shadow-md rounded px-8 pt-6 pb-8 mb-4">
              <div class="relative mt-4 text-left">
                <div class="h-2  rounded-t-md"></div>
                <div class="py-6 px-8"><br/>
                  <label>Name:-</label>
                  <input type="text" placeholder="Enter your name" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    value={name}
                    onChange={(e) => setName(e.target.value)} />
                  <label>Website:-</label>
                  <input type="text" placeholder="Enter your website" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    value={website}
                    onChange={(e) => setWebsite(e.target.value)} />
                  <label>Email:-</label>
                  <input type="text" placeholder="Enter your email" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)} />
                  <label>City:-</label>
                  <input type="text" placeholder="Enter your city" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    value={city}
                    onChange={(e) => setCity(e.target.value)} />
                  <label>Street:-</label>
                  <input type="text" placeholder="Enter street" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    value={street}
                    onChange={(e) => setStreet(e.target.value)} />
                  <label>ZipCode:-</label>
                  <input type="text" placeholder="Enter zipcode" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    value={zipcode}
                    onChange={(e) => setZipcode(e.target.value)} />
                  <button class="inline-flex items-center py-2 px-4 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={() => addCard()}>Add</button>&nbsp;&nbsp;&nbsp;
                  <button class="inline-flex items-center py-2 px-4 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={() => updateCard()}>Update</button>
    
                </div>
              </div>
            </div>
            </>
        );
        }
export default Add;