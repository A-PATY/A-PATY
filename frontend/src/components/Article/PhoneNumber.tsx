import * as React from 'react';
import { IMaskInput } from 'react-imask';
import Box from '@mui/material/Box';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';

interface CustomProps {
  onChange: (event: { target: { name: string; value: string } }) => void;
  name: string;
}

const TextMaskCustom = React.forwardRef<HTMLElement, CustomProps>(
  function TextMaskCustom(props, ref) {
    const { onChange, ...other } = props;
    return (
      <IMaskInput
        {...other}
        mask="(000) 0000-0000"
        definitions={{
          '#': /[1-9]/,
        }}
        // inputRef={ref}
        onAccept={(value: any) =>
          onChange({ target: { name: props.name, value } })
        }
        overwrite
      />
    );
  },
);

interface State {
  textmask: string;
  numberformat: string;
}

interface Props {
  phoneNumber: string | null;
  setPhoneNumber: (phoneNumber: string) => void;
}

const FormattedInputs: React.FC<Props> = ({ setPhoneNumber, phoneNumber }) => {
  // const [values, setValues] = React.useState<State>({
  //   textmask: '',
  //   numberformat: '1320',
  // });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // setValues({
    //   ...values,
    //   [event.target.name]: event.target.value,
    // });
    setPhoneNumber(event.target.value);
  };

  return (
    <Box
      sx={{
        '& > :not(style)': {
          m: 1,
          width: 150,
        },
      }}
    >
      <FormControl variant="standard">
        <InputLabel htmlFor="formatted-text-mask-input">
          {phoneNumber === '' ? '휴대폰 번호' : ''}
        </InputLabel>
        <Input
          placeholder="(010) 1234-5678"
          value={phoneNumber}
          onChange={handleChange}
          name="textmask"
          id="formatted-text-mask-input"
          inputComponent={TextMaskCustom as any}
        />
      </FormControl>
    </Box>
  );
};

export default FormattedInputs;
