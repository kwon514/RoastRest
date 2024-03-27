import { Divider } from '@mui/material';

function DataViewField({ label, value, link = false }) {
  return (
    <>
      <div className="px-0 py-2">
        <p className="text-sm">{label}:</p>
        {link ? (
          <a
            className="text-wrap break-words"
            href={value ? value : null}
            target="_blank"
            rel="noreferrer"
          >
            {value ? value : '-'}
          </a>
        ) : (
          <p className="whitespace-pre-wrap">{value ? value : '-'}</p>
        )}
      </div>
      <Divider />
    </>
  );
}

export default DataViewField;
