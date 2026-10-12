'use client';

import React from 'react';
import { Card } from '../../../../components/ui/Card';
import { Button } from '../../../../components/ui/Button';

export default function StudioSettingsPage() {
  return (
    <div className="w-full px-5 lg:px-12 py-8 max-w-[1440px] mx-auto space-y-6">
      <div className="border-b border-[#E7E4DF] pb-6">
        <span className="font-mono text-[10px] uppercase text-[#C25E3E] tracking-widest font-semibold block">Configuration</span>
        <h1 className="font-serif text-3xl md:text-4xl text-[#141413]">Studio & Profile Settings</h1>
        <p className="font-sans text-xs text-[#716E68] mt-1">
          Manage your sovereign handle, custom domain DNS, and MongoDB credentials.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card className="space-y-4">
          <h3 className="font-serif text-xl text-[#141413]">Atelier Profile Identity</h3>
          <div className="space-y-3">
            <div>
              <label className="block font-mono text-[10px] uppercase text-[#716E68] mb-1">Artist Name</label>
              <input defaultValue="Elena Vance" className="w-full bg-[#FAF8F5] border border-[#E7E4DF] p-2.5 text-xs text-[#141413] focus:outline-none" />
            </div>
            <div>
              <label className="block font-mono text-[10px] uppercase text-[#716E68] mb-1">Handle</label>
              <input defaultValue="elenavance" className="w-full bg-[#FAF8F5] border border-[#E7E4DF] p-2.5 text-xs font-mono text-[#141413] focus:outline-none" />
            </div>
            <div>
              <label className="block font-mono text-[10px] uppercase text-[#716E68] mb-1">Curatorial Statement</label>
              <textarea rows={3} defaultValue="Investigating geological fractures through high-iron stoneware reduction." className="w-full bg-[#FAF8F5] border border-[#E7E4DF] p-2.5 text-xs text-[#141413] focus:outline-none" />
            </div>
          </div>
          <Button size="sm">Save Changes</Button>
        </Card>

        <Card className="space-y-4">
          <h3 className="font-serif text-xl text-[#141413]">Cloudinary & Media Ingestion</h3>
          <p className="font-sans text-xs text-[#56423d]">
            Connected Cloudinary bucket for lossless RAW, TIFF, and high-res JPEG uploads.
          </p>
          <div className="p-4 bg-[#FAF8F5] border border-[#E7E4DF] space-y-2 font-mono text-xs">
            <div className="flex justify-between">
              <span className="text-[#716E68]">Cloud Name:</span>
              <span className="text-[#141413] font-semibold">atelier-production</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#716E68]">Status:</span>
              <span className="text-emerald-700 font-semibold">Connected</span>
            </div>
          </div>
          <Button variant="outline" size="sm">Test Media Connection</Button>
        </Card>
      </div>
    </div>
  );
}
