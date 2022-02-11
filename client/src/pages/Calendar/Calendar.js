import React from 'react'
import FullCalendar from '@fullcalendar/react' // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import interactionPlugin from "@fullcalendar/interaction" // needed for dayClick

export default class DemoApp extends React.Component {
  render() {
    return (
      <FullCalendar
        plugins={[ dayGridPlugin,interactionPlugin ]}
        eventContent={renderEventContent}
        dateClick={this.handleDateClick}
        events={[
          { title: 'event 1', date: '2022-02-11' },
          { title: 'event 2', date: '2022-02-22' }
        ]}
      />
    )
  }
  
  handleDateClick = (arg) => { // bind with an arrow function
    alert(arg.dateStr)
  }
}

function renderEventContent(eventInfo) {
  return (
    <>
      <b>{eventInfo.timeText}</b>
      <i>{eventInfo.event.title}</i>
    </>
  )
}