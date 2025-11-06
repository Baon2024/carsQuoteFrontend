"use client"

import { useEffect } from "react"
import { X } from 'lucide-react'
import { Button } from "./button"

export default function Modal({
  isOpen,
  onClose,
  title = "Offer",
  product,
  condition,
  price,
  showFooter = true,
  onConfirm,
  confirmText = "Confirm",
  cancelText = "Cancel",
  toggleEmail,
  emailBox,
  setEmail,
  joinWaitlist,
  vehicleDetails,
  originalPrice,
  damageReport
}) {
  // Handle escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape" && isOpen) {
        onClose()
      }
    }

  

    if (isOpen) {
      document.addEventListener("keydown", handleEscape)
      document.body.style.overflow = "hidden"
    }

    return () => {
      document.removeEventListener("keydown", handleEscape)
      document.body.style.overflow = "auto"
    }
  }, [isOpen, onClose])


  //need to add actual joinWaitlist function



  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 backdrop-blur-sm bg-white/20 flex items-center justify-center p-4 z-50 animate-in fade-in duration-300"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-xl shadow-2xl border border-gray-200/50 max-w-2xl w-full max-h-[90vh] overflow-y-auto animate-in zoom-in-95 duration-300 ring-1 ring-black/5"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between p-8 border-b border-gray-200">
          <h2 className="text-2xl font-semibold text-gray-900">{title}</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors p-2 rounded-full hover:bg-gray-100"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-8 space-y-8">
          {/* Product Information */}
          <div className="space-y-6">
            <div className="bg-gray-50 rounded-lg p-6 space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-base font-medium text-gray-500">Product</span>
                <span className="text-xl font-semibold text-gray-900">{product}</span>
              </div>

              {/* Vehicle Details */}
              {vehicleDetails && (
                <div className="pt-4 border-t border-gray-200">
                  <h3 className="text-base font-semibold text-gray-700 mb-4">Vehicle Details</h3>
                  <div className="grid grid-cols-2 gap-x-6 gap-y-3 text-sm">
                    {Object.entries(vehicleDetails).map(([key, value], index) => (
                      <div key={index} className="flex justify-between">
                        <span className="font-medium capitalize text-gray-600">{key}:</span>
                        <span className="text-gray-900">{value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Damage Report */}
            {damageReport && (
              <div className="bg-red-50 rounded-lg p-6 space-y-4 border border-red-200">
                <h3 className="text-lg font-semibold text-red-800 mb-4">Damage Report</h3>

                <div className="space-y-3">
                  <div className="flex justify-between items-center py-2">
                    <span className="text-base font-medium text-gray-700">Original Price:</span>
                    <span className="text-lg font-semibold text-gray-900">£{originalPrice}</span>
                  </div>

                  {(damageReport.scratches > 0 || damageReport.dents > 0 || damageReport.brokenLights > 0) && (
                    <div className="space-y-2 border-t border-red-200 pt-3">
                      {damageReport.scratches > 0 && (
                        <div className="flex justify-between items-center py-1">
                          <span className="text-sm text-gray-700">Scratches ({damageReport.scratches} × £50)</span>
                          <span className="text-sm font-medium text-red-600">-£{damageReport.scratches * 50}</span>
                        </div>
                      )}
                      {damageReport.dents > 0 && (
                        <div className="flex justify-between items-center py-1">
                          <span className="text-sm text-gray-700">Dents ({damageReport.dents} × £50)</span>
                          <span className="text-sm font-medium text-red-600">-£{damageReport.dents * 50}</span>
                        </div>
                      )}
                      {damageReport.brokenLights > 0 && (
                        <div className="flex justify-between items-center py-1">
                          <span className="text-sm text-gray-700">
                            Broken Lights ({damageReport.brokenLights} × £100)
                          </span>
                          <span className="text-sm font-medium text-red-600">-£{damageReport.brokenLights * 100}</span>
                        </div>
                      )}
                    </div>
                  )}

                  <div className="flex justify-between items-center border-t border-red-200 pt-4 mt-4">
                    <span className="text-lg font-semibold text-gray-800">Final Price:</span>
                    <span className="text-2xl font-bold text-green-600">£{price}</span>
                  </div>
                </div>

                {/* Optional Comments */}
                {damageReport.comments && (
                  <div className="border-t border-red-200 pt-4 mt-4">
                    <p className="text-sm text-gray-600 italic bg-white/50 p-3 rounded border-l-4 border-red-300">
                      "{damageReport.comments}"
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Sell Button */}
          {!emailBox && (
            <div className="flex justify-center pt-4">
              <Button
                onClick={toggleEmail}
                className="w-full max-w-sm bg-blue-600 hover:bg-blue-700 text-white font-medium py-4 px-8 rounded-lg transition-colors text-lg"
              >
                Sell This Item
              </Button>
            </div>
          )}

          {/* Email Form */}
          {emailBox && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 space-y-6">
              <div className="text-center space-y-2">
                <h4 className="text-xl font-semibold text-blue-900">Join Our Waitlist</h4>
                <p className="text-base text-blue-700">Get notified when we're ready to purchase your item</p>
              </div>

              <div className="space-y-4">
                <div>
                  <label htmlFor="email-input" className="block text-base font-medium text-blue-900 mb-3">
                    Email Address
                  </label>
                  <input
                    id="email-input"
                    type="email"
                    placeholder="Enter your email address"
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-4 border border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors placeholder-gray-400 text-base"
                  />
                </div>

                <Button
                  onClick={joinWaitlist}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-4 px-6 rounded-lg transition-colors text-lg"
                >
                  Join Waitlist
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        {showFooter && (
          <div className="flex justify-end gap-4 p-8 border-t border-gray-200">
            <button
              onClick={onClose}
              className="px-8 py-3 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors font-medium text-base"
            >
              {cancelText}
            </button>
            {onConfirm && (
              <button
                onClick={onConfirm}
                className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors font-medium text-base"
              >
                {confirmText}
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  )
}