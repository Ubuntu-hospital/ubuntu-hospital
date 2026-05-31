import { BrandMark } from "@/components/ui/icons/Icons";
import { hospitalConfig } from "@/config/hospital";

export function OpenGraphBrandCard() {
  const phoneNumbers =
    hospitalConfig.contact.phoneNumbers.slice(0, 2);

  return (
    <div
      style={{
        display: "flex",
        width: "610px",
        height: "360px",
        flexDirection: "column",
        overflow: "hidden",
        border: "1px solid rgba(255, 255, 255, 0.28)",
        borderRadius: "18px",
        background: "#626262",
        boxShadow: "0 24px 54px rgba(0, 0, 0, 0.28)",
      }}
    >
      <div
        style={{
          display: "flex",
          height: "248px",
        }}
      >
        <div
          style={{
            display: "flex",
            width: "218px",
            alignItems: "center",
            justifyContent: "center",
            background: "#ff6d12",
            color: "#ffffff",
          }}
        >
          <BrandMark
            style={{
              width: "168px",
              height: "142px",
            }}
          />
        </div>

        <div
          style={{
            display: "flex",
            flex: 1,
            flexDirection: "column",
            justifyContent: "center",
            padding: "25px 28px 21px",
            background: "#626262",
          }}
        >
          <span
            style={{
              color: "#ffffff",
              fontSize: "58px",
              fontWeight: 800,
              letterSpacing: "-3px",
              lineHeight: 0.86,
              textTransform: "uppercase",
            }}
          >
            {hospitalConfig.brandName.primary}
          </span>

          <span
            style={{
              marginTop: "13px",
              color: "#ff8a42",
              fontSize: "21px",
              fontWeight: 800,
              letterSpacing: "-0.6px",
              lineHeight: 1,
            }}
          >
            {hospitalConfig.brandName.specialty}
          </span>

          <span
            style={{
              marginTop: "9px",
              color: "#ffffff",
              fontSize: "51px",
              fontWeight: 800,
              letterSpacing: "-2.5px",
              lineHeight: 0.9,
              textTransform: "uppercase",
            }}
          >
            {hospitalConfig.brandName.facility}
          </span>
        </div>
      </div>

      <div
        style={{
          display: "flex",
          height: "44px",
          alignItems: "center",
          padding: "0 24px",
          background: "rgba(38, 38, 38, 0.4)",
          color: "rgba(255, 255, 255, 0.92)",
          fontSize: "18px",
          fontWeight: 500,
          letterSpacing: "-0.2px",
        }}
      >
        {hospitalConfig.tagline}
      </div>

      <div
        style={{
          display: "flex",
          flex: 1,
          alignItems: "center",
          background: "#545454",
        }}
      >
        {phoneNumbers.map((phone, index) => (
          <div
            key={phone.label}
            style={{
              display: "flex",
              flex: 1,
              flexDirection: "column",
              justifyContent: "center",
              height: "100%",
              padding: "10px 22px",
              borderLeft:
                index === 0
                  ? "0"
                  : "1px solid rgba(255, 255, 255, 0.16)",
            }}
          >
            <span
              style={{
                color: "#ffc49d",
                fontSize: "11px",
                fontWeight: 800,
                letterSpacing: "1.7px",
                lineHeight: 1,
                textTransform: "uppercase",
              }}
            >
              {phone.label}
            </span>

            <span
              style={{
                marginTop: "8px",
                color: "#ffffff",
                fontSize: "21px",
                fontWeight: 800,
                letterSpacing: "-0.7px",
                lineHeight: 1,
              }}
            >
              {phone.display}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}