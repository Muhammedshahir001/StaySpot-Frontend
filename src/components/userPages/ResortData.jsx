import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "./Layout/Header";
import Footer from "./Layout/Footer";
import { useSelector } from "react-redux";
import { getresortdata, SendId } from "../../api/userApi";
import { FaBed, FaRupeeSign,} from "react-icons/fa";
import { TbBrandWhatsapp } from "react-icons/tb";
const ResortData = () => {
  const users = useSelector((state) => state.user);
  const [resortdata, setResortdata] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [rooms, setRooms] = useState(1); // Added rooms state
  const [price, setPrice] = useState(0); // Added price stat
  const [user, setUser] = useState(null);
  let { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    getResortData();
  }, []);

  console.log(resortdata, "resortdataaaaaaaaaaaaaaaa");

  const getResortData = async () => {
    try {
      let { data } = await getresortdata(id);

      setResortdata(data.oneresortdata);
      setPrice(data.oneresortdata.price);
      setUser(data.user);
    } catch (error) {
      console.log(error);
    }
  };

  const handleImageClick = (image, index) => {
    setSelectedImage(image);
    setSelectedImageIndex(index);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  const images = resortdata?.image?.map((image, index) => ({
    id: index + 1,
    src: image, // Update this line to use the image URL directly
    isLarge: index === 0,
  }));

  const decrement = () => {
    if (rooms > 1) {
      setRooms(rooms - 1);
      priceChang();
    }
  };

  const increment = () => {
    // console.log(resortdata.number_room,"count of room")
    console.log(rooms, "number of user entered count");
    if (rooms < resortdata.number_room) setRooms(rooms + 1);
    if (rooms <= resortdata.number_room - 1) priceChange();
  };

  const priceChange = () => {
    var updatedPrice = resortdata.price * (rooms + 1);
    console.log(updatedPrice, "updated price...");
    setPrice(updatedPrice);
  };
  const priceChang = () => {
    var updatedPrice = resortdata.price * (rooms - 1);
    console.log(updatedPrice);
    setPrice(updatedPrice);
  };

  const handleBookView = async (bookeddata) => {
    try {
      if (user) {
        navigate(`/viewbook/`, { state: { bookeddata, price, rooms } });
      } else {
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleSendIds = async (sender, reciever) => {
    console.log(sender, reciever, "ttttttt");
    const ids = await SendId(sender, reciever);
    navigate("/chat");
    console.log(ids);
  };

  const checkInDateFromStorage = localStorage.getItem("checkinDate");

  const checkOutDateFromStorage = localStorage.getItem("checkoutDate");
  console.log(checkInDateFromStorage, checkOutDateFromStorage, "ppppppp");

  return (
    <div className="mx-auto max-w-screen-2xl">
      <Header />

      <div className="container mx-auto min-h-screen mb-14 flex flex-col items-center p-5">
        <div className="max-w-[768px] mb-8 flex flex-col lg:flex-row">
          {images && images.length > 0 ? (
            <figure className="mx-auto mb-4 lg:mb-0 lg:mr-4">
              <img
                src={images[selectedImageIndex].src}
                alt={`${images[selectedImageIndex].id}`}
                className="mx-auto h-96 cursor-pointer"
                onClick={() =>
                  handleImageClick(
                    images[selectedImageIndex].src,
                    selectedImageIndex
                  )
                }
              />
            </figure>
          ) : null}

          <div className="grid grid-cols-2 lg:grid-cols-2 gap-4">
            {images &&
              images.length > 1 &&
              images.map((image, index) => (
                <figure
                  key={image.id}
                  onClick={() => handleImageClick(image.src, index)}
                >
                  <img
                    src={image.src}
                    alt={`Image ${image.id}`}
                    className={`cursor-pointer mx-auto h-28 ${
                      selectedImageIndex === index
                        ? "border border-blue-500"
                        : ""
                    }`}
                  />
                </figure>
              ))}
          </div>
        </div>
        <div className="max-w-[768px] mx-auto p-6 border border-gray-300">
          <h2 className="text-2xl font-semibold">{resortdata.resortname}</h2>
          <h3 className="text-lg mb-4">Address: {resortdata.address}</h3>
          <div className="text-justify font-normal">
            <h2 className="font-medium">Description</h2>
            {resortdata.description}
          </div>
          <br />
          <br />
          <div className="text-justify font-normal">
            <h2 className="font-extrabold">Services</h2>
            {resortdata.service ? resortdata.service : "No services available"}
          </div>
          <br />
          <div className="flex gap-x-6 font-bold">
            Total Rooms: <FaBed className="text-2xl" />
            <div>{resortdata.number_room}</div>
          </div>

          <br />
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-4 md:mb-0">
              <div className="font-bold">How many rooms do you need?</div>
              <div className="custom-number-input h-10 w-32">
                <label
                  for="custom-input-number"
                  className="w-full text-gray-700 text-sm font-semibold"
                ></label>
                <div className="flex flex-row h-10 w-full rounded-lg relative bg-transparent mt-1">
                  <button
                    data-action="decrement"
                    onClick={decrement}
                    className="bg-gray-300 text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full w-20 rounded-l cursor-pointer outline-none"
                  >
                    <span className="m-auto text-2xl font-thin">−</span>
                  </button>
                  <input
                    type="number"
                    className="outline-none focus:outline-none text-center w-full bg-gray-300 font-semibold text-md hover:text-black focus:text-black md:text-base cursor-default flex items-center text-gray-700 outline-none"
                    name="custom-input-number"
                    value={rooms}
                    readOnly
                  ></input>
                  <button
                    data-action="increment"
                    onClick={increment}
                    className="bg-gray-300 text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full w-20 rounded-r cursor-pointer"
                  >
                    <span className="m-auto text-2xl font-thin">+</span>
                  </button>
                </div>
              </div>
            </div>
            <div className="text-2xl font-semibold text-black flex items-center mt-4">
              <span>
                <FaRupeeSign className="inline" />
              </span>
              <span className="inline">{price}</span>
            </div>
          </div>
          <br />
          <button
            className="btn btn-primary bg-blue-500 text-black w-full"
            // disabled={resortdata.number_room === 0   }
            onClick={(e) => {
              handleBookView(resortdata, price);

              console.log(price, "full detials..");
            }}
          >
            Book Now
          </button>
        </div>
      </div>
      <Footer />
      {selectedImage && (
        <div
          className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50"
          onClick={closeModal}
        >
          <img src={selectedImage} alt="Selected" className="max-h-screen" />
        </div>
      )}

      <button
        onClick={() => {
          handleSendIds(users.id, resortdata?.resortowner?._id);
        }}
        title="Contact Owner"
        class="fixed z-90 bottom-10 right-8 bg-green-500 w-16 h-16 rounded-full drop-shadow-lg flex justify-center items-center text-white text-4xl hover:bg-green-300 hover:drop-shadow-2xl hover:animate-bounce duration-300"
      >
        <TbBrandWhatsapp />
      </button>
    </div>
  );
};

export default ResortData;
