let auditoriums;

export default async function enrichScheduleWithEmptySeats(schedule) {
  if (!auditoriums) {
    auditoriums = await $.getJSON('../json/auditoriums.json');
  }
  for (let show of schedule) {
    let auditorium = auditoriums.find(function (auditorium) {
      return auditorium.auditorium === show.auditorium;
    });
    show.emptySeats = auditorium.seats - show.bookedSeats.length;
  }
  return schedule;
}
