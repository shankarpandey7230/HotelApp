import { useUser } from 'features/authentication/useUser';
import { useState } from 'react';
import Button from 'ui/Button';
import FileInput from 'ui/FileInput';
import Form from 'ui/Form';
import FormRow from 'ui/FormRow';
import Input from 'ui/Input';
import { useUpdateUser } from './useUpdateUser';

const UpdateUserDataForm = () => {
  // no need of loading state

  const {
    user: {
      email,
      user_metadata: { fullName: currentFullName },
    },
  } = useUser();

  const [fullName, setFullName] = useState(currentFullName);
  const [avatar, setAvatar] = useState(null);
  const { mutate: updateUser, isLoading: isUpdating } = useUpdateUser();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!fullName) return;
    updateUser(
      {
        fullName,
        avatar,
      },
      {
        onSuccess: () => {
          setAvatar(null);
          // Resetting from using .reset() that's available on all HTML form elements, otherwise the old filename will stay displayed in the UI
          e.target.reset();
        },
      }
    );
  };

  const handleCancel = (e) => {
    // We don't even need preventDefault because this button was designed to reset the form (remember, it has HTML attribute 'reset')
    setFullName(currentFullName);
    setAvatar(null);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <FormRow label="Email Address">
        <Input value={email} disabled />
      </FormRow>
      <FormRow label="Full name">
        <Input
          type="text"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          disabled={isUpdating}
          id="fullName"
        />
      </FormRow>
      <FormRow label="Avatar image">
        <FileInput
          disabled={isUpdating}
          id="avatar"
          accept="image/*"
          onChange={(e) => setAvatar(e.target.files[0])}
          // We should also validate that its actually an image
        />
      </FormRow>
      <FormRow>
        <Button onClick={handleCancel} type="reset" variation="secondary">
          Cancel
        </Button>
        <Button disabled={isUpdating}>Update Account</Button>
      </FormRow>
    </Form>
  );
};

export default UpdateUserDataForm;
