import { PersonalDetailsBox, PasswordUpdateBox, DangerZoneBox } from './';

function AccountSettings({ userName, userEmail, updateData }) {
  return (
    <div className="md:w-3/4 mx-auto">
      <PersonalDetailsBox userName={userName} userEmail={userEmail} updateData={updateData} />
      <PasswordUpdateBox updateData={updateData} />
      <DangerZoneBox />
    </div>
  );
}

export default AccountSettings;
