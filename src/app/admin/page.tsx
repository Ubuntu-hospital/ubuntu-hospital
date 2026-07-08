import type { Metadata } from "next";
import Link from "next/link";
import { unstable_noStore as noStore } from "next/cache";

import { signOutAdminAction } from "@/actions/admin-auth";
import { hospitalConfig } from "@/config/hospital";
import { formatDisplayDate } from "@/lib/dates";
import { requireAdminSession } from "@/lib/admin-auth";
import { listBookings } from "@/lib/bookings";
import type { BookingRecord, BookingStatus } from "@/types/booking";

import styles from "./admin.module.css";
import { SignOutButton } from "./sign-out-button.client";

export const metadata: Metadata = {
  title: `Admin Dashboard | ${hospitalConfig.name}`,
  description: "Protected dashboard for hospital appointment bookings.",
};

export const dynamic = "force-dynamic";

function formatDateTime(value: string) {
  return new Intl.DateTimeFormat("en-GB", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));
}

function getStatusClassName(status: BookingStatus) {
  switch (status) {
    case "contacted":
      return `${styles.statusBadge} ${styles.statusBadgeContacted}`;
    case "scheduled":
      return `${styles.statusBadge} ${styles.statusBadgeScheduled}`;
    default:
      return `${styles.statusBadge} ${styles.statusBadgeNew}`;
  }
}

function getReplyHref(booking: BookingRecord) {
  if (!booking.email) {
    return null;
  }

  const subject = encodeURIComponent(
    `Your appointment request at ${hospitalConfig.name}`,
  );
  const body = encodeURIComponent(
    `Hello ${booking.fullName},\n\nWe are following up on your ${booking.service} appointment request for ${formatDisplayDate(booking.preferredDate)}.\n\nRegards,\n${hospitalConfig.name}`,
  );

  return `mailto:${booking.email}?subject=${subject}&body=${body}`;
}

function getCallHref(phone: string) {
  const callableNumber = phone.replace(/[^\d+]/g, "");

  return callableNumber ? `tel:${callableNumber}` : null;
}

function ContactActions({ booking }: { booking: BookingRecord }) {
  const replyHref = getReplyHref(booking);
  const callHref = getCallHref(booking.phone);

  return (
    <div className={styles.actionGroup}>
      {replyHref ? (
        <a className={styles.actionButton} href={replyHref}>
          Reply
        </a>
      ) : (
        <span
          aria-disabled="true"
          className={`${styles.actionButton} ${styles.actionButtonDisabled}`}
        >
          Reply
        </span>
      )}

      {callHref ? (
        <a
          className={`${styles.actionButton} ${styles.actionButtonPrimary}`}
          href={callHref}
        >
          Call
        </a>
      ) : (
        <span
          aria-disabled="true"
          className={`${styles.actionButton} ${styles.actionButtonDisabled}`}
        >
          Call
        </span>
      )}
    </div>
  );
}

function parsePage(value: string | string[] | undefined) {
  const parsedPage = Number(Array.isArray(value) ? value[0] : value);

  return Number.isInteger(parsedPage) && parsedPage > 0 ? parsedPage : 1;
}

interface AdminDashboardPageProps {
  searchParams: Promise<{
    page?: string | string[];
  }>;
}

