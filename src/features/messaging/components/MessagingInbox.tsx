'use client';

import React, { useState } from 'react';
import { Card } from '../../../components/ui/Card';
import { Button } from '../../../components/ui/Button';

export function MessagingInbox() {
  const [selectedThread, setSelectedThread] = useState<number>(0);

  const threads = [
    {
      name: 'Dr. Arthur Pendelton',
      role: 'Curator, Palais des Arts',
      lastMessage: 'Regarding the high-iron reduction firing for the biennial pavilion...',
      time: '14:20',
      unread: true,
    },
    {
      name: 'Hannah Lindau',
      role: 'Private Collector, Geneva',
      lastMessage: 'The custom wooden crate arrived in impeccable condition today!',
      time: 'Yesterday',
      unread: false,
    },
    {
      name: 'Galerie Perrotin Curation',
      role: 'Gallery Liaison',
      lastMessage: 'Reviewing the monograph layout for the upcoming fall catalog.',
      time: 'Oct 08',
      unread: false,
    },
  ];

  return (
    <div className="w-full px-5 lg:px-12 py-8 max-w-[1440px] mx-auto space-y-6">
      <div className="border-b border-[#E7E4DF] pb-6">
        <span className="font-mono text-[10px] uppercase text-[#C25E3E] tracking-widest font-semibold block">Private Dispatch</span>
        <h1 className="font-serif text-3xl md:text-4xl text-[#141413]">Studio Inquiries & Messages</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 bg-white border border-[#E7E4DF] min-h-[500px]">
        {/* Thread List */}
        <div className="md:col-span-4 border-r border-[#E7E4DF] divide-y divide-[#E7E4DF]">
          {threads.map((t, idx) => (
            <div
              key={t.name}
              onClick={() => setSelectedThread(idx)}
              className={`p-4 cursor-pointer transition-colors ${
                selectedThread === idx ? 'bg-[#FAF8F5]' : 'hover:bg-[#FAF8F5]/50'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="font-sans text-xs font-semibold text-[#141413]">{t.name}</span>
                <span className="font-mono text-[10px] text-[#716E68]">{t.time}</span>
              </div>
              <p className="font-mono text-[10px] text-[#C25E3E] mb-1">{t.role}</p>
              <p className="font-sans text-xs text-[#56423d] line-clamp-1">{t.lastMessage}</p>
            </div>
          ))}
        </div>

        {/* Conversation View */}
        <div className="md:col-span-8 p-6 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="border-b border-[#E7E4DF] pb-4 flex items-center justify-between">
              <div>
                <h3 className="font-serif text-lg text-[#141413]">{threads[selectedThread].name}</h3>
                <span className="font-mono text-xs text-[#716E68]">{threads[selectedThread].role}</span>
              </div>
              <Button size="sm" variant="outline" icon="verified">Provenance Verified</Button>
            </div>

            <div className="bg-[#FAF8F5] p-4 border border-[#E7E4DF] text-xs font-sans text-[#141413] max-w-lg">
              {threads[selectedThread].lastMessage}
            </div>
          </div>

          <div className="pt-6 border-t border-[#E7E4DF] flex items-center gap-3">
            <input
              type="text"
              placeholder="Type curatorial dispatch reply..."
              className="flex-1 bg-[#FAF8F5] border border-[#E7E4DF] px-4 py-2.5 text-xs text-[#141413] focus:outline-none"
            />
            <Button size="sm" icon="send">Send</Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MessagingInbox;
