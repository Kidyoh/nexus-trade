"use client";
import React, { useState } from 'react';

const CreateSellerProfile = () => {
      const [companyName, setCompanyName] = useState('');
      const [businessSector, setBusinessSector] = useState('');
      const [registeredTax, setRegisteredTax] = useState('');
      const [capitalAmount, setCapitalAmount] = useState(0);
      const [taxpayerID, setTaxPayerId] = useState('');

      const handleSubmit = async (event: React.FormEvent) => {
            event.preventDefault();

            const response = await fetch('/api/profile/createSellerProfile', {
                  method: 'POST',
                  headers: {
                        'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({
                        companyName,
                        taxpayerID,
                        businessSector,
                        registeredTax,
                        capitalAmount,
                  }),
            });

            if (response.ok) {
                  const sellerProfile = await response.json();
                  console.log(sellerProfile);
            } else {
                  // Handle error
            }
      };



      return (
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                  <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
                        <h3 className="font-medium text-black dark:text-white">
                              Create Your Profile
                        </h3>
                  </div>
                  <form onSubmit={handleSubmit}>
                        <div className="p-6.5">
                              <div className="mb-4.5">
                                    <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                                          Company Name <span className="text-meta-1">*</span>
                                    </label>
                                    <input
                                          type="text"
                                          value={companyName}
                                          onChange={(e) => setCompanyName(e.target.value)}
                                          placeholder="Enter your Product Name"
                                          className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                    />
                              </div>
                              <div className="mb-6">
                                    <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                                          Busineess Sector
                                    </label>
                                    <textarea
                                          rows={3}
                                          value={businessSector}
                                          onChange={(e) => setBusinessSector(e.target.value)}
                                          placeholder="What kind of sector is your buisness in"
                                          className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                    ></textarea>
                              </div>

                              <div className="mb-4.5">
                                    <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                                          Capital
                                    </label>
                                    <input
                                          type="number"
                                          value={capitalAmount}
                                          onChange={(e) => setCapitalAmount(Number(e.target.value))}
                                          placeholder="Your Capital Amount"
                                          className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                    />
                              </div>
                              <div className="mb-4.5">
                                    <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                                          Your Registered Tax
                                    </label>
                                    <input
                                          type="text"
                                          value={registeredTax}
                                          onChange={(e) => setRegisteredTax((e.target.value))}
                                          placeholder="Registered Tax"
                                          className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                    />
                              </div>
                              <div className="mb-4.5">
                                    <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                                          Your Tax Payer Id
                                    </label>
                                    <input
                                          type="text"
                                          value={taxpayerID}
                                          onChange={(e) => setTaxPayerId((e.target.value))}
                                          placeholder="Registered Tax"
                                          className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                    />
                              </div>



                              <button className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90">
                                    Complete Your Profile
                              </button>
                        </div>
                  </form>
            </div>
      );

}

export default CreateSellerProfile;