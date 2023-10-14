// ** React Imports
import {Fragment, useState} from 'react'

// ** Custom Components
// ** Third Party Components
import {X} from 'react-feather'
import toast from 'react-hot-toast'
import Flatpickr from 'react-flatpickr'
import PerfectScrollbar from 'react-perfect-scrollbar'
import {Controller, useForm} from 'react-hook-form'

// ** Reactstrap Imports
import {Button, Form, Input, Label, Modal, ModalBody, ModalHeader} from 'reactstrap'

// ** Utils
import {isObjEmpty} from '@utils'

// ** Avatar Images
// ** Styles Imports
import '@styles/react/libs/react-select/_react-select.scss'
import '@styles/react/libs/flatpickr/flatpickr.scss'
import {createTimeLine} from "../../../api/time";
import {getUserData} from "../../../auth/utils";

const AddEventSidebar = props => {
    // ** Props
    const {
        open,
        store,
        dispatch,
        addEvent,
        calendarApi,
        selectEvent,
        updateEvent,
        removeEvent,
        refetchEvents,
        calendarsColor,
        handleAddEventSidebar
    } = props

    // ** Vars & Hooks
    const selectedEvent = store.selectedEvent,
        {
            control,
            setError,
            setValue,
            getValues,
            handleSubmit,
            formState: {errors}
        } = useForm({
            defaultValues: {title: ''}
        })

    // ** States
    const [url, setUrl] = useState('')
    const [desc, setDesc] = useState('')
    const [guests, setGuests] = useState({})
    const [allDay, setAllDay] = useState(false)
    const [location, setLocation] = useState('')
    const [endPicker, setEndPicker] = useState(new Date())
    const [startPicker, setStartPicker] = useState(new Date())
    const [calendarLabel, setCalendarLabel] = useState([{value: 'Business', label: 'Business', color: 'primary'}])

    // ** Adds New Event
    const handleAddEvent = () => {
        const obj = {
            title: getValues('title'),
            start: startPicker,
            startDateTime: startPicker,
            end: endPicker,
            doctorUserId: getUserData().userId,
            url: url.length ? url : undefined,
            endDateTime: endPicker,
            allDay,
            description: desc.length ? desc : undefined,
            display: 'block',
            extendedProps: {
                calendar: calendarLabel[0].label,
                url: url.length ? url : undefined,
                guests: guests.length ? guests : undefined,
                location: location.length ? location : undefined,
                desc: desc.length ? desc : undefined
            }
        }
        createTimeLine(obj)
        dispatch(addEvent(obj))
        refetchEvents()
        handleAddEventSidebar()
        toast.success('Event Added')
    }

    // ** Reset Input Values on Close
    const handleResetInputValues = () => {
        dispatch(selectEvent({}))
        setValue('title', '')
        setAllDay(false)
        setUrl('')
        setLocation('')
        setDesc('')
        setGuests({})
        setCalendarLabel([{value: 'Business', label: 'Business', color: 'primary'}])
        setStartPicker(new Date())
        setEndPicker(new Date())
    }

    // ** Set sidebar fields
    const handleSelectedEvent = () => {
        if (!isObjEmpty(selectedEvent)) {
            const calendar = selectedEvent.extendedProps.calendar

            const resolveLabel = () => {
                if (calendar.length) {
                    return {label: calendar, value: calendar, color: calendarsColor[calendar]}
                } else {
                    return {value: 'Business', label: 'Business', color: 'primary'}
                }
            }
            setValue('title', selectedEvent.title || getValues('title'))
            setAllDay(selectedEvent.allDay || allDay)
            setUrl(selectedEvent.url || url)
            setLocation(selectedEvent.extendedProps.location || location)
            setDesc(selectedEvent.extendedProps.description || desc)
            setGuests(selectedEvent.extendedProps.guests || guests)
            setStartPicker(new Date(selectedEvent.start))
            setEndPicker(selectedEvent.allDay ? new Date(selectedEvent.start) : new Date(selectedEvent.end))
            setCalendarLabel([resolveLabel()])
        }
    }

    // ** (UI) updateEventInCalendar
    const updateEventInCalendar = (updatedEventData, propsToUpdate, extendedPropsToUpdate) => {
        const existingEvent = calendarApi.getEventById(updatedEventData.id)

        // ** Set event properties except date related
        // ? Docs: https://fullcalendar.io/docs/Event-setProp
        // ** dateRelatedProps => ['start', 'end', 'allDay']
        // ** eslint-disable-next-line no-plusplus
        for (let index = 0; index < propsToUpdate.length; index++) {
            const propName = propsToUpdate[index]
            existingEvent.setProp(propName, updatedEventData[propName])
        }

        // ** Set date related props
        // ? Docs: https://fullcalendar.io/docs/Event-setDates
        existingEvent.setDates(new Date(updatedEventData.start), new Date(updatedEventData.end), {
            allDay: updatedEventData.allDay
        })

        // ** Set event's extendedProps
        // ? Docs: https://fullcalendar.io/docs/Event-setExtendedProp
        // ** eslint-disable-next-line no-plusplus
        for (let index = 0; index < extendedPropsToUpdate.length; index++) {
            const propName = extendedPropsToUpdate[index]
            existingEvent.setExtendedProp(propName, updatedEventData.extendedProps[propName])
        }
    }

    // ** Updates Event in Store
    const handleUpdateEvent = () => {
        if (getValues('title').length) {
            const eventToUpdate = {
                id: selectedEvent.id,
                title: getValues('title'),
                allDay,
                start: startPicker,
                end: endPicker,
                url,
                display: allDay === false ? 'block' : undefined,
                extendedProps: {
                    location,
                    description: desc,
                    guests,
                    calendar: calendarLabel[0].label
                }
            }

            const propsToUpdate = ['id', 'title', 'url']
            const extendedPropsToUpdate = ['calendar', 'guests', 'location', 'description']
            dispatch(updateEvent(eventToUpdate))
            updateEventInCalendar(eventToUpdate, propsToUpdate, extendedPropsToUpdate)

            handleAddEventSidebar()
            toast.success('Event Updated')
        } else {
            setError('title', {
                type: 'manual'
            })
        }
    }

    // ** (UI) removeEventInCalendar
    const removeEventInCalendar = eventId => {
        calendarApi.getEventById(eventId).remove()
    }

    const handleDeleteEvent = () => {
        dispatch(removeEvent(selectedEvent.id))
        removeEventInCalendar(selectedEvent.id)
        handleAddEventSidebar()
        toast.error('Event Removed')
    }
    const onAddEvent = (data) => {
        if (data.title.length) {
            if (isObjEmpty(errors)) {
                if (isObjEmpty(selectedEvent) || (!isObjEmpty(selectedEvent) && !selectedEvent.title.length)) {
                    handleAddEvent()
                } else {
                    handleUpdateEvent()
                }
                handleAddEventSidebar()
            }
        } else {
            setError('title', {
                type: 'manual'
            })
        }
    }

    // ** Event Action buttons
    const EventActions = () => {
        if (isObjEmpty(selectedEvent) || (!isObjEmpty(selectedEvent) && !selectedEvent.title.length)) {
            return (
                <Fragment>
                    <Button onClick={onAddEvent} className='me-1' type='submit' color='primary'>
                        Add
                    </Button>
                    <Button color='secondary' type='reset' onClick={handleAddEventSidebar} outline>
                        Cancel
                    </Button>
                </Fragment>
            )
        } else {
            return (
                <Fragment>
                    <Button className='me-1' color='primary' onClick={handleUpdateEvent}>
                        Update
                    </Button>
                    <Button color='danger' onClick={handleDeleteEvent} outline>
                        Delete
                    </Button>
                </Fragment>
            )
        }
    }

    // ** Close BTN
    const CloseBtn = <X className='cursor-pointer' size={15} onClick={handleAddEventSidebar}/>

    return (
        <Modal
            isOpen={open}
            className='sidebar-lg'
            toggle={handleAddEventSidebar}
            onOpened={handleSelectedEvent}
            onClosed={handleResetInputValues}
            contentClassName='p-0 overflow-hidden'
            modalClassName='modal-slide-in event-sidebar'
        >
            <ModalHeader className='mb-1' toggle={handleAddEventSidebar} close={CloseBtn} tag='div'>
                <h5 className='modal-title'>
                    {selectedEvent && selectedEvent.title && selectedEvent.title.length ? 'Update' : 'Add'} Event
                </h5>
            </ModalHeader>
            <PerfectScrollbar options={{wheelPropagation: false}}>
                <ModalBody className='flex-grow-1 pb-sm-0 pb-3'>
                    <Form
                        onSubmit={handleSubmit(onAddEvent)}
                    >
                        <div className='mb-1'>
                            <Label className='form-label' for='title'>
                                Title <span className='text-danger'>*</span>
                            </Label>
                            <Controller
                                name='title'
                                control={control}
                                render={({field}) => (
                                    <Input id='title' placeholder='Title' invalid={errors.title && true} {...field} />
                                )}
                            />
                        </div>

                        <div className='mb-1'>
                            <Label className='form-label' for='startDate'>
                                Start Date
                            </Label>
                            <Flatpickr
                                required
                                id='startDate'
                                name='startDate'
                                className='form-control'
                                onChange={date => setStartPicker(date[0])}
                                value={startPicker}
                                options={{
                                    enableTime: allDay === false,
                                    dateFormat: 'Y-m-d H:i'
                                }}
                            />
                        </div>

                        <div className='mb-1'>
                            <Label className='form-label' for='endDate'>
                                End Date
                            </Label>
                            <Flatpickr
                                required
                                id='endDate'
                                // tag={Flatpickr}
                                name='endDate'
                                className='form-control'
                                onChange={date => setEndPicker(date[0])}
                                value={endPicker}
                                options={{
                                    enableTime: allDay === false,
                                    dateFormat: 'Y-m-d H:i'
                                }}
                            />
                        </div>

                        <div className='mb-1'>
                            <Label className='form-label' for='eventURL'>
                                Event URL
                            </Label>
                            <Input
                                type='url'
                                id='eventURL'
                                value={url}
                                onChange={e => setUrl(e.target.value)}
                                placeholder='https://www.google.com'
                            />
                        </div>

                        <div className='mb-1'>
                            <Label className='form-label' for='description'>
                                Description
                            </Label>
                            <Input
                                type='textarea'
                                name='text'
                                id='description'
                                rows='3'
                                value={desc}
                                onChange={e => setDesc(e.target.value)}
                                placeholder='Description'
                            />
                        </div>
                        <div className='d-flex mb-1'>
                            <EventActions/>
                        </div>
                    </Form>
                </ModalBody>
            </PerfectScrollbar>
        </Modal>
    )
}

export default AddEventSidebar
