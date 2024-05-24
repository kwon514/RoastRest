import { AccountDetailsBox, PasswordUpdateBox, AccountMiscBox } from './';

function AccountSettings({ userName, userEmail, updateData, handleToast }) {
  return (
    <div className="md:w-3/4 mx-auto">
      <AccountDetailsBox
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
