"use client";

import { FormEvent, useState } from "react";

import CustomDatePicker from "@/components/ui/custom-date-picker/custom-date-picker.client";
import CustomSelect from "@/components/ui/custom-select/custom-select.client";
import Reveal from "@/components/ui/reveal/reveal.client";

export default function BookingForm({
  services,
}: {
  services: readonly string[];
}) {
  const [service, setService] = useState("");
  const [preferredDate, setPreferredDate] = useState("");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
    <Reveal className="booking-card">
      <form className="booking-form" onSubmit={handleSubmit}>
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
                name="name"
                placeholder="Your full name"
                autoComplete="name"
                required
              />
            </label>

            <label>
              <span>Phone number</span>

              <input
                type="tel"
                name="phone"
                placeholder="Your phone number"
                autoComplete="tel"
                required
              />
            </label>

            <label className="field-wide">
              <span>Email address</span>

              <input
                type="email"
                name="email"
                placeholder="Your email address"
                autoComplete="email"
              />
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
                name="date"
                value={preferredDate}
                onChange={setPreferredDate}
              />
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
            </label>

            <label className="field-wide">
              <span>Additional note</span>

              <textarea
                name="note"
                rows={4}
                placeholder="Tell us briefly how we can help"
              />
            </label>
          </div>
        </div>

        <button className="booking-submit" type="submit">
          Request appointment
        </button>
      </form>
    </Reveal>
  );
}
