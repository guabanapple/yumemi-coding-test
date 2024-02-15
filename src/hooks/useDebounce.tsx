import { useState, useEffect } from 'react';

interface Props {
  value: string;
  delay: number;
}

function useDebounce({ value, delay }: Props) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    // delay 後 debounce の対象 state をアップデート
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // 次の effect が実行される直前に timer キャンセル
    return () => {
      clearTimeout(timer);
    };

    // value、delay がアップデートするたびに effect 実行
  }, [value, delay]);

  // 最終的にアップデートされた state をリターン
  return debouncedValue;
}

export default useDebounce;
