'use client'
import ImageUpload from "./imageUpload";
import { useEffect, useState } from "react";
import { Button } from "./button";
import { toast } from "sonner";
import Modal from "./modal";
import { supabase } from "./supabase";

export default function Home() {

   

  const [uploadedFile, setUploadedFile] = useState(null);
  const [ price, setPrice ] = useState("")
  const [ product, setProduct ] = useState("")
   const [ condition, setCondition ] = useState("")
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [ emailBox, setEmailBox ] = useState(false);
  const [ email, setEmail ] = useState("");
  /*const [uploadedFile, setUploadedFile] = useState({
  file: { name: '', size: 0, type: '' },
  preview: ''
});*/

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  async function getProductThenPrice() {

    //setLoading(true)
    if (uploadedFile === null) {
    alert("Need to upload product image!")
    return null
    }

    toast("product identification triggered!")

    let formData = new FormData()
    formData.append("image", uploadedFile.file);

    const response = await fetch('https://sellermvpbackend.onrender.com/identify-image', {
      method: 'POST',
      body: formData,
    });

    let data = await response.json();
    const { product, condition } = data;
    setCondition(condition);
    setProduct(product);
    let item_name = product;
    let item_condition = condition
    console.log("value of product and condition are: ", product, condition);

    toast(`Product identified: ${product}`)
    await sleep(2000) //waits 2 seconds
    toast(`Condition identified: ${condition}`)
    
    await sleep(2000)
    toast("identifying price")
    //api call to get price
   const response2 = await fetch('https://sellermvpbackend.onrender.com/getPriceEndpoint', {//https://sellermvpbackend.onrender.com/
  method: 'POST',
  headers: {
    'Content-Type': 'application/json', // 🔥 Tell server it's JSON
  },
  body: JSON.stringify({ item_name, item_condition }),
});

    let data2 = await response2.json();
    console.log("data returned for price is: ", data2);
    toast.success("Price found!")

    setPrice(data2.lowest_price)
    setIsModalOpen(true)

  }
  
  useEffect(() => {
    console.log("value of uploadedFile is: ", uploadedFile);
  })

  function toggleEmail() {
    setEmailBox(true)
  }

  async function joinWaitlist() {
      //add email to supabase database
      console.log("joinWaitlist function activated!")

      const { data, error } = await supabase
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
      }
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
    className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-medium py-3 px-6 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-[1.02]"
  >
    Get Price & Condition
  </Button>
  
  
</div>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Upload your images with ease. Drag and drop or click to select files. 
            Support for JPG, PNG, and WebP formats.
          </p>
        </div>

        <Modal joinWaitlist={joinWaitlist} setEmail={setEmail} emailBox={emailBox} toggleEmail={toggleEmail} product={product} condition={condition} price={price} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Basic Modal" showFooter={false}></Modal>
        
        <ImageUpload uploadedFile={uploadedFile} setUploadedFile={setUploadedFile} />
      </div>
    </div>
  );
}
