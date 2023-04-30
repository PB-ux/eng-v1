import React from 'react';
import cn from 'classnames';
import { Controller } from 'react-hook-form';
import Select from 'react-select';

import { present } from 'src/lib/RamdaHelpers.js';

const XSelect = ({ className, errors, textLabel, required, name, rules, control, options, placeholder, textLabelClassName }) => {
    const classNames = cn('xselect', className);
    const textLabelClassNames = cn('label', textLabelClassName);

    return <label className={classNames}>
        <div className={textLabelClassNames}>
            { textLabel }
            { required && present(errors[name]) ? <span className="input__required">*</span> : null }
        </div>
        <Controller control={control} render={({ field }) => <Select {...field} options={options} noOptionsMessage={() => "Нет опций"} classNamePrefix="react-select" placeholder={placeholder} />} name={name} rules={rules} />
        { present(errors) ? <span className="input__errors">{errors[name]?.message}</span> : null }
    </label>
};

export default XSelect;