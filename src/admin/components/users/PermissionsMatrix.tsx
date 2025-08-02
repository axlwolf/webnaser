import React from 'react';

interface Props {
  permissions: string[];
  onChange: (permissions: string[]) => void;
}

const PermissionsMatrix = ({ permissions, onChange }: Props) => {
  const availablePermissions = ['manage-content', 'manage-users', 'manage-settings'];

  const handlePermissionChange = (permission: string) => {
    if (permissions.includes(permission)) {
      onChange(permissions.filter((perm) => perm !== permission));
    } else {
      onChange([...permissions, permission]);
    }
  };

  return (
    <div className="mb-4">
      <h3 className="text-xl font-bold mb-2">Permissions Matrix</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {availablePermissions.map((permission) => (
          <div key={permission} className="flex items-center">
            <input
              type="checkbox"
              id={`permission-${permission}`}
              checked={permissions.includes(permission)}
              onChange={() => handlePermissionChange(permission)}
              className="form-checkbox h-5 w-5 text-blue-600"
            />
            <label htmlFor={`permission-${permission}`} className="ml-2">
              {permission}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PermissionsMatrix;