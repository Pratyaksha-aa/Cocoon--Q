document.addEventListener('DOMContentLoaded', () => {
    // Display user name
    const userName = localStorage.getItem('userName') || 'User';
    document.getElementById('user-name').textContent = userName;
  
    // Get personality type
    const personalityType = localStorage.getItem('personalityResult') || 'Adventurer';
  
    // Friend Suggestions
    const friendSuggestions = {
      Adventurer: ['Alice', 'Jake', 'Sophia'],
      Thinker: ['Ethan', 'Olivia', 'Lucas'],
      Connector: ['Emma', 'Noah', 'Mia'],
      Stabilizer: ['Ava', 'Liam', 'Charlotte']
    };
  
    const suggestionsList = document.getElementById('suggestions-list');
    const friendList = document.getElementById('friend-list');
    const existingFriends = [];
  
    friendSuggestions[personalityType].forEach(friend => {
      const li = document.createElement('li');
      li.innerHTML = `
        ${friend}
        <button class="btn accept-btn">Accept</button>
        <button class="btn remove-btn">Remove</button>
      `;
      suggestionsList.appendChild(li);
  
      // Accept Friend
      li.querySelector('.accept-btn').addEventListener('click', () => {
        // Add to Chat with Friends tab
        if (!existingFriends.includes(friend)) {
          existingFriends.push(friend);
  
          const friendLi = document.createElement('li');
          friendLi.innerHTML = `
            ${friend}
            <button class="btn chat-btn">Chat</button>
          `;
          friendList.appendChild(friendLi);
  
          // Chat button functionality
          friendLi.querySelector('.chat-btn').addEventListener('click', () => {
            alert(`Opening chat with ${friend}...`);
            // Redirect to chat page or implement chat here
          });
        }
  
        // Remove from suggestions
        li.remove();
        alert(`${friend} has been added to your friends!`);
      });
  
      // Remove Friend Suggestion
      li.querySelector('.remove-btn').addEventListener('click', () => {
        li.remove();
        alert(`${friend} has been removed from suggestions.`);
      });
    });
  
    // Chatbot Logic
    const chatbotMessages = document.getElementById('chatbot-messages');
    const chatbotInput = document.getElementById('chatbot-input');
    const chatbotSend = document.getElementById('chatbot-send');
  
    const chatbotResponses = [
      'Hello! How can I assist you today?',
      'Tell me more about what’s on your mind.',
      'That’s interesting! Let’s explore that further.',
      'Thanks for sharing. What else can I help with?'
    ];
  
    chatbotSend.addEventListener('click', () => {
      const userMessage = chatbotInput.value.trim();
      if (userMessage) {
        const userMsgElement = document.createElement('div');
        userMsgElement.className = 'user-message';
        userMsgElement.textContent = userMessage;
        chatbotMessages.appendChild(userMsgElement);
  
        const botResponse = chatbotResponses[Math.floor(Math.random() * chatbotResponses.length)];
        const botMsgElement = document.createElement('div');
        botMsgElement.className = 'bot-message';
        botMsgElement.textContent = botResponse;
        chatbotMessages.appendChild(botMsgElement);
  
        chatbotInput.value = '';
        chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
      }
    });
  });
  