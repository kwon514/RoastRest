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
      <PasswordUpdateBox userName={userName} userEmail={userEmail} />
      <AccountMiscBox />
    </div>
  );
}

export default AccountSettings;
