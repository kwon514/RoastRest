import { PersonalDetailsBox, PasswordUpdateBox, AccountMiscBox } from './';

function AccountSettings({ userName, userEmail, updateData, handleToast }) {
  return (
    <div className="md:w-3/4 mx-auto">
      <PersonalDetailsBox
        userName={userName}
        userEmail={userEmail}
        updateData={updateData}
        handleToast={handleToast}
      />
      <PasswordUpdateBox updateData={updateData} handleToast={handleToast} />
      <AccountMiscBox />
    </div>
  );
}

export default AccountSettings;
