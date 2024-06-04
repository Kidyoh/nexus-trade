"use client";
import { useState } from "react";
import SelectGroupOne from "../SelectGroup/productTypeDropdown";


const Products = () => {
      //assign state 
      const [name, setName] = useState('');
      const [description, setDescription] = useState('');
      const [price, setPrice] = useState(0);
      const [quantity, setQuantity] = useState(0);
      const [selectedProductTypeId, setSelectedProductTypeId] = useState<number | null>(null);
      const [selectedSubProductTypeId, setSelectedSubProductTypeId] = useState<number | null>(null);

      //
      const handleSubmit = async (event: any) => {
            event.preventDefault();
            console.log('Submitting form with subTypeId:', selectedSubProductTypeId);

            const response = await fetch('/api/product/product_create', {
                  method: 'POST',
                  headers: {
                        'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({
                        name,
                        description,
                        price,
                        quantity,
                        typeId: selectedProductTypeId,
                        subTypeId: selectedSubProductTypeId,
                  }),
            });

            if (response.ok) {
                  const product = await response.json();
                  console.log(product);

            } else {
                  //todo: Handling error
            }
      };


      return (

            
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                  <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
                        <h3 className="font-medium text-black dark:text-white">
                              Add your products
                        </h3>
                  </div>
                  <form onSubmit={handleSubmit}>
                        <div className="p-6.5">
                              <div className="mb-4.5">
                                    <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                                          Product Name <span className="text-meta-1">*</span>
                                    </label>
                                    <input
                                          type="text"
                                          value={name}
                                          onChange={(e) => setName(e.target.value)}
                                          placeholder="Enter your Product Name"
                                          className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                    />
                              </div>
                              <div className="mb-6">
                                    <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                                          Product Description
                                    </label>
                                    <textarea
                                          rows={3}
                                          value={description}
                                          onChange={(e) => setDescription(e.target.value)}
                                          placeholder="Type your product description here"
                                          className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                    ></textarea>
                              </div>

                              <div className="mb-4.5">
                                    <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                                          Price
                                    </label>
                                    <input
                                          type="number"
                                          value={price}
                                          onChange={(e) => setPrice(Number(e.target.value))}
                                          placeholder="Price of the product"
                                          className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                    />
                              </div>
                              <div className="mb-4.5">
                                    <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                                          Quantity
                                    </label>
                                    <input
                                          type="number"
                                          value={quantity}
                                          onChange={(e) => setQuantity(Number(e.target.value))}
                                          placeholder="Set Quantity"
                                          className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                    />
                              </div>


                              <SelectGroupOne
                                    onProductTypeChange={setSelectedProductTypeId}
                                    onSubProductTypeChange={(id) => {
                                          console.log('Sub product type selected with id:', id);
                                          setSelectedSubProductTypeId(id);
                                    }}
                              />


                              <button className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90">
                                    Add Product
                              </button>
                        </div>
                  </form>
            </div>
      );

}

export default Products;