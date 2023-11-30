import React, { useState } from "react";
import { MdDeleteOutline } from "react-icons/md";
import "../App.css";
import { WiDaySunny } from "react-icons/wi";
import { MdDarkMode } from "react-icons/md";

function Todo() {
  const [inputData, setInputData] = useState("");
  const [items, setItems] = useState([]);
  const [darkMode, setDarkMode] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredItems = items.filter((item) =>
    item.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleMode = () => {
    setDarkMode(!darkMode);
  };

  const addItem = (e) => {
    if (!inputData) {
      alert("Please Add Item");
    } else if (items.includes(inputData)) {
      alert("Item already exists in the list");
    } else {
      setItems([...items, inputData]);
      setInputData("");
    }
  };

  const removeAll = () => {
    setItems([]);
  };

  const editItem = (id, inputData) => {
    const editingRow = items[id];
    setItems((prevItems) => {
      const updatedItems = [...prevItems];
      updatedItems[id] = inputData;
      return updatedItems;
    });
    setInputData(editingRow);
    deleteItem(id);
  };
  // delete item
  const deleteItem = (id) => {
    const updateItems = items.filter((elem, ind) => {
      return ind !== id;
    });
    setItems(updateItems);
  };

  return (
    <div
      className={`min-h-screen flex items-center justify-center ${
        darkMode ? "dark-mode" : ""
      }`}
    >
      <div className="bg-white p-8 rounded-md shadow-md w-96">
        <button
          onClick={toggleMode}
          className="text-gray-700 px-2 py-1 rounded-full font-bold focus:outline-none bg-slate-200"
        >
          {darkMode ? <WiDaySunny /> : <MdDarkMode />}
        </button>
        <h1 className="text-center mb-5 font-bold text-2xl text-gray-800 underline italic">
          ToDo List
        </h1>
        <figure className="mb-4 text-center">
          <img
            src="https://png.pngtree.com/element_our/20190528/ourlarge/pngtree-file-icon-image_1128287.jpg"
            alt="logo"
            className="w-16 h-16 mx-auto mb-2"
          />
          <figcaption className="text-gray-700 text-sm">
            Add Your List Here...
          </figcaption>
        </figure>
        <div className="mb-4 flex">
          <input
            type="text"
            placeholder={searchTerm ? "Search..." : "Add Items..."}
            value={inputData || searchTerm}
            onChange={(e) =>
              searchTerm ? handleSearch(e) : setInputData(e.target.value)
            }
            className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
          />
          <button
            className="ml-2 text-2xl px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none"
            title="Add Item"
            onClick={(e) => addItem(e.target.value)}
          >
            <i class="fa-solid fa-plus"></i>
          </button>
        </div>

        <div>
          {items.map((elem, ind) => (
            <div
              className="flex justify-between items-center border-b py-2"
              key={ind}
            >
              <h3 className="text-lg text-gray-700">{elem}</h3>
              <div>
                <button
                  className="text-red-500 hover:text-red-700 focus:outline-none"
                  title="Delete Item"
                  onClick={() => deleteItem(ind)}
                >
                  <i className="far fa-trash-alt px-7"></i>
                </button>
                <button
                  className="text-green-500 hover:text-green-700 focus:outline-none"
                  title="Edit Item"
                  onClick={() => editItem(ind, inputData)}
                >
                  <i className="fa-regular fa-pen-to-square"></i>
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4 text-center">
          <button
            className="btn effect04 bg-red-500 text-white px-8 py-2 rounded-md hover:bg-red-600 focus:outline-none"
            onClick={removeAll}
          >
            <span>Remove All</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Todo;
