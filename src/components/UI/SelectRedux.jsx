import React from 'react';
import cn from 'classnames';
import Select from 'react-select';

import { present } from 'src/lib/RamdaHelpers.js';

const SelectRedux = (props) => {
    const classNames = cn('xselect', props.className);
    const textLabelClassNames = cn('label', props.textLabelClassName);
    const { onChange, value, name, onFocus } = props.input;

    return <label className={classNames}>
        <div className={textLabelClassNames}>
            { props.label }
            { present(props.errors) ? <span className="input__required">*</span> : null }
        </div>
        <Select onChange={onChange} value={value} name={name} onFocus={onFocus} defaultValue={value} options={props.options} noOptionsMessage={() => "Нет опций"} classNamePrefix="react-select" placeholder={props.label} />
        { present(props.errors) ? <span className="input__errors">{props.errors}</span> : null }
    </label>
};

export default SelectRedux;