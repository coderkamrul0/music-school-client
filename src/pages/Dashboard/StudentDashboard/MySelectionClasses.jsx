import React from "react";
import useSelectClass from "../../../hooks/useSelectClass";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

const MySelectionClasses = () => {
  const [selectClass, refetch] = useSelectClass();

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't Delete this class !",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`https://school-server-gamma.vercel.app/selectedClass/${id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.deletedCount > 0) {
              refetch();
              Swal.fire("Deleted!", "Your file has been deleted.", "success");
            }
          });
      }
    });
  };

  return (
    <div>
      <Helmet>
        <title>Music Universe | My Selection Class</title>
      </Helmet>
      <h1 className="text-4xl font-bold text-center py-5">
        My Selection Class
      </h1>
      <div>
        <div className="flex flex-col">
          <div className="overflow-x-auto sm:mx-0.5 lg:mx-0.5">
            <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
              <div className="overflow-hidden">
                <table className="min-w-full">
                  <thead className="bg-[#F65209] border-b">
                    <tr>
                      <th
                        scope="col"
                        className="text-sm font-medium text-white px-6 py-4 text-left"
                      >
                        #
                      </th>
                      <th
                        scope="col"
                        className="text-sm font-medium text-white px-6 py-4 text-left"
                      >
                        Class Image
                      </th>
                      <th
                        scope="col"
                        className="text-sm font-medium text-white px-6 py-4 text-left"
                      >
                        Class Name
                      </th>
                      <th
                        scope="col"
                        className="text-sm font-medium text-white px-6 py-4 text-left"
                      >
                        Instructor Name
                      </th>
                      <th
                        scope="col"
                        className="text-sm font-medium text-white px-6 py-4 text-left"
                      >
                        Instructor Email
                      </th>
                      <th
                        scope="col"
                        className="text-sm font-medium text-white px-6 py-4 text-left"
                      >
                        Available Seats
                      </th>
                      <th
                        scope="col"
                        className="text-sm font-medium text-white px-6 py-4 text-left"
                      >
                        Price
                      </th>
                      <th
                        scope="col"
                        className="text-sm font-medium text-white px-6 py-4 text-left"
                      >
                        Enroll
                      </th>
                      <th
                        scope="col"
                        className="text-sm font-medium text-white px-6 py-4 text-left "
                      >
                        Delete
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      selectClass.filter(item => item.status !== 'paid')
                      .map((item, index) => (
                        <tr
                        className="bg-white border-b border-[#F65209] transition duration-300 ease-in-out hover:bg-gray-100"
                        key={item._id}
                      >
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {index + 1}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          <img src={item.image} className="h-10 w-10" alt="" />
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {item.className}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {item.instructorName}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {item.instructorEmail}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {item.availableSeats}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {item.price}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          <Link to={`/dashboard/payment/${item?._id}`}>
                            <button className="bg-green-500 p-1 rounded-2xl text-white">
                              Enroll
                            </button>
                          </Link>
                        </td>
                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                          <button
                            onClick={() => handleDelete(item._id)}
                            className="bg-red-500 p-1 rounded-xl text-white"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                      ))
                    }
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MySelectionClasses;
