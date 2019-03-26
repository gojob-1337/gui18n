import React, { FunctionComponent, useMemo } from 'react';

import InputAdornment from '@material-ui/core/InputAdornment';
import TextField, { TextFieldProps } from '@material-ui/core/TextField';
import Refresh from '@material-ui/icons/Refresh';

export type SearchInputProps = TextFieldProps & {
  loading?: boolean;
};

const SearchInput: FunctionComponent<SearchInputProps> = (props) => {
  const { loading, ...other } = props;

  const endAdornment = useMemo(() => {
    if (loading) {
      return (
        <InputAdornment position="end">
          <Refresh />
        </InputAdornment>
      );
    }
    return null;
  }, [loading]);

  return <TextField InputProps={{ endAdornment }} {...other} />;
};

export default SearchInput;
