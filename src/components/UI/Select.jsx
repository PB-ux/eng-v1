import React from 'react';
import cn from 'classnames';
import Select from 'react-select';

function XSelect(props) {
    const classNames = cn('xselect', props.className);


    return <Select {...props} className={classNames} noOptionsMessage={() => "Нет опций"} classNamePrefix="react-select" />
}

export default XSelect;