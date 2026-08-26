import { useEffect, useMemo, useState } from "react";
import { ChevronLeft, ChevronRight, CalendarDays } from "lucide-react";

function Holidays() {
  const [holidays, setHolidays] = useState([]);
  const [loading, setLoading] = useState(true);

  const [currentDate, setCurrentDate] = useState(
    new Date()
  );

  // =========================
  // FETCH HOLIDAYS
  // =========================

  useEffect(() => {
    fetchHolidays();
  }, []);

  const fetchHolidays = async () => {
    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/holidays`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();
      console.log("HOLIDAY API RESPONSE:", data);

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to fetch holidays"
        );
      }

      // Only show active holidays
      const activeHolidays = (
        data.holidays || []
      ).filter(
        (holiday) => holiday.status === "active"
      );

      setHolidays(activeHolidays);
    } catch (error) {
      console.error(
        "Fetch holidays error:",
        error
      );
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // MONTH / YEAR
  // =========================

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const monthName = currentDate.toLocaleDateString(
    "en-US",
    {
      month: "long",
      year: "numeric",
    }
  );

  // =========================
  // CALENDAR DAYS
  // =========================

  const calendarDays = useMemo(() => {
    const firstDay = new Date(
      year,
      month,
      1
    ).getDay();

    const daysInMonth = new Date(
      year,
      month + 1,
      0
    ).getDate();

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

    return new Date(
      holiday.date
    ).toLocaleDateString("en-CA");
  };

  const getDayHoliday = (day) => {
    if (!day) return null;

    const calendarDate = `${year}-${String(
      month + 1
    ).padStart(2, "0")}-${String(day).padStart(
      2,
      "0"
    )}`;

    return holidays.find(
      (holiday) =>
        getHolidayDate(holiday) ===
        calendarDate
    );
  };

  // =========================
  // NAVIGATION
  // =========================

  const previousMonth = () => {
    setCurrentDate(
      new Date(year, month - 1, 1)
    );
  };

  const nextMonth = () => {
    setCurrentDate(
      new Date(year, month + 1, 1)
    );
  };

  const goToToday = () => {
    setCurrentDate(new Date());
  };

  // =========================
  // UPCOMING HOLIDAYS
  // =========================

  const upcomingHolidays = [...holidays]
    .filter(
      (holiday) =>
        new Date(holiday.date) >=
        new Date()
    )
    .sort(
      (a, b) =>
        new Date(a.date) -
        new Date(b.date)
    )
    .slice(0, 5);

  // =========================
  // UI
  // =========================

  return (
    <div className="p-4 sm:p-6 bg-blue-100 min-h-screen">

      {/* Header */}
      <div className="mb-6 text-center">
        <h1 className="text-2xl font-bold text-gray-800">
          Holiday Calendar
        </h1>

        <p className="text-gray-500 mt-1">
          View all upcoming organization holidays.
        </p>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Calendar */}
        <div className="lg:col-span-2 bg-white border border-gray-200 rounded-xl p-4 sm:p-6">

          {/* Calendar Header */}
          <div className="flex items-center justify-between mb-6">

            <button
              type="button"
              onClick={previousMonth}
              className="p-2 rounded-lg border border-gray-200 hover:bg-gray-50 transition"
            >
              <ChevronLeft size={20} />
            </button>

            <div className="text-center">

              <h2 className="text-xl font-bold text-gray-800">
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
              className="p-2 rounded-lg border border-gray-200 hover:bg-gray-50 transition"
            >
              <ChevronRight size={20} />
            </button>

          </div>

          {/* Week Days */}
          <div className="grid grid-cols-7 border-b border-gray-200">

            {[
              "Sun",
              "Mon",
              "Tue",
              "Wed",
              "Thu",
              "Fri",
              "Sat",
            ].map((day) => (
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

              {calendarDays.map(
                (day, index) => {
                  const holiday =
                    getDayHoliday(day);

                  const isToday =
                    day &&
                    new Date().getDate() ===
                      day &&
                    new Date().getMonth() ===
                      month &&
                    new Date().getFullYear() ===
                      year;

                  return (
                    <div
                      key={index}
                      className={`min-h-[75px] sm:min-h-[95px] border-b border-r border-gray-100 p-1.5 sm:p-2 ${
                        !day
                          ? "bg-gray-50"
                          : "bg-white"
                      }`}
                    >

                      {day && (
                        <div className="h-full">

                          {/* Day Number */}
                          <div
                            className={`inline-flex items-center justify-center w-7 h-7 rounded-full text-xs sm:text-sm font-medium ${
                              isToday
                                ? "bg-blue-600 text-white"
                                : "text-gray-700"
                            }`}
                          >
                            {day}
                          </div>

                          {/* Holiday */}
                          {holiday && (
                            <div className="mt-1">

                              <div className="bg-blue-50 border border-blue-200 rounded-md px-1.5 py-1">

                                <p className="text-[10px] sm:text-xs font-semibold text-blue-700 truncate">
                                  {
                                    holiday.name
                                  }
                                </p>

                              </div>

                            </div>
                          )}

                        </div>
                      )}

                    </div>
                  );
                }
              )}

            </div>
          )}

          {/* Legend */}
          <div className="flex items-center gap-2 mt-5 text-sm text-gray-500">

            <span className="w-3 h-3 rounded bg-blue-100 border border-blue-200"></span>

            <span>
              Organization Holiday
            </span>

          </div>

        </div>

        {/* Upcoming Holidays */}
        <div className="bg-white border border-gray-200 rounded-xl p-5 h-fit">

          <div className="flex items-center gap-3 mb-5">

            <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center">
              <CalendarDays
                size={22}
                className="text-blue-600"
              />
            </div>

            <div>
              <h2 className="font-bold text-gray-800">
                Upcoming Holidays
              </h2>

              <p className="text-sm text-gray-500">
                Next holidays
              </p>
            </div>

          </div>

          {loading ? (
            <p className="text-sm text-gray-500">
              Loading...
            </p>
          ) : upcomingHolidays.length ===
            0 ? (
            <div className="text-center py-8">

              <CalendarDays
                size={35}
                className="mx-auto text-gray-300"
              />

              <p className="text-sm text-gray-400 mt-3">
                No upcoming holidays
              </p>

            </div>
          ) : (
            <div className="space-y-3">

              {upcomingHolidays.map(
                (holiday) => (
                  <div
                    key={holiday._id}
                    className="border border-gray-200 rounded-lg p-3 hover:bg-gray-50 transition"
                  >

                    <div className="flex items-start justify-between gap-3">

                      <div className="min-w-0">

                        <p className="font-semibold text-gray-800 truncate">
                          {holiday.name}
                        </p>

                        <p className="text-xs text-gray-500 mt-1">
                          {new Date(
                            holiday.date
                          ).toLocaleDateString(
                            "en-IN",
                            {
                              day: "2-digit",
                              month: "short",
                              year: "numeric",
                            }
                          )}
                        </p>

                        {holiday.description && (
                          <p className="text-xs text-gray-400 mt-2 line-clamp-2">
                            {
                              holiday.description
                            }
                          </p>
                        )}

                      </div>

                      <span className="shrink-0 text-xs font-medium bg-blue-50 text-blue-600 px-2 py-1 rounded-full">
                        Holiday
                      </span>

                    </div>

                  </div>
                )
              )}

            </div>
          )}

        </div>

      </div>

    </div>
  );
}

export default Holidays;