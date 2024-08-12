export const useIsoFormat = (timestamp: number) => {
  const date = new Date(timestamp); // Converts the timestamp to a Date object

  const isoString = date.toISOString(); // Converts the date to ISO 8601 format (UTC)
  console.log(isoString);
  return isoString;
};

const timestamp = Date.now()
const updatedTimeStamp = Date.now
const date = new Date(timestamp); // Converts the timestamp to a Date object

  const isoString = date.toISOString(); // Converts the date to ISO 8601 format (UTC)
  console.log(isoString);
 

