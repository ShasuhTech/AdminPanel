// const React = require('react');
// const { useState } = require('react');
// // const jsPDF = require('jspdf');
// const html2canvas = require('html2canvas');
// const { Close } = require('mdi-material-ui');
// const { Tooltip } = require('antd');
// import jsPDF from "jspdf";

// const fields = [
//     "Title",
//   "Admission No",
//   "TCNo",
//   "Student Name",
//   "Father Name",
//   "Mother Name",
//   "Class Name",
//   "Date of Leaving",
//   "TC Applied On",
//   "TC Date",
//   "TC Reason",
//   "Fee Paid Remarks",
// ];

// const CertificateSetting = () => {
//   const [certificateType, setCertificateType] = useState(
//     "Transfer Certificate"
//   );
//   const [certificateName, setCertificateName] = useState("");
//   const [template, setTemplate] = useState(null);
//   const [settings, setSettings] = useState({
//     header: false,
//     headerBorder: false,
//     backgroundLogo: false,
//     lineStyle: false,
//   });
//   const [dynamicFields, setDynamicFields] = useState([]);

//   const handleSave = () => {
//     console.log("Save clicked");
//   };

//   const handleDelete = () => {
//     console.log("Delete clicked");
//   };

//   const handleCancel = () => {
//     console.log("Cancel clicked");
//   };

//   const handleTemplateClick = (template) => {
//     setTemplate(template);
//     console.log(`Template ${template} clicked`);
//   };

//   const handleSettingChange = (e) => {
//     setSettings({
//       ...settings,
//       [e.target.name]: e.target.checked,
//     });
//   };

//   const handleDynamicFieldClick = (field) => {
//     if (!dynamicFields.includes(field)) {
//       setDynamicFields([...dynamicFields, field]);
//     }
//     console.log(`${field} clicked`);
//   };

//   const downloadPdf = () => {
//     const input = document.getElementById("pdf-content");
//     html2canvas(input).then((canvas) => {
//       const imgData = canvas.toDataURL("image/png");
//       const pdf = new jsPDF("p", "mm", "a4");
//       const imgProps = pdf.getImageProperties(imgData);
//       const pdfWidth = pdf.internal.pageSize.getWidth();
//       const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

//       pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
//       pdf.save("certificate-settings.pdf");
//     });
//   };
//   const [hoveredIndex, setHoveredIndex] = useState(null);

//   const handleRemoveOption = (indexToRemove) => {
//     setDynamicFields((prevFields) =>
//       prevFields.filter((_, index) => index !== indexToRemove)
//     );
//   };

//   return (
//     <div className="p-4  ">
//       <div className="p-4 bg-white rounded-b-lg shadow-md">
//         <div className="grid grid-cols-3 gap-4 mb-4">
//           <div>
//             <label
//               htmlFor="certificateType"
//               className="block text-sm font-medium text-zinc-700"
//             >
//               Certificate Type
//             </label>
//             <input
//               type="text"
//               id="certificateType"
//               className="mt-1 block w-full p-2 border border-zinc-300 rounded-md"
//               value={certificateType}
//               onChange={(e) => setCertificateType(e.target.value)}
//             />
//           </div>
//           <div>
//             <label
//               htmlFor="existCertificate"
//               className="block text-sm font-medium text-zinc-700"
//             >
//               Exist Certificate
//             </label>
//             <select
//               id="existCertificate"
//               className="mt-1 block w-full p-2 border border-zinc-300 rounded-md"
//             >
//               <option>-- Select Certificate --</option>
//             </select>
//           </div>
//           <div>
//             <label
//               htmlFor="certificateName"
//               className="block text-sm font-medium text-zinc-700"
//             >
//               Certificate Name
//             </label>
//             <input
//               type="text"
//               id="certificateName"
//               className="mt-1 block w-full p-2 border border-zinc-300 rounded-md"
//               placeholder="Certificate Name"
//               value={certificateName}
//               onChange={(e) => setCertificateName(e.target.value)}
//             />
//           </div>
//         </div>

