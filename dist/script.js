(function() {
    // Create and style the chat widget
    var widgetContainer = document.createElement('div');
    widgetContainer.id = 'chat-widget';
    widgetContainer.className = 'chat-widget';

    // Create chat header
    var header = document.createElement('div');
    header.className = 'chat-header';
    header.textContent = 'Chat with us';
    widgetContainer.appendChild(header);

    // Create chat box
    var chatBox = document.createElement('div');
    chatBox.id = 'chat-box';
    chatBox.className = 'chat-box';
    widgetContainer.appendChild(chatBox);

    // Create chat form
    var form = document.createElement('form');
    form.id = 'chat-form';
    form.className = 'chat-form';

    var input = document.createElement('input');
    input.id = 'message-input';
    input.type = 'text';
    input.placeholder = 'Type your message...';
    form.appendChild(input);

    var button = document.createElement('button');
    button.type = 'submit';
    button.textContent = 'Send';
    form.appendChild(button);

    widgetContainer.appendChild(form);
    document.body.appendChild(widgetContainer);

    // Toggle chat widget visibility
    header.addEventListener('click', function() {
        widgetContainer.style.display = widgetContainer.style.display === 'none' ? 'block' : 'none';
    });

    // Handle form submission
    form.addEventListener('submit', async function(event) {
        event.preventDefault();
        
        var message = input.value;
        appendMessage('user', message);
        input.value = '';
        
        try {
            var response = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    messages: [{ role: 'user', content: message }],
                    options: {}  // Add any additional options if needed
                })
            });
            
            var data = await response.json();
            if (response.ok) {
                appendMessage('bot', data.text);
            } else {
                appendMessage('bot', 'An error occurred. Please try again.');
            }
        } catch (error) {
            console.error('Error:', error);
            appendMessage('bot', 'An error occurred. Please try again.');
        }
    });

    function appendMessage(role, text) {
        var messageDiv = document.createElement('div');
        messageDiv.className = 'message ' + role;
        messageDiv.textContent = text;
        chatBox.appendChild(messageDiv);
        chatBox.scrollTop = chatBox.scrollHeight;
    }
})();
