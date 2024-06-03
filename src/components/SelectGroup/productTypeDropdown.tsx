"use client";
import React, { useState, useEffect } from "react";

export interface ProductType {
  id: number;
  type: string;
  subTypes?: SubProductType[];
}

export interface SubProductType {
  id: number;
  name: string;
  productTypeId: number;
}

interface SelectGroupOneProps {
  onProductTypeChange: (typeId: number | null) => void;
  onSubProductTypeChange: (subTypeId: number | null) => void;
}

const SelectGroupOne: React.FC<SelectGroupOneProps> = ({ onProductTypeChange, onSubProductTypeChange }) => {
  const [selectedProductType, setSelectedProductType] = useState<ProductType | null>(null);
  const [selectedSubOption, setSelectedSubOption] = useState<string>("");
  const [isOptionSelected, setIsOptionSelected] = useState<boolean>(false);
  const [productTypes, setProductTypes] = useState<ProductType[]>([]);


  useEffect(() => {
    fetch('/api/product/getProductType')
      .then(response => response.json())
      .then(data => setProductTypes(data));
  }, []);

  const changeTextColor = () => {
    setIsOptionSelected(true);

  };

  const handleProductTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedType = e.target.value;
    const selectedTypeObj = productTypes.find(pt => pt.type === selectedType) ?? null;
    setSelectedProductType(selectedTypeObj);
    changeTextColor();

    // call the callback function with the selected product type's id
    onProductTypeChange(selectedTypeObj ? selectedTypeObj.id : null);
  };

  const handleSubProductTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedSubType = e.target.value;
    setSelectedSubOption(selectedSubType);
    changeTextColor();

    // find the selected sub product type and call the callback function with its id
    const selectedSubTypeObj = selectedProductType?.subTypes?.find(st => st.name === selectedSubType);
    onSubProductTypeChange(selectedSubTypeObj ? selectedSubTypeObj.id : null);
  };


  return (
    <div className="mb-4.5">
      <label className="mb-2.5 block text-black dark:text-white">
        {" "}Product Type{" "}
      </label>

      <div className="relative z-20 bg-transparent dark:bg-form-input">
        <select
          value={selectedProductType ? selectedProductType.type : ""}
          onChange={handleProductTypeChange}
          className={`relative z-20 w-full appearance-none rounded border border-stroke bg-transparent px-5 py-3 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary ${isOptionSelected ? "text-black dark:text-white" : ""
            }`}
        >
          <option value="" disabled className="text-body dark:text-bodydark">
            Select your product Type
          </option>
          {productTypes.map((productType: ProductType) => (
            <option key={productType.id} value={productType.type} className="text-body dark:text-bodydark">
              {productType.type}
            </option>
          ))}
        </select>

        <span className="absolute right-4 top-1/2 z-30 -translate-y-1/2">
          <svg
            className="fill-current"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g opacity="0.8">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M5.29289 8.29289C5.68342 7.90237 6.31658 7.90237 6.70711 8.29289L12 13.5858L17.2929 8.29289C17.6834 7.90237 18.3166 7.90237 18.7071 8.29289C19.0976 8.68342 19.0976 9.31658 18.7071 9.70711L12.7071 15.7071C12.3166 16.0976 11.6834 16.0976 11.2929 15.7071L5.29289 9.70711C4.90237 9.31658 4.90237 8.68342 5.29289 8.29289Z"
                fill=""
              ></path>
            </g>
          </svg>
        </span>

      </div>

      <label className="mb-2.5 block text-black dark:text-white">
        {" "}Sub Product Type{" "}
      </label>

      <div className="relative z-20 bg-transparent dark:bg-form-input">
        <select
          value={selectedSubOption}
          onChange={handleSubProductTypeChange}
          className={`relative z-20 w-full appearance-none rounded border border-stroke bg-transparent px-5 py-3 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary ${isOptionSelected ? "text-black dark:text-white" : ""
            }`}
        >
          <option value="" disabled className="text-body dark:text-bodydark">
            Select your sub product Type
          </option>
          {selectedProductType && selectedProductType.subTypes && selectedProductType.subTypes.map((subType: SubProductType) => (
            <option key={subType.id} value={subType.name} className="text-body dark:text-bodydark">
              {subType.name}
            </option>
          ))}
        </select>
        <span className="absolute right-4 top-1/2 z-30 -translate-y-1/2">
          <svg
            className="fill-current"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g opacity="0.8">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M5.29289 8.29289C5.68342 7.90237 6.31658 7.90237 6.70711 8.29289L12 13.5858L17.2929 8.29289C17.6834 7.90237 18.3166 7.90237 18.7071 8.29289C19.0976 8.68342 19.0976 9.31658 18.7071 9.70711L12.7071 15.7071C12.3166 16.0976 11.6834 16.0976 11.2929 15.7071L5.29289 9.70711C4.90237 9.31658 4.90237 8.68342 5.29289 8.29289Z"
                fill=""
              ></path>
            </g>
          </svg>
        </span>
      </div>
    </div>
  );
};

export default SelectGroupOne;