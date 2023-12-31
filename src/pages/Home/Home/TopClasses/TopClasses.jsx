import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../../providers/AuthProvider";
import Swal from "sweetalert2";

const TopClasses = () => {
  const [classes, setClasses] = useState([]);
  useEffect(() => {
    fetch("https://school-server-gamma.vercel.app/approvedClasses")
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          const sortedClasses = data.sort((a, b) => b.totalStudent - a.totalStudent);
          setClasses(sortedClasses);
        }
      });
  }, []);

  const { user } = useContext(AuthContext);

  const handleSelect = (item) => {
    if (!user) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please log in before selecting the course.",
      });
      return;
    }
  };

  const sliceClasses = classes?.slice(0, 6);

  return (
    <div className="max-w-screen-xl mx-auto px-5 py-10">
      <h1 className="text-4xl font-bold my-14 text-center">Popular <span className="text-[#f65209]">Classes</span></h1>

      <div className="grid md:grid-cols-3 gap-10" data-aos="fade-up"
     data-aos-anchor-placement="top-bottom">
        {sliceClasses?.map((item) => (
          <div key={item._id}>
            <div className="relative  flex w-full  flex-col overflow-hidden rounded-lg border border-gray-100 bg-white shadow-md">
              <a
                className="relative mx-3 mt-3 flex h-60 overflow-hidden rounded-xl"
                href="#"
              >
                <img
                  className="object-cover transition duration-300 ease-in-out hover:scale-110"
                  src={item.image}
                  alt="product image"
                />
              </a>
              <div className="mt-4 px-5 pb-5 text-center">
                <h5 className="text-lg font-bold py-1 tracking-tight text-slate-900">{item.className}</h5>
                <p>Instructor: {item.instructorName}</p>
                <div className="flex justify-around items-center">
                <p>Available Seats: {item.availableSeats}</p>
                <p>Students: {item.totalStudent}</p>
                </div>
                <div className="mt-2 mb-5 flex items-center justify-between">
                  <p>
                    <span className="text-3xl font-bold text-slate-900">Price: ${item.price}</span>
                  </p>
                </div>
                <button
                  className="bg-[#F65209] w-full text-white px-4 py-2 rounded-md hover:bg-[#d84f14]"
                  disabled={parseInt(item.availableSeats) === 0}
                  onClick={() => handleSelect(item)}
                >
                  Select Class
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopClasses;
