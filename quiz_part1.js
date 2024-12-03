document.getElementById('quiz-part1-form').addEventListener('submit', (e) => {
    e.preventDefault();
  
    const answers = {};
    for (let i = 1; i <= 5; i++) {
      const answer = document.querySelector(`input[name="q${i}"]:checked`);
      if (answer) {
        answers[`q${i}`] = answer.value;
      } else {
        alert(`Please answer question ${i}`);
        return;
      }
    }
  
    // Save answers to localStorage
    localStorage.setItem('quizPart1Answers', JSON.stringify(answers));
  
    // Redirect to Part 2
    window.location.href = 'quiz_part2.html';
  });
  