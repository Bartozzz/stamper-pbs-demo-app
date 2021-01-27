import { renderHook } from "@testing-library/react-hooks";
import useTimeout from "./useTimeout";

describe("useTimeout", () => {
  jest.useFakeTimers();

  afterEach(() => {
    jest.clearAllMocks();
    jest.clearAllTimers();
  });

  it("should be defined", () => {
    expect(useTimeout).toBeDefined();
  });

  it("should execute a callback after the specified delay", () => {
    const callbackProp = jest.fn();
    const timeoutProp = 1000;

    const { unmount } = renderHook(
      ({ callback, delay }) => useTimeout(callback, delay),
      {
        initialProps: {
          callback: callbackProp,
          delay: timeoutProp,
        },
      }
    );

    // Set-up
    expect(setTimeout).toHaveBeenCalled();
    expect(setTimeout).toHaveBeenCalledWith(callbackProp, timeoutProp);
    expect(callbackProp).not.toHaveBeenCalled();

    // Execute
    jest.advanceTimersByTime(timeoutProp * 2);
    expect(callbackProp).toHaveBeenCalled();

    // Clear
    unmount();
    expect(clearTimeout).toHaveBeenCalled();
  });
});
