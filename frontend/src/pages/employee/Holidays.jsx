import {useEffect, useMemo, useState} from "react";
import {
  ChevronLeft,
  ChevronRight,
  CalendarDays,
  X,
  PartyPopper,
} from "lucide-react";

function Holidays() {
  const [holidays, setHolidays] = useState([]);
  const [loading, setLoading] = useState(true);

  const [currentDate, setCurrentDate] = useState(new Date());

  // Selected holiday for popup
  const [selectedHoliday, setSelectedHoliday] = useState(null);

  // =========================
  // FETCH HOLIDAYS
  // =========================

  useEffect(() => {
    fetchHolidays();
  }, []);

  const fetchHolidays = async () => {
    try {
      setLoading(true);

      // const token = localStorage.getItem("token");
      const token = sessionStorage.getItem("token");

      const response = await fetch(`${import.meta.env.VITE_API_URL}/holidays`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      console.log("HOLIDAY API RESPONSE:", data);

      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch holidays");
      }

      setHolidays(data.holidays || []);
    } catch (error) {
      console.error("Fetch holidays error:", error);
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // MONTH / YEAR
  // =========================

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const monthName = currentDate.toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });

  // =========================
  // CALENDAR DAYS
  // =========================

  const calendarDays = useMemo(() => {
    const firstDay = new Date(year, month, 1).getDay();

    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const days = [];

    // Empty cells before first day
    for (let i = 0; i < firstDay; i++) {
      days.push(null);
    }

    // Actual days
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(day);
    }

    return days;
  }, [year, month]);

  // =========================
  // DATE HELPERS
  // =========================

  const getHolidayDate = (holiday) => {
    if (!holiday.date) return "";

    return new Date(holiday.date).toLocaleDateString("en-CA");
  };

  const getDayHoliday = (day) => {
    if (!day) return null;

    const calendarDate = `${year}-${String(month + 1).padStart(
      2,
      "0",
    )}-${String(day).padStart(2, "0")}`;

    return holidays.find((holiday) => getHolidayDate(holiday) === calendarDate);
  };

  // =========================
  // NAVIGATION
  // =========================

  const previousMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };

  const goToToday = () => {
    setCurrentDate(new Date());
  };

  // =========================
  // UPCOMING HOLIDAYS
  // =========================

  const upcomingHolidays = [...holidays]
    .filter((holiday) => new Date(holiday.date) >= new Date())
    .sort((a, b) => new Date(a.date) - new Date(b.date))
    .slice(0, 5);

  // =========================
  // FORMAT HOLIDAY DATE
  // =========================

  const formatHolidayDate = (date) => {
    return new Date(date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  };

  // =========================
  // UI
  // =========================

  return (
    <div className="p-4 sm:p-6 bg-blue-100 min-h-screen">
      {/* Header */}
      <div className="mb-6 text-center">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
          Holiday Calendar
        </h1>

        <p className="text-sm sm:text-base text-gray-500 mt-1">
          View all upcoming organization holidays.
        </p>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* =========================
            CALENDAR
        ========================= */}

        <div className="lg:col-span-2 bg-white border border-gray-200 rounded-xl p-4 sm:p-6">
          {/* Calendar Header */}
          <div className="flex items-center justify-between mb-6">
            <button
              type="button"
              onClick={previousMonth}
              className="p-2 sm:p-2.5 rounded-lg border border-gray-200 hover:bg-gray-50 transition"
            >
              <ChevronLeft size={20} />
            </button>

            <div className="text-center">
              <h2 className="text-lg sm:text-xl font-bold text-gray-800">
                {monthName}
              </h2>

              <button
                type="button"
                onClick={goToToday}
                className="text-sm text-blue-600 hover:underline mt-1"
              >
                Today
              </button>
            </div>

            <button
              type="button"
              onClick={nextMonth}
              className="p-2 sm:p-2.5 rounded-lg border border-gray-200 hover:bg-gray-50 transition"
            >
              <ChevronRight size={20} />
            </button>
          </div>

          {/* Week Days */}
          <div className="grid grid-cols-7 border-b border-gray-200">
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
              <div
                key={day}
                className="text-center text-xs sm:text-sm font-semibold text-gray-500 py-3"
              >
                {day}
              </div>
            ))}
          </div>

          {/* Calendar */}
          {loading ? (
            <div className="py-16 text-center text-gray-500">
              Loading holidays...
            </div>
          ) : (
            <div className="grid grid-cols-7">
              {calendarDays.map((day, index) => {
                const holiday = getDayHoliday(day);

                const today = new Date();

                const isToday =
                  day &&
                  today.getDate() === day &&
                  today.getMonth() === month &&
                  today.getFullYear() === year;

                return (
                  <div
                    key={index}
                    className={`relative min-h-[75px] sm:min-h-[100px] border-b border-r border-gray-100 p-1.5 sm:p-2 ${
                      !day ? "bg-gray-50" : "bg-white"
                    }`}
                  >
                    {day && (
                      <div className="h-full">
                        {/* Day Number */}
                        <div
                          className={`inline-flex items-center justify-center w-7 h-7 rounded-full text-xs sm:text-sm font-medium ${
                            isToday
                              ? "bg-blue-600 text-white"
                              : holiday
                                ? "text-blue-700 font-bold"
                                : "text-gray-700"
                          }`}
                        >
                          {day}
                        </div>

                        {/* =========================
                            HOLIDAY
                        ========================= */}

                       {holiday && (
  <div className="relative mt-2 group w-full flex justify-center">
    
    {/* MOBILE - ICON ONLY */}
    <button
      type="button"
      onClick={() => setSelectedHoliday(holiday)}
      title={holiday.name}
      className="flex sm:hidden items-center justify-center w-9 h-9 rounded-md border border-blue-200 bg-blue-50 hover:bg-blue-100 transition"
    >
      <span className="text-base">🎉</span>
    </button>

    {/* DESKTOP - NAME */}
    <button
      type="button"
      onClick={() => setSelectedHoliday(holiday)}
      title={holiday.name}
      className="hidden sm:flex w-full items-center gap-1 rounded-md border border-blue-200 bg-blue-50 hover:bg-blue-100 transition overflow-hidden px-1.5 py-1.5"
    >
      <span className="text-xs flex-shrink-0">
        🎉
      </span>

      <span className="text-xs font-semibold text-blue-700 truncate min-w-0">
        {holiday.name}
      </span>
    </button>

    {/* DESKTOP HOVER TOOLTIP */}
    <div className="absolute z-30 left-1/2 -translate-x-1/2 bottom-full mb-2 hidden sm:group-hover:block w-52">
      <div className="bg-gray-900 text-white rounded-lg shadow-xl p-3">
        <div className="flex items-start gap-2">
          <span>🎉</span>

          <div className="min-w-0">
            <p className="text-sm font-semibold break-words">
              {holiday.name}
            </p>

            <p className="text-xs text-gray-300 mt-1">
              {formatHolidayDate(holiday.date)}
            </p>
          </div>
        </div>

        <div className="absolute left-1/2 -translate-x-1/2 top-full border-8 border-transparent border-t-gray-900" />
      </div>
    </div>

  </div>
)}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}

          {/* Legend */}
          <div className="flex items-center gap-2 mt-5 text-sm text-gray-500">
            <span className="w-3 h-3 rounded bg-blue-100 border border-blue-200"></span>

            <span>Organization Holiday</span>
          </div>
        </div>

        {/* =========================
            UPCOMING HOLIDAYS
        ========================= */}

        <div className="bg-white border border-gray-200 rounded-xl p-5 h-fit">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center">
              <CalendarDays size={22} className="text-blue-600" />
            </div>

            <div>
              <h2 className="font-bold text-gray-800">Upcoming Holidays</h2>

              <p className="text-sm text-gray-500">Next holidays</p>
            </div>
          </div>

          {loading ? (
            <p className="text-sm text-gray-500">Loading...</p>
          ) : upcomingHolidays.length === 0 ? (
            <div className="text-center py-8">
              <CalendarDays size={35} className="mx-auto text-gray-300" />

              <p className="text-sm text-gray-400 mt-3">No upcoming holidays</p>
            </div>
          ) : (
            <div className="space-y-3">
              {upcomingHolidays.map((holiday) => (
                <button
                  type="button"
                  key={holiday._id}
                  onClick={() => setSelectedHoliday(holiday)}
                  className="w-full text-left border border-gray-200 rounded-lg p-3 hover:bg-blue-50 hover:border-blue-300 transition"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <p className="font-semibold text-gray-800 truncate">
                        {holiday.name}
                      </p>

                      <p className="text-xs text-gray-500 mt-1">
                        {new Date(holiday.date).toLocaleDateString("en-IN", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        })}
                      </p>

                      {holiday.description && (
                        <p className="text-xs text-gray-400 mt-2 line-clamp-2">
                          {holiday.description}
                        </p>
                      )}
                    </div>

                    <span className="shrink-0 text-xs font-medium bg-blue-50 text-blue-600 px-2 py-1 rounded-full">
                      Holiday
                    </span>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* =========================
          HOLIDAY DETAILS MODAL
      ========================= */}

      {selectedHoliday && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
          onClick={() => setSelectedHoliday(null)}
        >
          <div
            className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-5 sm:p-6"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-xl bg-blue-50 flex items-center justify-center">
                  <PartyPopper size={23} className="text-blue-600" />
                </div>

                <div>
                  <p className="text-xs font-medium text-blue-600">
                    Organization Holiday
                  </p>

                  <h2 className="text-lg sm:text-xl font-bold text-gray-800 mt-0.5">
                    {selectedHoliday.name}
                  </h2>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setSelectedHoliday(null)}
                className="p-2 rounded-lg hover:bg-gray-100 transition"
              >
                <X size={20} className="text-gray-500" />
              </button>
            </div>

            {/* Date */}
            <div className="mt-6 bg-blue-50 border border-blue-100 rounded-xl p-4">
              <div className="flex items-center gap-3">
                <CalendarDays size={21} className="text-blue-600" />

                <div>
                  <p className="text-xs text-gray-500">Holiday Date</p>

                  <p className="font-semibold text-gray-800 mt-0.5">
                    {formatHolidayDate(selectedHoliday.date)}
                  </p>
                </div>
              </div>
            </div>

            {/* Description */}
            {selectedHoliday.description && (
              <div className="mt-4">
                <p className="text-sm font-semibold text-gray-700 mb-2">
                  Description
                </p>

                <div className="border border-gray-200 rounded-xl p-4">
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {selectedHoliday.description}
                  </p>
                </div>
              </div>
            )}

            {/* Close */}
            <button
              type="button"
              onClick={() => setSelectedHoliday(null)}
              className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Holidays;
