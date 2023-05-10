import React from 'react';
import Tooltip from 'rc-tooltip';

const OVERLAY_STYLE = { opacity: 1 };

const XTooltip = Tooltip;

function TooltipX(props) {
    const { transitionName = 'tooltip-animation', children, placement = 'bottom', transitionAppear = true, overlayStyle = OVERLAY_STYLE, visible } = props;

    return <XTooltip {...props} placement={placement} transitionAppear={transitionAppear} overlayStyle={overlayStyle} visible={visible}>
        {children}
    </XTooltip>;
}

export default XTooltip;