//         <div className="flex justify-between gap-5 my-[70px]">
//           <div
//             id="pdf-content"
//             className="w-[70%] border rounded-lg p-12 h-[100%] shadow-xl"
//           >
//             <div className="my-9 border-b-2">
//               <div className=''>
//               <img
//                 src="/images/avatar.png"
//                 alt="School Logo"
//                 className="float-left object-contain h-[120px] w-[120px] mr-4 border rounded-full"
//               />
//               </div>
//               <div>
//                 <h3 className="text-center text-xl font-bold">
//                   THE HERITAGE SCHOOL
//                 </h3>
//                 <p className="text-center my-4 mb-6">
//                   994, MADURDAHA, CHOWBAGA ROAD, ANANDAPUR
//                   <br />
//                   KOLKATA
//                   <br />
//                   WEST BENGAL
//                   <br />
//                   <p className="italic font-semibold my-4">
//                     {" "}
//                     Affiliated to Council for the Indian School Certificate
//                     Examinations, New Delhi
//                   </p>
//                 </p>
//               </div>
//             </div>

//             <div className="mb-4 px-10">
//               {dynamicFields.map((field, index) => (
//                 <div
//                   key={index}
//                   className="flex justify-between my-4 items-center relative"
//                   style={{ position: "relative" }}
//                   onMouseEnter={() => setHoveredIndex(index)}
//                   onMouseLeave={() => setHoveredIndex(null)}
//                 >
//                   <div className="w-[50%]">
//                     <span className="text-xl w-full">
//                       {index + 1}. {field}
//                     </span>
//                   </div>
//                   <div className="w-[50%] flex items-center gap-2">
//                     <p>:</p>
//                     <input className="border-b-2 outline-none text-[18px] w-[90%]" />
//                   </div>
//                   {hoveredIndex === index && (
//                     <div className="absolute right-0 top-0">
//                       <Tooltip title="Remove Row">
//                         <Close
//                           className="cursor-pointer"
//                           onClick={() => handleRemoveOption(index)}
//                         />
//                       </Tooltip>
//                     </div>
//                   )}
//                 </div>
//               ))}
//             </div>
//           </div>

//           <div className="w-[30%]">
//             <div className="bg-zinc-100 p-4 rounded-md">
//               <h4 className="font-bold mb-2">Settings</h4>
//               <div className="space-y-2">
//                 {["header", "headerBorder", "Logo", "lineStyle"].map(
//                   (setting) => (
//                     <label key={setting} className="flex items-center">
//                       <input
//                         type="checkbox"
//                         name={setting}
//                         className="form-checkbox"
//                         checked={settings[setting]}
//                         onChange={handleSettingChange}
//                       />
//                       <span className="ml-2 text-[16px]">
//                         {setting.charAt(0).toUpperCase() + setting.slice(1)}
//                       </span>
//                     </label>
//                   )
//                 )}
//               </div>
//             </div>

//             <div className="bg-zinc-100 p-4 rounded-md mt-4">
//               <h4 className="font-bold mb-2">Dynamic Field</h4>
//               <p className="text-sm text-green-600 mb-2">
//                 (Double click to add these fields)
//               </p>
//               <div className="space-y-2">
//                 {fields.map((field) => (
//                   <button
//                     key={field}
//                     className="block w-full text-left p-2 border border-zinc-300 rounded-md"
//                     onDoubleClick={() => handleDynamicFieldClick(field)}
//                   >
//                     {field}
//                   </button>
//                 ))}
//               </div>
//             </div>
//           </div>
//         </div>

//         <div className="flex justify-end space-x-2">
//           <button
//             className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
//             onClick={handleSave}
//           >
//             Save
//           </button>
//           <button
//             className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
//             onClick={handleDelete}
//           >
//             Delete
//           </button>
//           <button
//             className="bg-zinc-500 text-white px-4 py-2 rounded-md hover:bg-zinc-600"
//             onClick={handleCancel}
//           >
//             Cancel
//           </button>
//           <button
//             className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
//             onClick={downloadPdf}
//           >
//             Download PDF
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// module.exports = CertificateSetting;
"use client"
import React from 'react'

const CertificateSetting = () => {
  return (
    <div>CertificateSetting</div>
  )
}

export default CertificateSetting
