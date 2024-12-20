import { useEffect, useLayoutEffect } from 'react';

export const useIsometricHook =
	typeof window === 'undefined' ? useLayoutEffect : useEffect;
