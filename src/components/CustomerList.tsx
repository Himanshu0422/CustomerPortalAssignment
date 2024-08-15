import React from "react";
import { Customer } from "./CustomerDetails";
import { FixedSizeList as List } from "react-window";
import { ShimmerTitle, ShimmerText } from "react-shimmer-effects";

interface CustomerListProps {
  customers: Customer[];
  selectedCustomerId: number | null;
  onSelectCustomer: (customerId: number) => void;
  loading: boolean;
}

const CustomerList: React.FC<CustomerListProps> = ({
  customers,
  selectedCustomerId,
  onSelectCustomer,
  loading,
}) => {
  const rowHeight = 80;

  const Row = ({ index, style }: { index: number; style: React.CSSProperties }) => {
    if (loading) {
      return (
        <div
          style={{
            ...style,
            height: rowHeight,
            display: 'flex',
            alignItems: 'center',
            padding: '10px',
            boxSizing: 'border-box',
          }}
          className="cursor-pointer hover:bg-gray-200"
        >
          <div className="flex flex-col w-full mt-10">
            <ShimmerTitle className="my-2" line={1} gap={10} variant="primary" />
            <ShimmerText className="mt-1" line={1} gap={10} />
          </div>
        </div>
      );
    }

    const customer = customers[index];
    return (
      <div
        style={{
          ...style,
          height: rowHeight,
          display: 'flex',
          alignItems: 'center',
          padding: '10px',
          boxSizing: 'border-box',
        }}
        key={customer.id}
        className={`cursor-pointer ${
          selectedCustomerId === customer.id ? "bg-gray-300" : "hover:bg-gray-200"
        }`}
        onClick={() => onSelectCustomer(customer.id)}
      >
        <div className="flex flex-col">
          <h3 className="text-lg font-semibold">{customer.name}</h3>
          <p className="text-sm text-gray-500">{customer.title}</p>
        </div>
      </div>
    );
  };

  return (
    <List
      height={window.innerHeight}
      itemCount={loading ? 10 : customers.length}
      itemSize={rowHeight}
      width={"100%"}
    >
      {Row}
    </List>
  );
};

export default CustomerList;
