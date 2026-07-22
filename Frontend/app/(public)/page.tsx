"use client"

import React, { useState, useEffect } from 'react'


type Props = {}

type ApplicationData = {
    id: number;
    event_name: string;
    status: string;
    deadline: string;
    organization: {
        organization_name: string;
    };
};

const ManageApplication = (props: Props) => {
    
    const [applications, setApplications] = useState<ApplicationData[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [errorMsg, setErrorMsg] = useState<string | null>(null);

    useEffect(() => {

        const fetchApplications = async () => {
            try {
                const response = await fetch('http://localhost:3000/api/applications');

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const dataJSON = await response.json();

                setApplications(dataJSON.data);
            }
            catch (error : any) {
                setErrorMsg(error.message);
            }
            finally {
                setIsLoading(false);
            }
        };
        fetchApplications();
    }, []);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (errorMsg) {
        return <div>Error: {errorMsg}</div>;
    }

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6 text-slate-800">Daftar Pengajuan Masuk</h1>
      
      <div className="overflow-x-auto bg-white shadow-md rounded-lg">
        <table className="min-w-full table-auto">
          <thead className="bg-slate-100">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold text-slate-600">ID</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-slate-600">Organisasi</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-slate-600">Nama Acara</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-slate-600">Status</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-slate-600">Aksi</th>
            </tr>
          </thead>
          <tbody>
            
            {/* 5. Looping Data menggunakan .map() */}
            {applications.map((app) => (
              <tr key={app.id} className="border-b hover:bg-slate-50 transition-colors">
                <td className="px-6 py-4 text-sm text-slate-700">#{app.id}</td>
                <td className="px-6 py-4 text-sm font-medium text-slate-900">{app.organization.organization_name}</td>
                <td className="px-6 py-4 text-sm text-slate-700">{app.event_name}</td>
                <td className="px-6 py-4 text-sm font-bold">
                  {/* Warna dinamis berdasarkan status */}
                  <span className={`px-3 py-1 rounded-full text-xs ${
                    app.status === 'Under Review' ? 'bg-yellow-100 text-yellow-700' :
                    app.status === 'Approved' ? 'bg-green-100 text-green-700' :
                    'bg-slate-200 text-slate-700'
                  }`}>
                    {app.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm">
                  <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded shadow-sm text-xs font-semibold">
                    Detail
                  </button>
                </td>
              </tr>
            ))}
            
            {/* Jika array kosong setelah difetch */}
            {applications.length === 0 && (
              <tr>
                <td colSpan={5} className="px-6 py-10 text-center text-slate-500">
                  Belum ada pengajuan masuk.
                </td>
              </tr>
            )}

          </tbody>
        </table>
      </div>
    </div>
  )
}

export default ManageApplication

