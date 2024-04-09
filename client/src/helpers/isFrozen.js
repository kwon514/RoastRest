function isFrozen(frozenStart, frozenEnd) {
  const currentDate = new Date();
  currentDate.setHours(13, 0, 0, 0);

  if (!frozenStart) {
    return false;
  } else if (
    (frozenStart && !frozenEnd) ||
    (frozenStart && frozenEnd && new Date(frozenEnd) > currentDate)
  ) {
    return true;
  }
  return false;
}

export default isFrozen;
