
import React from 'react';
import { LocalizationProvider, DateCalendar } from '@mui/x-date-pickers';
import AdapterDateFns from '@mui/x-date-pickers/AdapterDateFns';

function CustomDatePicker({ pengeluaranLainInput, setPengeluaranLainInput }) {
    const handleInputPeneluaranLain = (name, value) => {
        setPengeluaranLainInput({
            ...pengeluaranLainInput,
            [name]: value,
        });
    };

    return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DateCalendar
                value={pengeluaranLainInput.tanggal_pengeluaran}
                onChange={(newValue) => handleInputPeneluaranLain('tanggal_pengeluaran', newValue)}
            />
        </LocalizationProvider>
    );
}

export default CustomDatePicker;
