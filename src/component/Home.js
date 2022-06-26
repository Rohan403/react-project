import axios from 'axios';
import React, { useState, useEffect } from 'react'
import { Link, useNavigate, Outlet } from 'react-router-dom';
import * as Icons from 'react-icons/fa';
let index = 0;
let common = 0;
let postIndex = 0;
const Home = () => {
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
    // const navigate = useNavigate()
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
        event.preventDefault()
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
    return (
        <>
            <Link to="/AddForm" className=" decoration-sky-500 text-blue-500 font-bold ... text-6xl float-right mt-5"><Icons.FaPlusCircle /></Link>
            <p className='px-9 -mt-3  text-2xl  underline decoration-sky-500'>Home</p>
            <center><input type="text" placeholder="Search Here..." class="shadow appearance-none border rounded w-50 py-2  text-gray-700 leading-tight focus:outline-none focus:shadow-outline mt-5"
                value={search}
                onChange={mySearch} /></center>
            {showImgModal ? (
                <>
                    <div className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                        <div className="relative w-auto my-6 mx-auto max-w-3xl">
                            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                                <button
                                    className="bg-transparent border-0 text-black float-right"
                                    onClick={() => setImgModal(false)}
                                >
                                    <span className="text-black opacity-7 h-6 w-6 text-xl block bg-gray-400 py-0 rounded-full" onClick={() => setImgModal(false)}>
                                        x
                                    </span>
                                </button>
                                <div className="relative p-6 flex-auto">
                                    <img src={allData[index ++].url} class="object-cover w-full h-96 rounded-t-lg md:h-auto md:w-48 md:rounded-none md:rounded-l-lg" />
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            ) : null}

            <div class="p-10 grid grid-cols-3 sm:grid-cols-3 md:grid-cols-6 xl:grid-cols-3 grid justify-items-center ...">
                {showData.map((val, id, body) => (

                    <div class="max-w-sm rounded overflow-hidden shadow-lg bg-white-400 mt-4"  >
                        <div class="py-2">
                            <p class="text-gray-700 text-base " >
                                <img
                                    onClick={() => setImgModal(true)}
                                    className="modal-body relative p-4" class="w-12 h-12" data-bs-toggle="modal" data-bs-target="#exampleModal"
                                    src={val.thumbnailUrl}
                                />
                                <b>Name:</b>{val.name}<br />
                                <b>email:</b>{val.email}<br />
                                <b>website:</b>{val.website}<br />
                                <b>City:</b>{val.address.city}<br />
                                <b>Street:</b>{val.address.street}<br />
                                <b>ZipCode:</b>{val.address.zipcode}<br />
                            </p>
                        </div>
                        <div class="px-6 pt-4 pb-2">
                            <button className=" bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-1 border-b-4 border-blue-700 hover:border-blue-500 rounded"><Link to="/AddForm" onClick={() => cardEdit(id)} >Edit</Link></button>&nbsp;&nbsp;
                            <button class="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-1 border-b-4 border-blue-700 hover:border-blue-500 rounded" onClick={() => cardDelete(id)} >Delete</button>&nbsp;&nbsp;
                            <button className=" bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-1 border-b-4 border-blue-700 hover:border-blue-500 rounded"><Link to="./About" >Viewpost</Link></button>
                            {/* <button className=" bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-1 border-b-4 border-blue-700 hover:border-blue-500 rounded" onClick={() => navigate('About')}>Viewpost</button> */}
                        </div>
                    </div>

                ))}
            </div>
            <Outlet />
        </>
    );

}
export default Home;