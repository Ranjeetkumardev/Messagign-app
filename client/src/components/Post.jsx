import React, { useState } from 'react';
import axios from 'axios';
import { X } from 'lucide-react';


const Post = () => {
const [openModel , setModel] =  useState(true)
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    quantity: "",
    price: ""
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

   
  const handleSubmit = async (e) => {
    e.preventDefault();
      try {
        const response = await axios.post('http://localhost:4000/additem', formData, {
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (response.status === 200 || response.status === 201) {
          console.log('Form data submitted successfully:', response.data);
          setFormData({ title: "", category: "", quantity: "", price: "" });
          toast.success('Item added successfully!', {
            position: 'top-right',
            className: 'bg-teal-500',
          });
          onClose(); // Close modal
        } else {
         // toast.error('Failed to submit data');
          throw new Error('Failed to submit data');
        }
      } catch (error) {
        console.error('Error submitting form data:', error);
       // toast.error('Error submitting form data: ' + error.message);
      }
  };

  return (
   openModel && ( <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50'>
      <div className='bg-white rounded-lg p-6 shadow-lg w-96'>
        <h2 className="text-xl font-bold mb-4 flex justify-between ">
            <span>Add Item</span>
            <span onClick={()=>setModel(!openModel)} className='cursor-pointer p-2 hover:text-blue-600'><X/> </span>
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-1">Title</label>
            <input 
              type='text' 
              placeholder="Item Name" 
              name="title" 
              value={formData.title} 
              onChange={handleChange} 
              className="p-2 w-full rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500" 
            />
            {errors.title && <p className="text-red-600">{errors.title}</p>}
          </div>
          <div className="mb-4">
            <label className="block mb-1">Category</label>
            <input 
              type='text' 
              placeholder="Category Name" 
              name="category" 
              value={formData.category} 
              onChange={handleChange} 
              className="p-2 w-full rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500" 
            />
            {errors.category && <p className="text-red-600">{errors.category}</p>}
          </div>
          <div className="mb-4">
            <label className="block mb-1">Quantity</label>
            <input 
              type='text' 
              placeholder="Enter Quantity" 
              name="quantity" 
              value={formData.quantity} 
              onChange={handleChange} 
              className="p-2 w-full rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500" 
            />
            {errors.quantity && <p className="text-red-600">{errors.quantity}</p>}
          </div>
          <div className="mb-4">
            <label className="block mb-1">Price</label>
            <input 
              type='text' 
              placeholder="Enter Price" 
              name="price" 
              value={formData.price} 
              onChange={handleChange} 
              className="p-2 w-full rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500" 
            />
            {errors.price && <p className="text-red-600">{errors.price}</p>}
          </div>
          <button 
            type="submit" 
            className="w-full p-2 rounded-md bg-teal-600 text-white font-semibold cursor-pointer hover:bg-teal-700 transition">
            Submit
          </button>
        </form>
      </div>
    </div>)
  );
};

export default Post;
