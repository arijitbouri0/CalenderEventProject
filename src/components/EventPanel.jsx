import { X } from 'lucide-react';
import React from 'react';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';

const EventsPanel = ({
    currentDay,
    currentMonth,
    events,
    setEvents,
    openEventModal,
    setActiveCard,
    onClose,
    className = '',
    isMobile = false
}) => {
    const selectedDateEvents =
        currentDay &&
        events[
        new Date(currentMonth.getFullYear(), currentMonth.getMonth(), currentDay).toDateString()
        ] || [];

    const handleDeleteEvent = (eventId) => {
        const dateKey = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), currentDay).toDateString();
        setEvents((prev) => ({
            ...prev,
            [dateKey]: prev[dateKey].filter((event) => event.id !== eventId),
        }));
    };

    const handleDragStart = (event, eventId, day) => {
        event.dataTransfer.setData('text/plain', JSON.stringify({ eventId, day }));
        setActiveCard(eventId);
    };

    return (
        <div className={`${className} bg-white p-6 ${isMobile ? 'w-full' : 'w-full'}`}>
            {isMobile && (
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 p-1 hover:bg-gray-100 rounded-full"
                >
                    <X className="w-6 h-6" />
                </button>
            )}
            <h2 className="text-xl font-bold mb-4">Events on {currentDay ? `${currentMonth.toLocaleString('default', { month: 'long' })} ${currentDay}` : 'Select a Day'}</h2>
            <div className="space-y-2">
                {selectedDateEvents.length > 0 ? (
                    selectedDateEvents.map((event) => (
                        <div
                            key={event.id}
                            draggable
                            onDragStart={(e) => handleDragStart(e, event.id, currentDay)}
                            onDragEnd={() => setActiveCard(null)}
                            className="bg-blue-100 px-4 py-2 rounded-lg shadow flex justify-between items-center"
                        >
                            <span>{event.name}</span>
                            <div className="flex space-x-2">
                                <button
                                    className="text-blue-500 hover:text-blue-700"
                                    onClick={() => openEventModal(currentDay, event)}
                                >
                                    <FaEdit />
                                </button>
                                <button
                                    className="text-red-500 hover:text-red-700"
                                    onClick={() => handleDeleteEvent(event.id)}
                                >
                                    <FaTrashAlt />
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-gray-500">No events for this day.</p>
                )}
            </div>
        </div>
    );
};


export default EventsPanel;
