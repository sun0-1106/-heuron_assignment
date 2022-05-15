import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface State {
  target: {
    author?: string;
    download_url?: string;
    height?: number;
    id?: string;
    url?: string;
    width?: number;
  };
  targetId: string;
}

const initialState: State = {
  target: {},
  targetId: '0',
};

export const targetSlice = createSlice({
  name: 'target',
  initialState,
  reducers: {
    setTarget: (state: State, { payload }: PayloadAction<object>) => {
      state.target = payload;
    },
    setTargetId: (state: State, { payload }: PayloadAction<string>) => {
      state.targetId = payload;
    },
  },
});

export const { setTargetId, setTarget } = targetSlice.actions;
export default targetSlice.reducer;
