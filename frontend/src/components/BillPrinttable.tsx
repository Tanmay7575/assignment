import { forwardRef } from "react";
import type { BillData } from "./BillGenerator.tsx";

interface BillPrintableProps {
  billData: BillData;
}

const BillPrintable = forwardRef<HTMLDivElement, BillPrintableProps>(
  ({ billData }, ref) => {
    return (
      <div
        ref={ref}
        className="p-8 font-sans bg-white border border-gray-300 max-w-4xl mx-auto shadow-lg overflow-hidden"
      >
        {/* Title + Stamp */}
        <div className="relative flex items-center justify-end mb-5">
          {/* Centered Title */}
          <span className="absolute left-1/2 transform -translate-x-1/2 text-xl font-bold">
            Bill of Supply
          </span>

          {/* Stamp on the right */}
          <div className="w-32 h-32 flex-shrink-0">
            <img
              src="assets/stamp1.png"
              alt="Stamp"
              className="w-full h-full object-contain"
            />
          </div>
        </div>

        {/* Company Info */}
        <div className="flex justify-between items-start mb-6 border border-gray-300 p-4 rounded-md">
          <div>
            <div className="font-bold text-2xl">VRUNDAVAN PRINT ART</div>
            <div className="text-sm text-gray-600">
              Khedekar Mala, Uruli Kanchan <br />
              Pune - 412202
            </div>
            <div className="text-sm text-gray-600">Phone: 7796406875/9022489064</div>
          </div>
        </div>

        {/* Bill To + Invoice Details */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="border border-gray-300 p-4 rounded-md">
            <div className="font-bold text-lg mb-2">Bill To:</div>
            <div className="font-semibold">{billData.customerName}</div>
            <div className="text-sm">Contact No: {billData.customerContact}</div>
            <div className="text-sm">State: {billData.customerState}</div>
          </div>
          <div className="border border-gray-300 p-4 rounded-md">
            <div className="font-bold text-lg mb-2">Invoice Details:</div>
            <div className="text-sm">No: {billData.invoiceNo}</div>
            <div className="text-sm">Date: {billData.invoiceDate}</div>
            <div className="text-sm">Due Date: {billData.invoiceDueDate}</div>
            <div className="text-sm">Place Of Supply: {billData.placeOfSupply}</div>
          </div>
        </div>

        {/* Items Table */}
        <div className="border border-gray-300 rounded-md overflow-hidden mb-6">
          <table className="w-full border-collapse text-sm">
            <thead className="bg-gray-100 font-bold text-gray-700">
              <tr>
                <th className="border px-2 py-2 w-8">#</th>
                <th className="border px-2 py-2 text-left">Item name</th>
                <th className="border px-2 py-2 text-center w-20">Quantity</th>
                <th className="border px-2 py-2 text-center w-20">Unit</th>
                <th className="border px-2 py-2 text-right w-28">Price/ Unit(Rs)</th>
                <th className="border px-2 py-2 text-right w-28">Amount(Rs)</th>
              </tr>
            </thead>
            <tbody>
              {billData.items.map((item, index) => (
                <tr key={index}>
                  <td className="border px-2 py-2 text-center">{index + 1}</td>
                  <td className="border px-2 py-2">{item.name}</td>
                  <td className="border px-2 py-2 text-center">{item.quantity}</td>
                  <td className="border px-2 py-2 text-center">{item.unit}</td>
                  <td className="border px-2 py-2 text-right">{item.price.toFixed(2)}</td>
                  <td className="border px-2 py-2 text-right">{(item.quantity * item.price).toFixed(2)}</td>
                </tr>
              ))}

              {/* Sub Total */}
              <tr>
                <td colSpan={5} className="border px-2 py-2 text-right">Sub Total</td>
                <td className="border px-2 py-2 text-right">Rs. {billData.subTotal?.toFixed(2)}</td>
              </tr>

              {/* Discount */}
              <tr>
                <td colSpan={5} className="border px-2 py-2 text-right">
                  Discount ({billData.discountPercent}%)
                </td>
                <td className="border px-2 py-2 text-right">Rs. {billData.discountAmount?.toFixed(2)}</td>
              </tr>

              {/* Total */}
              <tr>
                <td colSpan={5} className="border px-2 py-2 font-bold text-right">Total</td>
                <td className="border px-2 py-2 font-bold text-right">Rs. {billData.total?.toFixed(2)}</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Terms & Amount in Words + Stamp */}
        <div className="border border-gray-300 p-4 rounded-md mt-4 flex justify-between items-start flex-nowrap">
          {/* Terms / Amount in Words */}
          <div className="flex-1">
            <div className="font-bold mb-1">Invoice Amount in Words:</div>
            <div className="italic">{billData.totalInWords}</div>
          </div>

          {/* Stamp */}
          <div className="w-32 ml-4 flex-shrink-0">
            <img
              src="assets/stamp.png"
              alt="Stamp"
              className="w-full h-auto object-contain"
            />
          </div>
        </div>
      </div>
    );
  }
);

export default BillPrintable;

