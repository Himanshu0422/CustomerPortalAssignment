import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CustomerList from './components/CustomerList';
import CustomerDetails from './components/CustomerDetails';
import Navbar from './components/Navbar';

interface Customer {
  id: number;
  name: string;
  title: string;
  address: string;
}

const App: React.FC = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [selectedCustomerId, setSelectedCustomerId] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await axios.get('https://randomuser.me/api/?results=1000');
        const customerData = response.data.results.map((user: any) => ({
          id: user.id,
          name: `${user.name.first} ${user.name.last}`,
          title: user.location.timezone.description,
          address: `${user.location.street.name}, ${user.location.city}, ${user.location.country}`,
        }));
        setCustomers(customerData);
      } catch (error) {
        console.error("Error fetching customer data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCustomers();
  }, []);

  const selectedCustomer = customers.find(c => c.id === selectedCustomerId) || null;

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <Navbar />
      <div className="flex flex-1 overflow-hidden flex-col md:flex-row">
        <div className="md:w-[30%] w-full bg-white shadow-md overflow-y-scroll">
          <CustomerList
            customers={customers}
            selectedCustomerId={selectedCustomerId}
            onSelectCustomer={setSelectedCustomerId}
            loading={loading}
          />
        </div>
        <div className="md:w-[70%] w-full p-4 md:p-8 overflow-y-scroll">
          <CustomerDetails customer={selectedCustomer} />
        </div>
      </div>
    </div>
  );
};

export default App;
