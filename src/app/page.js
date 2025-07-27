'use client'
import ImageUpload from "./imageUpload";
import { useEffect, useState } from "react";
import { Button } from "./button";
import { toast } from "sonner";
import Modal from "./modal";
//import { supabase } from "./supabase";
import { Loader2 } from 'lucide-react';
import Modal4Image from "./modal4Image";


export default function Home() {
  
  let baseUrl = process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:5005"
   

  const [uploadedFile, setUploadedFile] = useState(null);
  const [ price, setPrice ] = useState("")
  const [vehicleDetails, setVehicleDetails] = useState({
  color: "",
  engine: "",
  make: "",
  model: "",
  transmission: "",
  year: ""
});
  const [ product, setProduct ] = useState("")
   const [ condition, setCondition ] = useState("")
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [ isOpen4Image, setIsOpen4Image ] = useState(false)
  const [ emailBox, setEmailBox ] = useState(false);
  const [ email, setEmail ] = useState("");
  const [ loading, setLoading ] = useState(false)
  /*const [uploadedFile, setUploadedFile] = useState({
  file: { name: '', size: 0, type: '' },
  preview: ''
});*/

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  async function getProductThenPrice() {

    setLoading(true)

    if (uploadedFile === null) {
    alert("Need to upload product image!")
    return null
    }

    toast("product identification triggered!")

    let formData = new FormData()
    formData.append("image", uploadedFile.file);

    const response = await fetch(`${baseUrl}/identify-image`, {
      method: 'POST',
      body: formData,
    });

    let data = await response.json();
    const { regNum } = data;
    //setCondition(condition);
    //setProduct(product);
    
    console.log("value of regNum is: ", regNum);

    
    //toast(`placeholder is: ${placeholder}`)
    
    await sleep(2000)
    toast("identifying price")
    //api call to get price
   const response2 = await fetch(`${baseUrl}/getWBAYandGeneratePrice`, {//https://sellermvpbackend.onrender.com/
  method: 'POST',
  headers: {
    'Content-Type': 'application/json', // 🔥 Tell server it's JSON
  },
  body: JSON.stringify({ regNum }),
});

    let data2 = await response2.json();
    const { carSpecs } = data2
    console.log("carSpecs from backend is, ", carSpecs)
    setVehicleDetails({
      color: carSpecs.color,
  engine: carSpecs.engine,
  make: carSpecs.make,
  model: carSpecs.model,
  transmission: carSpecs.transmission,
  year: carSpecs.year
  })

    if (carSpecs) { 
      toast.success("successfuly pinpointed exact car tye!")
    }
    
    //if object with detailedCarInfo is returned, then setUload4icsModal(true)
    //require them to uload 4 ics, one er side (can add logic to only accet each if llm judges its right side)
    
    //setIsModalOpen(true)
    setIsOpen4Image(true)
    setLoading(false)

  }
  
  useEffect(() => {
    console.log("value of uploadedFile is: ", uploadedFile);
    console.log("value of price is: ", price)
    console.log("valye of isOpen4Image: ", isOpen4Image)
  },[uploadedFile, price, isOpen4Image])

  function toggleEmail() {
    setEmailBox(true)
  }

  async function joinWaitlist() {
      //add email to supabase database
      console.log("joinWaitlist function activated!")

      /*const { data, error } = await supabase
      .from('waitlist')
      .insert([
        { email: email },
      ])
      .select()

      if (data) {
        toast.success("Successfully added to launch waitlist")
        setEmailBox(false);
        setIsModalOpen(false);
        setUploadedFile(null);
      } else if (error) {
        toast("failed to add to launch waitlist!")
      }*/
  }


  return (
     <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4">
      <div className="max-w-4xl mx-auto py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-slate-800 mb-4">
            Image Upload
          </h1>
          <div className="space-y-4">
  <Button
              onClick={getProductThenPrice}
              disabled={loading}
              className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed text-white font-medium py-3 px-6 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-[1.02] disabled:transform-none disabled:shadow-none"
            >
              {loading ? (
                <div className="flex items-center justify-center space-x-2">
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Processing...</span>
                </div>
              ) : (
                "Get Price & Condition"
              )}
            </Button>
  
  
</div>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Upload your images with ease. Drag and drop or click to select files. 
            Support for JPG, PNG, and WebP formats.
          </p>
        </div>

        {/* Loading Status Display */}
            {loading && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 animate-in slide-in-from-top duration-300">
                <div className="flex items-center justify-center space-x-3">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                  </div>
                  <span className="text-blue-700 font-medium">Analyzing your product...</span>
                </div>
                <p className="text-center text-blue-600 text-sm mt-2">This may take a few moments</p>
              </div>
            )}

        <Modal vehicleDetails={vehicleDetails} joinWaitlist={joinWaitlist} setEmail={setEmail} emailBox={emailBox} toggleEmail={toggleEmail} product={product} condition={condition} price={price} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Basic Modal" showFooter={false}></Modal>
        
        <Modal4Image setIsOpen4Image={setIsOpen4Image} isOpen4Image={isOpen4Image} setIsModalOpen={setIsModalOpen} setPrice={setPrice} />

        <ImageUpload uploadedFile={uploadedFile} setUploadedFile={setUploadedFile} />
      </div>
    </div>
  );
}
