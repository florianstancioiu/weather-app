import { vi } from "vitest";

export default () => {
  const clearWatchMock = vi.fn();
  const getCurrentPositionMock = vi.fn();
  const watchPositionMock = vi.fn();

  const geolocation = {
    clearWatch: clearWatchMock,
    getCurrentPosition: getCurrentPositionMock,
    watchPosition: watchPositionMock,
  };

  Object.defineProperty(global.navigator, "geolocation", {
    value: geolocation,
  });

  return { clearWatchMock, getCurrentPositionMock, watchPositionMock };
};
