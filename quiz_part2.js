document.getElementById('quiz-part2-form').addEventListener('submit', (e) => {
    e.preventDefault();
  
    const answers = JSON.parse(localStorage.getItem('quizPart1Answers')) || {};
    for (let i = 6; i <= 10; i++) {
      const answer = document.querySelector(`input[name="q${i}"]:checked`);
      if (answer) {
        answers[`q${i}`] = answer.value;
      } else {
        alert(`Please answer question ${i}`);
        return;
      }
    }
  
    // Count occurrences of each choice (A, B, C, D)
    const score = Object.values(answers).reduce((acc, answer) => {
      acc[answer] = (acc[answer] || 0) + 1;
      return acc;
    }, {});
  
    // Determine personality type
    const maxScore = Math.max(score['A'] || 0, score['B'] || 0, score['C'] || 0, score['D'] || 0);
    let personalityType = '';
  
    if (score['A'] === maxScore) personalityType = 'Adventurer';
    if (score['B'] === maxScore) personalityType = 'Thinker';
    if (score['C'] === maxScore) personalityType = 'Connector';
    if (score['D'] === maxScore) personalityType = 'Stabilizer';
  
    // Save results and redirect to results page
    localStorage.setItem('personalityResult', personalityType);
    window.location.href = 'quiz_result.html';
  });
  