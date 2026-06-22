"use client";

import { useActionState, useEffect, useRef, useState } from "react";

import { requestAppointmentAction } from "@/actions/booking";
import { initialBookingActionState } from "@/types/booking";
import CustomDatePicker from "@/components/ui/custom-date-picker/custom-date-picker.client";
import CustomSelect from "@/components/ui/custom-select/custom-select.client";
import Reveal from "@/components/ui/reveal/reveal.client";

export default function BookingForm({
  services,
}: {
  services: readonly string[];
}) {
  const formRef = useRef<HTMLFormElement>(null);
  const [service, setService] = useState("");
  const [preferredDate, setPreferredDate] = useState("");
  const [state, formAction, isPending] = useActionState(
    requestAppointmentAction,
    initialBookingActionState,
  );

  useEffect(() => {
    if (state.status !== "success" && state.status !== "warning") {
      return;
    }

    formRef.current?.reset();
    setService("");
    setPreferredDate("");
  }, [state.status, state.submittedAt]);

  return (
    <Reveal className="booking-card">
      <form action={formAction} className="booking-form" ref={formRef}>
        <div className="booking-form-header">
          <span>Appointment request</span>
          <h3>Tell us how to reach you.</h3>
        </div>

        <div className="booking-form-group">
          <div className="booking-form-label">
            <span>01</span>
            <p>Your details</p>
          </div>

          <div className="booking-fields booking-fields-two">
            <label>
              <span>Full name</span>

              <input
                type="text"
                name="fullName"
                placeholder="Your full name"
                autoComplete="name"
                aria-invalid={Boolean(state.fieldErrors.fullName)}
                required
              />

              {state.fieldErrors.fullName ? (
                <small className="booking-field-error">
                  {state.fieldErrors.fullName}
                </small>
              ) : null}
            </label>

            <label>
              <span>Phone number</span>

              <input
                type="tel"
                name="phone"
                placeholder="Your phone number"
                autoComplete="tel"
                aria-invalid={Boolean(state.fieldErrors.phone)}
                required
              />

              {state.fieldErrors.phone ? (
                <small className="booking-field-error">
                  {state.fieldErrors.phone}
                </small>
              ) : null}
            </label>

            <label className="field-wide">
              <span>Email address</span>

              <input
                type="email"
                name="email"
                placeholder="Your email address"
                autoComplete="email"
                aria-invalid={Boolean(state.fieldErrors.email)}
              />

              {state.fieldErrors.email ? (
                <small className="booking-field-error">
                  {state.fieldErrors.email}
                </small>
              ) : null}
            </label>
          </div>
        </div>

        <div className="booking-form-group">
          <div className="booking-form-label">
            <span>02</span>
            <p>Visit preference</p>
          </div>

          <div className="booking-fields booking-fields-two">
            <label>
              <span>Preferred date</span>

              <CustomDatePicker
                name="preferredDate"
                value={preferredDate}
                onChange={setPreferredDate}
              />

              {state.fieldErrors.preferredDate ? (
                <small className="booking-field-error">
                  {state.fieldErrors.preferredDate}
                </small>
              ) : null}
            </label>

            <label>
              <span>Service</span>

              <CustomSelect
                name="service"
                value={service}
                onChange={setService}
                placeholder="Select a service"
                options={[...services]}
              />

              {state.fieldErrors.service ? (
                <small className="booking-field-error">
                  {state.fieldErrors.service}
                </small>
              ) : null}
            </label>

            <label className="field-wide">
              <span>Additional note</span>

              <textarea
                name="note"
                rows={4}
                placeholder="Tell us briefly how we can help"
                aria-invalid={Boolean(state.fieldErrors.note)}
              />

              {state.fieldErrors.note ? (
                <small className="booking-field-error">
                  {state.fieldErrors.note}
                </small>
              ) : null}
            </label>
          </div>
        </div>

        {state.message ? (
          <p
            className={
              state.status === "success"
                ? "booking-feedback booking-feedback-success"
                : state.status === "warning"
                  ? "booking-feedback booking-feedback-warning"
                : "booking-feedback booking-feedback-error"
            }
            aria-live="polite"
          >
            {state.message}
          </p>
        ) : null}

        <button className="booking-submit" type="submit" disabled={isPending}>
          {isPending ? "Sending request..." : "Request appointment"}
        </button>
      </form>
    </Reveal>
  );
}
