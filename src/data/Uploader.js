import { isFuture, isPast, isToday } from 'date-fns';
import { useState } from 'react';
import supabase from 'services/supabase';
import Button from 'ui/Button';
import { subtractDates } from 'utils/helpers';
import { bookings } from './data-bookings';
import { cabins } from './data-cabins';
import { guests } from './data-guests';

// const originalSettings = {
//   minBookingLength: 3,
//   maxBookingLength: 30,
//   maxGuestsPerBooking: 10,
//   breakfastPrice: 15,
// };

const deleteGuests = async () => {
  const { error } = await supabase.from('guests').delete().gt('id', 0);
  if (error) console.log(error.message);
};

const deleteCabins = async () => {
  const { error } = await supabase.from('cabins').delete().gt('id', 0);
  if (error) console.log(error.message);
};

const deleteBookings = async () => {
  const { error } = await supabase.from('bookings').delete().gt('id', 0);
  if (error) console.log(error.message);
};

const createGuests = async () => {
  const { error } = await supabase.from('guests').insert(guests);
  if (error) console.log(error.message);
};

const createCabins = async () => {
  const { error } = await supabase.from('cabins').insert(cabins);
  if (error) console.log(error.message);
};

const createBookings = async () => {
  // Booking needs a guestid and a cabinId. We can not tell Supabase IDs for each object, it will calculate them on its own. so it might be different for different people, especially after multiple uploads. Therefore, we need to first of all get all guestIds and cabinIds and then replace the original IDs in the booking data with actual ones from the DB.

  const { data: guestsIds } = await supabase
    .from('guests')
    .select('id')
    .order('id');
  const allGuestIds = guestsIds.map((cabin) => cabin.id);
  const { data: cabinsIds } = await supabase
    .from('cabins')
    .select('id')
    .order('id');
  const allCabinIds = cabinsIds.map((cabin) => cabin.id);

  const finalBookings = bookings.map((booking) => {
    // Here relying on the order of cabins, as they don't have and ID yet

    const cabin = cabins.at(booking.cabinId - 1);
    const numNights = subtractDates(booking.endDate, booking.startDate);
    const extrasPrice = booking.hasBreakfast
      ? numNights * 15 * booking.numGuests
      : 0;
    const totalPrice = cabinPrice + extrasPrice;
    let status;
    if (
      isPast(new Date(booking.endDate)) &&
      !isToday(new Date(booking.startDate))
    )
      status = 'checked-out';

    if (
      isFuture(new Date(booking.startDate)) ||
      isToday(new Date(booking.startDate))
    )
      status = 'unconfirmed';
    if (
      (isFuture(new Date(booking.endDate)) ||
        isToday(new Date(booking.endDate))) &&
      isPast(new Date(booking.startDate)) &&
      !isToday(new Date(booking.startDate))
    )
      status = 'checked-in';
    return {
      ...booking,
      numNights,
      cabinPrice,
      extrasPrice,
      totalPrice,
      guestId: allGuestIds.at(booking.guestId - 1),
      cabinId: allCabinIds.at(booking.cabinId - 1),
      status,
    };
  });
  console.log(finalBookings);

  const { error } = await supabase.from('bookings').insert(finalBookings);
  if (error) console.log(error.message);
};

export const Uploader = () => {
  const [isLoading, setIsLoading] = useState(false);

  const uploadAll = async () => {
    setIsLoading(true);
    // Bookings need to be deleted First
    await deleteBookings();
    await deleteGuests();
    await deleteCabins();

    // Bookings need to be created Last
    await createGuests();
    await createCabins();
    await createBookings();
    setIsLoading(false);
  };
  const uploadBookings = async () => {
    setIsLoading(true);
    await deleteBookings();
    await createBookings();
    setIsLoading(false);
  };
  return (
    <div
      style={{
        marginTop: 'auto',
        backgroundColor: '#e0e7ff',
        padding: '8px',
        borderRadius: '5px',
        textAlign: 'center',
      }}
    >
      <h3>DEV AREA</h3>

      <Button
        onClick={uploadAll}
        // To prevent accidental clicks. Remove to run once!
        disabled={isLoading}
        // disabled= {true}
      >
        Upload All Sample data
      </Button>
      <p>Only run this only once</p>
      <p>
        <em> (Cabins images need to be uploaded manually )</em>
      </p>
      <hr />
      <Button onClick={uploadBookings} disabled={isLoading}>
        Upload Current Bookings
      </Button>
      <p> You can run this every day you develop the app </p>
    </div>
  );
};
