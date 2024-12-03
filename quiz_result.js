document.addEventListener('DOMContentLoaded', () => {
    const result = localStorage.getItem('personalityResult');
    if (result) {
      document.getElementById('result').innerText = `Your Personality Type: ${result}`;
    } else {
      document.getElementById('result').innerText = 'No result found. Please complete the quiz.';
    }
  });
  