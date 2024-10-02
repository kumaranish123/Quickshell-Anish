import React from 'react';

function GroupingSelector({ onChange }) {
  const handleSelect = (e) => {
    onChange(e.target.value);
  };

  return (
    <div>
      <label>Group by:</label>
      <select onChange={handleSelect}>
        <option value="status">Status</option>
        <option value="user">User</option>
        <option value="priority">Priority</option>
      </select>
    </div>
  );
}

export default GroupingSelector;
