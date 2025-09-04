import { useEffect, useState } from "react";
import type { IPO } from "../types";
import Pagination from "../components/Pagination";
import { Link } from "react-router-dom";
import { getRandomHexColor } from "../utils";
import moment from "moment";

const IpoListing = () => {
  const [ipos, setIpos] = useState<IPO[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchIPOs = async () => {
      try {
        const response = await fetch("/ipos.json");
        if (!response.ok) {
          throw new Error("Failed to fetch IPO data");
        }
        const data: IPO[] = await response.json();
        setIpos(data);
      } catch (error) {
        console.error("Error fetching IPO data:", error);
      }
    };

    fetchIPOs();
  }, []);

  const totalPages = Math.ceil(ipos.length / 10);
  const startIndex = (currentPage - 1) * 10;
  const currentData = ipos.slice(startIndex, startIndex + 10);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">IPO List</h1>
      <div className="hidden md:grid gap-4 md:grid-cols-5 bg-black/10 px-4 py-4 rounded-t-md text-black/70 font-medium mt-6">
        <div>Whereas</div>
        <div>Issue Size</div>
        <div>Price Range</div>
        <div>Min Invest / Qty</div>
        <div>Status</div>
      </div>

      <section className="divide-y divide-black/10 border-l border-r border-black/10">
        {currentData.map((ipo, i) => (
          <Link
            to={"/ipo/" + ipo.id}
            key={ipo.id}
            className={`grid gap-4 px-4 py-4 hover:bg-black/5 bg-white transition-colors md:grid-cols-5 ${
              i === currentData.length - 1
                ? "border-b border-black/10"
                : i === 0
                ? "border-t border-black/10"
                : ""
            }`}
          >
            <div className="flex gap-4 items-center">
              <img
                src={`https://ui-avatars.com/api/?name=${
                  ipo?.name
                }&background=${getRandomHexColor()}`}
                className="h-12 w-12 rounded-full"
              />
              <div className="flex flex-col">
                <span className="font-semibold text-lg">{ipo.name}</span>
                <span className="text-black/50 text-sm">
                  {moment(ipo?.startDate).format("DD")} -{" "}
                  {moment(ipo?.endDate).format("DD MMM yyyy")}
                </span>
              </div>
            </div>

            <div className="flex items-center md:justify-start justify-between">
              <span className="md:hidden font-medium text-black/50">
                Issue Size:
              </span>
              {ipo.issueSize}
            </div>

            <div className="flex items-center md:justify-start justify-between">
              <span className="md:hidden font-medium text-black/50">
                Price Range:
              </span>
              {ipo.priceRange}
            </div>

            <div className="flex md:items-start items-end justify-between">
              <span className="md:hidden font-medium text-black/50">
                Minimum Investment:
              </span>
              <div className="flex flex-col">
                <span>{ipo.minInvest}</span>
                <span className="text-black/50 text-sm">{ipo.lots} shares</span>
              </div>
            </div>

            <div className="flex md:items-start items-end justify-between capitalize">
              <span className="md:hidden font-medium text-black/50">
                Status:
              </span>
              <div className="rounded-md p-2 bg-black/10 min-w-24 text-center">
                {ipo.status}
              </div>
            </div>
          </Link>
        ))}
      </section>

      <div className="mt-6">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
};

export default IpoListing;
