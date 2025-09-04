import {
  CircleCheck,
  Circle,
  CloudDownload,
  FileDown,
  ArrowLeftIcon,
  ChevronLeft,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import type { IPO } from "../types";
import moment from "moment";
import { getRandomHexColor } from "../utils";
import jsPDF from "jspdf";
import html2canvas from "html2canvas-pro";

const steps = [
  { label: "Bidding starts", key: "startDate" },
  { label: "Bidding ends", key: "endDate" },
  { label: "Allotment finalization" },
  { label: "Refund initiation" },
  { label: "Demat transfer" },
  { label: "Listing date", key: "listingDate" },
];

export default function IPOPage() {
  const { id } = useParams();
  const [expanded, setExpanded] = useState(false);
  const [ipo, setIpo] = useState<IPO>();
  useEffect(() => {
    const fetchIPOs = async () => {
      try {
        const response = await fetch("/ipos.json");
        if (!response.ok) {
          throw new Error("Failed to fetch IPO data");
        }
        const data: IPO[] = await response.json();
        setIpo(data.find((item) => item.id === Number(id)));
      } catch (error) {
        console.error("Error fetching IPO data:", error);
      }
    };

    fetchIPOs();
  }, []);

  const handleDownloadPDF = async () => {
    const element = document.getElementById("download-section");
    if (!element) return;
    const canvas = await html2canvas(element);
    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF("p", "mm", "a4");
    const imgProps = pdf.getImageProperties(imgData);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save("ipo-details.pdf");
  };

  const previewLength = 150;
  return (
    <div className="min-h-screen p-6" id="download-section">
      <div className="text-sm text-gray-500 mb-4">
        <Link to={"/"}>Home</Link> &gt; {ipo?.name}
      </div>
      <div className="md:flex items-center justify-between bg-white p-4 rounded-2xl shadow-sm">
        <div className="flex items-center gap-3">
          <Link
            to={"/ipo-list"}
            className="border border-black/10 p-2 rounded-lg"
          >
            <ChevronLeft />
          </Link>
          <img
            src={`https://ui-avatars.com/api/?name=${
              ipo?.name
            }&background=${getRandomHexColor()}`}
            className="h-10 w-10 rounded-full"
          />
          <div>
            <h1 className="text-lg font-semibold">{ipo?.name}</h1>
            {/* <p className="text-sm text-gray-500">OYO Private Limited</p> */}
          </div>
        </div>
        <div className="flex  justify-end gap-4">
          <button
            className="cursor-pointer text-indigo-950 hover:bg-black/10 rounded-2xl p-2 "
            onClick={() => handleDownloadPDF()}
          >
            <FileDown className="size-6" />
          </button>
          <button className="bg-indigo-950 cursor-pointer text-white px-6 py-2 rounded-xl shadow hover:bg-indigo-950/90">
            Apply now
          </button>
        </div>
      </div>
      <div className="mt-6 bg-white p-6 rounded-2xl shadow-sm">
        <h2 className="text-lg font-semibold mb-4">IPO details</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm border p-6 rounded-2xl border-black/10">
          <div>
            <p className="text-gray-500 text-xs">Issue size</p>
            <p className={`font-medium`}>{ipo?.issueSize}</p>
          </div>
          <div>
            <p className="text-gray-500 text-xs">Price range</p>
            <p className={`font-medium`}>{ipo?.priceRange}</p>
          </div>
          <div>
            <p className="text-gray-500 text-xs">Minimum amount</p>
            <p className={`font-medium`}>{ipo?.minInvest}</p>
          </div>
          <div>
            <p className="text-gray-500 text-xs">Lot size</p>
            <p className={`font-medium`}>{ipo?.lots} shares/lots</p>
          </div>
          <div>
            <p className="text-gray-500 text-xs">Issue dates</p>
            <p className={`font-medium`}>
              {moment(ipo?.startDate).format("DD")} -{" "}
              {moment(ipo?.endDate).format("DD MMM yyyy")}
            </p>
          </div>
          <div>
            <p className="text-gray-500 text-xs">Listed on</p>
            <p className={`font-medium`}>
              {moment(ipo?.listingDate).format("DD MMM yyyy")}
            </p>
          </div>
          <div>
            <p className="text-gray-500 text-xs">Listed price</p>
            <p className={`font-medium`}>{ipo?.issueSize}</p>
          </div>
          {ipo?.listedGains && (
            <div>
              <p className="text-gray-500 text-xs">Listing gains</p>
              <p className={`font-medium`}>{ipo?.listedGains}</p>
            </div>
          )}
        </div>
      </div>
      <div className="mt-6 bg-white p-6 rounded-2xl shadow-sm">
        <h2 className="text-lg font-semibold mb-6">IPO timeline</h2>
        <div className="hidden md:flex relative items-center justify-between">
          {steps.map((step, idx) => {
            const activeStep =
              ipo?.status === "upcoming"
                ? -1
                : ipo?.status === "open"
                ? 0
                : ipo?.status === "closed"
                ? 4
                : ipo?.status === "listed"
                ? 5
                : 0;
            const isCompleted = idx < activeStep || activeStep === 5;
            const isActive = idx === activeStep;
            return (
              <div
                key={idx}
                className="flex-1 flex flex-col items-center relative"
              >
                <div className="relative z-10">
                  {isCompleted ? (
                    <CircleCheck className="w-8 h-8 text-green-500 bg-white" />
                  ) : isActive ? (
                    <Circle className="w-8 h-8 text-indigo-600 bg-white" />
                  ) : (
                    <Circle className="w-8 h-8 text-gray-300 bg-white" />
                  )}
                </div>

                {idx < steps.length - 1 && (
                  <div
                    className={`absolute top-4 left-1/2 w-full h-0.5 ${
                      isCompleted ? "bg-green-500" : "bg-gray-300"
                    }`}
                  />
                )}

                <div className="mt-3 text-center">
                  <p className="text-sm font-medium">{step.label}</p>
                  {step?.key ? (
                    <p className="text-xs text-gray-500">
                      {moment(ipo?.[step?.key as keyof IPO]).format(
                        "DD MMM yyyy"
                      )}
                    </p>
                  ) : (
                    <p className="text-xs text-gray-500">
                      {moment(ipo?.endDate)
                        .add(2, "days")
                        .format("DD MMM yyyy")}
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        <div className="flex md:hidden flex-col relative">
          {steps.map((step, idx) => {
            const activeStep =
              ipo?.status === "upcoming"
                ? -1
                : ipo?.status === "open"
                ? 0
                : ipo?.status === "closed"
                ? 1
                : ipo?.status === "listed"
                ? 5
                : 0;
            const isCompleted = idx < activeStep;
            const isActive = idx === activeStep;
            return (
              <div key={idx} className="flex items-start relative mb-6">
                <div className="flex flex-col items-center mr-4">
                  {isCompleted ? (
                    <CircleCheck className="w-6 h-6 text-green-500" />
                  ) : isActive ? (
                    <Circle className="w-6 h-6 text-indigo-600" />
                  ) : (
                    <Circle className="w-6 h-6 text-gray-300" />
                  )}
                  {idx < steps.length - 1 && (
                    <div
                      className={`w-0.5 h-full top-6 absolute ${
                        isCompleted ? "bg-green-500" : "bg-gray-300"
                      }`}
                    />
                  )}
                </div>

                <div>
                  <p className="text-sm font-medium">{step.label}</p>
                  {step?.key ? (
                    <p className="text-sm text-gray-500">
                      {moment(ipo?.[step?.key as keyof IPO]).format(
                        "DD MMM yyyy"
                      )}
                    </p>
                  ) : (
                    <p className="text-sm text-gray-500">
                      {moment(ipo?.endDate)
                        .add(2, "days")
                        .format("DD MMM yyyy")}
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="mt-6 bg-white p-6 rounded-2xl shadow-sm">
        <h2 className="text-lg font-semibold mb-4">About the company</h2>
        <p className="text-sm text-gray-600 leading-relaxed">
          {expanded
            ? ipo?.description
            : ipo?.description.slice(0, previewLength) +
              (ipo?.description && ipo?.description?.length > previewLength
                ? "..."
                : "")}
        </p>

        {ipo?.description && ipo?.description?.length > previewLength && (
          <button
            onClick={() => setExpanded(!expanded)}
            className="mt-2 text-blue-600 text-sm font-medium hover:underline"
          >
            {expanded ? "Read less" : "Read more"}
          </button>
        )}
      </div>
    </div>
  );
}
