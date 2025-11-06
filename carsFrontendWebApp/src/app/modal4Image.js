"use client";

import { useState, useEffect } from "react";
import { X, Check } from "lucide-react";
import { toast } from "sonner";

export default function Modal4Image({
  isOpen4Image,
  title = "Upload Car Images",
  onConfirm,
  confirmText = "Submit",
  cancelText = "Cancel",
  setIsModalOpen,
  setPrice,
  setIsOpen4Image,
  baseUrl,
  setDamageReport,
  setOriginalPrice
}) {
  // Local state for each image
  const [carFront, setCarFront] = useState(null);
  const [carLeftSide, setCarLeftSide] = useState(null);
  const [carBack, setCarBack] = useState(null);
  const [carRightSide, setCarRightSide] = useState(null);

  const [previewFront, setPreviewFront] = useState(null)
  const [previewLeft, setPreviewLeft] = useState(null)
  const [previewBack, setPreviewBack] = useState(null)
  const [previewRight, setPreviewRight] = useState(null)

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

  
  useEffect(() => {
    return () => {
      if (previewFront) URL.revokeObjectURL(previewFront)
      if (previewLeft) URL.revokeObjectURL(previewLeft)
      if (previewBack) URL.revokeObjectURL(previewBack)
      if (previewRight) URL.revokeObjectURL(previewRight)
    }
  }, [previewFront, previewLeft, previewBack, previewRight])

  useEffect(() => {
    return () => {
      if (previewFront) URL.revokeObjectURL(previewFront)
      if (previewLeft) URL.revokeObjectURL(previewLeft)
      if (previewBack) URL.revokeObjectURL(previewBack)
      if (previewRight) URL.revokeObjectURL(previewRight)
    }
  }, [previewFront, previewLeft, previewBack, previewRight])

  if (!isOpen4Image) return null

  const handleFileChange = (file, setter, previewSetter) => {
    if (file) {
      setter(file)
      const url = URL.createObjectURL(file)
      previewSetter(url)
    }
  }

  function onClose() {
    setIsOpen4Image(false)
  }



  async function analyse4Images() {

    let formData = new FormData()
    formData.append("carFront", carFront);
    formData.append("carRightSide", carRightSide);
    formData.append("carLeftSide", carLeftSide);
    formData.append("carBack", carBack);

    

    console.log("upload images button fired!")
    console.log("baseUrl before fetcht to llmAssessCarDamage is: ", baseUrl);
    setIsOpen4Image(false)
    toast("generating price!")
    const response = await fetch(`${baseUrl}/llmAssessCarDamage`, {
      method: 'POST',
      body: formData,
    });

    let data = await response.json();
    console.log("data returned from 4images endpoint is: ", data);
    toast.success("price quote obtained!")
    setPrice(data.finalPrice)
    setDamageReport(
  data.damageAssessmentBreakdown === null
    ? {
        scratches: 0,
        dents: 0,
        brokenLights: 0,
        comments: ""
      }
    : data.damageAssessmentBreakdown
);
    setOriginalPrice(data.originalPrice)
    //need to handle original price and damageBreakdown
    setIsModalOpen(true)
  }


const UploadCard = ({ label, id, file, preview, onChange, icon }) => (
    <div className="relative">
      <label
        htmlFor={id}
        className={`block cursor-pointer transition-all duration-200 ${
          file
            ? "border-2 border-green-500 bg-green-50"
            : "border-2 border-dashed border-gray-300 hover:border-blue-400 hover:bg-blue-50/50"
        } rounded-xl p-4 group`}
      >
        <div className="flex items-center gap-4">
          <div
            className={`flex-shrink-0 w-16 h-16 rounded-lg flex items-center justify-center ${
              file ? "bg-green-100" : "bg-gray-100 group-hover:bg-blue-100"
            } transition-colors`}
          >
            {preview ? (
              <img src={preview || "/placeholder.svg"} alt={label} className="w-full h-full object-cover rounded-lg" />
            ) : (
              <div className="text-gray-400 group-hover:text-blue-500 transition-colors">{icon}</div>
            )}
          </div>
          <div className="flex-1 min-w-0">
            <p className={`text-sm font-medium mb-1 ${file ? "text-green-700" : "text-gray-700"}`}>{label}</p>
            <p className="text-xs text-gray-500 truncate">{file ? file.name : "Click to upload or drag and drop"}</p>
          </div>
          {file && (
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                <Check className="w-5 h-5 text-white" />
              </div>
            </div>
          )}
        </div>
      </label>
      <input type="file" id={id} accept="image/*" onChange={onChange} className="hidden" />
    </div>
  )

  const uploadedCount = [carFront, carLeftSide, carBack, carRightSide].filter(Boolean).length

  if (!isOpen4Image) return null;

  return (
    <div
      className="fixed inset-0 backdrop-blur-sm bg-black/40 flex items-center justify-center p-4 z-50 animate-in fade-in duration-300"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full animate-in zoom-in-95 duration-300 max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 rounded-t-2xl z-10">
          <div className="flex items-center justify-between p-6">
            <div>
              <h2 className="text-2xl font-semibold text-gray-900">{title}</h2>
              <p className="text-sm text-gray-500 mt-1">Upload images from all 4 angles for accurate assessment</p>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors p-2 rounded-full hover:bg-gray-100"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="px-6 pb-4">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-sm font-medium text-gray-700">Progress: {uploadedCount}/4 images</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
              <div
                className="bg-blue-600 h-full transition-all duration-500 ease-out"
                style={{ width: `${(uploadedCount / 4) * 100}%` }}
              />
            </div>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <UploadCard
              label="Front View"
              id="carFront"
              file={carFront}
              preview={previewFront}
              onChange={(e) => handleFileChange(e.target.files[0], setCarFront, setPreviewFront)}
              icon={
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M8 7h8M8 7l-2 9m2-9V5a1 1 0 011-1h6a1 1 0 011 1v2m0 0l2 9m-2-9h2m-4 9h-4m0 0H6m2 0v2a1 1 0 001 1h6a1 1 0 001-1v-2m0 0h2"
                  />
                </svg>
              }
            />

            <UploadCard
              label="Left Side View"
              id="carLeftSide"
              file={carLeftSide}
              preview={previewLeft}
              onChange={(e) => handleFileChange(e.target.files[0], setCarLeftSide, setPreviewLeft)}
              icon={
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
                </svg>
              }
            />

            <UploadCard
              label="Back View"
              id="carBack"
              file={carBack}
              preview={previewBack}
              onChange={(e) => handleFileChange(e.target.files[0], setCarBack, setPreviewBack)}
              icon={
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M16 7h-8m8 0l2 9m-2-9V5a1 1 0 00-1-1H9a1 1 0 00-1 1v2m0 0l-2 9m2-9H6m4 9h4m0 0h2m-2 0v2a1 1 0 01-1 1H9a1 1 0 01-1-1v-2m0 0H6"
                  />
                </svg>
              }
            />

            <UploadCard
              label="Right Side View"
              id="carRightSide"
              file={carRightSide}
              preview={previewRight}
              onChange={(e) => handleFileChange(e.target.files[0], setCarRightSide, setPreviewRight)}
              icon={
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              }
            />
          </div>
        </div>

        {/* Modal Footer */}
        <div className="sticky bottom-0 bg-gray-50 border-t border-gray-200 rounded-b-2xl">
          <div className="flex justify-end gap-3 p-6">
            <button
              onClick={onClose}
              className="px-6 py-2.5 text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 rounded-lg transition-colors font-medium"
            >
              {cancelText}
            </button>
            <button
              onClick={analyse4Images}
              disabled={!isFormValid}
              className={`px-6 py-2.5 text-white rounded-lg font-medium transition-all ${
                isFormValid
                  ? "bg-blue-600 hover:bg-blue-700 shadow-sm hover:shadow-md"
                  : "bg-gray-300 cursor-not-allowed"
              }`}
            >
              {confirmText}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
