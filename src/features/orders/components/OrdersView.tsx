'use client';

import React from 'react';
import { Card } from '../../../components/ui/Card';
import { Badge } from '../../../components/ui/Badge';
import { Button } from '../../../components/ui/Button';

export function OrdersView() {
  const orders = [
    {
      id: 'ORD-9821',
      collector: 'Hannah Lindau',
      item: 'Tectonic Vessel No. 04 (Original)',
      amount: '$4,200 USD',
      destination: 'Geneva, CH',
      status: 'Shipped (Crated)',
      tracking: 'DHL-EX-99201481',
      date: 'Oct 10, 2024',
    },
    {
      id: 'ORD-9818',
      collector: 'David Wei',
      item: 'Limited Edition Archival Print 04/25',
      amount: '$380 USD',
      destination: 'San Francisco, USA',
      status: 'Processing',
      tracking: 'Pending Label',
      date: 'Oct 09, 2024',
    },
    {
      id: 'ORD-9804',
      collector: 'Claire Dupont',
      item: 'Basalt Urn IV Study (Original)',
      amount: '$3,800 USD',
      destination: 'Paris, FR',
      status: 'Delivered',
      tracking: 'FEDEX-FR-881920',
      date: 'Oct 02, 2024',
    },
  ];

  return (
    <div className="w-full px-5 lg:px-12 py-8 max-w-[1440px] mx-auto space-y-6">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#E7E4DF] pb-6">
        <div>
          <span className="font-mono text-[10px] uppercase text-[#C25E3E] tracking-widest font-semibold block">Commerce & Fulfillment</span>
          <h1 className="font-serif text-3xl md:text-4xl text-[#141413]">Orders & Acquisitions</h1>
          <p className="font-sans text-xs text-[#716E68] mt-1">
            Track fine art crating, international insured freight, and print edition fulfillments.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="secondary" size="sm" icon="filter_list">Filter</Button>
          <Button variant="primary" size="sm" icon="local_shipping">Shipment Registry</Button>
        </div>
      </div>

      <div className="bg-white border border-[#E7E4DF] overflow-x-auto">
        <table className="w-full text-left font-sans text-xs">
          <thead className="bg-[#FAF8F5] border-b border-[#E7E4DF] font-mono text-[10px] uppercase text-[#716E68]">
            <tr>
              <th className="p-4">Order ID</th>
              <th className="p-4">Collector</th>
              <th className="p-4">Artwork / Edition</th>
              <th className="p-4">Destination</th>
              <th className="p-4">Amount</th>
              <th className="p-4">Status</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#E7E4DF]">
            {orders.map((o) => (
              <tr key={o.id} className="hover:bg-[#FAF8F5]/50 transition-colors">
                <td className="p-4 font-mono text-xs text-[#141413] font-semibold">{o.id}</td>
                <td className="p-4">{o.collector}</td>
                <td className="p-4 text-[#56423d]">{o.item}</td>
                <td className="p-4 font-mono text-[11px] text-[#716E68]">{o.destination}</td>
                <td className="p-4 font-mono text-xs font-semibold text-[#141413]">{o.amount}</td>
                <td className="p-4">
                  <Badge variant={o.status.startsWith('Delivered') ? 'success' : 'accent'}>{o.status}</Badge>
                </td>
                <td className="p-4 text-right">
                  <Button size="sm" variant="outline">View Dossier</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default OrdersView;
