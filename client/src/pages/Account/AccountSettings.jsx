import { PersonalDetailsBox, PasswordUpdateBox, AccountMiscBox } from './';

function AccountSettings({ userName, userEmail, updateData }) {
  return (
    <div className="md:w-3/4 mx-auto">
      <PersonalDetailsBox userName={userName} userEmail={userEmail} updateData={updateData} />
      <PasswordUpdateBox updateData={updateData} />
      <AccountMiscBox />
    </div>
  );
}

export default AccountSettings;
