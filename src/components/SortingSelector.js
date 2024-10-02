import React from 'react';

function SortingSelector({ onChange }) {
  const handleSelect = (e) => {
    onChange(e.target.value);
  };

  return (
    <div>
      <label>Sort by:</label>
      <select onChange={handleSelect}>
        <option value="priority">Priority</option>
        {/* You can add more sorting options here */}
      </select>
    </div>
  );
}

export default SortingSelector;
