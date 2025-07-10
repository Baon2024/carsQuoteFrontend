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
  joinWaitlist
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

  if (!isOpen) return null

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
          {/* Product Information */}
          <div className="space-y-3">
            <div className="bg-gray-50 rounded-lg p-4 space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-gray-500">Product</span>
                <span className="text-lg font-semibold text-gray-900">{product}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-gray-500">Condition</span>
                <span className="text-base text-gray-700">{condition}</span>
              </div>
              <div className="flex justify-between items-center border-t border-gray-200 pt-2">
                <span className="text-sm font-medium text-gray-500">Price</span>
                <span className="text-xl font-bold text-green-600">£{price}</span>
              </div>
            </div>
          </div>

          {/* Sell Button */}
          {!emailBox && (
            <div className="flex justify-center">
            <Button 
              onClick={toggleEmail}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors"
            >
              Sell This Item
            </Button>
          </div>
          )}
          

          {/* Email Form */}
          {emailBox && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 space-y-4">
              <div className="text-center">
                <h4 className="text-lg font-semibold text-blue-900 mb-1">Join Our Waitlist</h4>
                <p className="text-sm text-blue-700">Get notified when we're ready to purchase your item</p>
              </div>
              
              <div className="space-y-3">
                <div>
                  <label 
                    htmlFor="email-input" 
                    className="block text-sm font-medium text-blue-900 mb-2"
                  >
                    Email Address
                  </label>
                  <input 
                    id="email-input"
                    type="email" 
                    placeholder="Enter your email address"
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 border border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors placeholder-gray-400"
                  />
                </div>
                
                <Button 
                  onClick={joinWaitlist}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition-colors"
                >
                  Join Waitlist
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        {showFooter && (
          <div className="flex justify-end gap-3 p-6 border-t border-gray-200">
            <button
              onClick={onClose}
              className="px-6 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors font-medium"
            >
              {cancelText}
            </button>
            {onConfirm && (
              <button
                onClick={onConfirm}
                className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors font-medium"
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