import React, { memo } from 'react';
import cn from 'classnames';

import { present } from 'src/lib/RamdaHelpers.js';

function Input({ className, labelClasses, inputClassName, textLabel, text = 'text', type, register, name, required, validationSchema, errors }) {
    const inputClasses = cn('input', inputClassName);

    const renderInput = () => {
        return <input {...register(name, validationSchema)} className={inputClasses} placeholder={text} type={type} />
    };

    const textLabelClasses = cn('label', { labelClasses });

    return <label className={className}>
        <div className={textLabelClasses}>
            { textLabel }
            { required && present(errors[name]) ? <span className="input__required">*</span> : null }
        </div>
        { renderInput() }
        { present(errors) ? <span className="input__errors">{errors[name]?.message}</span> : null }
    </label>;
}

export default memo(Input);