function getElementStyles(element, depth = 0) {
    if (!element || depth > 3) return; // Limit depth
    const computedStyles = window.getComputedStyle(element);
    
    const styles = {
        selector: getSelector(element),
        color: computedStyles.color,
        'font-size': computedStyles.fontSize,
        'font-family': computedStyles.fontFamily,
        'font-weight': computedStyles.fontWeight,
        'font-style': computedStyles.fontStyle,
        'text-align': computedStyles.textAlign,
        'line-height': computedStyles.lineHeight,
        'text-decoration': computedStyles.textDecoration,
        opacity: computedStyles.opacity,
        'background-color': computedStyles.backgroundColor,
        margin: computedStyles.margin,
        padding: computedStyles.padding,
        border: computedStyles.border
    };

    return styles;
}

function getSelector(element) {
    const id = element.id ? `#${element.id}` : '';
    const classNames = element.className ? `.${element.className.trim().split(' ').join('.')}` : '';
    const tagName = element.tagName.toLowerCase();
    
    return `${tagName}${id}${classNames}`;
}

function getSelectedTextStyles() {
    const selection = window.getSelection();
    if (!selection.rangeCount) {
        console.log('No text selected.');
        return;
    }

    const range = selection.getRangeAt(0);
    const selectedNode = range.startContainer;

    const selectedTextStyles = getElementStyles(selectedNode.parentElement);

    // Process parent elements
    const parentStyles = [];
    let parent = selectedNode.parentElement;
    for (let i = 0; i < 3; i++) {
        parent = parent.parentElement;
        if (parent) {
            parentStyles.push(getElementStyles(parent, i + 1));
        }
    }

    const result = {
        selectedText: selection.toString(),
        selectedTextStyles,
        parentStyles
    };

    console.log('Selected text:', result.selectedText);
    console.log('Selected text properties:', result.selectedTextStyles);
    console.log('Parent element properties:', parentStyles);
}

// Call the function
getSelectedTextStyles();
