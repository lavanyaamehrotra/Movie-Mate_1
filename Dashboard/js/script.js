function toggleUserStatus(button) {
  const row = button.closest('tr');
  const statusCell = row.querySelector('.status');
  if (statusCell.innerText === 'Active') {
      statusCell.innerText = 'Inactive';
      button.innerText = 'Activate'; 
      button.style.backgroundColor = '#e74c3c'; 
  } else {
      statusCell.innerText = 'Active';
      button.innerText = 'Deactivate'; 
      button.style.backgroundColor = '#2ecc71';
  }
}
