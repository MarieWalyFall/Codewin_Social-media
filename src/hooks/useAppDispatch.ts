import { useDispatch } from 'react-redux';
import type { AppDispatch } from '../store'; // Adjust path

export const useAppDispatch: () => AppDispatch = useDispatch;
