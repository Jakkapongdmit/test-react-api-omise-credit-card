import React, { useState, useContext } from 'react';
import { ClientContext } from './contexts/ClientProvider';
import PaymentForm from './components/PaymentForm'; // Import the form component
import StatusPaymentForm from './components/StatusPaymentForm';

const App = () => {
  const backendUrl = `https://a32a-2403-6200-8831-e59b-d881-9736-89cf-46f0.ngrok-free.app`
  const [paymentLink, setPaymentLink] = useState('');
  const [statusPayment, setStatusPayment] = useState('');
  const client = useContext(ClientContext);

  // Function to handle creating the payment link
  const handleCreateLink = async  (data) => {
    console.log('====================================');
    console.log("data >>> ",data);
    console.log('====================================');
    try {
      const response = await fetch(`${backendUrl}/payment/create-link`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      const newPaymentLink = result.link || 'https://example.com/payment-link'; // Dummy fallback link
      setPaymentLink(newPaymentLink);

      appendLinkToComment(newPaymentLink);
    } catch (error) {
      console.error('Error fetching payment link:', error);
    }
  };

  const handleCheckStatus = async (data) => {
    console.log('====================================');
    console.log("Request data:", data);
    console.log('====================================');
    
    try {
      const response = await fetch(`${backendUrl}/payment/status-payment`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
  
      if (!response.ok) {
        // ตรวจสอบว่า response status ไม่ใช่ 2xx ให้ throw ข้อผิดพลาด
        const errorData = await response.json();
        throw new Error(`Error ${response.status}: ${errorData.message || 'Unknown error'}`);
      }
  
      const result = await response.json();
      console.log('====================================');
      console.log("Response data:", result);
      console.log('====================================');
  
      const status = result.link || '';
      setStatusPayment(status);
  
    } catch (error) {
      // แสดง error log ในกรณีที่มีข้อผิดพลาด
      // console.error('Error fetching CheckStatus:', error.message);
      
      setStatusPayment(error.message);
      
    }
  };
  

  // Function to append link to Zendesk comment
  const appendLinkToComment = (link) => {
    client.invoke('ticket.comment.appendText', link)
      .then(() => {
        console.log('ลิงก์ถูกใส่ในช่องข้อความเรียบร้อยแล้ว');
      })
      .catch((error) => {
        console.error('เกิดข้อผิดพลาด:', error);
      });
  };

  return (
    <div>
      <PaymentForm onCreateLink={handleCreateLink} /> {/* Use the form component */}

      {/* Display the created link */}
      {paymentLink && (
        <div>
          <p>ลิงก์ที่สร้าง: <a href={paymentLink} target="_blank" rel="noopener noreferrer">{paymentLink}</a></p>
        </div>
      )}
      
      <StatusPaymentForm onCheckStatus={handleCheckStatus} /> {/* Use the form component */}
      {/* Display the created link */}
      {statusPayment && (
        <div>
          <p>ลิงก์ที่สร้าง: <p>{statusPayment}</p></p>
        </div>
      )}
    </div>
  );
};

export default App;
