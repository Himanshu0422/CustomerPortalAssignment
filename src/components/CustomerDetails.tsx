import React, { useEffect, useState } from 'react';
import axios from 'axios';

export interface Customer {
  id: number;
  name: string;
  title: string;
  address: string;
}

interface CustomerDetailsProps {
  customer: Customer | null;
}

interface Photo {
  id: string;
  urls: {
    small: string;
  };
}

const ACCESS_KEY = process.env.REACT_APP_UNSPLASH_ACCESS_KEY

const CustomerDetails: React.FC<CustomerDetailsProps> = ({ customer }) => {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    let intervalId: NodeJS.Timer;
    const fetchPhotos = async () => {
      try {
        setLoading(true);
        const response = await axios.get('https://api.unsplash.com/photos/random?count=9', {
          headers: {
            Authorization: `Client-ID ${ACCESS_KEY}`
          }
        });
        setPhotos(response.data);
      } catch (error) {
        console.error("Error fetching photos:", error);
      } finally {
        setLoading(false);
      }
    };

    if (customer) {
      fetchPhotos();
      intervalId = setInterval(fetchPhotos, 10000);
    }

    return () => {
      clearInterval(intervalId);
    };
  }, [customer]);

  if (!customer) {
    return <div className="text-center text-gray-500">Please select a customer.</div>;
  }

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-2xl font-bold">{customer.name}</h2>
        <p className="text-lg text-gray-500">{customer.title}</p>
        <p className="text-md text-gray-400">{customer.address}</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {loading
          ? Array.from({ length: 9 }).map((_, index) => (
              <div
                key={index}
                className="w-full h-44 bg-gray-200 animate-pulse rounded-lg"
              />
            ))
          : photos.map((photo) => (
              <img
                key={photo.id}
                src={photo.urls.small}
                alt="Customer related"
                className="w-full h-44 object-cover rounded-lg shadow-md"
              />
            ))}
      </div>
    </div>
  );
};

export default CustomerDetails;
