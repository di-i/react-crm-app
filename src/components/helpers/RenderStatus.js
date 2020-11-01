export const renderStatus = (status) => {
    let statusClass = '';
    switch (status) {
        case 'In Kitchen':
            statusClass = 'badge-in-kitchen';
            break;
        case 'On the Way':
            statusClass = 'badge-on-the-way';
            break;
        case 'Delivered':
            statusClass = 'badge-delivered';
            break;
        case 'Undelivered':
            statusClass = 'badge-undelivered';
            break;
        case 'Delayed':
            statusClass = 'badge-delay';
            break;
        default:
            statusClass = '';
            break;
    }
    return statusClass;
}