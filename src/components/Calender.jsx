import React, { useState } from "react";

const Calender = ({ currentMonth, events, searchQuery, setCurrentDay, handleDrop, setShowMobilePanel }) => {
    const [selectedDay, setSelectedDay] = useState(null); // State for selected day
    const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const today = new Date();

    const generateCalendarDays = () => {
        const startOfMonth = new Date(
            currentMonth.getFullYear(),
            currentMonth.getMonth(),
            1
        );
        const endOfMonth = new Date(
            currentMonth.getFullYear(),
            currentMonth.getMonth() + 1,
            0
        );
        const startDay = startOfMonth.getDay();
        const daysInMonth = endOfMonth.getDate();

        const days = [];
        for (let i = 0; i < startDay; i++) {
            days.push(null);
        }
        for (let i = 1; i <= daysInMonth; i++) {
            days.push(i);
        }
        return days;
    };

    const filteredDays = searchQuery.trim()
        ? Object.keys(events)
            .filter((dateKey) =>
                events[dateKey]?.some((event) =>
                    event.name.toLowerCase().includes(searchQuery.toLowerCase())
                )
            )
            .map((dateKey) => {
                const dateObj = new Date(dateKey);
                return `${dateObj.getFullYear()}-${dateObj.getMonth() + 1}-${dateObj.getDate()}`;
            })
            .reduce((acc, date) => {
                acc.add(date);
                return acc;
            }, new Set())
        : new Set();

    const calendarDays = generateCalendarDays();

    const handleDragOver = (e) => {
        e.preventDefault();
    };

    const handleDayClick = (day) => {
        if (day) {
            const selectedDate = new Date(Date.UTC(
                currentMonth.getFullYear(),
                currentMonth.getMonth(),
                day
            ))
                .toISOString()
                .split("T")[0];
            console.log(selectedDate)
            setSelectedDay(selectedDate); 
            setCurrentDay(day); 
        }
        setShowMobilePanel(true);
    };

    return (
        <>
            <div className="grid grid-cols-7 text-center font-semibold text-gray-700">
                {daysOfWeek.map((day) => (
                    <div key={day} className="py-2 text-xs sm:text-sm md:text-base">
                        {day}
                    </div>
                ))}
            </div>
            <div className="grid grid-cols-7 gap-1 md:gap-4 mt-2">
                {calendarDays.map((day, index) => {
                    const dateKey = day
                        ? new Date(Date.UTC(currentMonth.getFullYear(), currentMonth.getMonth(), day))
                            .toISOString()
                            .split("T")[0]
                        : null;

                    const isToday =
                        today.getFullYear() === currentMonth.getFullYear() &&
                        today.getMonth() === currentMonth.getMonth() &&
                        day === today.getDate();

                    const isWeekend = day
                        ? [0, 6].includes(
                            new Date(
                                currentMonth.getFullYear(),
                                currentMonth.getMonth(),
                                day
                            ).getDay()
                        )
                        : false;

                    const isFiltered = filteredDays.has(dateKey);

                    const isSelected = selectedDay === dateKey; // Correct comparison with consistent format

                    return (
                        <div
                            key={index}
                            className={`h-20 sm:h-20 md:h-32 lg:h-36 flex md:text-4xl text-sm items-center justify-center border rounded-lg cursor-pointer relative 
                                ${isSelected
                                    ? "bg-green-200 text-white font-bold" // Selected date
                                    : isToday
                                        ? "bg-blue-200 text-white font-bold"
                                        : isFiltered
                                            ? "bg-yellow-500 font-bold"
                                            : isWeekend
                                                ? "text-red-500 font-medium"
                                                : "text-gray-700"
                                }`}
                            onDragOver={handleDragOver}
                            onDrop={(e) => day && handleDrop(e, day)}
                            onClick={() => handleDayClick(day)}
                        >
                            {day || ""}
                            {day &&
                                events[
                                    new Date(
                                        currentMonth.getFullYear(),
                                        currentMonth.getMonth(),
                                        day
                                    ).toDateString()
                                ]?.map((event, i) => (
                                    <div
                                        key={i}
                                        className="absolute bottom-0 left-1/2 transform -translate-x-1/2 
               bg-blue-300 text-[10px] sm:text-xs md:text-sm px-1 sm:px-2 py-[2px] sm:py-1 
               rounded mt-1 w-[90%] sm:w-auto text-center truncate"
                                    >
                                        {event.name}
                                    </div>

                                ))}
                        </div>
                    );
                })}
            </div>
        </>
    );
};

export default Calender;

