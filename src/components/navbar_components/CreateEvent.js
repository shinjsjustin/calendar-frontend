import React, { useEffect, useState } from 'react';
import './CreateEvent.css'

const CreateEvent = () => {
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [isAllDay, setIsAllDay] = useState(false);
    
    const toggleForm = () =>{
        setIsFormOpen(!isFormOpen);
    }

    const toggleIsAllDay = () =>{
        setIsAllDay(!isAllDay)
    }

    return (
        <div className = "CreateButton-Component">
            <button className = "create-event-btn" onClick={toggleForm}>
                Create New Calendar Event
            </button>

            {
                isFormOpen && (
                    <div className='form-container'>
                        <div className='form-content'>
                            <h2>Create Calendar Event</h2>
                            <form >
                                <div className='form-group'>
                                    <label>Event Title</label>
                                    <input type='text' placeholder='Enter event title' />
                                </div>
                                <div className='form-group'>
                                    <label>Description</label>
                                    <input type='text' placeholder='Enter description' />
                                </div>
                                <div className='form-group'>
                                    <label>All Day?</label>
                                    <input type='checkbox' checked={isAllDay} onChange={toggleIsAllDay}/>
                                </div>
                                {
                                    isAllDay &&
                                    <div>
                                        <div className='form-group'>
                                            <label>Start Date</label>
                                            <input type='datetime' />
                                        </div>
                                        <div className='form-group'>
                                            <label>End Date</label>
                                            <input type='datetime' />
                                        </div>
                                    </div>
                                }
                                {
                                    !isAllDay &&
                                    <div>
                                        <div className='form-group'>
                                            <label>Start Date and Time</label>
                                            <input type='datetime-local' />
                                        </div>
                                        <div className='form-group'>
                                            <label>End Date and Time</label>
                                            <input type='datetime-local' />
                                        </div>
                                    </div>
                                }
                                <button type='submit'>Create Event</button>
                            </form>
                        </div>
                    </div>
                )
            }

        </div>
    );
};

export default CreateEvent;