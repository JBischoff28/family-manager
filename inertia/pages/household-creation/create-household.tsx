import { Head } from "@inertiajs/react";
import { useState } from "react";

export default function CreateHousehold() {

   const [form, setForm] = useState({
      name: ''
   })

   const [missingFields, setMissingFields] = useState({
      name: ''
   })

   return (
      <>
         <Head title="Create Your Household" />
         <div>

         </div>
      </>
   )
}