export default async function AdminDashboardPage({
  searchParams,
}: AdminDashboardPageProps) {
  noStore();

  await requireAdminSession();
  const { page } = await searchParams;
  const { bookings, summary, pagination } = await listBookings({
    page: parsePage(page),
    pageSize: 10,
  });

  return (
    <>
      <section className={styles.dashboardPanel}>
        <div className={styles.dashboardHeader}>
          <div className={styles.dashboardHeading}>
            <h1>Appointment bookings</h1>
          </div>

          <form action={signOutAdminAction}>
            <SignOutButton />
          </form>
        </div>

        <div className={styles.statGrid}>
          <article className={styles.statCard}>
            <span>Total bookings</span>
            <strong>{summary.totalBookings}</strong>
          </article>

          <article className={styles.statCard}>
            <span>New requests</span>
            <strong>{summary.newBookings}</strong>
          </article>

          <article className={styles.statCard}>
            <span>Submitted today</span>
            <strong>{summary.todayBookings}</strong>
          </article>
        </div>
      </section>

      <section className={styles.tableCard}>
        <div className={styles.tableHeader}>
          <h2>All booking requests</h2>
        </div>

        {summary.totalBookings === 0 ? (
          <div className={styles.emptyState}>
            <strong>No bookings yet.</strong>
          </div>
        ) : (
          <>
            <div className={styles.desktopListing}>
              <div className={styles.tableWrap}>
                <table className={styles.bookingsTable}>
                  <thead>
                    <tr>
                      <th>Patient</th>
                      <th>Contact</th>
                      <th>Service</th>
                      <th>Preferred date</th>
                      <th>Submitted</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>

                  <tbody>
                    {bookings.map((booking) => (
                      <tr key={booking.id}>
                        <td>
                          <p className={styles.patientName}>
                            {booking.fullName}
                          </p>
                          {booking.note ? (
                            <p className={styles.patientNote}>{booking.note}</p>
                          ) : null}
                        </td>

                        <td>
                          <div className={styles.breakableText}>
                            {booking.phone}
                          </div>
                          {booking.email ? (
                            <span
                              className={`${styles.meta} ${styles.breakableText}`}
                            >
                              {booking.email}
                            </span>
                          ) : null}
                        </td>

                        <td>{booking.service}</td>

                        <td>
                          <time dateTime={booking.preferredDate}>
                            {formatDisplayDate(booking.preferredDate)}
                          </time>
                        </td>

                        <td>
                          <time dateTime={booking.createdAt}>
                            {formatDateTime(booking.createdAt)}
                          </time>
                        </td>

                        <td>
                          <span className={getStatusClassName(booking.status)}>
                            {booking.status}
                          </span>
                        </td>

                        <td>
                          <ContactActions booking={booking} />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className={styles.mobileListing}>
              {bookings.map((booking) => (
                <article className={styles.bookingCard} key={booking.id}>
                  <div className={styles.bookingCardHeader}>
                    <div>
                      <p className={styles.patientName}>{booking.fullName}</p>
                      <p className={styles.cardService}>{booking.service}</p>
                    </div>
                    <span className={getStatusClassName(booking.status)}>
                      {booking.status}
                    </span>
                  </div>

                  <dl className={styles.bookingDetails}>
                    <div>
                      <dt>Phone</dt>
                      <dd className={styles.breakableText}>{booking.phone}</dd>
                    </div>
                    {booking.email ? (
                      <div>
                        <dt>Email</dt>
                        <dd className={styles.breakableText}>{booking.email}</dd>
                      </div>
                    ) : null}
                    <div>
                      <dt>Preferred date</dt>
                      <dd>
                        <time dateTime={booking.preferredDate}>
                          {formatDisplayDate(booking.preferredDate)}
                        </time>
                      </dd>
                    </div>
                    <div>
                      <dt>Submitted</dt>
                      <dd>
                        <time dateTime={booking.createdAt}>
                          {formatDateTime(booking.createdAt)}
                        </time>
                      </dd>
                    </div>
                  </dl>

                  {booking.note ? (
                    <div className={styles.cardNote}>
                      <span>Additional note</span>
                      <p>{booking.note}</p>
                    </div>
                  ) : null}

                  <ContactActions booking={booking} />
                </article>
              ))}
            </div>

            {pagination.totalPages > 1 ? (
              <nav className={styles.pagination} aria-label="Bookings pages">
                {pagination.currentPage > 1 ? (
                  <Link href={`/admin?page=${pagination.currentPage - 1}`}>
                    Previous
                  </Link>
                ) : (
                  <span aria-disabled="true">Previous</span>
                )}

                <strong>
                  Page {pagination.currentPage} of {pagination.totalPages}
                </strong>

                {pagination.currentPage < pagination.totalPages ? (
                  <Link href={`/admin?page=${pagination.currentPage + 1}`}>
                    Next
                  </Link>
                ) : (
                  <span aria-disabled="true">Next</span>
                )}
              </nav>
            ) : null}
          </>
        )}
      </section>
    </>
  );
}
