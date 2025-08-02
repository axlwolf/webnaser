import React from 'react';

interface Props {
  role: 'super_admin' | 'admin' | 'editor' | 'viewer';
  onChange: (role: 'super_admin' | 'admin' | 'editor' | 'viewer') => void;
}

const RoleManager = ({ role, onChange }: Props) => {
  return (
    <div className="mb-4">
      <h3 className="text-xl font-bold mb-2">Role Manager</h3>
      <div className="flex space-x-2">
        <label className="inline-flex items-center">
          <input
            type="radio"
            name="role"
            value="super_admin"
            checked={role === 'super_admin'}
            onChange={() => onChange('super_admin')}
            className="form-radio h-4 w-4 text-blue-600"
          />
          <span className="ml-2">Super Admin</span>
        </label>
        <label className="inline-flex items-center">
          <input
            type="radio"
            name="role"
            value="admin"
            checked={role === 'admin'}
            onChange={() => onChange('admin')}
            className="form-radio h-4 w-4 text-blue-600"
          />
          <span className="ml-2">Admin</span>
        </label>
        <label className="inline-flex items-center">
          <input
            type="radio"
            name="role"
            value="editor"
            checked={role === 'editor'}
            onChange={() => onChange('editor')}
            className="form-radio h-4 w-4 text-blue-600"
          />
          <span className="ml-2">Editor</span>
        </label>
        <label className="inline-flex items-center">
          <input
            type="radio"
            name="role"
            value="viewer"
            checked={role === 'viewer'}
            onChange={() => onChange('viewer')}
            className="form-radio h-4 w-4 text-blue-600"
          />
          <span className="ml-2">Viewer</span>
        </label>
      </div>
    </div>
  );
};

export default RoleManager;