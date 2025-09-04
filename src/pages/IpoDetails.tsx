import { CircleCheck, Circle } from "lucide-react";

export default function IPOPage() {
  const activeStep = 3;

  const steps = [
    { label: "Bidding starts", date: "12 Dec 2023" },
    { label: "Bidding ends", date: "15 Dec 2023" },
    { label: "Allotment finalization", date: "18 Dec 2023" },
    { label: "Refund initiation", date: "18 Dec 2023" },
    { label: "Demat transfer", date: "18 Dec 2023" },
    { label: "Listing date", date: "21 Dec 2023" },
  ];

  return (
    <div className="min-h-screen p-6">
      <div className="text-sm text-gray-500 mb-4">Home &gt; Market watch</div>
      <div className="flex items-center justify-between bg-white p-4 rounded-2xl shadow-sm">
        <div className="flex items-center gap-3">
          <div className="h-12 w-12 rounded-full bg-red-600 flex items-center justify-center text-white font-bold">
            OYO
          </div>
          <div>
            <h1 className="text-lg font-semibold">OYO</h1>
            <p className="text-sm text-gray-500">OYO Private Limited</p>
          </div>
        </div>
        <button className="bg-indigo-600 text-white px-6 py-2 rounded-xl shadow hover:bg-indigo-700">
          Apply now
        </button>
      </div>
      <div className="mt-6 bg-white p-6 rounded-2xl shadow-sm">
        <h2 className="text-lg font-semibold mb-4">IPO details</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          <div>
            <p className="text-gray-500 text-xs">Issue size</p>
            <p className={`font-medium`}>₹3,600 - 3,700 Cr.</p>
          </div>
          <div>
            <p className="text-gray-500 text-xs">Price range</p>
            <p className={`font-medium`}>₹100 - 200</p>
          </div>
          <div>
            <p className="text-gray-500 text-xs">Minimum amount</p>
            <p className={`font-medium`}>₹50,000</p>
          </div>
          <div>
            <p className="text-gray-500 text-xs">Lot size</p>
            <p className={`font-medium`}>150 shares/lots</p>
          </div>
          <div>
            <p className="text-gray-500 text-xs">Issue dates</p>
            <p className={`font-medium`}>12 Dec - 15 Dec 22</p>
          </div>
          <div>
            <p className="text-gray-500 text-xs">Listed on</p>
            <p className={`font-medium`}>15 Dec 22</p>
          </div>
          <div>
            <p className="text-gray-500 text-xs">Listed price</p>
            <p className={`font-medium`}>₹150</p>
          </div>
        </div>
      </div>
      <div className="mt-6 bg-white p-6 rounded-2xl shadow-sm">
        <h2 className="text-lg font-semibold mb-6">IPO timeline</h2>
        <div className="hidden md:flex relative items-center justify-between">
          {steps.map((step, idx) => {
            const isCompleted = idx < activeStep;
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
                    className={`absolute top-4 left-1/2 w-full h-0.5 ${isCompleted ? "bg-green-500" : "bg-gray-300"
                      }`}
                  />
                )}

                <div className="mt-3 text-center">
                  <p className="text-sm font-medium">{step.label}</p>
                  <p className="text-xs text-gray-500">{step.date}</p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="flex md:hidden flex-col relative">
          {steps.map((step, idx) => {
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
                      className={`flex-1 w-0.5 ${isCompleted ? "bg-green-500" : "bg-gray-300"
                        }`}
                    />
                  )}
                </div>

                <div>
                  <p className="text-sm font-medium">{step.label}</p>
                  <p className="text-xs text-gray-500">{step.date}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="mt-6 bg-white p-6 rounded-2xl shadow-sm">
        <h2 className="text-lg font-semibold mb-4">About the company</h2>
        <p className="text-sm text-gray-600 leading-relaxed">
          Lorem ipsum dolor sit amet, ea reprehenderit quia cum consequuntur
          deleniti rem odio enim sit corporis gailum est quisquam magni ea sequi
          maxime. Aut incidunt adipisci in fuga necessitatibus aut inventore
          enim...
        </p>
      </div>
    </div>
  );
}

