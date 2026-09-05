import type { BookingRecord, CreateBookingInput } from "@/types/booking";

function serializeBookingRecord(booking: {
  _id: { toString(): string };
  fullName: string;
  phone: string;
  email: string | null;
  preferredDate: string;
  service: string;
  note: string | null;
  source: "website";
  status: BookingRecord["status"];
  createdAt: Date;
  updatedAt: Date;
}) {
  return {
    id: booking._id.toString(),
    fullName: booking.fullName,
    phone: booking.phone,
    email: booking.email ?? null,
    preferredDate: booking.preferredDate,
    service: booking.service,
    note: booking.note ?? null,
    source: booking.source,
    status: booking.status,
    createdAt: new Date(booking.createdAt).toISOString(),
    updatedAt: new Date(booking.updatedAt).toISOString(),
  } satisfies BookingRecord;
}

export async function createBooking(input: CreateBookingInput) {
  const [{ connectToDatabase }, { BookingModel }] = await Promise.all([
    import("@/lib/mongodb"),
    import("@/models/booking"),
  ]);

  await connectToDatabase();

  const booking = await BookingModel.create({
    ...input,
    email: input.email ?? null,
    note: input.note ?? null,
  });

  return serializeBookingRecord(booking.toObject());
}

interface ListBookingsOptions {
  page?: number;
  pageSize?: number;
}

export async function listBookings({
  page = 1,
  pageSize = 10,
}: ListBookingsOptions = {}) {
  const [{ connectToDatabase }, { BookingModel }] = await Promise.all([
    import("@/lib/mongodb"),
    import("@/models/booking"),
  ]);

  await connectToDatabase();

  const safePageSize = Math.min(Math.max(Math.trunc(pageSize), 1), 50);
  const requestedPage = Math.max(Math.trunc(page), 1);
  const startOfToday = new Date();
  startOfToday.setHours(0, 0, 0, 0);
  const startOfTomorrow = new Date(startOfToday);
  startOfTomorrow.setDate(startOfTomorrow.getDate() + 1);

  const [totalBookings, newBookings, todayBookings] = await Promise.all([
    BookingModel.countDocuments(),
    BookingModel.countDocuments({ status: "new" }),
    BookingModel.countDocuments({
      createdAt: {
        $gte: startOfToday,
        $lt: startOfTomorrow,
      },
    }),
  ]);

  const totalPages = Math.max(Math.ceil(totalBookings / safePageSize), 1);
  const currentPage = Math.min(requestedPage, totalPages);
  const bookings = await BookingModel.find()
    .sort({ createdAt: -1 })
    .skip((currentPage - 1) * safePageSize)
    .limit(safePageSize)
    .lean();

  return {
    bookings: bookings.map((booking) =>
      serializeBookingRecord({
        ...booking,
        _id: booking._id,
        createdAt: booking.createdAt,
        updatedAt: booking.updatedAt,
      }),
    ),
    summary: {
      totalBookings,
      newBookings,
      todayBookings,
    },
    pagination: {
      currentPage,
      totalPages,
      pageSize: safePageSize,
    },
  };
}
