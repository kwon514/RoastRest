import { TextField, IconButton, InputAdornment } from '@mui/material';
import { VisibilityOutlined, VisibilityOffOutlined } from '@mui/icons-material';
import { useState } from 'react';

function PasswordInputField({ id, name, label, value, handleOnChange, autoComplete, margin }) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <TextField
      required
      id={id}
      name={name}
      label={label}
      type={showPassword ? 'text' : 'password'}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={() => setShowPassword(!showPassword)}
              onMouseDown={(e) => e.preventDefault()}
              edge="end"
            >
              {showPassword ? <VisibilityOutlined /> : <VisibilityOffOutlined />}
            </IconButton>
          </InputAdornment>
        ),
      }}
      value={value}
      autoComplete={autoComplete}
      onChange={handleOnChange}
      margin={margin}
      fullWidth
    />
  );
}

export default PasswordInputField;
