import SelectGroupOne from "../SelectGroup/productTypeDropdown";

const Products = () => {
      return (
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                  <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
                        <h3 className="font-medium text-black dark:text-white">
                              Add your products
                        </h3>
                  </div>
                  <form action="#">
                        <div className="p-6.5">
                              <div className="mb-4.5">
                                    <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                                          Product Name <span className="text-meta-1">*</span>
                                    </label>
                                    <input
                                          type="text"
                                          placeholder="Enter your email address"
                                          className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                    />
                              </div>
                              <div className="mb-6">
                                    <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                                          Product Description
                                    </label>
                                    <textarea
                                          rows={3}
                                          placeholder="Type your product description here"
                                          className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                    ></textarea>
                              </div>

                              <div className="mb-4.5">
                                    <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                                          Product
                                    </label>
                                    <input
                                          type="text"
                                          placeholder="Select subject"
                                          className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                    />
                              </div>

                              <SelectGroupOne />

                              <div className="mb-6">
                                    <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                                          Message
                                    </label>
                                    <textarea
                                          rows={6}
                                          placeholder="Type your message"
                                          className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                    ></textarea>
                              </div>

                              <button className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90">
                                    Send Message
                              </button>
                        </div>
                  </form>
            </div>
      );

}

export default Products;