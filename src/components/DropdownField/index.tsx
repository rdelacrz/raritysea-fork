import { FunctionComponent } from 'react';
import classNames from 'classnames';
import { FormControl, MenuItem, Select } from '@material-ui/core';

import './styles.scss';

interface DropdownFieldProps {
  id: string;
  className?: string;
  label?: string;
  value: string | number;
  options: { value: string | number, text: string }[];
  onChange: (value: any) => void;
}

export const DropdownField: FunctionComponent<DropdownFieldProps> = (props) => {
  return (
    <div className={classNames('dropdown-field-wrapper', props.className)}>
      {props.label && (
        <label className='dropdown-field-label' htmlFor={props.id}>{props.label}</label>
      )}
      <FormControl className='dropdown-form-field' fullWidth>
        <Select id={props.id} color='secondary' variant='outlined' value={props.value}
            onChange={e => props.onChange(e.target.value)}>
          {props.options.map(option => (
            <MenuItem value={option.value} key={option.value}>
              {option.text}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
