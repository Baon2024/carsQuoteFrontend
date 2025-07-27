"use client";

import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { Button } from "./button";
import { toast } from "sonner";

export default function Modal4Image({
  isOpen4Image,
  onClose,
  title = "Upload Car Images",
  onConfirm,
  confirmText = "Submit",
  cancelText = "Cancel",
  setIsModalOpen,
  setPrice,
  setIsOpen4Image,
  baseUrl
}) {
  // Local state for each image
  const [carFront, setCarFront] = useState(null);
  const [carLeftSide, setCarLeftSide] = useState(null);
  const [carBack, setCarBack] = useState(null);
  const [carRightSide, setCarRightSide] = useState(null);

  const [isFormValid, setIsFormValid] = useState(false); // To enable/disable submit button

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };

    if (isOpen4Image) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "auto";
    };
  }, [isOpen4Image, onClose]);

  useEffect(() => {
    // Check if all images are uploaded to enable the submit button
    if (carFront && carLeftSide && carBack && carRightSide) {
      setIsFormValid(true);
    } else {
      setIsFormValid(false);
    }
  }, [carFront, carLeftSide, carBack, carRightSide]);

  if (!isOpen4Image) return null;



  async function analyse4Images() {

    let formData = new FormData()
    formData.append("carFront", carFront);
    formData.append("carRightSide", carRightSide);
    formData.append("carLeftSide", carLeftSide);
    formData.append("carBack", carBack);

    

    console.log("upload images button fired!")
    setIsOpen4Image(false)
    const response = await fetch(`${baseUrl}/llmAssessCarDamage`, {
      method: 'POST',
      body: formData,
    });

    let data = await response.json();
    console.log("data returned from 4images endpoint is: ", data);
    toast.success("price quote obtained!")
    setPrice(data.finalPrice)
    setIsModalOpen(true)
  }



  return (
    <div
      className="fixed inset-0 backdrop-blur-sm bg-white/20 flex items-center justify-center p-4 z-50 animate-in fade-in duration-300"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-xl shadow-2xl border border-gray-200/50 max-w-md w-full animate-in zoom-in-95 duration-300 ring-1 ring-black/5"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors p-1 rounded-full hover:bg-gray-100"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6">
          {/* Image Uploads */}
          <div className="space-y-4">
            <div>
              <label htmlFor="carFront" className="block text-sm font-medium text-gray-700 mb-2">
                Car Front Image
              </label>
              <input
                type="file"
                id="carFront"
                accept="image/*"
                onChange={(e) => setCarFront(e.target.files[0])}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg"
              />
            </div>

            <div>
              <label htmlFor="carLeftSide" className="block text-sm font-medium text-gray-700 mb-2">
                Car Left Side Image
              </label>
              <input
                type="file"
                id="carLeftSide"
                accept="image/*"
                onChange={(e) => setCarLeftSide(e.target.files[0])}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg"
              />
            </div>

            <div>
              <label htmlFor="carBack" className="block text-sm font-medium text-gray-700 mb-2">
                Car Back Image
              </label>
              <input
                type="file"
                id="carBack"
                accept="image/*"
                onChange={(e) => setCarBack(e.target.files[0])}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg"
              />
            </div>

            <div>
              <label htmlFor="carRightSide" className="block text-sm font-medium text-gray-700 mb-2">
                Car Right Side Image
              </label>
              <input
                type="file"
                id="carRightSide"
                accept="image/*"
                onChange={(e) => setCarRightSide(e.target.files[0])}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg"
              />
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="flex justify-end gap-3 p-6 border-t border-gray-200">
          <button
            onClick={onClose}
            className="px-6 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors font-medium"
          >
            {cancelText}
          </button>
          <button
            onClick={analyse4Images}
            disabled={!isFormValid}
            className={`px-6 py-2 text-white rounded-lg font-medium transition-colors ${
              isFormValid
                ? "bg-blue-600 hover:bg-blue-700"
                : "bg-gray-300 cursor-not-allowed"
            }`}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}
