import Axios from 'axios';

import { CLEAR_CURRENT_PROFILE, PROFILE_LOADING } from '../types/profileActionTypes';

export const setProfileLoading = () => ({ type: PROFILE_LOADING })

export const clearCurrentProfile = () => ({ type: CLEAR_CURRENT_PROFILE })