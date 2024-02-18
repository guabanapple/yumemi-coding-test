import { renderHook } from '@testing-library/react-hooks';
import useWindowSize from '../hooks/useWindowSize';

describe('useWindowSize hook', () => {
  let addEventListenerSpy: jest.SpyInstance;
  let removeEventListenerSpy: jest.SpyInstance;

  beforeEach(() => {
    addEventListenerSpy = jest.spyOn(window, 'addEventListener');
    removeEventListenerSpy = jest.spyOn(window, 'removeEventListener');
  });

  afterEach(() => {
    addEventListenerSpy.mockRestore();
    removeEventListenerSpy.mockRestore();
  });

  test('returns initial window size', () => {
    const { result } = renderHook(() => useWindowSize());
    expect(result.current).toBe(window.innerWidth);
  });

  test('updates window size on resize', () => {
    const { result } = renderHook(() => useWindowSize());
    expect(result.current).toBe(window.innerWidth);

    window.innerWidth = 500;
    window.dispatchEvent(new Event('resize'));

    setTimeout(() => {
      expect(result.current).toBe(500);
    }, 0);
  });

  test('removes resize listener on unmount', () => {
    const { unmount } = renderHook(() => useWindowSize());
    const listenersBeforeUnmount = addEventListenerSpy.mock.calls.length;

    unmount();

    const listenersAfterUnmount = removeEventListenerSpy.mock.calls.length;
    expect(listenersAfterUnmount).toBe(listenersBeforeUnmount);
  });
});
