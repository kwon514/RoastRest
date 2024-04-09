function calcRestDays(strRoastDate, strFrozenStart, strFrozenEnd) {
  const currentDate = new Date();
  currentDate.setHours(13, 0, 0, 0);
  const roastDate = new Date(strRoastDate);

  const daysSinceRoast = Math.floor((currentDate - roastDate) / (1000 * 60 * 60 * 24));

  if (strFrozenStart && strFrozenEnd) {
    const frozenStart = new Date(strFrozenStart);
    const frozenEnd = new Date(strFrozenEnd);
    const frozenDays = Math.floor((frozenEnd - frozenStart) / (1000 * 60 * 60 * 24));
    return daysSinceRoast - frozenDays;
  } else if (strFrozenStart) {
    const frozenStart = new Date(strFrozenStart);
    const frozenDays = Math.floor((currentDate - frozenStart) / (1000 * 60 * 60 * 24));
    return daysSinceRoast - frozenDays;
  } else {
    return daysSinceRoast;
  }
}

export default calcRestDays;
