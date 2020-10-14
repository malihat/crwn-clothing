import { createSelector } from 'reselect';

const selectDirectory = state => state.directory;

export const selectDirectorySecitons = createSelector(
  [selectDirectory],
  directory => directory.sections
)
