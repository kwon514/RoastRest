function isFrozen(frozenStart, frozenEnd) {
    if (!frozenStart) {
        return false;
    } else if ((frozenStart && !frozenEnd) || (frozenStart && frozenEnd && new Date(frozenEnd) > new Date())) {
        return true;
    }
    return false;
}

export default isFrozen;