// A mock function to mimic making an async request for data
export function fetchCount() {
  return new Promise((resolve) => {
    fetch('https://localhost:8080')
      .then(response => response.json())
      .then(data => resolve({ data }))
      .catch(error => console.error(error)); // Handle errors appropriately
  });
}
