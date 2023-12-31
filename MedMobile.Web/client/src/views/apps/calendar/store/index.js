// ** Redux Imports
import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'

// ** Axios Imports
import axios from 'axios'
import {getDoctorTimeLines} from "../../../../api/time";
import {getUserData} from "../../../../auth/utils";

export const fetchEvents = createAsyncThunk('appCalendar/fetchEvents', async calendars => {
    let response = []
    await getDoctorTimeLines({doctorUserId: getUserData().userId}).then(({data}) => {
        response = data?.map(item => ({
                title: item.title,
                description: item.description,
                start: item.startDateTime,
                end: item.endDateTime,
                extendedProps: {
                    url: item?.url
                }
            })
        )
    })
    await axios.get('/apps/calendar/events', {calendars})
    return response
})
export const setEvents = createAsyncThunk('appCalendar/fetchEvents', async events => {
    return events
})

export const addEvent = createAsyncThunk('appCalendar/addEvent', async (event, {dispatch, getState}) => {
    await axios.post('/apps/calendar/add-event', {event})
    await dispatch(fetchEvents(getState().calendar.selectedCalendars))
    return event
})

export const updateEvent = createAsyncThunk('appCalendar/updateEvent', async (event, {dispatch, getState}) => {
    await axios.post('/apps/calendar/update-event', {event})
    await dispatch(fetchEvents(getState().calendar.selectedCalendars))
    return event
})

export const updateFilter = createAsyncThunk('appCalendar/updateFilter', async (filter, {dispatch, getState}) => {
    if (getState().calendar.selectedCalendars.includes(filter)) {
        await dispatch(fetchEvents(getState().calendar.selectedCalendars.filter(i => i !== filter)))
    } else {
        await dispatch(fetchEvents([...getState().calendar.selectedCalendars, filter]))
    }
    return filter
})

export const updateAllFilters = createAsyncThunk('appCalendar/updateAllFilters', async (value, {dispatch}) => {
    if (value === true) {
        await dispatch(fetchEvents(['Personal', 'Business', 'Family', 'Holiday', 'ETC']))
    } else {
        await dispatch(fetchEvents([]))
    }
    return value
})

export const removeEvent = createAsyncThunk('appCalendar/removeEvent', async id => {
    await axios.delete('/apps/calendar/remove-event', {id})
    return id
})

export const appCalendarSlice = createSlice({
    name: 'appCalendar',
    initialState: {
        events: [],
        selectedEvent: {},
        selectedCalendars: ['Personal', 'Business', 'Family', 'Holiday', 'ETC']
    },
    reducers: {
        selectEvent: (state, action) => {
            state.selectedEvent = action.payload
        }
    },
    extraReducers: builder => {
        builder
            .addCase(fetchEvents.fulfilled, (state, action) => {
                state.events = action.payload
            })
            .addCase(updateFilter.fulfilled, (state, action) => {
                if (state.selectedCalendars.includes(action.payload)) {
                    state.selectedCalendars.splice(state.selectedCalendars.indexOf(action.payload), 1)
                } else {
                    state.selectedCalendars.push(action.payload)
                }
            })
            .addCase(updateAllFilters.fulfilled, (state, action) => {
                const value = action.payload
                let selected = []
                if (value === true) {
                    selected = ['Personal', 'Business', 'Family', 'Holiday', 'ETC']
                } else {
                    selected = []
                }
                state.selectedCalendars = selected
            })
    }
})

export const {selectEvent} = appCalendarSlice.actions

export default appCalendarSlice.reducer
