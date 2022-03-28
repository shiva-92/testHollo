const events = require("./events.json");
const moment = require("moment");

const start = moment("2017-02-21T08:00:00-05:00");
const end = moment("2017-02-21T18:00:00-05:00");

const findFreeTimes = (start, end, duration, events) => {
  //1st step : only keep events :
  //-between start and end field
  //-which start before end time (in this case for example 18:00) and end after end time
  //-which start before start time (in this case for example 8:00) and end after start time

  const eventstokeep = events.filter(filterEventsToKeep);

  function filterEventsToKeep(event) {
    return (
      (moment(event.start) > start && moment(event.end) < end) ||
      (moment(event.start) < end && moment(event.end) > end) ||
      (moment(event.start) < start && moment(event.end) > start)
    );
  }

  //2nd step : generate free slots
  const allFreeSlotsTab = [];

  for (let i = 0; i < eventstokeep.length; i++) {
    const slots = {};

    //when we are at the first element of the array eventstokeep
    if (i === 0) {
      //if the day begins with a meeting
      const slotAfterfirstSlot = {};

      if (moment(eventstokeep[i].start) == start) {
        slots["start"] = moment(end).utcOffset("-0500").format();

        if (i + 1) {
          slots["end"] = moment(eventstokeep[i + 1].start)
            .utcOffset("-0500")
            .format();
        } else {
          slots["end"] = moment(end).utcOffset("-0500").format();
        }
      }

      //if the day begins with a free field
      else {
        slots["start"] = moment(start).utcOffset("-0500").format();
        slots["end"] = moment(eventstokeep[i].start)
          .utcOffset("-0500")
          .format();
      }

      allFreeSlotsTab.push(slots);

      slotAfterfirstSlot["start"] = moment(eventstokeep[i].end)
        .utcOffset("-0500")
        .format();

      if (eventstokeep[i + 1]) {
        slotAfterfirstSlot["end"] = moment(eventstokeep[i + 1].start)
          .utcOffset("-0500")
          .format();
      } else {
        slotAfterfirstSlot["end"] = moment(end).utcOffset("-0500").format();
      }
      allFreeSlotsTab.push(slotAfterfirstSlot);
    }

    //when we are not at the first element of the array eventstokeep
    else {
      slots["start"] = moment(eventstokeep[i].end).utcOffset("-0500").format();
      if (eventstokeep[i + 1]) {
        slots["end"] = moment(eventstokeep[i + 1].start)
          .utcOffset("-0500")
          .format();
      } else {
        slots["end"] = moment(end).utcOffset("-0500").format();
      }

      allFreeSlotsTab.push(slots);
    }
  }

  //3rd step: return all the free slots which are above or equal to the duration given

  const slotsAboveDuration = allFreeSlotsTab.filter(
    filterFreeSlotAboveDuration
  );

  function filterFreeSlotAboveDuration(slot) {
    const beginning = moment(slot.start);
    const ending = moment(slot.end);
    return ending.diff(beginning, `minutes`) >= duration;
  }

  //4th step: finaly remove free slots above duration from the events who overlap start time (for example: start time 08:00 and events starting at 7:30 and ending at 8:30) and end time (for example: end time 18:00 and event starting at 17:30 and ending at 18:30)

  const slotsAboveDurationtoKeep = slotsAboveDuration.filter(
    filterFreeSlotAboveDurationtoKeep
  );

  function filterFreeSlotAboveDurationtoKeep(slottokeep) {
    return moment(slottokeep.start) <= end && moment(slottokeep.end) >= start;
  }

  console.log(`Free times slots equal or above to ${duration} minutes`);
  return slotsAboveDurationtoKeep;
};

const freeSlots = findFreeTimes(start, end, 30, events);
console.log(freeSlots);
