import { act, renderHook } from '@testing-library/react';
import useWindowSize from '../hooks/useWindowSize';

describe('useWindowSize hook', () => {
  let resizeListener: ((event: Event) => void) | null = null;
  let addEventListenerSpy: jest.Mock;
  let removeEventListenerSpy: jest.Mock;

  beforeEach(() => {
    resizeListener = null;
    addEventListenerSpy = jest.fn().mockImplementation((event, cb) => {
      if (event === 'resize') {
        resizeListener = cb;
      }
    });
    removeEventListenerSpy = jest.fn().mockImplementation((event, cb) => {
      if (event === 'resize' && resizeListener === cb) {
        resizeListener = null;
      }
    });
    Object.defineProperty(window, 'addEventListener', { value: addEventListenerSpy });
    Object.defineProperty(window, 'removeEventListener', { value: removeEventListenerSpy });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('returns initial window size', () => {
    const { result } = renderHook(() => useWindowSize());
    expect(result.current).toBe(window.innerWidth);
  });

  test('updates window size on resize', () => {
    const { result } = renderHook(() => useWindowSize());
    expect(result.current).toBe(window.innerWidth);

    act(() => {
      window.innerWidth = 500;
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      resizeListener && resizeListener(new Event('resize'));
    });

    expect(result.current).toBe(500);
  });

  test('removes resize listener on unmount', () => {
    const { unmount } = renderHook(() => useWindowSize());
    const listenersBeforeUnmount = addEventListenerSpy.mock.calls.length;

    unmount();

    const listenersAfterUnmount = removeEventListenerSpy.mock.calls.length;
    expect(listenersAfterUnmount).toBe(listenersBeforeUnmount);
  });
});
