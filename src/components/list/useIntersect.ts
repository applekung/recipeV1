import { useEffect, useCallback, useRef } from 'react'

interface ObserverOptions extends IntersectionObserverInit {
  root?: HTMLDivElement | null
}

const useIntersect = (
  onIntersect: (
    entry: IntersectionObserverEntry,
    observer: IntersectionObserver,
  ) => void,
  option: ObserverOptions,
) => {
  const ref = useRef<HTMLDivElement | null>(null)

  const obsCallback = useCallback(
    ([entry]: IntersectionObserverEntry[], observer: IntersectionObserver) => {
      if (entry.isIntersecting) {
        onIntersect(entry, observer)
      }
    },
    [onIntersect],
  )

  useEffect(() => {
    let observer: IntersectionObserver | undefined

    if (ref.current) {
      observer = new IntersectionObserver(obsCallback, {
        root: option?.root || null,
        rootMargin: option?.rootMargin || '0px',
        threshold: option?.threshold || 0.5,
        ...option,
      })

      observer.observe(ref.current)
    }

    return () => observer && observer.disconnect()
  }, [ref, obsCallback, option])

  return ref
}

export default useIntersect
