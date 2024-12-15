import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { useEffect, useState } from "react";
import { FaArrowLeft, FaArrowRight, FaPlus, FaBars } from "react-icons/fa";
import Calender from "../components/Calender";
import EventModal from "../components/EventDialog";
import EventsPanel from "../components/EventPanel";
import toast from "react-hot-toast";

const eventKey = 'calendar-events'

const Home = ({ searchQuery }) => {
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const [events, setEvents] = useState(() => {
        const eventData = localStorage.getItem(eventKey);
        if (!eventData) return [];
        return JSON.parse(eventData)
    });
    const [isEventModalOpen, setIsEventModalOpen] = useState(false);
    const [activeCard, setActiveCard] = useState(null);
    const [currentDay, setCurrentDay] = useState(null);
    const [editingEvent, setEditingEvent] = useState(null);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [showMobilePanel, setShowMobilePanel] = useState(false);

    useEffect(() => {
        localStorage.setItem(eventKey, JSON.stringify(events));
    }, [events]);

    const handleMonthChange = (direction) => {
        setCurrentMonth((prev) => {
            const newMonth = new Date(prev);
            newMonth.setMonth(newMonth.getMonth() + direction);
            return newMonth;
        });
    };

    const openEventModal = (day, event = null) => {
        setCurrentDay(day);
        setEditingEvent(event);
        setIsEventModalOpen(true);
    };


    const handleEventSave = (event) => {
        const dateKey = new Date(
            currentMonth.getFullYear(),
            currentMonth.getMonth(),
            currentDay
        ).toDateString();

        setEvents((prev) => {
            const dayEvents = prev[dateKey] || [];

            // Check for overlapping time
            const hasConflict = dayEvents.some((e) => {
                // Check time conflicts
                const isOverlap =
                    e.id !== (editingEvent?.id || null) && // Exclude the event being edited
                    ((event.startTime >= e.startTime && event.startTime < e.endTime) || // New start overlaps
                        (event.endTime > e.startTime && event.endTime <= e.endTime) || // New end overlaps
                        (event.startTime <= e.startTime && event.endTime >= e.endTime)); // New event spans an existing one
                return isOverlap;
            });

            if (hasConflict) {
                toast.error("Time slot overlaps with an existing event!");
                return prev; // No state update
            }

            if (editingEvent) {
                // Edit existing event
                const updatedEvents = dayEvents.map((e) =>
                    e.id === editingEvent.id ? { ...e, ...event } : e
                );
                return { ...prev, [dateKey]: updatedEvents };
            } else {
                // Add new event
                return {
                    ...prev,
                    [dateKey]: [...dayEvents, { ...event, id: crypto.randomUUID() }], // Use crypto for unique IDs
                };
            }
        });

        // Close the modal and reset editing state
        setEditingEvent(null);
        setIsEventModalOpen(false);
    };


    const handleDrop = (e, day) => {
        e.preventDefault();
        const { eventId, day: sourceDay } = JSON.parse(
            e.dataTransfer.getData("text/plain")
        );
        const sourceDateKey = new Date(
            currentMonth.getFullYear(),
            currentMonth.getMonth(),
            sourceDay
        ).toDateString();
        const targetDateKey = new Date(
            currentMonth.getFullYear(),
            currentMonth.getMonth(),
            day
        ).toDateString();

        setEvents((prev) => {
            const sourceEvents = prev[sourceDateKey] || [];
            const targetEvents = prev[targetDateKey] || [];
            const eventToMove = sourceEvents.find(
                (event) => event.id === eventId
            );

            return {
                ...prev,
                [sourceDateKey]: sourceEvents.filter(
                    (event) => event.id !== eventId
                ),
                [targetDateKey]: [...targetEvents, eventToMove],
            };
        });
        setActiveCard(null);
    };


    return (
        <div className="flex justify-between items-start space-x-3 h-screen bg-gray-100 p-4">
            {/* Calendar Section */}
            <div className="w-full p-6 bg-white rounded-lg shadow-md">
                <div className="flex justify-between items-center mb-2">
                    <div className="text-3xl font-bold">
                        {currentMonth.toLocaleString("default", {
                            month: "long",
                        })}{" "}
                        {currentMonth.getFullYear()}
                    </div>
                    <div className="space-x-10 flex px-14">
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <button
                                        className="text-blue-500 hover:text-blue-700"
                                        onClick={() => handleMonthChange(-1)}
                                    >
                                        <FaArrowLeft size={20} />
                                    </button>
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>Previous Month</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <button
                                        className="text-blue-500 hover:text-blue-700"
                                        onClick={() => handleMonthChange(1)}
                                    >
                                        <FaArrowRight size={20} />
                                    </button>
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>Next Month</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    </div>
                </div>
                <Calender
                    currentMonth={currentMonth}
                    searchQuery={searchQuery}
                    events={events}
                    setCurrentDay={setCurrentDay}
                    handleDrop={handleDrop}
                    setShowMobilePanel={setShowMobilePanel}
                />
            </div>
            <button
                className="fixed bottom-8 right-8 bg-blue-500 text-white p-4 rounded-full shadow-2xl hover:bg-blue-600 focus:outline-none"
                onClick={() => openEventModal(currentDay)}
            >
                <FaPlus size={24} />
            </button>
            <div className="hidden md:block w-2/5">
                <EventsPanel
                    currentDay={currentDay}
                    currentMonth={currentMonth}
                    events={events}
                    setEvents={setEvents}
                    openEventModal={openEventModal}
                    setActiveCard={setActiveCard}
                />
            </div>
            {showMobilePanel && (
                <div className="fixed inset-0 z-50 md:hidden">
                    <div className="absolute inset-0 bg-black bg-opacity-50" onClick={() => setShowMobilePanel(false)} />
                    <div className="absolute right-0 top-0 h-full w-3/4 max-w-sm bg-white">
                        <EventsPanel
                            currentDay={currentDay}
                            currentMonth={currentMonth}
                            events={events}
                            setEvents={setEvents}
                            openEventModal={openEventModal}
                            setActiveCard={setActiveCard}
                            onClose={() => setShowMobilePanel(false)}
                            isMobile={true}
                        />
                    </div>
                </div>
            )}
            <EventModal
                isOpen={isEventModalOpen}
                onClose={() => setIsEventModalOpen(false)}
                onSave={handleEventSave}
                event={editingEvent}
            />
        </div>
    );
}
export default Home;

