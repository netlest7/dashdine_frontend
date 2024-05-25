import { useEffect, useState } from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import QRCode from 'qrcode';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { useSelector } from 'react-redux';
import { Button } from '@/components/ui/button';
import toast, { Toaster } from 'react-hot-toast';

const Qrpdf = () => {
  const {store} = useSelector(state => state.store)
  const [qrCodeUrls, setQrCodeUrls] = useState([]);

  const url = 'https://schedule-message-6ed2c.web.app';
  // const url = 'https://dash-dine.onrender.com';
  // https://dash-dine.onrender.com/api/v1/getStore/6627e97ca4651d5fe9bf6651
  useEffect(() => {
    const generateQRCodes = async () => {
      const urls = [];
      for (let i = 1; i <= store[0].store_NoOfTables; i++) {
        try {
          const qrCodeUrl = await generateQR(i, store[0]._id);
          urls.push(qrCodeUrl);
        } catch (err) {
          console.error(err);
          urls.push(''); // Placeholder for failed QR code generation
        }
      }
      setQrCodeUrls(urls);
    };
    generateQRCodes();
  }, [store]);

  const generateQR = (tableNo) => {
    return new Promise((resolve, reject) => {
      QRCode.toDataURL(`${url}/${tableNo}/${store[0]._id}`, (err, qrCodeUrl) => {
        if (err) {
          console.error(err);
          reject(err);
        } else {
          resolve(qrCodeUrl);
        }
      });
    });
  };


  
  const downloadPDF = async () => {
    const pdf = new jsPDF();
    const qrCodeWidth = 40; // Width of each QR code
    const qrCodeHeight = 40; // Height of each QR code
    const maxQRPerPage = 24; // Maximum number of QR codes per page
    let pageNumber = 1;
    let qrCount = 0;
  
    // Function to add a new page to the PDF
    const addNewPage = () => {
      pdf.addPage();
      pageNumber++;
      qrCount = 0;
    };
  
    // Render each QR code image on the PDF
    for (let i = 0; i < qrCodeUrls.length; i++) {
      if (qrCount >= maxQRPerPage) {
        // If the maximum number of QR codes per page is reached, add a new page
        addNewPage();
      }
  
      if (qrCount === 0) {
        // If it's the first QR code on the page, calculate the initial position
        const x = 10; // Initial x position
        const y = 10; // Initial y position
        pdf.setPage(pageNumber);
        pdf.setFillColor(255, 255, 255);
        pdf.rect(0, 0, pdf.internal.pageSize.getWidth(), pdf.internal.pageSize.getHeight(), 'F');
      } else {
        pdf.setPage(pageNumber);
      }
  
      // Calculate the position for the current QR code
      const x = 10 + (qrCount % 4) * (qrCodeWidth + 10); // Horizontal position
      const y = 10 + Math.floor(qrCount / 4) * (qrCodeHeight + 10); // Vertical position
  
      // Render the QR code on a canvas and insert it into the PDF
      const canvas = await html2canvas(document.querySelector(`#qr-code-${i}`));
      const imgData = canvas.toDataURL('image/png');
      pdf.addImage(imgData, 'PNG', x, y, qrCodeWidth, qrCodeHeight);
  
      qrCount++;
    }
  
    pdf.save('Dash-Dine Table QR.pdf');
    toast.success('PDF successfully downloaded!');
    

  };
  

  return (
    <div className="w-screen h-screen bg-black flex justify-center gap-0">
      <Toaster/>
       <ScrollArea className="w-[90%]">
     <div className='w-full flex  justify-center'>
     <div className="w-[60%] h-full bg-white ">

          <div className='flex flex-wrap justify-center'>

          {qrCodeUrls.map((url, index) => (
            <div className='w-[200px] auto' key={index} id={`qr-code-${index}`}>
              <img src={url} alt={`QR Code for Table ${index + 1}`} />
            </div>
          ))}


          </div>

      </div>
     </div>

       </ScrollArea>
     <Button onClick={downloadPDF}  className='m-5 bg-gradient-to-b cursor-pointer from-yellow-300 to-orange-400 border border-yellow-600 rounded-md text-black mb-9 w-22' >Download PDF</Button>

    </div>
  );
};

export default Qrpdf;
