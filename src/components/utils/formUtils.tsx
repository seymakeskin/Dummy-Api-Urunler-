import { ChangeEvent } from 'react';

type SetStateFunction = React.Dispatch<React.SetStateAction<string | undefined>>;

export const handleInputChange = (e: ChangeEvent<HTMLInputElement>, setStateFunction: SetStateFunction) => {
  setStateFunction(e.target.value);
};
