import type{ FC,ChangeEvent } from 'react';
import BillRow from './BillRow.tsx'
import type{ BillData, Item } from './BillGenerator.tsx';

interface BillFormProps {
  billData: BillData;
  handleCustomerChange: (key: keyof BillData, value: string | number) => void;
  handleAddItem: () => void;
  handleRemoveItem: (index: number) => void;
  handleItemChange: (index: number, key: keyof Item, value: string | number) => void;
  handlePrint: () => void;
}

const BillForm: FC<BillFormProps> = ({ 
  billData, 
  handleCustomerChange, 
  handleAddItem, 
  handleRemoveItem, 
  handleItemChange,
  handlePrint
}) => {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="p-4 border border-gray-300 rounded-md">
          <h2 className="font-semibold text-lg mb-2">Customer Details</h2>
          <div className="mb-2">
            <label className="block text-sm font-medium text-gray-700">Bill To:</label>
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 text-black"
              value={billData.customerName}
              onChange={(e: ChangeEvent<HTMLInputElement>) => handleCustomerChange('customerName', e.target.value)}
            />
          </div>
          <div className="mb-2">
            <label className="block text-sm font-medium text-gray-700">Contact No:</label>
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 text-black"
              value={billData.customerContact}
              onChange={(e: ChangeEvent<HTMLInputElement>) => handleCustomerChange('customerContact', e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">State:</label>
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 text-black"
              value={billData.customerState}
              onChange={(e: ChangeEvent<HTMLInputElement>) => handleCustomerChange('customerState', e.target.value)}
            />
          </div>
        </div>
        
        <div className="p-4 border border-gray-300 rounded-md">
          <h2 className="font-semibold text-lg mb-2">Invoice Details</h2>
          <div className="mb-2">
            <label className="block text-sm font-medium text-gray-700">No:</label>
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 text-black"
              value={billData.invoiceNo}
              onChange={(e: ChangeEvent<HTMLInputElement>) => handleCustomerChange('invoiceNo', e.target.value)}
            />
          </div>
          <div className="mb-2">
            <label className="block text-sm font-medium text-gray-700">Date:</label>
            <input
              type="date"
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 text-black"
              value={billData.invoiceDate}
              onChange={(e: ChangeEvent<HTMLInputElement>) => handleCustomerChange('invoiceDate', e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Place Of Supply:</label>
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 text-black"
              value={billData.placeOfSupply}
              onChange={(e: ChangeEvent<HTMLInputElement>) => handleCustomerChange('placeOfSupply', e.target.value)}
            />
          </div>
        </div>
      </div>
      
      <h2 className="font-semibold text-lg mb-2">Items</h2>
      <div className="grid grid-cols-[30px_1fr_80px_80px_80px_1fr_40px] w-full mb-2 font-bold text-sm text-gray-700">
        <div className="flex items-center justify-center">#</div>
        <div className="flex items-center">Item Name</div>
        <div className="flex items-center justify-center">Quantity</div>
        <div className="flex items-center justify-center">Unit</div>
        <div className="flex items-center justify-center">Price/Unit</div>
        <div className="flex items-center justify-center">Amount</div>
        <div className="flex items-center justify-center"></div>
      </div>
      {billData.items.map((item, index) => (
        <BillRow
          key={index}
          index={index}
          item={item}
          onChange={handleItemChange}
          onRemove={handleRemoveItem}
        />
      ))}

      <div className="flex justify-end mt-4">
        <button
          onClick={handleAddItem}
          className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
        >
          Add Item
        </button>
      </div>
      
      <div className="flex justify-end mt-4">
        <div className="w-80">
          <div className="flex justify-between border-b py-1">
            <div className="font-semibold">Sub Total</div>
            <div>Rs. {billData.subTotal?.toFixed(2)}</div>
          </div>
          <div className="flex items-center justify-between py-1">
              <label htmlFor="discount" className="font-semibold">Discount (%)</label>
              <input
                  type="number"
                  id="discount"
                  className="w-20 p-1 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 text-black text-right"
                  value={billData.discountPercent}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => handleCustomerChange('discountPercent', parseFloat(e.target.value) || 0)}
              />
          </div>
          <div className="flex justify-between border-b py-1">
            <div className="font-semibold">Discount Amount</div>
            <div>Rs. {billData.discountAmount?.toFixed(2)}</div>
          </div>
          <div className="flex justify-between pt-4 font-bold text-lg">
            <div>Total</div>
            <div>Rs. {billData.total?.toFixed(2)}</div>
          </div>
        </div>
      </div>

      <div className="flex justify-center mt-8">
        <button
          onClick={handlePrint}
          className="px-6 py-3 bg-blue-600 text-white rounded-md shadow-md hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-500"
        >
          Generate PDF
        </button>
      </div>
    </>
  );
};

export default BillForm;