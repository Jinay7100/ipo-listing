import { useEffect, useState } from 'react'
import type { IPO } from '../types';

const IpoListing = () => {
    const [ipos, setIpos] = useState<IPO[]>([]);

    useEffect(() => {
        const fetchIPOs = async () => {
            try {
                const response = await fetch("/ipos.json");
                if (!response.ok) {
                    throw new Error("Failed to fetch IPO data");
                }
                const data:IPO[] = await response.json();
                setIpos(data);
            } catch (error) {
                console.error("Error fetching IPO data:", error);
            }
        };

        fetchIPOs();
    }, []);
    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">IPO List</h1>
            <div className="grid gap-4 md:grid-cols-4 bg-black/10 px-4 py-2 text-black/70">
                <div className="">
                    Whereas 
                </div>
                <div className="">
                    Issue size
                </div>
                <div className="">
                    Price Range
                </div>
                <div className="">
                    Min Invest/qty
                </div>
            </div>
            <div className="grid gap-4 md:grid-cols-4 px-4 py-4 border-l border-r border-black/10">
                
                {ipos.map((ipo) => (
                    // <div key={ipo.id} className="border p-4 rounded-lg shadow">
                    <><h2 className=" flex flex-col"><div className="font-bold text-lg">
                        {ipo.name}</div>
                        <div className="text-black/50">{ipo.startDate}-{ipo.endDate}</div>
                    </h2>
                        <p>{ipo.issueSize}</p>
                        <p>{ipo.priceRange}</p>
                        <div className='flex flex-col'>
                            <p>{ipo.minInvest}</p>
                        <p className='text-black/50'>{ipo.lots} shares</p>
                        </div>
                    </>
                    // </div>
                ))}
            </div>
        </div>
  )
}

export default IpoListing