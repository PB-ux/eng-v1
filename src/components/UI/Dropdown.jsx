import React, { memo } from 'react';
import RCDropdown from 'rc-dropdown';

function Dropdown(props) {
    return <RCDropdown { ...props } />;
}

export default memo(Dropdown);
