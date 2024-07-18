import ReactGA from "react-ga4";

const trackAnalyticsEvent = ({ category = "Notable", action, label }) => {
  ReactGA.event({
    category,
    action,
    label,
  });
};

export default trackAnalyticsEvent;
