import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'; // eslint-disable-line
import { AppDispatch, RootState } from './store';

export const useAppDispatch: () => AppDispatch = useDispatch;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
