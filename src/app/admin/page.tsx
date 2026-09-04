import type { Metadata } from "next";
import Link from "next/link";
import { unstable_noStore as noStore } from "next/cache";
import { Calendar, Clock, Inbox, Phone, Mail, FileText } from "lucide-react";

import { routes } from "@/config/routes";
import { hospitalConfig } from "@/config/hospital";
import { formatDisplayDate } from "@/lib/dates";
import { requireAdminSession } from "@/lib/admin-auth";
import { listBookings } from "@/lib/bookings";
import type { BookingRecord, BookingStatus } from "@/types/booking";

import styles from "./admin.module.css";

export const metadata: Metadata = {
  title: `Bookings Dashboard | ${hospitalConfig.name}`,
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
        <a
          className={styles.actionButton}
          href={replyHref}
          title="Reply via Email"
        >
          <Mail size={13} />
          <span>Reply</span>
        </a>
      ) : (
        <span
          aria-disabled="true"
          className={`${styles.actionButton} ${styles.actionButtonDisabled}`}
          title="No email provided"
        >
          <Mail size={13} />
          <span>Reply</span>
        </span>
      )}

      {callHref ? (
        <a
          className={`${styles.actionButton} ${styles.actionButtonPrimary}`}
          href={callHref}
          title="Call patient"
        >
          <Phone size={13} />
          <span>Call</span>
        </a>
      ) : (
        <span
          aria-disabled="true"
          className={`${styles.actionButton} ${styles.actionButtonDisabled}`}
          title="No phone number"
        >
          <Phone size={13} />
          <span>Call</span>
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
    <div className={styles.adminPageContainer}>
      {/* Modern KPI Cards */}
      <section className={styles.statGrid}>
        <article className={styles.statCard}>
          <div className={styles.statCardHeader}>
            <span>Total Bookings</span>
            <div className={`${styles.statIcon} ${styles.statIconBlue}`}>
              <FileText size={18} />
            </div>
          </div>
          <strong>{summary.totalBookings}</strong>
          <small className={styles.statSubtext}>
            Lifetime submitted requests
          </small>
        </article>

        <article className={styles.statCard}>
          <div className={styles.statCardHeader}>
            <span>New Requests</span>
            <div className={`${styles.statIcon} ${styles.statIconOrange}`}>
              <Inbox size={18} />
            </div>
          </div>
          <strong>{summary.newBookings}</strong>
          <small className={styles.statSubtext}>Pending follow-up</small>
        </article>

        <article className={styles.statCard}>
          <div className={styles.statCardHeader}>
            <span>Submitted Today</span>
            <div className={`${styles.statIcon} ${styles.statIconGreen}`}>
              <Clock size={18} />
            </div>
          </div>
          <strong>{summary.todayBookings}</strong>
          <small className={styles.statSubtext}>
            Received in the last 24 hours
          </small>
        </article>
      </section>

      <section className={styles.contentSection}>
        <div className={styles.sectionHeaderRow}>
          <div>
            <h2>All Booking Requests</h2>
            <span className={styles.subtext}>
              Review patient details and follow up.
            </span>
          </div>
        </div>

        {summary.totalBookings === 0 ? (
          <div className={styles.emptyState}>
            <div className={styles.emptyStateIcon}>
              <Inbox size={32} />
            </div>
            <strong>No booking requests yet.</strong>
            <p>
              New appointments submitted from the public site will appear here.
            </p>
          </div>
        ) : (
          <>
            <div className={styles.desktopListing}>
              <div className={styles.tableWrap}>
                <table className={styles.bookingsTable}>
                  <thead>
                    <tr>
                      <th>Patient</th>
                      <th>Contact Details</th>
                      <th>Service</th>
                      <th>Preferred Date</th>
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
                            <a
                              href={`tel:${booking.phone}`}
                              className={styles.phoneLink}
                            >
                              {booking.phone}
                            </a>
                          </div>
                          {booking.email ? (
                            <span
                              className={`${styles.meta} ${styles.breakableText}`}
                            >
                              {booking.email}
                            </span>
                          ) : null}
                        </td>

                        <td>
                          <span className={styles.servicePill}>
                            {booking.service}
                          </span>
                        </td>

                        <td>
                          <time
                            dateTime={booking.preferredDate}
                            className={styles.dateCell}
                          >
                            <Calendar size={13} />
                            {formatDisplayDate(booking.preferredDate)}
                          </time>
                        </td>

                        <td>
                          <time
                            dateTime={booking.createdAt}
                            className={styles.submittedTime}
                          >
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
                    <div className={styles.bookingCardTitleGroup}>
                      <p className={styles.patientName}>{booking.fullName}</p>
                      <span className={styles.servicePill}>
                        {booking.service}
                      </span>
                    </div>
                    <span className={getStatusClassName(booking.status)}>
                      {booking.status}
                    </span>
                  </div>

                  <dl className={styles.bookingDetails}>
                    <div className={styles.detailItem}>
                      <dt>Phone</dt>
                      <dd>
                        <a
                          href={`tel:${booking.phone}`}
                          className={styles.phoneLink}
                        >
                          {booking.phone}
                        </a>
                      </dd>
                    </div>
                    {booking.email ? (
                      <div
                        className={`${styles.detailItem} ${styles.detailItemFull}`}
                      >
                        <dt>Email</dt>
                        <dd className={styles.breakableText}>
                          {booking.email}
                        </dd>
                      </div>
                    ) : null}
                    <div className={styles.detailItem}>
                      <dt>Preferred Date</dt>
                      <dd>
                        <time dateTime={booking.preferredDate}>
                          {formatDisplayDate(booking.preferredDate)}
                        </time>
                      </dd>
                    </div>
                    <div className={styles.detailItem}>
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
                  <Link
                    href={`${routes.admin.dashboard}?page=${pagination.currentPage - 1}`}
                  >
                    Previous
                  </Link>
                ) : (
                  <span aria-disabled="true">Previous</span>
                )}

                <strong>
                  Page {pagination.currentPage} of {pagination.totalPages}
                </strong>

                {pagination.currentPage < pagination.totalPages ? (
                  <Link
                    href={`${routes.admin.dashboard}?page=${pagination.currentPage + 1}`}
                  >
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
    </div>
  );
}
