import React, { useState, useEffect } from 'react';
import './Calendar.css'; 

const Monthly = () => {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [days, setDays] = useState([]);

    useEffect(() => {
        renderCalendar(currentDate);
    }, [currentDate]);

    const renderCalendar = (date) => {
        const month = date.getMonth(); // 0-based, 0 = January
        const year = date.getFullYear();

        // Get first and last day of the current month
        const firstDayOfMonth = new Date(year, month, 1);
        const lastDayOfMonth = new Date(year, month + 1, 0).getDate();

        // Determine the day of the week the month starts on (0 = Sunday, 6 = Saturday)
        const startDayIndex = firstDayOfMonth.getDay();

        // Get the last day of the previous month
        const lastDayOfPrevMonth = new Date(year, month, 0).getDate();

        // Prepare an array to hold all the day labels (including adjacent months)
        const daysArray = [];
        let dayNumber = 1;

        // Fill the days before the first day of the current month (previous month's days)
        for (let i = 0; i < startDayIndex; i++) {
            daysArray.push({
                day: lastDayOfPrevMonth - startDayIndex + 1 + i,
                isOtherMonth: true,
            });
        }

        // Fill the current month's days
        for (let i = 1; i <= lastDayOfMonth; i++) {
            daysArray.push({
                day: i,
                isOtherMonth: false,
            });
        }

        // Fill the remaining days after the last day of the current month (next month's days)
        while (daysArray.length < 35) { // Ensure the grid is always 7x5
            daysArray.push({
                day: dayNumber,
                isOtherMonth: true,
            });
            dayNumber++;
        }

        setDays(daysArray); // Update the state with the days array
    };

    const handlePrevMonth = () => {
        setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() - 1)));
    };

    const handleNextMonth = () => {
        setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() + 1)));
    };

    return (
        <div className="calendar-container">
            {/* Calendar Header with Month and Year */}
            <header className="calendar-header">
                <button onClick={handlePrevMonth}>◀</button>
                <h2>{currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}</h2>
                <button onClick={handleNextMonth}>▶</button>
            </header>

            {/* Days of the week */}
            <div className="calendar-grid">
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((dayName) => (
                    <div key={dayName} className="day-name">
                        {dayName}
                    </div>
                ))}

                {/* Calendar Days */}
                {days.map((dayObj, index) => (
                    <div
                        key={index}
                        className={`day ${dayObj.isOtherMonth ? 'other-month' : ''}`}
                    >
                        {dayObj.day}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Monthly;
